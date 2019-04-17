import React from 'react';

// components
import TestButton from './TestButton.jsx';
import FailButton from './FailButton.jsx';
import ProgressBar from './ProgressBar.jsx';

import ExamActions from '../actions/ExamActions.js';

var TestExam = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <h3>{ this.props.settings.pretitleText }</h3>
            <h2>{ this.props.settings.titleText }</h2>
            <hr></hr>
            <h4>{ this.props.settings.messageText }</h4>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
          <TestButton />
          <ProgressBar progress={ this.props.settings.testManager.progress }/>
          </div>
        </div>
      </div>
    );
  }
});

export default TestExam;
