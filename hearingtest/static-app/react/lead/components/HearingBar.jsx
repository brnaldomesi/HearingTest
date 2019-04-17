import React from 'react';

import { RIGHT_EAR, LEFT_EAR } from '../Constants.js';

import hearingBar from '../js/hearingBar.js';

var HearingBar = React.createClass({

  getRangeOfScore: function() {
    var results = this.props.settings.resultsManager.getWorstCaseResults();
    var worst = 0;
    for(var r in results) {
      if(worst < results[r]) {
        worst = results[r];
      }
    }
    var output = 100;
    if(worst <= 30) {
      output = 100;
    } else if(worst == 35) {
      output = 85;
    } else if(worst == 40) {
      output = 75;
    } else if (worst == 45) {
      output = 65;
    } else if (worst == 50) {
      output = 55;
    } else if (worst == 55) {
      output = 45;
    } else {
      output = 30;
    }
    return output;
  },

  getGraph:function() {
    return this.getRangeOfScore();
  },

  componentDidMount:function() {
    var score = this.getRangeOfScore();
    hearingBar("#hearing-chart-bar", (score * .01));
  },

  render: function() {
    var score = this.getRangeOfScore();
    var fillStyle = {
      left:score + '%'
    }
    var widthStyle = {
      width:score + '%'
    }
    var hearingBarStrong = (score >= 85) ? "hearing-bar-strong hearing-bar-strong-active" : "hearing-bar-strong";
    var hearingBarNeedsWork = (score >= 45 && score < 85) ? "hearing-bar-needs-work hearing-bar-needs-work-active" : "hearing-bar-needs-work";
    var hearingBarWeak = (score >= 0 && score < 45) ? "hearing-bar-weak hearing-bar-weak-active" : "hearing-bar-weak";
    return (
      <div className="hearing-bar">
        <div id="hearing-chart-bar"></div>
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-4">
            <div className={hearingBarWeak}>Needs a Doctor's Opinion</div>
          </div>
          <div className="col-md-4">
            <div className={hearingBarNeedsWork}>Needs Attention</div>
          </div>
          <div className="col-md-4">
            <div className={hearingBarStrong}>Good to Go</div>
          </div>
          </div>
        </div>
      </div>
    )
  }
})

export default HearingBar
