import d3 from 'd3';

// Manages the Instructions
var InstructionManager = function InstructionManager(callback) {
  this.currentIndex = 0;
  this.instructions = {};
  var _this = this;
  d3.json('./static/data/Instructions.json', function(error, data) {
    _this.instructions = data;
    callback();
  });
  this.getCurrentInstruction = function() {
    return this.instructions[this.currentIndex];
  };
  this.getPreviousStep = function() {
    if((this.currentIndex - 1) > 0) {
      this.currentIndex--;
    }
  };
  this.getNextStep = function() {
    if((this.currentIndex + 1) < this.instructions.length) {
      this.currentIndex++;
      return false;
    }
    return true;
  }
};

export default InstructionManager;
