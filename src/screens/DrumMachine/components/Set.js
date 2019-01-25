import React from 'react';

var style

class Set extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.flickSwitch = this.flickSwitch.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.getElementById('setSwitch').addEventListener('click', this.flickSwitch);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.getElementById('setSwitch').removeEventListener('click', this.flickSwitch);
  }
  flickSwitch() {
    const setButtonHeight = document.getElementById('setSwitch').clientHeight
    const top = this.props.set === 2 ? -2 * setButtonHeight : -setButtonHeight
    style = {top: top}
    this.display()
  }
  display() {
    const text = this.props.set === 2 ? 'SET 1' : 'SET 2'
    this.props.changeText(text)
    this.props.changeSet()
  }
  handleKeyDown(e) {
    if (e.key.toLowerCase() === 'o') this.flickSwitch()
  }
  render() {
    return (
      <div className='powerSliderArea'>
        <div className='powerGroove'></div>
        <div id='setSwitch' style={style}></div>
      </div>
    )
  }
}

export default Set;
