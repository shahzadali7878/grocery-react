import * as ProductsApi from '../Api/ProductsApi';
import { parseError } from '../Api/Basic/Errors';

export const clearProducts = () => ({
  type: 'CLEAR_PRODUCTS'
})

export const fetchProducts = (categoryId, subCategoryId) => dispatch => (
  ProductsApi.fetchProducts(categoryId, subCategoryId).then(
    payload => dispatch({ type: 'SET_PRODUCTS', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const createProduct = (categoryId, subCategoryId, product) => dispatch => (
  ProductsApi.createProduct(categoryId, subCategoryId, product).then(
    payload => dispatch({ type: 'SET_PRODUCT', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const updateProduct = (categoryId, subCategoryId, product) => dispatch => (
  ProductsApi.updateProduct(categoryId, subCategoryId, product).then(
    payload => dispatch({ type: 'SET_PRODUCT', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const deleteProduct = (categoryId, subCategoryId, productId) => dispatch => (
  ProductsApi.deleteProduct(categoryId, subCategoryId, productId).then(
    payload => dispatch({ type: 'DELETE_PRODUCT', payload }),
    errors => ({ errors: parseError(errors) })
  )
);
