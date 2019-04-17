import React from 'react';
import {render} from 'react-dom';
import Reflux from 'reflux';

// Import Components
import TestExam from './components/TestExam.jsx';
import TestResults from './components/TestResults.jsx';
import InstructionStep from './components/InstructionStep.jsx';

// Import Store
import ExamStore from './stores/ExamStore.js';

var App = React.createClass({

  mixins: [Reflux.connect(ExamStore)],

  getInitialState: function() {
    return ExamStore.getDefaultData();
  },

  getCurrentPanel: function() {
    switch(this.state.mode) {
      case 'results':
        return <TestResults settings={ this.state }/>;
      case 'test':
        return <TestExam settings={ this.state }/>;
      case 'instructions':
        return <InstructionStep settings={ this.state }/>;
      default:
        return <TestExam settings={ this.state }/>;
    }
  },

  render () {
    var shownPanel = this.getCurrentPanel();
    return (
      <div>
        <div className="logo-wrapper">
          <div className="container">
              <img src="../static/img/logo-dark.png" className="logo"></img>
          </div>
        </div>
        { shownPanel }
        <footer>
          <div className="container">
            <div className="col-md-12">
              <div className="pull-left">
                <p>&copy; Audicus, Inc. 2016</p>
              </div>
              <div className="pull-right">
                <p>Beta Version 1.0.3</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
   );
  }
});

render(<App/>, document.getElementById('app'));
