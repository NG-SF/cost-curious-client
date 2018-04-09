import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from '../src/store';
import AppRouter from './routers/AppRouter';
import 'normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './index.css';

ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, 
                document.getElementById('root'));

registerServiceWorker();
