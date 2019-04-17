import ReactAddonsUpdate from 'react-addons-update';
import React from 'react';
import Reflux from 'reflux';
import CalibrateActions from '../actions/CalibrateActions.js';
import Sound from 'soundmanager2';

var currentSound;

var CalibrateStore = Reflux.createStore({

    listenables:[CalibrateActions],

    getInputOptions: function() {
       var options = [];
       var ear = ['B', 'R', 'L'];
       var MHz = ['500', '1000', '2000', '4000', '8000'];
       var dB = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90'];
       for(let e in ear) {
          for(let m in MHz) {
            for(let d in dB) {
              let opt = {};
              opt['Ear']=ear[e];
              opt['MHz']=MHz[m];
              opt['dB']=dB[d];
              opt['Filename'] = ear[e] + MHz[m] + "_" + dB[d] + "dB.wav";
              options.push(opt);
            }
          }
       }
       console.log(options);
       return options;
    },

    getDefaultData: function() {
      var settings = {
        ear: 'B',
        MHz: '500',
        dB: '00',
        loop: false,
      };
      soundManager.setup({
        url: '../static/swf/',
        flashVersion: 9,
        preferFlash: false,
      });
      this.state = {};
      this.state.notes = {};
      this.state.settings = settings;
      this.state.inputOptions = this.getInputOptions();
      return this.state;
    },

    onUpdateState: function(updates) {
      var settings = ReactAddonsUpdate(this.state.settings, {$merge: updates});
      this.state.settings = settings;
    },

    onPlaySound: function(filename) {
      if(this.currentSound) {
        this.currentSound.unload();
      }
      var soundUrl = '../static/assets/audio/calibrate/' + filename;
      this.currentSound = soundManager.createSound({
        url: soundUrl,
      });
      this.loopSound(this.currentSound);
    },

    onStopSound: function() {
      if(this.currentSound) {
        this.currentSound.unload();
      }
    },

    onUpdateNote: function(note) {
      var notes = ReactAddonsUpdate(this.state.notes, {$merge: note});
      this.state.notes = notes;
    },

    onDownloadNotes: function() {
      var csvContent = 'data:text/csv;charset=utf-8,';
      for(let n in this.state.notes) {
        csvContent += n + ',' + this.state.notes[n] + '\n';
      }
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    },

    loopSound: function(sound) {
      var _this = this;
      sound.play({
        onfinish: function() {
          _this.loopSound(sound);
        }
      });
    }

});

export default CalibrateStore;
