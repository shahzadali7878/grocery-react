const CategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return Object.assign({}, state, action.payload);
    case 'SET_CATEGORY':
      return { ...state, [action.payload.id]: action.payload }
    case 'DELETE_CATEGORY':
      let currentState = { ...state };
      delete currentState[parseInt(action.payload.id)];
      return currentState;
    case 'CLEAR_CATEGORIES':
      return {};
    default:
      return state;
  }
}

export default CategoriesReducer;
