import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_FEATURES_DATA_SUCCESS = 'FETCH_FEATURES_DATA_SUCCESS';
export const fetchFeaturesDataSuccess = (data) => ({
    type: FETCH_FEATURES_DATA_SUCCESS,
    data
});

export const FETCH_FEATURES_DATA_ERROR = 'FETCH_FEATURES_DATA_ERROR';
export const fetchFeaturesDataError = (error) => ({
    type: FETCH_FEATURES_DATA_ERROR,
    error
});

export const fetchFeaturesData = () => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/features/a/b/c`, {
                method: 'GET'
                // Provide our auth token as credentials
                // headers: { Authorization: `Bearer ${authToken}`} 
                })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchFeaturesDataSuccess(data)))
          .catch(err => dispatch(fetchFeaturesDataError(err)));
};

export const setLimitAmount = (data) => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/features/a/b/c`, {
              method: 'POST',
              headers: {'content-type':'application/json'},
              body: JSON.stringify(data) })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchFeaturesDataSuccess(data)))
          .catch(err => dispatch(fetchFeaturesDataError(err)));
};

export const updateLimitAmount = (toUpdate) => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/features/a/b/c`, {
              method: 'PUT',
              headers: {'content-type':'application/json'
                        // Authorization: `Bearer ${authToken}`
                        },
              body: JSON.stringify(toUpdate) })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchFeaturesDataSuccess(data)))
          .catch(err => dispatch(fetchFeaturesDataError(err)));
};

export const removeLimitAmount = (limitId) => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/features/a/b/c`, {
              method: 'DELETE',
              headers: {'content-type':'application/json'} ,
              body: JSON.stringify({limitId})
              })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchFeaturesDataSuccess(data)))
          .catch(err => dispatch(fetchFeaturesDataError(err)));
};
