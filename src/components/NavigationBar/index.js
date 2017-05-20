import React from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import {isAuthenticated} from '../../middleware/auth'
import {logout} from '../../actions'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import './navbar.css'


class NavigationBar extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      isOpen:false,
      isAuthenticated:false
    }
  }

  componentDidMount(){
    isAuthenticated((isAuthenticated) => {
      console.log("isAuthenticated: ",isAuthenticated);
      this.setState({isAuthenticated:isAuthenticated});
    });
  }

  toggle(){
    this.setState({isOpen:!this.state.isOpen});
  }

  logout(){
    console.log("handleLogout");
    this.props.dispatch(logout());
    browserHistory.push('/login');
  }

  render(){

    return(
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Collapse isOpen={this.state.isOpen} navbar>
              {this.state.isAuthenticated?<LoggedIn
                onLogout={this.logout.bind(this)}
                profile={this.props.profile}
                onClickOpenAddEventDialog={this.props.onClickOpenAddEventDialog}/>:
                <LoggedOut/>
              }
            </Collapse>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

NavigationBar = connect()(NavigationBar)
export default NavigationBar
