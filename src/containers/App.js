import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import '../styles/App.css'
import * as firebase from 'firebase'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var config = {
    apiKey: "AIzaSyD6LhXbmNw_6z1UxK0dgH9FzMgEcZSQS6s",
    authDomain: "camcam-25c0c.firebaseapp.com",
    databaseURL: "https://camcam-25c0c.firebaseio.com",
    projectId: "camcam-25c0c",
    storageBucket: "camcam-25c0c.appspot.com",
    messagingSenderId: "138251261275"
  };
firebase.initializeApp(config);

class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  };

  get content() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history} />
    )
  }

  render () {
     return (
       <MuiThemeProvider style={{ height: '100%' }}>
         {this.content}
       </MuiThemeProvider>
     )
   }
}

export default App;
