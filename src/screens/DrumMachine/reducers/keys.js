function keys(state = [0, 0, 0, 0, 0, 0, 0, 0, 0], action) {
  switch (action.type) {
    case 'KEY_SWITCH':
      return [
        ...state.slice(0, action.index),
        (state[action.index] + 1) % 2,
        ...state.slice(action.index + 1)
      ]
    default:
      return state;
  }
}

export default keys;
