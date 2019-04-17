import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import BackButton from '../components/BackButton.jsx';

/**
step 4 of the test
**/

var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  nextStepClicked: function() {
    Actions.nextStepButtonPressed();
  },

  whyMatter:function() {
    Actions.trackEvent("Why Does This Matter");
  },

  render: function() {
    return (
      <div>
        <div className="modal fade" id="matterModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div className="row centered info">
                <h2>Audicus Experts say...</h2>
                <p>A quiet place is important because <b>any noise can affect your hearing results</b> — even wind!</p>
                <button className='btn btn-success btn-lg' data-dismiss="modal">Got it!</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content-wrapper">
            <div className="row centered">
              <div className="col-md-10 col-md-offset-1 col-xs-12">
                <h1>Let's get you in <br></br>the right enviroment.</h1>
                <p className="subtitle">First, make sure you're in a quiet place.<br></br>When you're ready, click the button below.</p>
              </div>
            </div>
            <div className="row centered">
              <div className="col-md-8 col-md-offset-2 col-xs-12">
                <img src="./static/img/quiet.gif" className="instruction-gif"></img>
              </div>
            </div>
          </div>
          <div className="row centered">
            <div className="col-md-8 col-md-offset-2 col-xs-12">
              <div className="col-md-3">
                <BackButton />
              </div>
              <div className="col-md-6">
                <Button onClick={this.nextStepClicked} title={"I'm in a quiet enviroment"} foward={true}/>
                <br></br>
                <a data-toggle="modal" data-target="#matterModal" onClick={this.whyMatter}>Why does this matter?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Step
