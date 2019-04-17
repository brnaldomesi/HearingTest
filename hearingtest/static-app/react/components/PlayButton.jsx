import React from 'react';
import Reflux from 'reflux';

import CalibrateActions from '../actions/CalibrateActions.js';

var PlayButton = React.createClass({

  mixins: [Reflux.ListenerMixin],

  handleClick: function(){
    CalibrateActions.playSound(this.props.filename);
  },

  handleOnMouseDown: function() {
    CalibrateActions.playSound(this.props.filename);
  },

  handleMouseUp: function() {
    CalibrateActions.stopSound();
  },

  render: function() {
    return (
      <button type="button" className="btn btn-primary" onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleMouseUp}>
        <span className="glyphicon glyphicon-play"></span> Play
      </button>
    );
  }
});

export default PlayButton;
