var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'react');

var config = {
  watchOptions: {
    poll: 2000,
  },
  entry: {
    'app': APP_DIR + '/App.jsx',
    'calibrate': APP_DIR + '/CalibrateApp.jsx',
    'lead': APP_DIR + '/LeadApp.jsx',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module : {
   loaders : [
     {
       test : /\.jsx?/,
       exclude: /node_modules/,
       include : APP_DIR,
       loader : 'babel'
     }
   ]
 }
};

module.exports = config;
