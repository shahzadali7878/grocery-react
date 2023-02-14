import * as SubCategoriesApi from '../Api/SubCategoriesApi';
import { parseError } from '../Api/Basic/Errors';

export const clearSubCategories = () => ({
  type: 'CLEAR_SUB_CATEGORIES'
})

export const fetchSubCategories = (categoryId) => dispatch => (
  SubCategoriesApi.fetchSubCategories(categoryId).then(
    payload => dispatch({ type: 'SET_SUB_CATEGORIES', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const createSubCategory = (categoryId, subCategory) => dispatch => (
  SubCategoriesApi.createSubCategory(categoryId, subCategory).then(
    payload => dispatch({ type: 'SET_SUB_CATEGORY', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const updateSubCategory = (categoryId, subCategory) => dispatch => (
  SubCategoriesApi.updateSubCategory(categoryId, subCategory).then(
    payload => dispatch({ type: 'SET_SUB_CATEGORY', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const deleteSubCategory = (categoryId, subCategoryId) => dispatch => (
  SubCategoriesApi.deleteSubCategory(categoryId, subCategoryId).then(
    payload => dispatch({ type: 'DELETE_SUB_CATEGORY', payload }),
    errors => ({ errors: parseError(errors) })
  )
);
