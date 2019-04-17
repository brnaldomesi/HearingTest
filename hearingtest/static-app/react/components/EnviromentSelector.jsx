import React from 'react';
import Reflux from 'reflux';

import ExamActions from '../actions/ExamActions.js';

var EnviromentSelector = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.forceUpdate();
  },

  onChange: function(e) {
    var update = {};
    update[e.target.value] = e.target.checked;
    ExamActions.hearingEnviroments(update);
  },

  render: function() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="checkbox">
          <label>
            <input type="checkbox" value="tv" onChange={this.onChange} checked={this.props.settings.userData.hearingEnviroments['tv']}></input>
            While Watching TV
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="indoor-speech" onChange={this.onChange} checked={this.props.settings.userData.hearingEnviroments['indoor-speech']}></input>
            Indoor Speech
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="speech-in-noise" onChange={this.onChange} checked={this.props.settings.userData.hearingEnviroments['speech-in-noise']}></input>
            Speech in Noise
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="music" onChange={this.onChange} checked={this.props.settings.userData.hearingEnviroments['music']}></input>
            While Listening to Music
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="audience" onChange={this.onChange} checked={this.props.settings.userData.hearingEnviroments['audience']}></input>
            In an Audience
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="phone" onChange={this.onChange} checked={this.props.settings.userData.hearingEnviroments['phone']}></input>
            While Talking on the Phone
          </label>
        </div>
      </div>
    );
  }
});

export default EnviromentSelector;
