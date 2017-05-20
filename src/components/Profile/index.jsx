import React from 'react'
import './profile.css'
import ProfileHeader from './ProfileHeader'

export class Profile extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            profile: {},
            pictureUrl:null
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <ProfileHeader
              profile={this.props.profile}
              onDropProfileImage={this.props.onDropProfileImage}/>
        )
    }
}

export default Profile;
