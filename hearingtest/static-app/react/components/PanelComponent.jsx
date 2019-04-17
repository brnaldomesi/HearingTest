import React from 'react';
import Reflux from 'reflux';

import ExamActions from '../actions/ExamActions.js';

var PanelComponent = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.forceUpdate();
  },

  nextStep : function() {
    ExamActions.nextStep();
  },

  getStarted : function() {
    window.open("http://shop.audicus.com/products/solo-tuning-kit");
  },

  render: function() {
    var action = this.nextStep;
    if(this.props.buttonAction === 'start') {
      action = this.getStarted;
    }
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <div dangerouslySetInnerHTML={{__html: this.props.panelTitle }}></div>
            <button className='btn btn-lg btn-success' onClick={ action }>{ this.props.buttonTitle }</button>
          </div>
        </div>
      </div>
    );
  }
});

export default PanelComponent;
