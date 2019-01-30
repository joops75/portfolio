import React from 'react';

var volumeSwitchWidth
var volumeGrooveWidth
var leftStart
var leftEnd
var gap
var startxAssigned = false
var mouseDown

class Volume extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    document.getElementById('volumeSwitch').addEventListener('mousedown', this.handleMouseDown)
    volumeSwitchWidth = document.getElementById('volumeSwitch').clientWidth
    volumeGrooveWidth = document.getElementById('volumeGroove').clientWidth
    leftStart = document.getElementById('volumeSliderArea').offsetLeft
    leftEnd = leftStart + volumeGrooveWidth - volumeSwitchWidth
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
    document.getElementById('volumeSwitch').removeEventListener('mousedown', this.handleMouseDown)
  }
  handleMouseMove(e) {
    if (mouseDown) {
      var switchLeft = document.getElementById('volumeSwitch').offsetLeft
      var x = e.clientX
      if (!startxAssigned) {
        startxAssigned = true
        gap = x - switchLeft
      }
      if (switchLeft >= leftStart && switchLeft <= leftEnd) {
        var vol = (x - gap - leftStart) / (leftEnd - leftStart)
        if (vol > 1) vol = 1
        if (vol < 0) vol = 0
          this.props.changeVol(vol)
          this.props.changeText('VOL ' + this.fillZero(Math.round(vol * 100) / 100))
          this.liveVolumeChange(vol)
      }
    }
  }
  fillZero(num) {
    var str = '' + num
    if (str.length === 4) return str
    if (str.length === 3) return str + '0'
    if (str.length === 2) return str + '00'
    if (str.length === 1) return str + '.00'
  }
  liveVolumeChange(vol) {
    const map = 'QWEASDZXC'
    for (let i = 0; i < map.length; i++) {
      document.getElementById(map[i]).volume = vol
    }
  }
  handleMouseDown(e) {
    mouseDown = true
  }
  handleMouseUp() {
    mouseDown = false
    startxAssigned = false
  }
  handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowUp') e.preventDefault()
    var vol = this.props.volume
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      vol -= 0.01
      if (vol < 0) vol = 0
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      vol += 0.01
      if (vol > 1) vol = 1
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      this.props.changeVol(vol)
      this.props.changeText('VOL ' + this.fillZero(Math.round(vol * 100) / 100))
      this.liveVolumeChange(vol)
    }
  }
  render() {
    var style
    if (volumeGrooveWidth && volumeSwitchWidth) {
      const left = this.props.volume * (volumeGrooveWidth - volumeSwitchWidth)
      style = {left: left}
    }
    return (
      <div id='volumeSliderArea'>
        <div id='volumeGroove'></div>
        <div id='volumeSwitch' style={style}></div>
      </div>
    )
  }
}

export default Volume;
