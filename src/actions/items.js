import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    data
});

export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const fetchDataError = (error) => ({
    type: FETCH_DATA_ERROR,
    error
});

export const fetchData = (userId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/dashboard/${userId}`, {
                method: 'GET',
                // Provide our auth token as credentials
                headers: { Authorization: `Bearer ${authToken}`} })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchDataSuccess(data)))
          .catch(err => dispatch(fetchDataError(err)));
};

export const setItemData = (userId, name) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/dashboard/${userId}`, {
              method: 'POST',
              headers: {'content-type':'application/json',
                        Authorization: `Bearer ${authToken}`},
              body: JSON.stringify({description:name}) })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchDataSuccess(data)))
          .catch(err => dispatch(fetchDataError(err)));
};

export const updateItemData = (userId, itemId, name) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/dashboard/${userId}/${itemId}`, {
              method: 'PUT',
              headers: {'content-type':'application/json',
                        Authorization: `Bearer ${authToken}`},
              body: JSON.stringify({description:name}) })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchDataSuccess(data)))
          .catch(err => dispatch(fetchDataError(err)));
};

export const removeItemData = (userId, itemId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/dashboard/${userId}/${itemId}`, {
              method: 'DELETE',
              headers: {'content-type':'application/json',
                        Authorization: `Bearer ${authToken}`} })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(fetchDataSuccess(data)))
          .catch(err => dispatch(fetchDataError(err)));
};

// history arr contains all transactions for specific Data obj
export const UPDATE_HISTORY_DATA = 'UPDATE_HISTORY_DATA';
export const updateHistoryData = (dataId, data = []) => ({
  type: UPDATE_HISTORY_DATA,
  dataId,
  data
});

export const setTransaction = (dataId, transaction) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/${dataId}`, {
              method: 'POST',
              // Provide our auth token as credentials
              headers: {'content-type':'application/json',
                        Authorization: `Bearer ${authToken}`},
              body: JSON.stringify(transaction) })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(updateHistoryData(dataId, data)))
          .catch(err => dispatch(fetchDataError(err)));
};

export const removeTransaction = (dataId, itemId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/${dataId}/${itemId}`, {
              method: 'DELETE',
              headers: {'content-type':'application/json',
                        Authorization: `Bearer ${authToken}`} })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(updateHistoryData(dataId, data)))
          .catch(err => dispatch(fetchDataError(err)));
};

export const updateTransaction = (dataId, itemId, updates) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/${dataId}/${itemId}`, {
              method: 'PUT',
              headers: {'content-type':'application/json',
                        Authorization: `Bearer ${authToken}`},
              body: JSON.stringify(updates) })
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(data => dispatch(updateHistoryData(dataId, data)))
          .catch(err => dispatch(fetchDataError(err)));
};