import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import state from './redux/reducer/index'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'

import AppRouter from './router/index'

const store = createStore(state, {}, applyMiddleware(logger))

ReactDOM.render(<Provider store={store}>
    <AppRouter />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
