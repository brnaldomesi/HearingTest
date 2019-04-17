import React from 'react';

import Step0 from './steps/Step0.jsx';
import Step1 from './steps/Step1.jsx';
import Step2 from './steps/Step2.jsx';
import Step3 from './steps/Step3.jsx';
import Step4 from './steps/Step4.jsx';
import Step5 from './steps/Step5.jsx';
import Step6 from './steps/Step6.jsx';
import Step7 from './steps/Step7.jsx';
import Step8 from './steps/Step8.jsx';
import Step9 from './steps/Step9.jsx';
import Step10 from './steps/Step10.jsx';
/**
component dictionary for each step by key of step
**/
const componentsListByStep = {
  0 : Step0,
  1 : Step1,
  2 : Step2,
  3 : Step3,
  4 : Step4,
  5 : Step5,
  6 : Step6,
  7 : Step7,
  8 : Step8,
  9 : Step9,
  10: Step10
}
/**
panel that generates component based on current key
**/
var TestPanel = React.createClass({
  render: function() {
    var Component = componentsListByStep[this.props.settings.step];
    return <Component settings={this.props.settings} />
  }
})

export default TestPanel
