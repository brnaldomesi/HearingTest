/**
ResultsManager created to store all the users testing results
and preform functions on them needed to display the data later
**/
import { RIGHT_EAR, LEFT_EAR, HZDATA } from './Constants.js';

var ResultsManager = function ResultsManager() {
  /**
  demo results for testing
  **/
  this.results = {
    'R' : {1000 : 30, 2000 : 30, 4000 : 30, 500 : 30},
    'L' : {1000 : 30, 2000 : 30, 4000 : 30, 500 : 30}
  }

  this.addResult = function(result) {
    if(!this.results.hasOwnProperty(RIGHT_EAR)) {
      this.results[RIGHT_EAR] = {};
    }
    if(!this.results.hasOwnProperty(LEFT_EAR)) {
      this.results[LEFT_EAR] = {};
    }
    if(!this.results[result.ear].hasOwnProperty(result.hz)) {
      this.results[result.ear][result.hz] = {};
    }
    // set the result
    this.results[result.ear][result.hz] = result.db;
    console.log("added result : ", this);
  }

  this.getWorstCaseResults = function() {
    var worstCaseResults = {}
    let r = this.results[RIGHT_EAR];
    let l = this.results[LEFT_EAR];
    for(let h in HZDATA) {
      let hz = HZDATA[h];
      worstCaseResults[hz] = (r[hz] > l[hz]) ? r[hz] : l[hz]
    }
    console.log("worstCaseResults: ", worstCaseResults)
    return worstCaseResults
  }

  this.getHearingRange = function() {
    var results = this.getWorstCaseResults();
    var worst = 0;
    for(var r in results) {
      if(worst < results[r]) {
        worst = results[r];
      }
    }
    if(worst < 40) {
      return "Good to Go";
    } else if(worst >= 40 && worst < 60) {
      return "Needs Attention";
    } else {
      return "Needs a Doctor's Opinion";
    }
  }

  this.getPercentages = function() {
    var percentages = {
         'R' : {},
         'L' : {}
      };
    let r = this.results[RIGHT_EAR];
    let l = this.results[LEFT_EAR];
    for(let h in HZDATA) {
      let hz = HZDATA[h];
      let d = l[hz];
      var output = 100;
      if(d <= 30) {
        output = 100;
      } else if(d == 35) {
        output = 85;
      } else if(d == 40) {
        output = 75;
      } else if (d == 45) {
        output = 65;
      } else if (d == 50) {
        output = 55;
      } else if (d == 55) {
        output = 45;
      } else {
        output = 30;
      }
      percentages[LEFT_EAR][hz] = output
    }

    for(let h in HZDATA) {
      let hz = HZDATA[h];
      let d = r[hz];
      var output = 100;
      if(d <= 30) {
        output = 100;
      } else if(d == 35) {
        output = 85;
      } else if(d == 40) {
        output = 75;
      } else if (d == 45) {
        output = 65;
      } else if (d == 50) {
        output = 55;
      } else if (d == 55) {
        output = 45;
      } else {
        output = 30;
      }
      percentages[RIGHT_EAR][hz] = output
    }
    return percentages
  }

  this.getTonesCopy = function() {
    var results = this.getWorstCaseResults();
    var copy = {};
    var worst = results[4000];
    if(worst < 31) {
      copy['high'] = "High-pitched tones are usually associated with children&#8217;s voices and &#8220;s&#8221; or &#8220;th&#8221; sounds. Birds singing and the sound of violins also fall into this category. You seem to hear these tones without any problem.";
    } else if(worst >= 31 && worst < 55) {
      copy['high'] = "High-pitched tones are usually associated with children&#8217;s voices and &#8220;s&#8221; or &#8220;th&#8221; sounds. Birds singing and the sound of violins also fall into this category. It seems like you could hear these tones a little better.";
    } else {
      copy['high'] = "High-pitched tones are usually associated with children&#8217;s voices and &#8220;s&#8221; or &#8220;th&#8221; sounds. Birds singing and the sound of violins also fall into this category. You seem to have some trouble hearing these tones.";
    }
    var worstMid = (results[2000] + results[1000])/2;
    if(worstMid < 31) {
      copy['mid'] = "Mid-range tones are usually heard in women&#8217;s voices, and (fun fact) the sound of rustling leaves! Your hearing is good with these tones.";
    } else if(worstMid >= 31 && worstMid < 55) {
      copy['mid'] = "Mid-range tones are usually heard in women&#8217;s voices, and (fun fact) the sound of rustling leaves!  Your scores are a little on the low side for these tones.";
    } else {
      copy['mid'] = "Mid-range tones are usually heard in women&#8217;s voices, and (fun fact) the sound of rustling leaves!  Your score should be a bit higher for these tones.";
    }
    var worstLow = results[500];
    if(worstLow < 31) {
      copy['low'] = "Men&#8217;s voices, guitar, the tuba and even frogs croaking are all examples of low-pitched tones. You seem to hear these tones really well.";
    } else if(worstLow >= 31 && worstLow < 55) {
      copy['low'] = "Men&#8217;s voices, guitar, the tuba and even frogs croaking are all examples of low-pitched tones. Your score shows that you could hear these tones a little better.";
    } else {
      copy['low'] = "Men&#8217;s voices, guitar, the tuba and even frogs croaking are all examples of low-pitched tones. Looks like you may have trouble hearing these sounds sometimes.";
    }
    return copy;
  }
}

export default ResultsManager
