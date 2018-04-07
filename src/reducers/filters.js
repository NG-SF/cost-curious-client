import {FETCH_FEATURES_DATA_SUCCESS, FETCH_FEATURES_DATA_ERROR} from '../actions/filters';

const initialState = {
    data: [],
    error: null
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEATURES_DATA_SUCCESS:
      return Object.assign({}, state, {
          data: action.data,
          error: null
        });

    case FETCH_FEATURES_DATA_ERROR:
      return Object.assign({}, state, {
          error: action.error
        });

    default:
    return state;
  }
};