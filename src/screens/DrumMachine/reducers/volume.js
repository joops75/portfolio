function volume(state = 0.5, action) {
  switch (action.type) {
    case 'CHANGE_VOL':
      return action.volume;
    default:
      return state;
  }
}

export default volume;
