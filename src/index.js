import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import 'regenerator-runtime/runtime'
import moment from 'moment'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import App from './containers/App'

moment.locale('fr')

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

const store = createStore(rootReducer, enhancer)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('dt-app')
)
