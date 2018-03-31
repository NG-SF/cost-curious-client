import { createStore, combineReducers, applyMiddleware } from 'redux';
import itemsReducer from './reducers/items';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    items: itemsReducer
  });

export default createStore(reducer,  composeWithDevTools(applyMiddleware(thunk)));
 