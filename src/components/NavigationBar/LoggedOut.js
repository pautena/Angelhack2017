import React,{PropTypes as T} from 'react'
import {NavItem,Nav,NavLink} from 'reactstrap'

class LoggedOut extends React.Component{

  static contextTypes = {
    router: T.object
  }

  handleLogin(){
      console.log("login");
      this.context.router.push('/login');
  }

  handleSignUp(){
      console.log("signUp");
      this.context.router.push('/signUp');
  }

  render(){
    return(
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/signUp">SignUp</NavLink>
        </NavItem>
      </Nav>
  );
  }
}

export default LoggedOut;
