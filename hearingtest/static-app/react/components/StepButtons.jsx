import React from 'react';
import Reflux from 'reflux';

import ExamActions from '../actions/ExamActions.js';

var StepButtons = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.forceUpdate();
  },

  onPreviousStep: function() {
    ExamActions.previousStep();
  },

  onNextStep : function() {
    ExamActions.nextStep();
  },

  render: function() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <button className="btn btn-default btn-lg" onClick={this.onPreviousStep}>Back</button>
        <button className="btn btn-success btn-lg" onClick={this.onNextStep}>Continue</button>
      </div>
    );
  }
});

export default StepButtons;
