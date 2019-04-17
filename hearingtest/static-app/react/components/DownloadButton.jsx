import React from 'react';
import Reflux from 'reflux';

import CalibrateActions from '../actions/CalibrateActions.js';

var DownloadButton = React.createClass({

  mixins: [Reflux.ListenerMixin],

  handleClick: function(){
    CalibrateActions.downloadNotes();
  },

  render: function() {
    return (
      <button type="button" className="btn btn-success push-down" onClick={this.handleClick}>
        <span className="glyphicon glyphicon-download-alt"></span> Download CSV
      </button>
    );
  }
});

export default DownloadButton;
