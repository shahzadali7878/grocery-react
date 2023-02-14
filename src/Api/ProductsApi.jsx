import axios from './Basic/Axios';

export const fetchProducts = (categoryId, subCategoryId) => (
  axios.get(
    `/api/v1/categories/${categoryId}/sub_categories/${subCategoryId}/products`
  ).then(
    res => res.data
  )
);

export const createProduct = (categoryId, subCategoryId, product) => (
  axios.post(
    `/api/v1/categories/${categoryId}/sub_categories/${subCategoryId}/products`, { product }
  ).then(
    res => res.data
  )
);

export const updateProduct = (categoryId, subCategoryId, product) => (
  axios.patch(
    `/api/v1/categories/${categoryId}/sub_categories/${subCategoryId}/products/${product.id}`, { product }
  ).then(
    res => res.data
  )
);

export const deleteProduct = (categoryId, subCategoryId, productId) => (
  axios.delete(
    `/api/v1/categories/${categoryId}/sub_categories/${subCategoryId}/products/${productId}`
  ).then(
    res => res.data
  )
);
