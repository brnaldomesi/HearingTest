import TestResult from './TestResult.js';

var MAX_DECIBELS = 90;
var MIN_DECIBELS = 0;

var SOUND_FAIL = 5;
var SOUND_SUCCESS = -10;

var REPEATS_NEEDED = 3;

var SoundObject = function SoundObject(ear, hz, db) {
   this.ear = ear;
   this.hz = hz;
   this.db = db;

   this.successHistory = {};

   this.testResult = function() {
     return new TestResult(this.ear, this.hz, this.db);
   }

   this.getPlayCount = function() {
     if(this.successHistory[this.db]) {
       return this.successHistory[this.db];
     }
     return 0;
   }

   this.success = function() {
    if(this.successHistory[this.db]) {
      this.successHistory[this.db] = this.successHistory[this.db] + 1;
    } else {
      this.successHistory[this.db] = 1;
    }
    if(this.getPlayCount() === REPEATS_NEEDED) {
      return true;
    }
    this.db += SOUND_SUCCESS;
    if(this.db <= MIN_DECIBELS) {
      this.db = MIN_DECIBELS;
    }
    return false;
   };

   this.fail = function() {
    if(this.successHistory[this.db]) {
      this.successHistory[this.db] = 0;
    } else  {
      this.successHistory[this.db] = 0;
    }
    this.db += SOUND_FAIL;
    if(this.db >= MAX_DECIBELS) {
      this.db = MAX_DECIBELS;
    }
   };
   // return filepath of object
   this.filePath = function() {
     return '../static/assets/audio/output/' + this.ear  + this.hz + "_" + this.db + "dB.wav";
   };
};

export default SoundObject;
