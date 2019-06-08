import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';

import AppRouter from './router/index'

ReactDOM.render(<AppRouter />, document.getElementById('root'));
serviceWorker.unregister();
