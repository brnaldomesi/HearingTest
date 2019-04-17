import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
/**
step 2 of the test, checkboxs for hearing enviroments
**/
var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      nextButtonEnabled:false
    }
  },

  nextStepClicked: function() {
    if(!this.state.nextButtonEnabled) return;
    Actions.nextStepButtonPressed();
  },

  onChange: function(event) {
    var key = {};
    key[event.target.value] = event.target.checked;
    Actions.updateUserDataEnviroments(key);
  },

  checkNextButtonEnabled: function() {
    var h = this.props.settings.userData.hearingEnviroments;
    var enabled = (h.tv || h.conversation || h.enviroments || h.music || h.audience || h.phone || h.curious)
    if(this.state.nextButtonEnabled != enabled) {
      this.setState({nextButtonEnabled: enabled})
    }
  },

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.checkNextButtonEnabled();
  },

  render: function() {
    var hearingEnviroments = this.props.settings.userData.hearingEnviroments;
    this.checkNextButtonEnabled();
    return (
      <div className="container">
        <div className="content-wrapper">
          <div className="row centered">
            <div className="col-md-10 col-md-offset-1 col-xs-12">
              <h1>First, tell us about <br></br>your hearing.</h1>
              <p className="subtitle">When do you usually have a hard time hearing? Select all that apply.</p>
            </div>
          </div>
          <div className="row centered">
            <div className="col-md-8 col-md-offset-2 col-xs-12">
              <div className="checkbox-wrapper col-md-4 col-xs-6">
                  <label className={hearingEnviroments.tv ? "active" : ""}>
                    <input type="checkbox" value="tv" onChange={ this.onChange } checked={ hearingEnviroments.tv }></input>
                    While watching TV
                  </label>
                </div>
              <div className="checkbox-wrapper col-md-4 col-xs-6">
                  <label className={hearingEnviroments.conversation ? "active" : ""}>
                    <input type="checkbox" value="conversation" onChange={ this.onChange } checked={ hearingEnviroments.conversation }></input>
                    While having a conversation indoors
                  </label>
                </div>
              <div className="checkbox-wrapper col-md-4 col-xs-6">
                  <label className={hearingEnviroments.enviroments ? "active" : ""}>
                    <input type="checkbox" value="enviroments" onChange={ this.onChange } checked={ hearingEnviroments.enviroments }></input>
                    In noisy environments
                  </label>
                </div>
              <div className="checkbox-wrapper col-md-4 col-xs-6">
                  <label className={hearingEnviroments.music ? "active" : ""}>
                    <input type="checkbox" value="music" onChange={ this.onChange } checked={ hearingEnviroments.music }></input>
                    While listening to music
                  </label>
                </div>
              <div className="checkbox-wrapper col-md-4 col-xs-6">
                  <label className={hearingEnviroments.audience ? "active" : ""}>
                    <input type="checkbox" value="audience" onChange={ this.onChange } checked={ hearingEnviroments.audience }></input>
                    When I'm in a theater watching a movie, play, etc.
                  </label>
                </div>
              <div className="checkbox-wrapper col-md-4 col-xs-6">
                  <label className={hearingEnviroments.phone ? "active" : ""}>
                    <input type="checkbox" value="phone" onChange={ this.onChange } checked={ hearingEnviroments.phone }></input>
                    When I'm on the phone
                  </label>
                </div>
              <label className="hearing-fine">
                <input type="checkbox" value="curious" onChange={ this.onChange } checked={ hearingEnviroments.curious }></input>
                My hearing is fine, I’m just curious
              </label>
            </div>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2 col-xs-12">
            <Button onClick={ this.nextStepClicked } title={ 'Next' } foward={true} disabled={!this.state.nextButtonEnabled} />
          </div>
        </div>
      </div>
    )
  }
})

export default Step
