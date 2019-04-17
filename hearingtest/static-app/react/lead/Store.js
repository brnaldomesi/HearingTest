import React from 'react';
import Reflux from 'reflux';
import ReactAddonsUpdate from 'react-addons-update';

import $ from 'jquery'
import TimerMixin from 'react-timer-mixin';
import Sound from 'soundmanager2';
/**
reflux actions
**/
import Actions from './Actions.js';
/**
model objects for sound, test results and user data
**/
import SoundObject from './SoundObject.js';
import TestResult from './TestResult.js';
import UserData from './UserData.js';
/**
data managers for the testing results, test it self
and analytics to keep the store more organized
**/
import ResultsManager from './ResultsManager.js';
import TestManager from './TestManager.js';
import AnalyticsManager from './AnalyticsManager.js';

import { START_DECIBELS, RIGHT_EAR, LEFT_EAR, MAX_DECIBELS, MIN_DECIBELS, TIME_TO_RESPOND, generateRandomTimeBetweenSounds } from './Constants.js';

var LeadStore = Reflux.createStore({
  mixins: [TimerMixin],
  listenables:[Actions],
  /**
  gets the default data for the test and sets up the state of the
  store with this default data, as well as initalize the managers
  **/
  getDefaultData: function() {
    soundManager.setup({
      url: './static/swf/',
      flashVersion: 9,
      preferFlash: false,
      debugMode: false,
    });
    this.sucessfulClick = false;
    this.validClickPeriod = false;
    this.currentSound = null;
    this.configureSoundObject = null;
    this.state = {};
    this.state.failedCalibration = false;
    this.state.results = null;
    this.state.testManager = new TestManager();
    this.state.resultsManager = new ResultsManager();
    this.state.results = this.state.resultsManager.results;
    this.state.userData = new UserData();
    /**
    change value here to move around pages
    **/
    this.state.step = 1;
    this.state.analyticsManager = new AnalyticsManager();
    this.state.analyticsManager.setupUser();
    this.state.analyticsManager.trackPageStep(this.state.step);
    return this.state;
  },
  /**
  sends a tracking event to analyticsManager with an event name and current
  step so the page of the event can be tracked on the event
  **/
  onTrackEvent:function(eventName) {
    this.state.analyticsManager.trackEvent(eventName, this.state.step);
  },
  /**
  starts the test with the first sound of the testManager
  **/
  onStartTest:function() {
    this.playSound(this.state.testManager.getNextSound());
  },
  /**
  uses a timer to set a random time to play in between each sound played,
  uses soundManager2 a third party library for html5 browsers to play sounds,
  there are two timers (timer and waitingTimer) which dictate if a sound that is
  played is responded to in a proper amount of time to be a success or failure
  **/
  playSound: function(sound) {
    this.stopSound();
    var _this = this;
    /**
    random play time between sounds
    **/
    this.clearTimeout(this.timer);
    this.timer = this.setTimeout(() => {
        /**
        create and play the sound with a validClickPeriod which tells if a user head and
        identified the sound by clicking the button within the TIME_TO_RESPOND time
        **/
        _this.validClickPeriod = true;
        _this.successfulClick = false;
        console.log("playing sound: ", sound);
        _this.currentSound = soundManager.createSound({
          url: sound.filePath(),
        });
        _this.currentSound.play({
          onfinish: function() {
            _this.clearTimeout(_this.waitingTimer);
            _this.waitingTimer = _this.setTimeout(
                 () => {
                   _this.validClickPeriod = false;
                    if(!_this.state.testManager.hasBeenConfigured) {
                      _this.configureFailure();
                    } else {
                      _this.soundFailure();
                    }
                },
                 TIME_TO_RESPOND
               );
          }
        });
       },
       generateRandomTimeBetweenSounds()
     );
  },
  /**
  used to configure the right ear sample
  **/
  onTestRightEarSample: function() {
    this.state.testManager.hasBeenConfigured = false;
    this.state.failedCalibration = false;
    this.configureSoundObject = new SoundObject(RIGHT_EAR, 1000, START_DECIBELS);
    this.playSound(this.configureSoundObject);
  },
  /**
  used to configure the left ear sample
  **/
  onTestLeftEarSample: function() {
    this.configureSoundObject = new SoundObject(LEFT_EAR, 1000, START_DECIBELS);
    this.playSound(this.configureSoundObject);
  },
  /**
  sets if the test has been configured correctly
  **/
  configureSuccess: function() {
    this.state.testManager.initalSetupDecibels = this.configureSoundObject.db
    this.state.testManager.testSamplesLoad();
    this.state.testManager.hasBeenConfigured = true;
    this.configureSoundObject = null;
    this.onNextStepButtonPressed();
  },

  configureFailure: function() {
    if(this.configureSoundObject.db == MAX_DECIBELS && this.configureSoundObject.ear == LEFT_EAR) {
      this.state.failedCalibration = true;
      this.trigger(this.state);
      return
    } else if(this.configureSoundObject.db == MAX_DECIBELS && this.configureSoundObject.ear == RIGHT_EAR) {
      this.onTestLeftEarSample();
      return;
    }
    this.configureSoundObject.configureFailure();
    this.playSound(this.configureSoundObject)
  },

  onHearRightEar:function() {
    if(this.validClickPeriod) {
      this.successfulClick = true;
      this.validClickPeriod = false;
      if(this.configureSoundObject.ear == LEFT_EAR) {
        this.state.testManager.testReversed = true;
      }
      this.configureSuccess();
    }
  },

  onHearLeftEar:function() {
    if(this.validClickPeriod) {
      this.successfulClick = true;
      this.validClickPeriod = false;
      if(this.configureSoundObject.ear == RIGHT_EAR) {
        this.state.testManager.testReversed = true;
      }
      this.configureSuccess();
    }
  },

  stopSound: function() {
    if(this.currentSound) {
      this.currentSound.pause();
      this.currentSound.unload();
      this.currentSound = null;
    }
  },

  soundSuccess: function() {
    var testManager = this.state.testManager;
    var currentSoundObject = testManager.currentSoundObject;
    // check for valid object
    if(currentSoundObject) {
      var finished = currentSoundObject.success();
      // successfully matched enough times to pass go to next
      console.log(currentSoundObject);
      if(finished) {
        console.log("test ", testManager.testReversed);
        currentSoundObject.testReversed = testManager.testReversed;
        this.state.resultsManager.addResult(currentSoundObject.testResult());
        console.log(this.state.resultsManager);
        var nextSound = testManager.getNextSound();
        if(nextSound == null) {
          // show results
          this.showResults();
          return;
        }
        if(testManager.testReversed == false) {
          if(nextSound.ear == LEFT_EAR && nextSound.hz == 1000) {
            this.state.analyticsManager.trackEvent("Halfway Point of Test Reached", this.state.step);
          }
        } else {
          if(nextSound.ear == RIGHT_EAR && nextSound.hz == 1000) {
            this.state.analyticsManager.trackEvent("Halfway Point of Test Reached", this.state.step);
          }
        }
      }
      // play sound
      this.playSound(this.state.testManager.currentSoundObject);
      this.trigger(this.state);
    }
  },

  soundFailure: function() {
    if(this.successfulClick) {
      this.successfulClick = false;
      return;
    }
    if(this.state.testManager.currentSoundObject.db == MAX_DECIBELS) {
      this.soundSuccess();
      return;
    }
    // fail and replay
    this.state.testManager.currentSoundObject.fail();
    this.playSound(this.state.testManager.currentSoundObject);
  },

  onShowResults:function() {
    this.showResults();
  },

  // RESULTS
  showResults:function() {
    this.stopSound();
    this.state.results = this.state.resultsManager.results;
    this.state.step = 10;
    this.state.analyticsManager.trackEvent("Show Results Page Reached", this.state.step);
    console.log("sending email");
    this.checkSendResults();
    this.trigger(this.state);
  },

  onSendEmail:function() {
    this.state.analyticsManager.updateUser(this.state.userData);
    this.checkSendResults();
  },

  checkSendResults:function() {
    if(this.state.userData.email != null) {
      // console.log("send");
      this.sendResults();
    }
  },

  sendResults:function() {
    var formData = {};
    formData['user'] = this.state.userData;
    formData['results'] = this.state.resultsManager.getPercentages();
    formData['range'] = this.state.resultsManager.getHearingRange();
    formData['tones'] = this.state.resultsManager.getTonesCopy();
    var json = JSON.stringify(formData);
    /**
    email off via ajax
    **/
    $.ajax({
      type: 'POST',
      url: 'app/lead/',
      dataType: 'json',
      crossDomain: true,
      data: json,
      contentType: "application/json; charset=utf-8",
      cache: false,
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  },

  sendUsersEmail:function() {
    var formData = {};
    formData['user'] = this.state.userData;
    var json = JSON.stringify(formData);
    console.log(json);
    /**
    email off via ajax
    **/
    $.ajax({
      type: 'POST',
      url: 'app/campaign/',
      dataType: 'json',
      crossDomain: true,
      data: json,
      contentType: "application/json; charset=utf-8",
      cache: false,
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  },

  onSendUsersEmail:function() {
    this.sendUsersEmail();
  },

  // ACTIONS
  onSoundButtonPressed: function() {
    var testManager = this.state.testManager;
    // success
    if(this.validClickPeriod) {
      this.successfulClick = true;
      this.validClickPeriod = false;
      this.soundSuccess();
    }
  },

  onNextStepButtonPressed: function() {
    this.stopSound();
    this.state.analyticsManager.trackEvent("Next Button Pressed", this.state.step);
    this.state.step = this.state.step + 1
    this.state.step = (this.state.step > 10) ? 10 : this.state.step
    this.state.analyticsManager.trackPageStep(this.state.step);
    if(this.state.step == 4) {
      this.state.analyticsManager.updateUser(this.state.userData);
      if(this.state.userData.email) {
        this.sendUsersEmail();
      }
    } else if(this.state.step == 10) {
      window.onkeydown = null;
    }
    this.trigger(this.state)
  },

  onPreviousStepButtonPressed: function() {
    this.stopSound();
    this.state.analyticsManager.trackEvent("Back Button Pressed", this.state.step);
    this.state.step = this.state.step - 1;
    this.state.step = (this.state.step > 0) ? this.state.step : 1;
    this.state.analyticsManager.trackPageStep(this.state.step);
    this.trigger(this.state)
  },

  onUpdateUserDataEnviroments: function(updates) {
    if(updates.curious == true) {
      this.state.userData.hearingEnviroments = {
        tv:false,
        conversation:false,
        enviroments:false,
        music:false,
        audience:false,
        phone:false,
        curious:true
      };
    } else {
      updates['curious'] = false;
      var enviroments = ReactAddonsUpdate(this.state.userData.hearingEnviroments, {$merge: updates})
      this.state.userData.hearingEnviroments = enviroments
    }
    this.trigger(this.state)
  },

  onUpdateUserData: function(updates) {
    var data = ReactAddonsUpdate(this.state.userData, {$merge: updates})
    this.state.userData = data
    this.trigger(this.state)
  },

  onShowBrowserUnsupportedPage: function() {
    this.state.step = 0;
    this.trigger(this.state);
  },

});

export default LeadStore
