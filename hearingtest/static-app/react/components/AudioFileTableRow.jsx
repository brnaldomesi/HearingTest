import React from 'react';
import Reflux from 'reflux';

import PlayButton from './PlayButton.jsx';
import AudioNotes from './AudioNotes.jsx';

var AudioFileTableRow = React.createClass({

  getInitialState: function() {
    return {
      settings: {},
    };
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.settings['Ear']}</td>
        <td>{this.props.settings['MHz']} MHz</td>
        <td>{this.props.settings['dB']} dB</td>
        <td>{this.props.settings['Filename']}</td>
        <td><PlayButton filename={this.props.settings['Filename']}/></td>
        <td><AudioNotes filename={this.props.settings['Filename']}/></td>
      </tr>
    );
  }
});

export default AudioFileTableRow;
