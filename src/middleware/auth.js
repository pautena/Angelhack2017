
import * as firebase from 'firebase'
import {browserHistory} from 'react-router'

export const requireAuth = (nextState,replace) =>{
  firebase.auth().onAuthStateChanged(function(user) {
    console.log("requireAuth. user: ",user);
    if (user==null) {
      console.log("redirect to /login");
      replace({ pathname: '/login' });
      browserHistory.push('/login');
    }
  });
}

export const isAuthenticated = (callback)=>{
  firebase.auth().onAuthStateChanged(function(user) {
    var isAuthenticated = user!=null;
    console.log("isAuthenticated. user: ",user);
    callback(isAuthenticated);
  });
}
