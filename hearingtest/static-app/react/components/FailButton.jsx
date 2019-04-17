import React from 'react';

import ExamActions from '../actions/ExamActions.js';

var FailButton = React.createClass({

  handleClick: function() {
    console.log("clicked");
    ExamActions.failedButtonPressed();
  },

  render: function() {
    return (
      <div className="centered">
        <div className="btn btn-danger" onClick={ this.handleClick }>
          Fail here
        </div>
      </div>
    );
  }
});

export default FailButton;
