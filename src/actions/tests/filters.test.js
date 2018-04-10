import {FETCH_FEATURES_DATA_SUCCESS, fetchFeaturesDataSuccess,       FETCH_FEATURES_DATA_ERROR, fetchFeaturesDataError, fetchFeaturesData} from '../filters';
import {API_BASE_URL} from '../../config';

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

  describe('fetchFeaturesData', () => {
  xit('Should dispatch fetchFeaturesDataSuccess', () => {
    const data = [{}];
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({ok:true, json(){return data;}
      }));
    const dispatch = jest.fn();
    const dataId = '123';
    return fetchFeaturesData(dataId)(dispatch)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/features/${dataId}`);
              expect(dispatch).toHaveBeenCalledWith(fetchFeaturesDataSuccess(data));
            });
    });
  });

