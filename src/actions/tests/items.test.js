import {API_BASE_URL} from '../../config';
import {fetchDataSuccess, FETCH_DATA_SUCCESS, fetchDataError, FETCH_DATA_ERROR,
        fetchData, setItemData, updateItemData, removeItemData} from '../items';

describe('fetchDataSuccess', () => {
  it('Should return the action', () => {
      const data = {
        error: null,
        data: [{
          "_id": '222j2j2j2j2j',
          description: 'Uber',
          userId: 'ththththth999',
          history: [{
            "_id": '3i3he7e4j4k',
            amount: 4566,
            createdAt: 1515009600000,
            place: 'AMC'
          }]
          }
        ]
      };
      const action = fetchDataSuccess(data);
      expect(action.type).toEqual(FETCH_DATA_SUCCESS);
      expect(action.data).toEqual(data);
  });
});

describe('fetchDataError', () => {
  it('Should return the action', () => {
    const error = {message: 'Internal error'};
    const action = fetchDataError(error);
    expect(action.type).toEqual(FETCH_DATA_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('fetchData', () => {
  it('Should fetchData from API', () => {
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
    const userId = '123333999jdjdjdjd';

    return fetchData(userId)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/dashboard/${userId}`,{"headers": {"Authorization": "Bearer 1111111111111"}, 
                           "method": "GET"}); 
              expect(dispatch).toHaveBeenCalledWith(fetchDataSuccess(data));
            });
    });
});

describe('setItemData', () => {
  it('Should dispatch setItemData', () => {
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
    const userId = '123333999jdjdjdjd';
    const name = 'Coffee';
    return setItemData(userId, name)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/dashboard/${userId}`,{"headers": {"Authorization": "Bearer 1111111111111", 
                           "content-type": "application/json"}, 
                           "method": "POST",
                           "body": JSON.stringify({description:name})}); 
              expect(dispatch).toHaveBeenCalledWith(fetchDataSuccess(data));
            });
    });
});

describe('updateItemData', () => {
  it('Should dispatch updateItemData', () => {
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
    const userId = '123333999jdjdjdjd';
    const itemId = '4j4j4j44l4l49f';
    const name = 'Lyft';

    return updateItemData(userId, itemId, name)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/dashboard/${userId}/${itemId}`,{"headers": {"Authorization": "Bearer 1111111111111", 
                           "content-type": "application/json"}, 
                           "method": "PUT",
                           "body": JSON.stringify({description:name})}); 
              expect(dispatch).toHaveBeenCalledWith(fetchDataSuccess(data));
            });
    });
});

describe('removeItemData', () => {
  it('Should dispatch removeItemData', () => {
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
    const userId = '123333999jdjdjdjd';
    const itemId = '4j4j4j44l4l49f';
    return removeItemData(userId, itemId)(dispatch, getState)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/dashboard/${userId}/${itemId}`,{"headers": {"Authorization": "Bearer 1111111111111", 
                           "content-type": "application/json"}, 
                           "method": "DELETE"}); 
              expect(dispatch).toHaveBeenCalledWith(fetchDataSuccess(data));
            });
    });
});