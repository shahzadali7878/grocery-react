import { combineReducers } from 'redux';

import categories from './CategoriesReducer';
import subCategories from './SubCategoriesReducer';
import products from './ProductsReducer';
import colors from './ColorsReducer';
import sizes from './SizesReducer';

const RootReducer = (state, action) => {
  return combineReducers({
    categories,
    subCategories,
    products,
    colors,
    sizes
  });
};

export default RootReducer;
