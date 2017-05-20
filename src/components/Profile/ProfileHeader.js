import React from 'react'
import {Jumbotron} from 'reactstrap'
import DroppingImage from '../utils/DroppingImage'


class ProfileHeader extends React.Component{


  render(){

    if(this.props.profile.firstname)
      var name = `${this.props.profile.firstname} ${this.props.profile.lastname}`;
    else
      name="";

    return(
      <Jumbotron className="profile-jumbotron">
          <DroppingImage
            innerClassName="profile-image"
            size={160}
            pictureUrl={this.props.profile.pictureUrl}
            onDropImage={this.props.onDropProfileImage}/>
          <h1 className="profile-name">{name}</h1>
      </Jumbotron>
    );
  }
}

export default ProfileHeader;
