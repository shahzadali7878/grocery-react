import axios from './Basic/Axios';

export const fetchCategories = () => (
  axios.get('/api/v1/categories').then(res => res.data)
);

export const createCategory = (category) => (
  axios.post('/api/v1/categories', { category }).then(res => res.data)
);

export const updateCategory = (category) => (
  axios.patch(`/api/v1/categories/${category.id}`, { category }).then(res => res.data)
);

export const deleteCategory = (categoryId) => (
  axios.delete(`/api/v1/categories/${categoryId}`).then(res => res.data)
);
