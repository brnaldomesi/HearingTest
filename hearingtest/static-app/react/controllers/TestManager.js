var TestManager = function TestManager() {
    this.hasBeenConfigured = false;

    this.progress = 0;
    this.currentIndex = 0;
    this.initalSetupDecibels = 0;

    this.testingSamples = [['R', 1000],['R', 2000],['R', 4000],['R', 8000],['R', 500],['L', 1000],['L', 2000],['L', 4000],['L', 8000],['L', 500]];
    this.currentSample = ['R', 1000];

    this.getNextSample = function() {
      var sampleFound = false;
      var progress = 0;
      for(let s in this.testingSamples) {
        let sample = this.testingSamples[s];
        if(sampleFound) {
          this.progress = progress;
          this.currentSample = sample;
          return sample;
        }
        if(sample[0] === this.currentSample[0] && sample[1] == this.currentSample[1]) {
          sampleFound = true;
        }
        progress+=10;
      }
      this.progress = 100;
      return null;
    };

    this.getNextSound = function() {
      let sample = this.getNextSample();
      var soundObject = new SoundObject(sample[0], sample[1], this.initalSetupDecibels);
      this.currentSoundObject = soundObject;
      return this.currentSoundObject;
    };

    this.currentSoundObject = null;

    this.getNextTest = function() {
      this.currentIndex++;
      this.progress = 0;
      this.currentSample = ['R', 1000];
    };
};

export default TestManager;
