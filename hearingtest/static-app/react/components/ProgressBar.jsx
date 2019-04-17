import React from 'react';

var ProgressBar = React.createClass({

  render: function() {
    var divStyle = {
      width: this.props.progress + '%',
    }
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{ this.props.progress }" aria-valuemin="0" aria-valuemax="100" style={ divStyle }></div>
      </div>
    );
  }
})

export default ProgressBar
