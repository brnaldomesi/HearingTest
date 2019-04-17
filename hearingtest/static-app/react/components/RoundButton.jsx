import React from 'react';
import Sound from 'soundmanager2';


var RoundButton = React.createClass({

  handleClick: function(){
    var mySound = soundManager.createSound({
      url: "../../static/assets/audio/MC5-1_L500_90dB.wav"
    });
    mySound.play();
  },

  render: function() {
    return (
        <div className="centered">
            <button className="round-button" onClick={this.handleClick}>Test Your Hearing</button>
        </div>
    );
  }
});

export default RoundButton;
