import React from 'react'
import Profile from '../components/Profile'
import {connect} from 'react-redux'
import {getProfile,setProfileImage} from '../actions'


class ProfilePage extends React.Component{

  render(){
    return(<Profile
      profile={this.props.profile}
      onDropProfileImage={this.props.onDropProfileImage.bind(this)}/>);
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    profile: state.users.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfile: ()=>{
      dispatch(getProfile());
    },
    onDropProfileImage:(file) =>{
      dispatch(setProfileImage(file));
    }
  }
}

ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage)

export default ProfilePage;
