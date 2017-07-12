import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers'

export default function getRoutes (checkAuth, requireLogin, history) {
  return (
    <Router history={history}>
      <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
      <Route path='/' component={MainContainer}>
        <Route path='feed' component={FeedContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} onEnter={requireLogin} />
        <Route path='/:uid' component={UserContainer} onEnter={checkAuth} />
        <Route path='duckDetail/:duckId' component={DuckDetailsContainer}
        onEnter={checkAuth} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Route>
    </Router>
  )
}
