import React from 'react';
/**
progress bar of the test for the hearing tones
props: progress
**/
var ProgressBar = React.createClass({
  /**
  gets progress message based on value of the progress
  **/
  getProgressMessage:function(progress) {
    if(progress >= 20 && progress < 50) {
      return "Off to a great start!";
    } else if(progress >= 50 && progress < 75) {
      return "Halfway there...";
    } else if(progress >= 75) {
      return "Almost done!";
    }
    return null;
  },
  /**
  render the component
  **/
  render: function() {
    var progressMessage = this.getProgressMessage(this.props.progress);
    var progress = (this.props.progress == 0) ? 2 : this.props.progress;
    var divStyle = {
      width: progress + '%',
    }
    return (
      <div>
        <div className="progress">
          <div className="progress-bar active progress-bar-striped" role="progressbar" aria-valuenow="{this.props.progress}" aria-valuemin="0" aria-valuemax="100" style={divStyle}></div>
        </div>
        <p className="progress-message">{progressMessage}</p>
      </div>
    )
  }
})

export default ProgressBar
