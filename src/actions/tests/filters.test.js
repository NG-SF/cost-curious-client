import {FETCH_FEATURES_DATA_SUCCESS, fetchFeaturesDataSuccess,       FETCH_FEATURES_DATA_ERROR, fetchFeaturesDataError} from '../filters';

describe('fetchFeaturesDataSuccess', () => {
  it('Should return the action', () => {
      const data = [{
        '_id': '11111',
        limit: '200',
        dataCategory: 'Coffee',
        dataId: '123'
      }];
      const action = fetchFeaturesDataSuccess(data);
      expect(action.type).toEqual(FETCH_FEATURES_DATA_SUCCESS);
      expect(action.data).toEqual(data);
  });
});

describe('fetchFeaturesDataError', () => {
  it('Should return the action', () => {
    const error = {message: 'Internal error'};
    const action = fetchFeaturesDataError(error);
    expect(action.type).toEqual(FETCH_FEATURES_DATA_ERROR);
    expect(action.error).toEqual(error);
  });
});
