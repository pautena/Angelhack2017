import React, {PropTypes as T} from 'react'
import {Nav, NavLink, NavDropdown, DropdownToggle,
  DropdownItem, DropdownMenu,NavItem} from 'reactstrap'
import Avatar from 'react-avatar'

class LoggedIn extends React.Component {

    static contextTypes = {
        router: T.object
    }

    constructor(props) {
      super(props);

      this.state = {
        dropdownOpen: false,
        pictureUrl:null
      }
    }

    toggle() {
      this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    render() {

      if(this.props.profile.firstname){
        var name = this.props.profile.firstname+" "+this.props.profile.lastname
      }else{
        name =""
      }

      var pictureUrl = null;
      if(this.props.profile.pictureUrl!=null){
        pictureUrl = this.props.profile.pictureUrl;
      }

      var avatarSize=30;
      if (pictureUrl) {
          var avatar = (<Avatar size={avatarSize} src={pictureUrl}
                                round={true} className="navbar-avatar"/>);
      } else {
          avatar = (<Avatar size={avatarSize} name={name}
                                round={true} className="navbar-avatar"/>);
      }

      var title = (<span>{avatar}{name}</span>);
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={this.props.onClickOpenAddEventDialog}>+ event</NavLink>
          </NavItem>
          <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
            <DropdownToggle nav caret>
              {title}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Settings</DropdownItem>
              <DropdownItem><NavLink href="/profile">Profile</NavLink></DropdownItem>
              <DropdownItem divider/>
              <DropdownItem>
                <NavLink href="#" onClick={this.props.onLogout}>Logout</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
        </Nav>
      );
    }
}

export default LoggedIn
