import React from 'react';
/**
back button
**/
import Actions from '../Actions.js';

var BackButton = React.createClass({

  onClick:function() {
    Actions.previousStepButtonPressed();
  },
  render: function() {
    return <div className="back-button" onClick={this.onClick}><img src="./static/img/back-arrow.png"></img> Back</div>
  }
})

export default BackButton
