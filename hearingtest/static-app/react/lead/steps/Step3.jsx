import React from 'react';
import Reflux from 'reflux';

import $ from 'jquery'

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import BackButton from '../components/BackButton.jsx';

import { validateEmail } from '../Helpers.js';
/**
step 3 of the test
**/
var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  nextStepClicked: function() {
    if(!this.checkNextButtonEnabled()) return;
    Actions.trackEvent("Entered Email");
    Actions.nextStepButtonPressed();
  },

  onChange:function(event) {
    var key = {};
    key[event.target.name] = event.target.value;
    if(event.target.value == "nogender") {
      return;
    }
    if(event.target.value == "") {
      key[event.target.name] = null;
    }
    Actions.updateUserData(key);
  },

  onAgeChange:function(event) {
    var age = event.target.value;
    if(age < 13) {
      $('#age-error').fadeIn(300);
      age = null;
      // return;
    } else {
      $('#age-error').hide();
    }
    var key = {};
    console.log("age : ", age);
    key[event.target.name] = age;
    Actions.updateUserData(key);
  },

  componentWillReceiveProps: function(props) {
    this.props = props;
    this.checkNextButtonEnabled();
    this.checkFormVisibility();
  },

  checkFormVisibility: function() {
    if(this.props.settings.userData.gender) {
      $('#age-form').fadeIn(300);
    } else {
      $('#age-form').hide();
    }
    if(this.props.settings.userData.age) {
      $('#email-form').fadeIn(300);
    } else {
      $('#email-form').hide();
    }
  },

  doLater:function() {
    var key = {};
    key["email"] = null;
    Actions.updateUserData(key);
    Actions.trackEvent("Skipped Email");
    Actions.nextStepButtonPressed();
  },

  checkNextButtonEnabled: function() {
    var h = this.props.settings.userData;
    // if(!validateEmail(h.email)) {
    //   $('#email-error').fadeIn(300);
    // } else {
    //   $('#email-error').hide();
    // }
    return (h.gender && h.age && validateEmail(h.email))
  },

  componentDidMount: function() {
    this.checkFormVisibility();
    $('#age-error').hide();
    $('#email-error').hide();
  },

  isNumberKey: function(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    var iskey = !(charCode > 31 && (charCode < 48 || charCode > 57));
    console.log(iskey);
    return iskey;
  },

  render: function() {
    var currentGender = this.props.settings.userData.gender;
    if(currentGender == null) {
      currentGender = "nogender";
    }
    var buttonDisabled = (this.checkNextButtonEnabled() == null || this.checkNextButtonEnabled() == false) ? "btn btn-success btn-small disabled" : "btn btn-success btn-small";
    return (
      <div>
      <div className="modal fade" id="matterModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog model-lg" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div className="row centered info">
              <h2>Audicus Experts say...</h2>
              <p>Hearing levels vary by gender and age.<br></br>Knowing this info helps us put your results in context.</p>
              <button className='btn btn-success btn-lg' data-dismiss="modal">Got it!</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="content-wrapper">
          <div className="row centered">
            <div className="col-md-10 col-md-offset-1 col-xs-12">
              <h1>Next, tell us <br></br>about yourself.</h1>
            </div>
          </div>
          <div className="row centered">
            <div className="col-md-8 col-md-offset-2 col-xs-12">
                <div className="form-inline">
                  <div className="form-group">
                    <label>I am </label>
                    <select className="form-control gender-select" value={currentGender} name="gender" onChange={this.onChange}>
                      <option value="nogender" disabled>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-inline" id="age-form">
                  <div className="form-group">
                    <label className="control-label">And I'm </label>
                    <input type="number" className="form-control age" name="age" value={this.props.settings.userData.age} placeholder="age" min="13" onChange={this.onAgeChange}></input>
                    <label>Years Young</label>
                    <label id="age-error" className="error">This test works best for people over the age of 13.</label>
                  </div>
                </div>
                <div className="email-form" id="email-form">
                  <label>Please send a copy of my results to this email:</label>
                  <div className="form-inline">
                    <div className="form-group">
                      <input type="email" className="form-control email" name="email" value={this.props.settings.userData.email} placeholder="email address" onChange={this.onChange}></input>
                      <button className={buttonDisabled} onClick={this.nextStepClicked}>Submit</button>
                      <label id="email-error" className="error">Please enter a valid email.</label>
                      <br></br>
                      <a className="later" onClick={this.doLater}>I'll do this later</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 col-xs-12">
            <BackButton />
            <div className="centered">
              <a data-toggle="modal" data-target="#matterModal" className="clickable">Why does this matter?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
})

export default Step
