import React from 'react';

class Display extends React.Component {
  render() {
    const style = this.props.display ? {color: 'rgb(255, 50, 50)'} : {color: 'rgb(70, 0, 0)'}
    return (
      <div id='display' style={style}>{this.props.text}</div>
    )
  }
}

export default Display;
