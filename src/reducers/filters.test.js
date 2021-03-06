import filtersReduser from './filters';
import {fetchFeaturesDataSuccess, fetchFeaturesDataError} from '../actions/filters';

describe('filtersReducer', () => {
  const data1 = [{
    "_id": '38f83j3j3',
    limit: '4000',
    dataCategory: 'Grocery',
    dataId: 'jjj33j3j3'
  }];

  it('Should set the initial state when nothing is passed in', () => {
      const state = filtersReduser(undefined, {type: '__UNKNOWN'});
      expect(state).toEqual({
          data: [],
          error: null
      });
    });
     
  it('Should return the current state on an unknown action', () => {
      let currentState = {};
      const state = filtersReduser(currentState, {type: '__UNKNOWN'});
      expect(state).toBe(currentState);
    });

  it('Should set data', () => {
      let state;
      state = filtersReduser(state, fetchFeaturesDataSuccess(data1));
      expect(state).toEqual({
              data: data1,
              error: null
            });
        });

  it('Should set error', () => {
      let state;
      let err = {
        message: 'Server error'
      };
      state = filtersReduser(state, fetchFeaturesDataError(err));
      expect(state).toEqual({
              data: [],
              error: err
            });
        });

});

