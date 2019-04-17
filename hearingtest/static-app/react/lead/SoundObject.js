/**
SoundObject object holds the ear, hz, and db of a sound that was played
it also has a boolean for if the test is reversed.  If that is the case
the user has their headphones on the wrong ears and the tests adjusts
**/
import TestResult from './TestResult.js';

import { MAX_DECIBELS, MIN_DECIBELS, CONFIGURE_FAIL, SOUND_FAIL, SOUND_SUCCESS, REPEATS_NEEDED, RIGHT_EAR, LEFT_EAR } from './Constants.js';

var SoundObject = function SoundObject(ear, hz, db) {

   this.ear = ear;
   this.hz = hz;
   this.db = db;

   this.testReversed = false;

   this.successHistory = {}

   this.testResult = function() {
     var ear = this.ear;
     if(this.testReversed) {
       if(ear == RIGHT_EAR) {
         ear = LEFT_EAR;
       } else {
         ear = RIGHT_EAR;
       }
     }
     return new TestResult(ear, this.hz, this.db)
   }

   this.getPlayCount = function() {
     if(this.successHistory[this.db]) {
       return this.successHistory[this.db]
     }
     return 0
   }

   this.success = function() {
    if(this.successHistory[this.db]) {
      this.successHistory[this.db] = this.successHistory[this.db] + 1;
    } else {
      this.successHistory[this.db] = 1;
    }
    if(this.getPlayCount() === REPEATS_NEEDED) {
      console.log("success");
      return true;
    }
    this.db += SOUND_SUCCESS;
    if(this.db <= MIN_DECIBELS) {
      this.db = MIN_DECIBELS;
    }
    return false;
   }

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
   }

   this.configureFailure = function() {
     this.db += CONFIGURE_FAIL;
     if(this.db >= MAX_DECIBELS) {
       this.db = MAX_DECIBELS;
     }
   }

   // return filepath of object
   this.filePath = function() {
     return './static/assets/audio/lead/' + this.ear  + this.hz + "_" + this.db + "dB.mp3";
   }
}

export default SoundObject
