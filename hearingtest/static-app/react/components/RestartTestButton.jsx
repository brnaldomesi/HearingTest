import React from 'react';

import ExamActions from '../actions/ExamActions.js';

var RestartTestButton = React.createClass({

  handleClick: function() {
    ExamActions.restartTest();
  },

  render: function() {
    return (
      <div className="btn btn-danger" onClick={ this.handleClick }>
        Restart Test
      </div>
    );
  }
});

export default RestartTestButton;
