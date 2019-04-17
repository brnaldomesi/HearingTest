import React from 'react';

import ExamActions from '../actions/ExamActions.js';
import RestartTestButton from './RestartTestButton.jsx';

import d3 from 'd3';
import c3 from 'c3';

var chart;

var TestResults = React.createClass({

  generateChart: function() {
    var chartData = this.props.settings.resultsManager.generateChartData();
    this.chart = c3.generate({
      bindto: '#chart',
      padding: {
          right: 20,
      },
      data: {
          x: 'x',
          columns: chartData
        },
      axis: {
          x: {
            tick: {
              format: function (x) {
                if (x == 1) {
                  return '1000 hz';
                } else if(x == 2) {
                  return '2000 hz';
                } else if(x == 3) {
                  return '4000 hz';
                } else if(x == 4) {
                  return '8000 hz';
                } else if(x == 5) {
                    return '500 hz';
                }
                return 0;
              }
            }
          },
          y: {
            label: {
                  text: 'Decibels',
                  position: 'outer-middle'
                },
             max: 90,
             min: 0,
             inverted:true,
          }
      },
    });
  },

  componentDidMount: function() {
    this.generateChart();
  },

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.generateChart();
  },

  render: function() {
    return (
      <div className="container">
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <h1>{ this.props.settings.titleText }</h1>
            <hr></hr>
            <h4>{ this.props.settings.messageText }</h4>
          </div>
        </div>
        <div className="row centered">
          <div className="col-md-8 col-md-offset-2">
            <div className="centered">
              <div id="chart"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default TestResults;
