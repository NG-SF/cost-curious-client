import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, UPDATE_HISTORY_DATA } from '../actions/items';

const initialState = {
  error: null,
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
          data: action.data,
          error: null
        });

    case FETCH_DATA_ERROR:
      return Object.assign({}, state, {
          error: action.error
        });

    case UPDATE_HISTORY_DATA:
      let objToUpdate = state.data.filter(el => el._id === action.dataId);
      // update whole object 
      let newObj = Object.assign({}, objToUpdate[0], { history: action.data });
      //update state data arr
      let newStateData = state.data.map(item => {
        if(item._id === action.dataId) {
        return newObj;
      }
        return item;
      });
      //  return new state
      return Object.assign({}, state, {
          data: newStateData,
          error: null
        });

    default:
      return state;
  }
};
