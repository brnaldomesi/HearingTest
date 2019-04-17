import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

import { RIGHT_EAR, LEFT_EAR } from '../Constants.js';

import TimerMixin from 'react-timer-mixin';

var Step = React.createClass({

  mixins: [Reflux.ListenerMixin, TimerMixin],

  componentDidMount: function() {
    var _this = this;
    window.onkeydown = function(e) {
      if(e.which == 32) {
        Actions.soundButtonPressed();
        $('#space-fg').addClass("space-fg-active")
        var _this = this;
        this.clearTimeout(this.timer);
        this.timer = this.setTimeout(
             () => {
               $('#space-fg').removeClass("space-fg-active");
            },
             500
           );
        return
       }
    }
    Actions.startTest();
  },

  onClick: function() {
    Actions.soundButtonPressed();
  },

  getTitle:function() {
    if(this.props.settings.testManager.currentSoundObject) {
      if(this.props.settings.testManager.currentSoundObject.ear == RIGHT_EAR && this.props.settings.testManager.testReversed == false) {
        return "Checking your right ear...";
      } else if(this.props.settings.testManager.currentSoundObject.ear == RIGHT_EAR && this.props.settings.testManager.testReversed == true) {
        return "Checking your left ear...";
      } else if(this.props.settings.testManager.currentSoundObject.ear == LEFT_EAR && this.props.settings.testManager.testReversed == false) {
        return "Checking your left ear...";
      } else if(this.props.settings.testManager.currentSoundObject.ear == LEFT_EAR && this.props.settings.testManager.testReversed == true) {
        return "Checking your right ear...";
      }
    }
    return "Checking your right ear...";
  },

  render: function() {
    return (
      <div className="container">
        <div className="content-wrapper">
        <div className="row centered">
          <div className="col-md-10 col-md-offset-1">
            <h1>{this.getTitle()}</h1>
            <p className="subtitle">Wait until you hear a tone, then click the button below</p>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <div className="space-button" onClick={this.onClick}><div className="space-fg" id="space-fg">Click HERE or hit <span className="spacebar">spacebar</span> when you hear the tone</div></div>
          </div>
        </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <div className="col-md-6 col-md-offset-3">
              <ProgressBar progress={this.props.settings.testManager.progress} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Step
