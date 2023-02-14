const ColorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_COLORS':
      return Object.assign({}, state, action.payload);
    case 'SET_COLOR':
      return { ...state, [action.payload.id]: action.payload }
    case 'DELETE_COLOR':
      let currentState = { ...state };
      delete currentState[parseInt(action.payload.id)];
      return currentState;
    case 'CLEAR_COLORS':
      return {};
    default:
      return state;
  }
}

export default ColorsReducer;
