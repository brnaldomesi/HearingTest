import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
/**
step 1 of the test, welcome screen
**/
var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  nextButtonPressed: function() {
    Actions.nextStepButtonPressed();
  },

  render: function() {
    return (
      <div className="container">
        <div className="content-wrapper">
          <div className="row centered">
            <div className="col-md-10 col-md-offset-1 col-xs-12">
              <h1>Check your hearing strength in 5 minutes!</h1>
            </div>
          </div>
          <div className="row centered">
            <div className="col-md-8 col-md-offset-2 col-xs-12">
              <img src="./static/img/welcome.png" className="welcome"></img>
              <p className="sub text-center">Before we start, you'll need to:</p>
              <p className="list">Move to a quiet environment</p>
              <p className="list">Plug in your headphones</p>
              <p className="list">Set your computer's volume</p>
            </div>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2 col-xs-12">
            <Button onClick={this.nextButtonPressed} title={"Start"} foward={true}/>
          </div>
        </div>
      </div>
    )
  }
})

export default Step
