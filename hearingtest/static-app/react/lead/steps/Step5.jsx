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
                <p>Headphones are key because they help allow us to test each ear individually.</p>
                <button className='btn btn-success btn-lg' data-dismiss="modal">Got it!</button>
              </div>
            </div>
          </div>
        </div>
      <div className="container">
        <div className="content-wrapper">
        <div className="row centered">
          <div className="col-md-10 col-md-offset-1 col-xs-12">
            <h1>Plug your headphones<br></br>into the computer.</h1>
            <p className="subtitle">When you're ready, click the button below.</p>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <img src="./static/img/headphones.gif" className="instruction-gif"></img>
          </div>
        </div>
      </div>
    <div className="row centered">
      <div className="col-md-8 col-md-offset-2">
        <div className="col-md-3">
          <BackButton />
        </div>
        <div className="col-md-6">
          <Button onClick={this.nextStepClicked} title={"Headphones are in!"} foward={true}/>
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
