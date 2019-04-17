import ReactAddonsUpdate from 'react-addons-update';
import React from 'react';
import Reflux from 'reflux';
import ExamActions from '../actions/ExamActions.js';
import Sound from 'soundmanager2';
import TimerMixin from 'react-timer-mixin';
import d3 from 'd3';
import $ from 'jquery';

// MODEL
import SoundObject from '../model/SoundObject.js';
import TestResult from '../model/TestResult.js';
import UserData from '../model/UserData.js';

// CONTROLLER
import TestManager from '../controllers/TestManager.js';
import ResultsManager from '../controllers/ResultsManager.js';
import InstructionManager from '../controllers/InstructionManager.js';

var currentSound;
var configureSoundObject;
var timer;
var waitingTimer;
var textTimer;
var validClickPeriod;
var successfulClick;
var asymmetryCheckTest;
var retestTestIndex;
var retestArray;

var STARTING_TEST_TONE_DECIBELS = 35;
var STARTING_TEST_TONE_INCREASE = 15;

var MAX_DECIBELS = 90;
var MIN_DECIBELS = 0;

var NUMBER_OF_TESTS = 1;

var TIME_TO_RESPOND = 1250; // 1.25 seconds
var RANDOM_TIME_MIN = 1750; // 1.75 seconds
var RANDOM_TIME_MAX = 3500; // 3.5 seconds

var ExamStore = Reflux.createStore({

    mixins: [TimerMixin],
    listenables:[ExamActions],

    // INSTUCTIONS
    onNextStep: function() {
      var last = this.state.instructionManager.getNextStep();
      if(last) {
        this.state.mode = 'test';
      }
      this.trigger(this.state);
    },

    onPreviousStep: function() {
      this.state.instructionManager.getPreviousStep();
      this.trigger(this.state);
    },

    onHearingEnviroments: function(updates) {
      this.state.userData.hearingEnviroments = ReactAddonsUpdate(this.state.userData.hearingEnviroments, {$merge: updates});
      this.trigger(this.state);
    },

    onEmailAndOrder: function(email, order) {
      this.state.userData.email = email;
      this.state.userData.orderNumber = order;
      this.trigger(this.state);
    },

    // TEST
    getDefaultData: function() {
      soundManager.setup({
        url: '../static/swf/',
        flashVersion: 9,
        preferFlash: false,
        debugMode: false,
      });

      this.state = {};
      this.state.mode = 'instructions';

      this.state.deviationCheckCount = 0;
      this.state.asymmetryFailCount = 0;

      this.state.pretitleText = 'Test 1 of 2';
      this.state.titleText = 'Instructions';
      this.state.messageText = 'Taking the Audicus hearing test is easy.  Simply click the button when you hear a tone.  Click the button to begin.';
      this.state.initalSetupDecibels = STARTING_TEST_TONE_DECIBELS;

      var _this = this;
      this.state.userData = new UserData();
      this.state.testManager = new TestManager();
      this.state.resultsManager = new ResultsManager();
      this.state.instructionManager = new InstructionManager(function() {
        _this.trigger(_this.state);
      });
      return this.state;
    },

    onFailedButtonPressed: function() {
      this.soundFailure();
    },

    onButtonPressed: function() {
      var testManager = this.state.testManager;
      // success
      if(this.validClickPeriod) {
        this.successfulClick = true;
        this.validClickPeriod = false;
        this.soundSuccess();
      }
      // not configured
      if(!testManager.hasBeenConfigured) {
        this.configureTest();
      }
    },

    configureTest: function() {
      this.updateTitleAndMessage('Lets try It', 'We are about to play an audio tone.  When you hear a tone, click the button.');
      this.configureSoundObject = new SoundObject('R', 1000, this.state.initalSetupDecibels);
      this.playSound(this.configureSoundObject, true);
    },

    startTest: function() {
      var testManager = this.state.testManager;
      // needs to be configured
      if(!testManager.hasBeenConfigured) {
        this.configureTest();
      } else {
        this.updateTitleAndMessage('Right Ear', 'Now playing audio tones in your right ear.  When you hear a tone, click the button.');
        var startingSound = testManager.currentSample;
        var startingSoundObject = new SoundObject(startingSound[0], startingSound[1], this.state.initalSetupDecibels);
        testManager.currentSoundObject = startingSoundObject;
        this.playSound(testManager.currentSoundObject);
      }
    },

    soundSuccess: function() {
      var testManager = this.state.testManager;
      if(!testManager.hasBeenConfigured) {
        this.updateTitleAndMessage('Perfect', 'We are ready to start the test.');
        this.state.testManager.hasBeenConfigured = true;
        this.configureSoundObject = null;
        this.stopSound();
        var _this = this;
        this.clearTimeout(this.textTimer);
        this.textTimer = this.setTimeout(
             () => {
               _this.startTest();
             },
             1500
           );
      } else {
        var currentSoundObject = testManager.currentSoundObject;
        var finished = currentSoundObject.success();
        // successfully matched enough times to pass go to next
        if(finished) {
          var nextSample;
          if(this.retestArray == null) {
            // record the result
            this.state.resultsManager.addResult(testManager.currentIndex, currentSoundObject.testResult());
            // add to results manager and get next sample
            nextSample = testManager.getNextSample();
          } else {
            // record the result
            console.log("retest result update");
            // this.state.resultsManager.addResult(this.retestTestIndex, currentSoundObject.testResult());
            this.state.resultsManager.updateResult(this.retestTestIndex, currentSoundObject.testResult());

            if(this.retestArray.length > 0) {
              nextSample = this.retestArray.shift();
            }
            if(this.retestArray.length == 0) {
              this.retestArray = null;
              this.retestTestIndex = 0;
            }
          }
          if(nextSample != null) {
            console.log('next sample', nextSample);
            var nextSoundObject = new SoundObject(nextSample[0], nextSample[1], this.state.initalSetupDecibels);
            if(nextSample[0] === 'L') {
              this.updateTitleAndMessage('Left Ear', 'Now playing audio tones in your left ear.  When you hear a tone, click the button')
            }
            testManager.currentSoundObject = nextSoundObject;
            this.playSound(testManager.currentSoundObject);
            this.trigger(this.state);
          } else {
            var passedAsymmetry = this.asymmetryCheck();
            if(passedAsymmetry) {
              // more tests to go
              if(testManager.currentIndex != NUMBER_OF_TESTS) {
                this.updateTitleAndMessage('Great', 'We will now begin the next test');
                var _this = this;
                this.clearTimeout(this.textTimer);
                this.textTimer = this.setTimeout(
                     () => {
                       testManager.getNextTest();
                       _this.startTest();
                     },
                     1500
                   );
              // finshed testings
              } else {
                var passedDeviation = this.deviationCheck();
                if(passedDeviation) {
                  this.finishTest();
                } else {
                  // retest
                  this.retestResult();
                }
              }
            } else {
              // retest
              this.retestResult();
            }
          }
        return;
      }
      this.playSound(currentSoundObject);
    }
    },

    retestResult: function() {
      var _this = this;
      this.clearTimeout(this.textTimer);
      this.textTimer = this.setTimeout(
           () => {
             var nextSample;
             var nextSoundObject;
             if(_this.retestArray != null) {
               if(_this.retestArray.length > 0) {
                 nextSample = _this.retestArray.shift();
                 console.log("Retest nextSample: ", nextSample);
                  nextSoundObject = new SoundObject(nextSample[0], nextSample[1], _this.state.initalSetupDecibels);
                 if(nextSample[0] === 'L') {
                   _this.updateTitleAndMessage('Retesting Left Ear', 'Now playing audio tones in your left ear.  When you hear a tone, click the button')
                 } else {
                   _this.updateTitleAndMessage('Retesting Right Ear', 'Now playing audio tones in your right ear.  When you hear a tone, click the button')
                 }
                 _this.state.testManager.currentSoundObject = nextSoundObject;
                 _this.playSound(_this.state.testManager.currentSoundObject);
                 _this.trigger(_this.state);
               }
             }
           },
           1500
         );
    },

    soundFailure: function() {

      if(this.successfulClick) {
        this.successfulClick = false;
        return;
      }

      var testManager = this.state.testManager;
      if(!testManager.hasBeenConfigured) {
        if(this.configureSoundObject.db == MAX_DECIBELS) {
            this.updateTitleAndMessage('Test Cannot Be Completed', 'Please see an Audiologist');
            return;
        }
      } else {
        if(this.state.testManager.currentSoundObject.db == MAX_DECIBELS) {
          this.soundSuccess();
          return;
        }
      }

      if(!testManager.hasBeenConfigured) {
        this.updateTitleAndMessage('Lets try that Again', 'We are about to play an audio tone.  When you hear a tone, click the button.')
        this.state.initalSetupDecibels += STARTING_TEST_TONE_INCREASE;
        if(this.state.initalSetupDecibels >= MAX_DECIBELS) {
          this.state.initalSetupDecibels = MAX_DECIBELS;
        };
        this.configureSoundObject.db = this.state.initalSetupDecibels;
        this.playSound(this.configureSoundObject, true);
      } else {
        this.state.testManager.currentSoundObject.fail();
        this.playSound(this.state.testManager.currentSoundObject);
      }
    },

    playSound: function(sound) {
      this.stopSound();
      var _this = this;
      // random play time between sounds
      this.clearTimeout(this.timer);
      this.timer = this.setTimeout(() => {
          // create the sound
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
                     _this.soundFailure();
                  },
                   TIME_TO_RESPOND
                 );
            }
          });
         },
         this.generateRandomTimeBetweenSounds()
       );
    },

    stopSound: function() {
      if(this.currentSound) {
        this.currentSound.unload();
        this.currentSound = null;
      }
    },

    finishTest: function() {
      this.stopSound();
      this.updateTitleAndMessage('Success', 'Here are your results')
      this.processReport();
      this.state.mode = 'results';
      this.trigger(this.state);
    },

    // REPORTS
    processReport: function() {
      // generate report, add user data and email it
      var formData = {};
      formData['user'] = this.state.userData;
      formData['report'] = this.state.resultsManager.generateReport();
      var json = JSON.stringify(formData);
      console.log(json);
      // email it off
      $.ajax({
        type: 'POST',
        url: '/app/submit/',
        dataType: 'json',
        data: json,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function(data) {
        //  console.log("data: ", data);
        },
        error: function(xhr, status, err) {
        //  console.error(status, err.toString());
        }
      });
    },

    // RANDOM HELPERS
    generateRandomTimeBetweenSounds: function() {
      return (Math.random() * (RANDOM_TIME_MIN - RANDOM_TIME_MAX) + RANDOM_TIME_MAX);
    },

    updateTitleAndMessage: function(title, message) {
      this.state.pretitleText = 'Test ' + (this.state.testManager.currentIndex + 1) + ' of 2';
      this.state.titleText = title;
      this.state.messageText = message;
      this.trigger(this.state);
    },

    // TEST CHECKS
    asymmetryCheck: function() {
      var results = this.state.resultsManager.results;
      // check all the results for a >= 15 dB difference between both ears
      for(var r in results) {
        var result = results[r];
        var left = 0;
        var right = 0;
        for(var ear in result) {
          var test = result[ear];
          if(test.ear === 'R') {
            right += test.db;
          } else if(test.ear === 'L') {
            left += test.db;
          }
        }
        left = left/5;
        right = right/5;
        var dev = Math.abs(left-right);
        console.log("right: ", right);
        console.log("left: ", left);
        console.log("dev: ", dev);
        console.log(this.state.asymmetryFailCount);
        if(dev >= 15) {
          if(this.state.asymmetryFailCount < 1) {
            if(right > left) {
              console.log("Asymmetry Check Failure : Right Ear Retest");
              this.retestArray = [['R', 1000],['R', 2000],['R', 4000],['R', 8000],['R', 500]];
              this.updateTitleAndMessage('Please Reinsert the Right Ear Bud', 'Your results for your right ear might be inaccurate if you didnt insert it all the way');
            } else {
              console.log("Asymmetry Check Failure : Left Ear Retest");
              this.retestArray = [['L', 1000],['L', 2000],['L', 4000],['L', 8000],['L', 500]];
              this.updateTitleAndMessage('Please Reinsert the Left Ear Bud', 'Your results for your left ear might be inaccurate if you didnt insert it all the way');
            }
            this.retestTestIndex = r;
            this.state.asymmetryFailCount++;
          } else {
             console.log("Asymmetry Check Failure : Please see an Audiologist");
              this.state.userData.notes = 'Asymmetry Check Failure';
             this.updateTitleAndMessage('Test Cannot Be Completed', 'Please see an Audiologist');
             this.processReport();
           }
           console.log("Retest Array: ", this.retestArray);
           console.log("Retest Index: ", this.retestTestIndex);
          return false;
        }
      }
      this.state.asymmetryFailCount = 0;
      return true;
    },

    deviationCheck: function() {
      var results = this.state.resultsManager.results;
      var flaggedFreqs = [];
      var firstTest = results[0];
      var secondTest = results[1];
      for(var key in firstTest) {
        var firstResult = firstTest[key];
        var secondResult = secondTest[key];
        var difference = Math.abs(firstResult.db - secondResult.db);
        if(difference >= 20) {
          if(firstResult.db > secondResult.db) {
            flaggedFreqs.push([0, firstResult.ear, firstResult.hz, firstResult.db, secondResult.db]);
          }
          if(secondResult.db > firstResult.db) {
            flaggedFreqs.push([1, secondResult.ear, secondResult.hz, firstResult.db, secondResult.db]);
          }
        }
      }
      if(flaggedFreqs.length > 0) {
        if(flaggedFreqs.length == 1 && (flaggedFreqs[0][3] == MIN_DECIBELS || flaggedFreqs[0][4] == MIN_DECIBELS) && this.state.deviationCheckCount < 2) {
          console.log("Deviation Check Failure : Throwing out just one result");
          this.retestArray = [[flaggedFreqs[0][1], flaggedFreqs[0][2]]];
          this.retestTestIndex = flaggedFreqs[0][0];
        } else if(flaggedFreqs.length == 1 && this.state.deviationCheckCount < 1) {
          console.log("Deviation Check Failure : Throwing out an entire test");
          this.retestArray = [[flaggedFreqs[0][1], 1000],[flaggedFreqs[0][1], 2000],[flaggedFreqs[0][1], 4000],[flaggedFreqs[0][1], 8000],[flaggedFreqs[0][1], 500]];
          this.retestTestIndex = flaggedFreqs[0][0];
        } else {
          console.log("Deviation Check Failure : Please see an Audiologist");
          this.state.userData.notes = 'Deviation Check Failure';
          this.updateTitleAndMessage('Test Cannot Be Completed', 'Please see an Audiologist');
          this.processReport();
        }
        this.state.deviationCheckCount++;
        console.log("Retest Array: ", this.retestArray);
        console.log("Retest Index: ", this.retestTestIndex);
        return false;
      }
      this.state.deviationCheckCount = 0;
      return true;
    },

});

export default ExamStore;
