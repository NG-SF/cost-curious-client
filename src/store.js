import {createStore, combineReducers} from 'redux';
import itemsReducer from './reducers/items';
import filtersReducer from './reducers/filters';


export default createStore(
 combineReducers({
    items: itemsReducer,
    filters: filtersReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
 
