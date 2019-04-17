import React from 'react';

import ExamActions from '../actions/ExamActions.js';

var TestButton = React.createClass({

  handleClick: function() {
    ExamActions.buttonPressed();
  },

  failedClick: function() {
    ExamActions.failedButtonPressed();
  },

  render: function() {
    return (
      <div className="centered">
        <div className="round-button" onClick={ this.handleClick }>
          <i className="fa fa-hand-pointer-o fa-4x"></i><br></br>
          Click Here
        </div>
      </div>
    );
  }
});

export default TestButton;
