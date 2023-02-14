import * as CategoriesApi from '../Api/CategoriesApi';
import { parseError } from '../Api/Basic/Errors';

export const clearCategories = () => ({
  type: 'CLEAR_CATEGORIES'
})

export const fetchCategories = () => dispatch => (
  CategoriesApi.fetchCategories().then(
    payload => dispatch({ type: 'SET_CATEGORIES', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const createCategory = (category) => dispatch => (
  CategoriesApi.createCategory(category).then(
    payload => dispatch({ type: 'SET_CATEGORY', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const updateCategory = (category) => dispatch => (
  CategoriesApi.updateCategory(category).then(
    payload => dispatch({ type: 'SET_CATEGORY', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const deleteCategory = (categoryId) => dispatch => (
  CategoriesApi.deleteCategory(categoryId).then(
    payload => dispatch({ type: 'DELETE_CATEGORY', payload }),
    errors => ({ errors: parseError(errors) })
  )
);
