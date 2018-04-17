import {FETCH_FEATURES_DATA_SUCCESS, fetchFeaturesDataSuccess,
        FETCH_FEATURES_DATA_ERROR, fetchFeaturesDataError, fetchFeaturesData,setLimitAmount, updateLimitAmount, removeLimitAmount} from '../filters';
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
  it('Should dispatch fetchFeaturesDataSuccess', () => {
    const data = [{}];
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({ok:true, json(){return data;}
      }));
    const getState = () => {
      return {auth: {
        authToken: '1111111111111'
      }}
    };

    const dispatch = jest.fn();
    const dataId = '123';
    return fetchFeaturesData(dataId)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/features/${dataId}`,{"headers": {"Authorization": "Bearer 1111111111111"}, "method": "GET"});
              expect(dispatch).toHaveBeenCalledWith(fetchFeaturesDataSuccess(data));
            });
    });
});

describe('setLimitAmount', () => {
  it('Should dispatch setLimitAmount', () => {
    const data = [{}];
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({ok:true, json(){return data;}
      }));
    const getState = () => {
      return {auth: {
        authToken: '1111111111111'
      }}
    };
    const dispatch = jest.fn();
    const dataId = '123';
    const limitData = {
      limit: 200,
      dataCategory: 'Uber'
    };
    return setLimitAmount(limitData, dataId)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/features/${dataId}`,{"headers": {"Authorization": "Bearer 1111111111111", 
                           "content-type": "application/json"}, 
                           "method": "POST",
                           "body": JSON.stringify(limitData)}); 
              expect(dispatch).toHaveBeenCalledWith(fetchFeaturesDataSuccess(data));
            });
    });
});

describe('updateLimitAmount', () => {
  it('Should dispatch updateLimitAmount', () => {
    const data = [{}];
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({ok:true, json(){return data;}
      }));
    const getState = () => {
      return {auth: {
        authToken: '1111111111111'
      }}
    };
    const dispatch = jest.fn();
    const dataId = '123';
    const updateData = {
      limit: 200,
      limitId: '555'
    };
    return updateLimitAmount(updateData, dataId)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/features/${dataId}`,{"headers": {"Authorization": "Bearer 1111111111111", 
                           "content-type": "application/json"}, 
                           "method": "PUT",
                           "body": JSON.stringify(updateData)}); 
              expect(dispatch).toHaveBeenCalledWith(fetchFeaturesDataSuccess(data));
            });
    });
});

describe('removeLimitAmount', () => {
  it('Should dispatch removeLimitAmount', () => {
    const data = [{}];
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({ok:true, json(){return data;}
      }));
    const getState = () => {
      return {auth: {
        authToken: '1111111111111'
      }}
    };
    const dispatch = jest.fn();
    const dataId = '123';
    const limitId = '222iiiiiii99999';
    return removeLimitAmount(limitId, dataId)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/features/${dataId}`,{"headers": {"Authorization": "Bearer 1111111111111", 
                           "content-type": "application/json"}, 
                           "method": "DELETE",
                           "body": JSON.stringify({limitId})}); 
              expect(dispatch).toHaveBeenCalledWith(fetchFeaturesDataSuccess(data));
            });
    });
});