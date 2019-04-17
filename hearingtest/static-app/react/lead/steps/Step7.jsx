import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import BackButton from '../components/BackButton.jsx';

var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function() {
    Actions.testRightEarSample();
  },

  hearRightEar: function() {
    Actions.hearRightEar();
  },

  hearLeftEar: function() {
    Actions.hearLeftEar();
  },

  tryAgain: function() {
    Actions.testRightEarSample();
  },

  showModal:function() {
    $('#matterModal').modal('show');
  },

  render: function() {
    if(this.props.settings.failedCalibration) {
      this.showModal();
    }
    return (
      <div>
        <div className="modal fade" id="matterModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="row centered info">
                <h2>Something seems to be wrong...</h2>
                <p>This could be a problem with your headphones, but it might indicate some hearing loss.<br></br><br></br>Try the test again with a different set of headphones, or contact Audicus for assistance.</p>
                <button className='btn btn-success btn-lg' data-dismiss="modal" onClick={this.tryAgain}>Try again</button>
                <a className="btn btn-success btn-lg help" href="mailto:help@audicus.com">Contact Audicus</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content-wrapper">
            <div className="row centered">
              <div className="col-md-10 col-md-offset-1 col-xs-12">
                <h1>Just a quick headphone check, then we'll start.</h1>
                <p className="subtitle">Wait for the tone to play, then click which ear you hear the tone in.</p>
              </div>
            </div>
            <div className="row centered">
              <div className="col-md-8 col-md-offset-2">
                <div className="ear-wrap">
                  <div className="left-ear" onClick={this.hearLeftEar}>
                    <img src="./static/img/left-ear.png" width="100%"></img>
                    <p>I hear <br></br>a tone <br></br>in my <br></br><span className="ear">Left</span><br></br>ear</p>
                    <img src="./static/img/left-ear-hover.png" width="100%"></img>
                  </div>
                  <div className="right-ear" onClick={this.hearRightEar}>
                    <img src="./static/img/right-ear.png" width="100%"></img>
                    <p>I hear <br></br>a tone <br></br>in my <br></br><span className="ear">Right</span><br></br>ear</p>
                    <img src="./static/img/right-ear-hover.png" width="100%"></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="row centered">
              <div className="col-md-8 col-md-offset-2">
                <div className="col-md-3">
                  <BackButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Step
