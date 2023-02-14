const SizesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SIZES':
      return Object.assign({}, state, action.payload);
    case 'SET_SIZE':
      return { ...state, [action.payload.id]: action.payload }
    case 'DELETE_SIZE':
      let currentState = { ...state };
      delete currentState[parseInt(action.payload.id)];
      return currentState;
    case 'CLEAR_SIZES':
      return {};
    default:
      return state;
  }
}

export default SizesReducer;
