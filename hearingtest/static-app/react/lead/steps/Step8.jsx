import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import BackButton from '../components/BackButton.jsx';

import { RIGHT_EAR, LEFT_EAR } from '../Constants.js';

import TimerMixin from 'react-timer-mixin';

var Step = React.createClass({

  mixins: [Reflux.ListenerMixin, TimerMixin],

  getInitialState: function() {
    return {
      count:null,
    }
  },

  beginTestSequence:function() {
    if(this.state.count != 0) {
      this.setState({count:3});
      this.checkCountDown();
    }
  },

  checkCountDown:function() {

    if(this.state.count == 0) {
      Actions.nextStepButtonPressed();
      return;
    }

    var _this = this;
    this.clearTimeout(this.timer);
    this.timer = this.setTimeout(
         () => {
           console.log("COUNING", _this.state.count);
          _this.setState({count: (_this.state.count-1)});
          _this.forceUpdate();
          _this.checkCountDown();
        },
         1000
       );
     return
   },

  getTitle:function() {
    return "Now for the fun part";
  },

  getCountdown:function() {
    if(this.state.count > 0) {
      return this.state.count;
    }
    return null;
  },

  getSubTitle:function() {
    if(this.state.count == null) {
      return "We'll play a series of tones at different pitches and volumes.";
    }
    return "Starting in...";
  },

  getSubTitle2:function() {
    if(this.state.count == null) {
      return "Don't worry if you miss a tone... that's perfectly normal.";
    }
    return null
  },

  render: function() {
    console.log(this.props.settings);
    var bottomBar = (this.state.count != null) ? null : <div><div className="col-md-3"><BackButton/></div><div className="col-md-6"><Button onClick={this.beginTestSequence} title={"Lets do this!"} foward={true}/></div></div>;
    return (
      <div className="container">
        <div className="content-wrapper">
          <div className="row centered">
            <div className="col-md-10 col-md-offset-1 col-xs-12">
              <h1>{this.getTitle()}</h1>
              <p className="subtitle">{this.getSubTitle()}<br></br>{this.getSubTitle2()}</p>
            </div>
          </div>
          <div className="row centered">
            <div className="col-md-8 col-md-offset-2">
              <h1 className="countdown">{this.getCountdown()}</h1>
            </div>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2 col-xs-12">
            {bottomBar}
          </div>
        </div>
      </div>
    )
  }
})

export default Step
