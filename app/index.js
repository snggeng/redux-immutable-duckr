import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { checkIfAuthed } from 'helpers/auth'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import { browserHistory } from 'react-router'

// Initialize Store
const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

// Setup caching for browser history
const history = syncHistoryWithStore(browserHistory, store)

function checkAuth (nextState, replace) {
  // if getting info from firebase, do nothing
  if (store.getState().users.isFetching === true) {
    return
  }

  // On load, get isAuthed from firebase
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  // if (isAuthed !== true) {
  //   browserHistory.push('/auth')
  // }
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

const requireLogin = (nextState, replace) => {
  console.warn('require login')
  // if getting info from firebase, do nothing
  // if (store.getState().users.isFetching === true) {
  //   return
  // }

  // On load, get isAuthed from firebase
  const isAuthed = checkIfAuthed(store)
  console.warn('user is authenticated', isAuthed)
  if (!isAuthed) {
  //  browserHistory.push('#/auth')
    replace('/auth')
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth, requireLogin, history)}
  </Provider>,
document.getElementById('app'))
