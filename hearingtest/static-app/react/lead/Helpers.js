/**
internet explorer check
**/
export const isIE = function() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var trident = ua.indexOf("Trident") >= 0 ? "11" : null
  var edge = ua.indexOf("Edge") >= 0 ? "12" : null
  console.log(ua, msie)
  return (msie >= 0 || trident || edge);
}

/**
checks users email if its valid
**/
export const validateEmail = function(email) {
  var regexp = new RegExp(/\S+@\S+\.\S+/);
  return regexp.test(email);
}

/**
internet explorer check
**/
export const isSupported = function() {
  if((isIE() && isIE9OrBelow()) || isMobile.any()) {
    return false;
  }
  return true;
}

var isIE9OrBelow = function() {
   return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

export const isMobile = {
    iOS: function() {
        return window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Android: function() {
        return window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return window.navigator.userAgent.match(/BlackBerry/i);
    },
    Opera: function() {
        return window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return window.navigator.userAgent.match(/IEMobile/i) || window.navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
