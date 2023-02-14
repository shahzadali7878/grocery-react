import axios from './Basic/Axios';

export const fetchSubCategories = (categoryId) => (
  axios.get(`/api/v1/categories/${categoryId}/sub_categories`).then(res => res.data)
);

export const createSubCategory = (categoryId, subCategory) => (
  axios.post(`/api/v1/categories/${categoryId}/sub_categories`, { sub_category: subCategory }).then(res => res.data)
);

export const updateSubCategory = (categoryId, subCategory) => (
  axios.patch(`/api/v1/categories/${categoryId}/sub_categories/${subCategory.id}`, { sub_category: subCategory }).then(res => res.data)
);

export const deleteSubCategory = (categoryId, subCategoryId) => (
  axios.delete(`/api/v1/categories/${categoryId}/sub_categories/${subCategoryId}`).then(res => res.data)
);
