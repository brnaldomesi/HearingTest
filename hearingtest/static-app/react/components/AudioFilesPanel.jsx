import React from 'react';

import PlayButton from './PlayButton.jsx';
import DownloadButton from './DownloadButton.jsx';

import AudioFilesSelector from './AudioFilesSelector.jsx';
import AudioFilesCheckbox from './AudioFilesCheckbox.jsx';
import AudioFileTableRow from './AudioFileTableRow.jsx';

var AudioFilesPanel = React.createClass({

  getInitialState: function() {
    return {
      inputOptions: [],
    };
  },

  render: function() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-md-1">Ear</th>
              <th className="col-md-1">MHz</th>
              <th className="col-md-1">dB</th>
              <th className="col-md-2">Filename</th>
              <th className="col-md-1">Actions</th>
              <th className="col-md-6">Notes</th>
            </tr>
          </thead>
          <tbody>
            {
            this.props.inputOptions.map(function(val, i) {
              return <AudioFileTableRow settings={val} key={i} />
            })
            }
          </tbody>
        </table>
        <DownloadButton />
      </div>
    );
  }
});

export default AudioFilesPanel;
