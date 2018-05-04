import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import itemsReducer from './reducers/items';
import authReducer from './reducers/auth';
import filtersReducer from './reducers/filters';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    items: itemsReducer,
    filters: filtersReducer,
    form: formReducer,
    auth: authReducer
  });

const store = createStore(reducer,  composeWithDevTools(applyMiddleware(thunk)));
 
// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;