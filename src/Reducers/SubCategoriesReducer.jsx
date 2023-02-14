const SubCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SUB_CATEGORIES':
      return Object.assign({}, state, action.payload);
    case 'SET_SUB_CATEGORY':
      return { ...state, [action.payload.id]: action.payload }
    case 'DELETE_SUB_CATEGORY':
      let currentState = { ...state };
      delete currentState[parseInt(action.payload.id)];
      return currentState;
    case 'CLEAR_SUB_CATEGORIES':
      return {};
    default:
      return state;
  }
}

export default SubCategoriesReducer;
