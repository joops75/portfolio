function display(state = false, action) {
  switch (action.type) {
    case 'CHANGE_DISPLAY':
      return !state
    default:
      return state
  }
}

export default display;
