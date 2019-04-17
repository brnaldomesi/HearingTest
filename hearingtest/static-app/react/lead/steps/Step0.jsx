import React from 'react';
import Reflux from 'reflux';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';

import { isMobile } from '../Helpers.js';

/**
step 0 browser fail page
**/
var Step = React.createClass({

  componentDidMount: function() {
    $("#enter-email").hide();
    $("#enter-email-success").hide();
    if (!isMobile.iOS() && isMobile.any()) {
      $("#enter-email").show();
    }
  },

  getText: function() {
    if(isMobile.iOS()) {
      return ["Download Our iPhone App", "This test is our desktop version, please try the test on a desktop computer or download our app from the app store.", "", "Download Now"]
    } else if (!isMobile.iOS() && isMobile.any()) {
      $("#enter-email").show();
      return ["Coming Soon", "This test is our desktop version, please try the test on a desktop computer.", "You can also enter your email below to be informed of Audicus promotions and when the test will be avaiable on your phone", "Submit"]
    } else {
      return ["Unsupported Browser", "Please download a more modern browser and try again", "", "Download Now"]
    }
  },

  buttonClick: function() {
    if(isMobile.iOS()) {
      window.location.replace("https://appsto.re/us/y9gf7.i");
    } else if (!isMobile.iOS() && isMobile.any()) {
      Actions.sendUsersEmail();
      $("#enter-email").fadeOut(400);
      $("#enter-email-success").fadeIn(400);
      $("#button-row").fadeOut(400);
    } else {
      window.location.replace("https://www.google.com/chrome");
    }
  },

  onChange:function(event) {
    var key = {};
    key[event.target.name] = event.target.value;
    if(event.target.value == "") {
      key[event.target.name] = null;
    }
    Actions.updateUserData(key);
  },

  render: function() {
    var copy = this.getText();
    return (
      <div className="container">
        <div className="row centered">
          <div className="col-md-10 col-md-offset-1 col-xs-12">
            <h1>{copy[0]}</h1>
          </div>
        </div>
        <div className="row centered">
          <div className="col-xs-12">
            <p className="subtitle">{copy[1]}</p>
            <p className="subtitle-small">{copy[2]}</p>
            <input type="email" id="enter-email" className="form-control" name="email" value={this.props.settings.userData.email} placeholder="email address" onChange={this.onChange}></input>
            <p className="subtitle" id="enter-email-success">Thanks for subscribing</p>
          </div>
        </div>
        <div className="row centered" id="button-row">
          <div className="col-md-8 col-md-offset-2 col-xs-12">
            <Button title={copy[3]} foward={false} onClick={this.buttonClick}/>
          </div>
        </div>
      </div>
    )
  }
})

export default Step
