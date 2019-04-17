import React from 'react';
/**
hearing results chart on the results page
**/
import soloHearingResultsChart from '../js/soloHearingResultsChart.js';

var HearingResultsChart = React.createClass({

  componentDidMount:function() {
    soloHearingResultsChart("#solo-hearing-results-chart", this.props.chartData);
  },
  render: function() {
    return <div id="solo-hearing-results-chart"></div>
  }
})

export default HearingResultsChart
