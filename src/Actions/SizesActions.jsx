import * as SizesApi from '../Api/SizesApi';
import { parseError } from '../Api/Basic/Errors';

export const clearSizes = () => ({
  type: 'CLEAR_SIZES'
})

export const fetchSizes = () => dispatch => (
  SizesApi.fetchSizes().then(
    payload => dispatch({ type: 'SET_SIZES', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const createSize = (size) => dispatch => (
  SizesApi.createSize(size).then(
    payload => dispatch({ type: 'SET_SIZE', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const updateSize = (size) => dispatch => (
  SizesApi.updateSize(size).then(
    payload => dispatch({ type: 'SET_SIZE', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const deleteSize = (sizeId) => dispatch => (
  SizesApi.deleteSize(sizeId).then(
    payload => dispatch({ type: 'DELETE_SIZE', payload }),
    errors => ({ errors: parseError(errors) })
  )
);
