import * as ColorsApi from '../Api/ColorsApi';
import { parseError } from '../Api/Basic/Errors';

export const clearColors = () => ({
  type: 'CLEAR_COLORS'
})

export const fetchColors = () => dispatch => (
  ColorsApi.fetchColors().then(
    payload => dispatch({ type: 'SET_COLORS', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const createColor = (color) => dispatch => (
  ColorsApi.createColor(color).then(
    payload => dispatch({ type: 'SET_COLOR', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const updateColor = (color) => dispatch => (
  ColorsApi.updateColor(color).then(
    payload => dispatch({ type: 'SET_COLOR', payload }),
    errors => ({ errors: parseError(errors) })
  )
);

export const deleteColor = (colorId) => dispatch => (
  ColorsApi.deleteColor(colorId).then(
    payload => dispatch({ type: 'DELETE_COLOR', payload }),
    errors => ({ errors: parseError(errors) })
  )
);
