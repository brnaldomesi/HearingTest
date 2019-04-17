// Manages a Dictonary of Arrays of Results
var ResultsManager = function ResultsManager() {
  this.results = {};
  // Adds a Test Result
  this.addResult = function(testIndex, result) {
    if(this.results[testIndex] === undefined) {
      this.results[testIndex] = {};
    }
    console.log("testIndex", testIndex);
    console.log("result",  result);
    var key = result.ear + result.hz;
    this.results[testIndex][key] = result;
    console.log("added result : ", this);
  };

  this.updateResult = function(testIndex, result) {

    var firstItem;
    var secondItem;

    var firstDev = null;
    var secondDev = null;

    var key = result.ear + result.hz;
    if(this.results[0] != undefined) {
      firstItem = this.results[0][key];
      firstDev = Math.abs(firstItem.db - result.db);
    }

    if(this.results[1] != undefined) {
      secondItem = this.results[1][key];
      secondDev = Math.abs(secondItem.db - result.db);
    }

    console.log("firstItem", firstItem);
    console.log("secondItem", secondItem);
    console.log("firstDev", firstDev);
    console.log("secondDev", secondDev);

    if(firstDev != null && secondDev == null) {
      console.log("replaced first");
      this.results[0][key] = result;
    }
    if(secondDev != null && firstDev == null) {
      console.log("replaced second");
      this.results[1][key] = result;
    }
    if(secondDev != null && firstDev != null) {
      if(firstDev > secondDev) {
        console.log("replaced first");
        this.results[0][key] = result;
      } else {
        console.log("replaced second");
        this.results[1][key] = result;
      }
    }
  };

  this.generateReport = function() {

    var report = '';
    var firstTest = this.results[0];
    var secondTest = this.results[1];

    var i = 0;
    for(var testIndex in this.results) {
      var test = this.results[testIndex];
      report += "\nTest Number: " + i + "\n";
      var j = 0;
      for(var resultIndex in test) {
        var result = test[resultIndex];
        if(j == 0) {
          report += "  Right Results: ";
        }
        if(j == 5) {
          report += "\n  Left Results: ";
        }
        report += result.hz + "MHz: " + result.db + "dB, ";
        j++;
      }
      i++;
    }

    report += "\n";

    var k = 0;
    for(var key in firstTest) {
      var firstResult = firstTest[key];
      var secondResult = secondTest[key];
      var average = ((firstResult.db + secondResult.db)/2);
      report += "\nAverage " + firstResult.ear + " " + firstResult.hz + "MHz: " + average;
      if(k == 5) {
        "\n";
      }
      k++;
    }

    console.log(report);
    return report;
  };

  this.generateChartData = function() {
    var left = ['left'];
    var right = ['right'];
    var x = ['x', 1, 2, 3, 4, 5];

    var firstTest = this.results[0];
    var secondTest = this.results[1];

    var k = 0;
    for(var key in firstTest) {
        var firstResult = firstTest[key];
        var secondResult = secondTest[key];
        var average = ((firstResult.db + secondResult.db)/2);
        if(k < 5) {
          right.push(average);
        } else {
          left.push(average);
        }
       k++;
     }

    var chartData = [left, right, x];
    console.log(chartData);
    return chartData;
  };
};

export default ResultsManager;
