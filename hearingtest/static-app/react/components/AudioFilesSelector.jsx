import React from 'react';
import Reflux from 'reflux';

import CalibrateActions from '../actions/CalibrateActions.js';

var AudioFilesSelector = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      inputOptions: [],
    };
  },

  handleChange: function(event) {
    var key = this.props.settingsKey;
    var up = {};
    up[key] = event.target.value;
    CalibrateActions.updateState(up);
  },

  render: function() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <select className="form-control" onChange={this.handleChange}>
          {
          this.props.inputOptions.map(function(val, i) {
            return <option value={val} key={i}>{val}</option>
          })
          }
        </select>
      </div>
    );
  }
});

export default AudioFilesSelector;
