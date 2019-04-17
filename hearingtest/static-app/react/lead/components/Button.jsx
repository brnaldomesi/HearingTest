import React from 'react';
/**
generic button
**/
var Button = React.createClass({
  render: function() {
    var style = !this.props.disabled ? 'btn btn-success btn-lg' : 'btn btn-success btn-lg disabled';
    var foward = this.props.foward ? <img src="./static/img/foward-arrow.png" className="button-arrow"></img> : null;
    return <button className={style} onClick={this.props.onClick}>{this.props.title}{foward}</button>
  }
})

export default Button
