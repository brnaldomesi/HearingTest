import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import BackButton from '../components/BackButton.jsx';

var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  nextStepClicked: function() {
    Actions.nextStepButtonPressed();
  },

  needHelp:function() {
    Actions.trackEvent("Need Help");
  },

  render: function() {
    return (
      <div>
      <div className="modal fade" id="matterModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <div className="row centered info">
              <h2>Need Help</h2>
              <p>Try again or reach out ot us with any questions or comments! We're here to help.</p>
              <button className='btn btn-success btn-lg' data-dismiss="modal">Try again</button>
              <a className="btn btn-success btn-lg help" href="mailto:help@audicus.com">Contact Audicus</a>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
          <div className="content-wrapper">
          <div className="row centered">
            <div className="col-md-10 col-md-offset-1 col-xs-12">
              <h1>Now, let's set your <br></br>computer's volume.</h1>
              <p className="subtitle">Set your computer's volume to <span className="fifty">50%</span>.<br></br>When you're ready, click the button below.</p>
            </div>
          </div>
          <div className="row centered">
            <div className="col-md-8 col-md-offset-2">
              <img src="./static/img/volume.gif" className="instruction-gif"></img>
            </div>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <div className="col-md-3">
              <BackButton />
            </div>
            <div className="col-md-6">
              <Button onClick={this.nextStepClicked} title={"All set!"} foward={true}/>
              <br></br>
              <a data-toggle="modal" data-target="#matterModal" onClick={this.needHelp}>Need Help</a>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
})

export default Step
