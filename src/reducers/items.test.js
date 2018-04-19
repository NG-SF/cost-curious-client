import itemsReduser from './items';
import {fetchDataSuccess, fetchDataError, updateHistoryData} from '../actions/items';

describe('filtersReducer', () => {
  const data = [{
    "_id": '38f83j3j3',
    history: [{
      "_id": '38888',
      amount: 500,
      createdAt: 1515777000000,
      place: 'Whole Foods'
    }],
    description: 'Grocery',
    userId: 'jjj33j3j3'
  }];

  it('Should set the initial state when nothing is passed in', () => {
      const state = itemsReduser(undefined, {type: '__UNKNOWN'});
      expect(state).toEqual({
          data: [],
          error: null
      });
    });
     
  it('Should return the current state on an unknown action', () => {
      let currentState = {};
      const state = itemsReduser(currentState, {type: '__UNKNOWN'});
      expect(state).toBe(currentState);
    });

  it('Should set data', () => {
      let state;
      state = itemsReduser(state, fetchDataSuccess(data));
      expect(state).toEqual({
              data: data,
              error: null
            });
        });

  it('Should set error', () => {
      let state;
      let err = {
        message: 'Server error'
      };
      state = itemsReduser(state, fetchDataError(err));
      expect(state).toEqual({
              data: [],
              error: err
            });
        });

});

