export const parseError = (errors) => (
  errors?.response?.data?.errors || ''
);
