import axios from './Basic/Axios';

export const fetchColors = () => (
  axios.get('/api/v1/colors').then(res => res.data)
);

export const createColor = (color) => (
  axios.post('/api/v1/colors', { color }).then(res => res.data)
);

export const updateColor = (color) => (
  axios.patch(`/api/v1/colors/${color.id}`, { color }).then(res => res.data)
);

export const deleteColor = (colorId) => (
  axios.delete(`/api/v1/colors/${colorId}`).then(res => res.data)
);
