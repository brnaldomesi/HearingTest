import React from 'react';
import Reflux from 'reflux';

import CalibrateActions from '../actions/CalibrateActions.js';

var AudioFilesCheckBox = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      checkedValue: this.props.defaultVal
    };
  },

  handleChange: function(event) {
    var key = this.props.settingsKey;
    var up = {};
    up[key] = event.target.checked;
    CalibrateActions.updateState(up);
    this.setState({checkedValue: event.target.checked});
  },

  render: function() {
    return (
      <div className="form-group">
        <label className="checkbox-inline">
          <input ref="checkBox" type="checkbox" onChange={this.handleChange} checked={this.state.checkedValue}/>
          {this.props.label}
        </label>
      </div>
    )
  }
});

export default AudioFilesCheckBox;
