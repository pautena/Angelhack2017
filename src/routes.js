import React from 'react'
import {Route,IndexRedirect} from 'react-router'
import Base from './containers/Base'
import Home from './containers/Home'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import ProfilePage from './containers/ProfilePage'
import {requireAuth} from './middleware/auth'


export const makeRoutes = () => {
  return (
    <Route path="/" component={Base}>
      <IndexRedirect to="/home"/>
      <Route path="home" component={Home} onEnter={requireAuth}/>
      <Route path="profile" component={ProfilePage} onEnter={requireAuth}/>
      <Route path="login" component={Login}/>
      <Route path="signUp" component={SignUp}/>
    </Route>
  )
}

export default makeRoutes