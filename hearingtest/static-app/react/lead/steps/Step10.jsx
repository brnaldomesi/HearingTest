import React from 'react';
import Reflux from 'reflux';
import Scroll from 'react-scroll';

import Actions from '../Actions.js';
import Button from '../components/Button.jsx';
import HearingResultsChart from '../components/HearingResultsChart.jsx';

var DirectLink = Scroll.DirectLink;

import $ from 'jquery';

import { RIGHT_EAR, LEFT_EAR } from '../Constants.js';

import HearingBar from '../components/HearingBar.jsx';

import { validateEmail } from '../Helpers.js';

// Results
var Step = React.createClass({

  mixins: [Reflux.ListenerMixin],

  onChange:function(event) {
    var key = {};
    key[event.target.name] = event.target.value;
    if(event.target.value == "") {
      key[event.target.name] = null;
    }
    Actions.updateUserData(key);
  },

  checkEmailEnabled: function() {
    var h = this.props.settings.userData;
    return validateEmail(h.email)
  },

  getOverallScore:function() {
    var results = this.props.settings.resultsManager.getWorstCaseResults();
    var worst = 0;
    for(var r in results) {
      if(worst < results[r]) {
        worst = results[r];
      }
    }
    if(worst < 40) {
      return ["Good to Go", "Congrats! Your hearing seems to be pretty good.", "So your hearing is good...now what? It doesn’t hurt to have a medical hearing test, given by an Audiologist. It will give you a good baseline so you can monitor how your hearing changes over time.", "To Help You Hear In Specific Situations"];
    } else if(worst >= 40 && worst < 60) {
      return ["Needs Attention", "Don’t panic! While your hearing isn’t what it used to be, it’s pretty good for a " + this.props.settings.userData.gender + " your age. Plus, we have some simple ways to improve it.", "Don’t worry if you wish your ears were better! Improving your hearing might be easier than you think. See our recommendations below.", "For Immediate Improvement"];
    } else {
      return ["Needs a Doctor's Opinion", "Don’t panic! You seem to have some hearing loss. The good news? We can help.", "Don’t let your hearing get you down! A little hearing loss is totally normal. Now’s the time to take action and get your ears where they need to be. See our recommendations below.", "For Immediate Improvement"];
    }
  },

  sendEmail:function() {
    this.getEmailCheck(true);
    Actions.trackEvent("Entered Email");
    Actions.sendEmail();
  },

  componentDidMount:function() {
    /**
    removes reload warning alert
    **/
    window.onbeforeunload = null;
    /**
    stops spacebar from scrolling
    **/
    window.onkeydown = function(e) {
      if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    };
    this.getEmailCheck(false);
  },

  getEmailCheck:function(animated) {
    if(this.props.settings.userData.email == null) {
      $('#email-profile').show();
      $('#email-profile-filled').hide();
      $('#audiologist-email').show();
    } else {
      if(animated) {
        $('#email-profile').hide();
        $('#audiologist-email').hide();
        $('#email-profile-filled').fadeIn(1000);
      } else {
        $('#email-profile').hide();
        $('#audiologist-email').hide();
        $('#email-profile-filled').show();
      }
    }
  },

  sharePage: function (event) {
    event.preventDefault();
    window.open(
      event.currentTarget.getAttribute('href'),
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes'
    );
  },

  getValidZip:function() {
    if(this.props.settings.userData.zipcode) {
      return this.props.settings.userData.zipcode.length >= 5;
    }
    return false;
  },

  render: function() {
    var audiologistButtonEnabled = (this.checkEmailEnabled() && this.getValidZip()) ? "btn btn-success btn-lg" : "btn btn-success btn-lg disabled";
    var score = this.getOverallScore();
    var emailEnabled = (this.checkEmailEnabled() == null || this.checkEmailEnabled() == false) ? "btn btn-success btn-lg disabled btn-submit" : "btn btn-success btn-lg btn-submit";
    var hearingEnviroments = this.props.settings.userData.hearingEnviroments;
    return (
      <div>
        <div className="results large-panel">
          <div className="container">
            <div className="row centered">
              <div className="col-md-10 col-md-offset-1">
                <p className="subtitle">Your Overall Hearing</p>
                <h1 className="score">{score[0]}</h1>
              </div>
              <div className="col-md-8 col-md-offset-2">
                <HearingBar settings={this.props.settings} />
                <DirectLink className="btn btn-success btn-lg" to="next-steps" spy={true} smooth={true} duration={500}>
                  Let's take a closer look
                </DirectLink>
              </div>
            </div>
          </div>
        </div>
        <div className="large-panel next-steps" id="next-steps">
          <div className="container">
            <div className="row centered">
              <div className="col-md-12">
                <h1 className="result">How Your Ears Hear</h1>
                <p>Check out the graph below to see how each ear hears low-pitched tones, mid-range tones and high-pitched tones.</p>
                <br></br>
                <div className="col-md-12">
                  <HearingResultsChart chartData={this.props.settings.results} settings={this.props.settings} />
                </div>
                <div className="col-md-12 text-center">
                  <div className="col-md-4 col-md-offset-4">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//hearing-test.audicus.com" onClick={this.sharePage}>
                      <img src="./static/img/facebook.png" className="share-button" width="40px" height="40px"/>
                    </a>
                    <a href="mailto:?&subject=Check%20your%20hearing%20with%20Audicus%20Hearing%20Check&body=How%E2%80%99s%20your%20hearing?%20Do%20the%20Audicus%20Hearing%20Check%20to%20find%20out.%20It%E2%80%99s%20accurate,%20fast,%20and%20free.%0A%0Ahttps%3A//hearing-test.audicus.com">
                      <img src="./static/img/email.png" className="share-button" width="40px" height="40px"/>
                    </a>
                    <a href="https://twitter.com/home?status=I%20just%20checked%20my%20hearing!%20Check%20yours%20too%20with%20the%20Audicus%20Hearing%20Check.%20It%27s%20accurate,%20fast,%20and%20free%3A%20https%3A//hearing-test.audicus.com" onClick={this.sharePage}>
                      <img src="./static/img/twitter.png" className="share-button" width="40px" height="40px"/>
                    </a>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <DirectLink className="what-now" id="what-now-link" to="what-now" spy={true} smooth={true} duration={500}>
                    What now?
                  </DirectLink>
               </div>
              </div>
            </div>
          </div>
        </div>
        <div className="get-results" id="email-profile">
          <div className="container">
            <div className="row centered">
              <div className="col-md-10 col-md-offset-1">
                <h1>Get your full hearing profile</h1>
                <p className="subtitle">Please enter your email address and we'll send <br></br>you your detailed profile at no charge.</p>
              </div>
              <div className="col-md-10 col-md-offset-1">
                <div className="form-inline">
                  <div className="form-group">
                    <input type="email" placeholder="enter email address..." value={this.props.settings.userData.email} className="form-control email-profile" name="email" onChange={this.onChange}></input>
                    <div className="form-right">
                      <button className={emailEnabled} onClick={ this.sendEmail }>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="get-results" id="email-profile-filled">
          <div className="container">
            <div className="row centered">
              <div className="col-md-10 col-md-offset-1">
                <h1>Check your email for your full hearing profile!</h1>
                <p className="subtitle">We’ve sent an in-depth report to the email you provided earlier, at no charge.</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="white-line"></hr>
        <div className="next-steps-top" id="next-top">
          <div className="container">
            <div className="row centered">
              <div className="col-md-8 col-md-offset-2">
                <h1>Your Next Steps</h1>
                <p className="subtitle">{score[2]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="next-steps" id="what-now">
          <div className="container">
            <div className="col-md-6 text-center">
              <div className="col-xs-12">
                <span className="badge">Option 1</span>
                <p>{score[3]}</p>
                <hr className="dark"></hr>
                <h1 className="result">The Audicus Solo</h1>
                <p>The Audicus Solo, a “hearing amplifier,” is the quickest way to improve your hearing. You’ll notice a change right away — no doctor’s visits necessary.
                <span className={hearingEnviroments.curious ? "hidden" : "" }> The Solo can be tuned to help you hear while you’re...</span></p>
                <p className={hearingEnviroments.tv ? "list-inverse" : "hidden"}>Watching TV</p>
                <p className={hearingEnviroments.conversation ? "list-inverse" : "hidden"}>Having a conversation indoors</p>
                <p className={hearingEnviroments.enviroments ? "list-inverse" : "hidden"}>In noisy environments</p>
                <p className={hearingEnviroments.music ? "list-inverse" : "hidden"}>Listening to music</p>
                <p className={hearingEnviroments.audience ? "list-inverse" : "hidden"}>In a theater watching a movie, play, etc.</p>
                <p className={hearingEnviroments.phone ? "list-inverse" : "hidden"}>On the phone</p>
                <button className="btn btn-success btn-lg centered" onClick={function(e) {
                    Actions.trackEvent("See Pricing Solo");
                    window.open("https://www.audicus.com/products/hearing-amplifier-solo");
                  }}>See Pricing<img src="./static/img/foward-arrow.png" className="button-arrow"></img>
                </button>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="col-xs-12">
                <span className="badge">Option 2</span>
                <p>For an Official Hearing Test</p>
                <hr className="dark"></hr>
                <h1 className="result">Schedule an Audiogram</h1>
                <p>An audiogram is a hearing test administered by an audiologist. It’s the most accurate way to understand your hearing.</p>
                <input type="text" placeholder="zip code" className="form-control form-inverse padded-right" id="zipcode" value={this.props.settings.userData.zipcode} name="zipcode" onChange={this.onChange}></input>
                <br></br>
                <input type="email" placeholder="email" className="form-control form-inverse padded-right" id="audiologist-email" value={this.props.settings.userData.email} name="email" onChange={this.onChange}></input>
                <button className={audiologistButtonEnabled} onClick={function(e) {
                    Actions.trackEvent("Entered Email");
                    Actions.sendUsersEmail();
                    Actions.trackEvent("Audiologist Search");
                    window.open("https://www.zocdoc.com/search/?dr_specialty=130&insurance_carrier=-1&refine_search=Find+a+Doctor&address=" + $("#zipcode").val());
                  }}>Find an Audiologist <img src="./static/img/foward-arrow.png" className="button-arrow"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Step
