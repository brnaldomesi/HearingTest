import SoundObject from './SoundObject.js';

import { RIGHT_EAR, LEFT_EAR, HZDATA } from './Constants.js';

var TestManager = function TestManager() {

    this.hasBeenConfigured = false;
    this.initalSetupDecibels = 0;
    this.currentIndex = -1;
    this.progress = 0;
    this.testReversed = false;
    this.currentSoundObject = null;

    this.testSamplesLoad = function() {
      var samples = [];
      var ears = [RIGHT_EAR, LEFT_EAR];
      if(this.testReversed) {
        ears = [LEFT_EAR, RIGHT_EAR];
      }
      for(let e in ears) {
        let ear = ears[e];
        for(let hz in HZDATA) {
          samples.push([ear, HZDATA[hz]]);
        }
      }
      this.testSamples = samples;
      this.currentSample = this.testSamples[0];
    }

    this.updateProgress = function() {
      this.progress = ((this.currentIndex / this.testSamples.length) * 100);
    }

    this.getNextSample = function() {
      if((this.currentIndex + 1) > this.testSamples.length) {
        return null
      }
      this.currentIndex = this.currentIndex + 1
      this.currentSample = this.testSamples[this.currentIndex]
      this.updateProgress();
      return this.currentSample
    }

    this.getNextSound = function() {
      var sample = this.getNextSample();
      if(sample) {
        var soundObject = new SoundObject(sample[0], sample[1], this.initalSetupDecibels);
        this.currentSoundObject = soundObject;
        return this.currentSoundObject;
      }
      return null
    }
}

export default TestManager
