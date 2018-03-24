import {createStore, combineReducers} from 'redux';
import itemsReducer from './reducers/items';
import filtersReducer from './reducers/filters';
import {reducer as formReducer} from 'redux-form';

export default createStore(
 combineReducers({
    items: itemsReducer,
    filters: filtersReducer,
    form: formReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
 
