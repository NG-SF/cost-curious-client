import authReduser from './auth';
import {setAuthToken, clearAuth, authRequest, authSuccess, authError} from '../actions/auth';

describe('filtersReducer', () => {
  const testState = {
    authToken: '494jiiednvfjdnkdjfkfnvjff9eueeue', 
    currentUser: {
      username: 'test',
      firstName: 'John',
      lastName: 'Doe',
      id: '36363636363ssss'
    },
    loading: false,
    error: {
      message: 'server error'
    }
};

  it('Should set the initial state when nothing is passed in', () => {
      const state = authReduser(undefined, {type: '__UNKNOWN'});
      expect(state).toEqual({
          authToken: null, 
          currentUser: null,
          loading: false,
          error: null
      });
  });
     
  it('Should return the current state on an unknown action', () => {
      let currentState = {};
      const state = authReduser(currentState, {type: '__UNKNOWN'});
      expect(state).toBe(currentState);
  });

  it('Should set authToken', () => {
      let state;
      state = authReduser(state, setAuthToken(testState.authToken));
      expect(state).toEqual({
              authToken: testState.authToken, 
              currentUser: null,
              loading: false,
              error: null
      });
  });

  it('Should clear authToken', () => {
      let state;      
      state = authReduser(state, clearAuth());
      expect(state).toEqual({
              authToken: null, 
              currentUser: null,
              loading: false,
              error: null
      });
  });

  it('Should request authToken', () => {
      let state;    
      state = authReduser(state, authRequest());
      expect(state).toEqual({
              authToken: null, 
              currentUser: null,
              loading: true,
              error: null
      });
  });

  it('Should set current user on authSuccess', () => {
      let state;    
      state = authReduser(state, authSuccess(testState.currentUser));
      expect(state).toEqual({
              authToken: null, 
              currentUser: testState.currentUser,
              loading: false,
              error: null
        });
    });

    it('Should set error on authError', () => {
      let state;    
      state = authReduser(state, authError(testState.error));
      expect(state).toEqual({
              authToken: null, 
              currentUser: null,
              loading: false,
              error: testState.error
        });
    });
});

