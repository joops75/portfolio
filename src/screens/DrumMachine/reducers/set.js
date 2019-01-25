function set(state = 1, action) {
  switch (action.type) {
    case 'CHANGE_SET':
      return state === 1 ? 2 : 1
    default:
      return state;
  }
}

export default set;
