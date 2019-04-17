import React from 'react';
import Reflux from 'reflux';

import ExamActions from '../actions/ExamActions.js';

var EmailOrderForm = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.forceUpdate();
  },

  onNextStep: function() {
    var email = this.refs.Email.value;
    var order = this.refs.Order.value;
    if(email.length == 0 || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if(order.length < 5 || !this.isNumeric(order)) {
      alert("Please enter a valid order number, it should only contain numbers");
      return;
    }
    ExamActions.emailAndOrder(email, order);
    ExamActions.nextStep();
  },

  onChange: function() {
    var email = this.refs.Email.value;
    var order = this.refs.Order.value;
    ExamActions.emailAndOrder(email, order);
  },

  isNumeric: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  render: function() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <img src='../static/img/order.png' height="150px" width="235px" className="text-center padded"></img>
        <form className="form-horizontal">
          <div className="form-group form-group-lg">
           <label className="col-md-3 control-label">Email</label>
           <div className="col-md-9">
             <input type="email" ref="Email" className="form-control" placeholder="Email" onChange={this.onChange} value={this.props.settings.userData.email}></input>
            </div>
          </div>
          <div className="form-group form-group-lg">
           <label className="col-md-3 control-label">Order #</label>
           <div className="col-md-9">
             <input type="text" ref="Order" className="form-control" placeholder="Order Number" onChange={this.onChange} value={this.props.settings.userData.orderNumber}></input>
          </div>
          </div>
        </form>
        <button className="btn btn-success btn-lg" onClick={this.onNextStep}>Continue</button>
      </div>
    );
  }
});

export default EmailOrderForm;
