import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './styles/index.css';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import reducer from './reducers'
import 'bootstrap/dist/css/bootstrap.css'

import {browserHistory} from 'react-router'
import makeRoutes from './routes'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'


const routes = makeRoutes();

const logger = createLogger();
let store = createStore(reducer,applyMiddleware(thunk,logger));

ReactDOM.render(
  <Provider store={store}>
      <App history={browserHistory}
            routes={routes} />
  </Provider>,
  document.getElementById('root')
);
