/**
AnalyticsManager created to be used by segment, or any analytics platfrom you want,
the analytics variable is created in the index.html head javacript
**/

/**
set this to true when using on localhost to avoid sending false data
**/
var DEBUG = false;

var AnalyticsManager = function AnalyticsManager() {
  /**
  sets up a user with a random mixpanel id, before they get identified by email
  **/
  this.setupUser = function() {
    if(DEBUG) return;
    analytics.ready(function() {
      if(analytics.user().id() == null) {
        var anonId = mixpanel.get_distinct_id();
        analytics.identify(anonId);
      }
    });
  }
  /**
  updates a user to include the users gender, email and age
  **/
  this.updateUser = function(userData) {
    if(DEBUG) return;
    analytics.identify(analytics.user().id(), {
      gender: userData.gender,
      email: userData.email,
      age: userData.age
    });
  }
  /**
  gets the page step titles, so each step has a unique name
  **/
  this.getCurrentPageStepTitle = function(step) {
    if(DEBUG) return;
    var page = null;
    switch(step) {
      case 1:
        page = "Welcome";
        break;
      case 2:
        page = "Hearing Identify";
        break;
      case 3:
        page = "About Yourself";
        break;
      case 4:
        page = "Quiet Enviroment";
        break;
      case 5:
        page = "Headphones";
        break;
      case 6:
        page = "Volume";
        break;
      case 7:
        page = "Ear Check";
        break;
      case 8:
        page = "Fun Part";
        break;
      case 9:
        page = "Test";
        break;
      case 10:
        page = "Results";
        break;
      default:
        page = null;
        break;
    }
    if(page != null) {
      return "Step " + step + ": " + page + " Page";
    }
    return page;
  }
  /**
  tracks a page, which in the case of this test are the steps
  **/
  this.trackPageStep = function(step) {
    if(DEBUG) return;
    var currentPage = this.getCurrentPageStepTitle(step);
    if(currentPage != null) {
      analytics.page(currentPage, {
        title: currentPage,
        category: 'Lead Test',
      });
    }
  }
  /**
  tracks an event, which adds the category Lead Test to them
  **/
  this.trackEvent = function(eventName, step) {
    if(DEBUG) return;
    var currentPage = this.getCurrentPageStepTitle(step);
    analytics.track(eventName, {
      page: currentPage,
      category: 'Lead Test',
    })
  }
}

export default AnalyticsManager
