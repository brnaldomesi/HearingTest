import React from 'react';

import hearingResultsChart from '../js/hearingResultsChart.js';

var HearingResultsChart = React.createClass({

  componentDidMount:function() {
    var _this = this;
    this.chart = new hearingResultsChart("#hearing-results-chart", this.props.chartData, function(d) {
      _this.forceUpdate();
    });
  },

  getBottomPanel:function() {
    var results = this.props.settings.resultsManager.getWorstCaseResults();
    var worstout = 0;
    for(var r in results) {
      if(worstout < results[r]) {
        worstout = results[r];
      }
    }
    if(this.chart) {
      var currentSelected = this.chart.currentSelected;
      if(currentSelected == 0) {
        var worst = results[4000];
        if(worst < 31) {
          return "High-pitched tones are usually associated with children’s voices and “s” or “th” sounds. Birds singing and the sound of violins also fall into this category. You seem to hear these tones without any problem.";
        } else if(worst >= 31 && worst < 55) {
          return "High-pitched tones are usually associated with children’s voices and “s” or “th” sounds. Birds singing and the sound of violins also fall into this category. It seems like you could hear these tones a little better.";
        } else {
          return "High-pitched tones are usually associated with children’s voices and “s” or “th” sounds. Birds singing and the sound of violins also fall into this category. You seem to have some trouble hearing these tones.";
        }
      } else if(currentSelected == 1) {
        var worst = (results[2000] + results[1000])/2;
        if(worst < 31) {
            return "Mid-range tones are usually heard in women’s voices, and (fun fact) the sound of rustling leaves! Your hearing is good with these tones.";
        } else if(worst >= 31 && worst < 55) {
            return "Mid-range tones are usually heard in women’s voices, and (fun fact) the sound of rustling leaves!  Your scores are a little on the low side for these tones.";
        } else {
            return "Mid-range tones are usually heard in women’s voices, and (fun fact) the sound of rustling leaves!  Your score should be a bit higher for these tones.";
        }
      } else if(currentSelected == 2) {
        var worst = results[500];
        if(worst < 31) {
            return "Men’s voices, guitar, the tuba and even frogs croaking are all examples of low-pitched tones. You seem to hear these tones really well.";
        } else if(worst >= 31 && worst < 55) {
            return "Men’s voices, guitar, the tuba and even frogs croaking are all examples of low-pitched tones. Your score shows that you could hear these tones a little better.";
        } else {
            return "Men’s voices, guitar, the tuba and even frogs croaking are all examples of low-pitched tones. Looks like you may have trouble hearing these sounds sometimes.";
        }
      }
    }

    if(worstout < 31) {
        return "Congrats! Your hearing seems balanced and in good shape. Scroll down for more details and next steps.";
    } else if(worstout >= 31 && worstout < 55) {
        return "Looks like your hearing probably isn’t what it used to be. It’s okay, we can help! Scroll down for more details and next steps.";
    } else {
      return "Looks like it’s time to get a doctor’s opinion. But don’t panic! We can help. Scroll down for more details and next steps. ";
    }
  },

  getBottomPanelTitle:function() {
    if(this.chart) {
      var currentSelected = this.chart.currentSelected;
      if(currentSelected == 0) {
        return "High-Pitched Tones";
      } else if(currentSelected == 1) {
        return "Mid-Range Tones";
      } else if(currentSelected == 2) {
        return "Low-Pitched Tones";
      }
    }
    return "Overview";
  },

  getButtonTitle:function() {
    if(this.chart) {
      var currentSelected = this.chart.currentSelected;
      if(currentSelected == 0) {
        return "Next: Mid-Range Tones";
      } else if(currentSelected == 1) {
        return "Next: Low-Pitched Tones";
      } else if(currentSelected == 2) {
        return "Next: Overview";
      }
    }
    return "Next: High-Pitched Tones";
  },

  nextChartData:function() {
    if(this.chart) {
      this.chart.nextChartData();
      this.forceUpdate();
    }
  },

  render: function() {
    return (<div>
              <div className="col-md-10 col-md-offset-1">
                <div className="pull-left ear-box">Left Ear</div>
                <div className="pull-right ear-box">Right Ear</div>
              </div>
              <div className="col-md-12">
              <br></br>
                <div id="hearing-results-chart"></div>
              </div>
              <div className="col-md-12 text-center">
                  <p className="hearing-strength-title">{this.getBottomPanelTitle()}</p>
                  <p>{this.getBottomPanel()}</p>
                  <button className="btn btn-success btn-lg" onClick={this.nextChartData}>{this.getButtonTitle()} <img src="./static/img/foward-arrow.png" className="button-arrow"></img></button>
                  <br></br>
              </div>
            </div>);
  }
})

export default HearingResultsChart
