import axios from './Basic/Axios';

export const fetchSizes = () => (
  axios.get('/api/v1/sizes').then(res => res.data)
);

export const createSize = (size) => (
  axios.post('/api/v1/sizes', { size }).then(res => res.data)
);

export const updateSize = (size) => (
  axios.patch(`/api/v1/sizes/${size.id}`, { size }).then(res => res.data)
);

export const deleteSize = (sizeId) => (
  axios.delete(`/api/v1/sizes/${sizeId}`).then(res => res.data)
);
