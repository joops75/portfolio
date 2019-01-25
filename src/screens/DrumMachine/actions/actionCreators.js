export function changeDisplay() {
  return {
    type: 'CHANGE_DISPLAY'
  }
}

export function changeText(message) {
  return {
    type: 'CHANGE_TEXT',
    text: message
  }
}

export function changeVol(volume) {
  return {
    type: 'CHANGE_VOL',
    volume
  }
}
export function changeSet() {
  return {
    type: 'CHANGE_SET'
  }
}

export function keySwitch(index) {
  return {
    type: 'KEY_SWITCH',
    index
  }
}
