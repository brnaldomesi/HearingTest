import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom'

import CalibrateActions from '../actions/CalibrateActions.js';

var AudioNotes = React.createClass({

  mixins: [Reflux.ListenerMixin],

  handleChange: function(event) {
    var key = this.props.filename;
    var up = {};
    up[key] = ReactDOM.findDOMNode(this.refs['note']).value;
    CalibrateActions.updateNote(up);
  },

  render: function() {
    return (
      <textarea ref='note' className="form-control" rows="1" onChange={this.handleChange}></textarea>
    )
  }
});

export default AudioNotes;
