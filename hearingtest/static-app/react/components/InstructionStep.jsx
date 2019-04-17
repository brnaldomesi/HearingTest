import React from 'react';
import Reflux from 'reflux';

import ExamActions from '../actions/ExamActions.js';
import PanelComponent from '../components/PanelComponent.jsx';
import EmailOrderForm from '../components/EmailOrderForm.jsx';
import EnviromentSelector from '../components/EnviromentSelector.jsx';
import StepButtons from '../components/StepButtons.jsx';

var InstructionStep = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.forceUpdate();
  },

  onNextStep: function() {
    ExamActions.nextStep();
  },

  getComponents: function(instruction) {
    if(instruction == null) {
      return;
    }
    if(instruction['pretitle']) {
      return <h3>{instruction['pretitle']}</h3>
    }
    if(instruction['title']) {
      return <h2>{instruction['title']}</h2>
    }
    if(instruction['subtitle']) {
      return <div dangerouslySetInnerHTML = {{__html: instruction['subtitle']}} />
    }
    if(instruction['image']) {
      return this.getImage(instruction['image'], instruction['image-width'], instruction['image-height'])
    }
    if(instruction['extra-text']) {
      return <div dangerouslySetInnerHTML = {{__html: instruction['extra-text']}} />
    }
    if(instruction['form']) {
      return <EmailOrderForm settings={this.props.settings}/>
    }
    if(instruction['enviroment-selector']) {
      return <EnviromentSelector settings={this.props.settings}/>
    }
    if(instruction['buttons']) {
      return <StepButtons settings={this.props.settings}/>
    }
    if(instruction['panel-text']) {
      return <PanelComponent panelTitle={instruction['panel-text']}
                      buttonTitle={instruction['panel-button-text']}
                      buttonAction={instruction['panel-button-action']} />
    }
  },

  getImage: function(image, width, height) {
    if(image === 'placeholder') {
      var s = "http://placehold.it/" + width + "x" + height;
      return <img src={s} className="text-center padded" width={width} height={height}></img>;
    }
    var string = '../static/img/' + image;
    return <img src={string} className="text-center padded" width={width} height={height}></img>;

  },

  render: function() {
    var _this = this;
    var currentInstruction = this.props.settings.instructionManager.getCurrentInstruction();
    if(currentInstruction) {
      return (
        <div className="container">
          <div className="row centered">
            {
              currentInstruction.map(function(item, i) {
                return _this.getComponents(item);
              })
            }
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
});

export default InstructionStep;
