import React from 'react';
/**
top bar of the test that displays the status of the test pages
props: step
**/
var TestStatusBar = React.createClass({

  render: function() {
    var step = this.props.settings.step;
    var top = (step == 0) ? "hidden" : "hidden-xs";
    return (
      <div className="container status">
        <div className="row">
          <div className="col-xs-12 text-center">
            <a href="https://www.audicus.com"><img src="./static/img/logo-light.png" className="logo"></img></a>
          </div>
        </div>
        <div className={top}>
          <div className="status-steps">
            <div className={ "status-step status-step--first" + ( (step < 4 ) ? " status-step--active" : "" ) }>
              <span>Greetings</span>
            </div>
            <div className={ "status-step status-step--second" + ( (step > 3 && step < 9 ) ? " status-step--active" : "" ) }>
              <span>Warm-Up</span>
            </div>
            <div className={ "status-step status-step--third" + ( (step == 9 ) ? " status-step--active" : "" ) }>
              <span>Listen Up</span>
            </div>
            <div className={ "status-step status-step--fourth" + ( (step == 10 ) ? " status-step--active" : "" ) }>
              <span>Results</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default TestStatusBar
