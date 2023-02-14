const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return Object.assign({}, state, action.payload);
    case 'SET_PRODUCT':
      return { ...state, [action.payload.id]: action.payload }
    case 'DELETE_PRODUCT':
      let currentState = { ...state };
      delete currentState[parseInt(action.payload.id)];
      return currentState;
    case 'CLEAR_PRODUCTS':
      return {};
    default:
      return state;
  }
}

export default ProductsReducer;
