import filtersReduser from './filters';
import {setLimitAmount, updateLimitAmount, removeLimitAmount} from '../actions/filters';

describe('filtersReducer', () => {
  const data1 = {
    data: [{
    "_id": '38f83j3j3',
    limit: '4000',
    dataCategory: 'Grocery',
    dataId: 'jjj33j3j3'
  }],
    error: null
  };
  const data2 = {
    data: [{
    "_id": '38f55555j3',
    limit: '2100',
    dataCategory: 'Coffee',
    dataId: 'jj1111111'
  }],
    error: null
  };

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

describe('setLimitAmount', () => {
  xit('Should set limit amount', () => {
      let state;
      state = filtersReduser(state, setLimitAmount());
      expect(state).toEqual({
              data: [data1.data],
              error: null
            });
        });
    });
});

