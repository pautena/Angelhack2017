import React from 'react'
import Rating from 'react-rating'
import Avatar from 'react-avatar'

class EventHost extends React.Component {
  render() {

    var name=""
    if(this.props.user){
      name =this.props.user.firstname+" "+this.props.user.lastname;
    }

    var stars=0
    if(this.props.user){
      stars = this.props.user.stars
    }

    var pictureUrl="";
    if(this.props.user){
      pictureUrl= this.props.user.pictureUrl;
    }

    if(pictureUrl){
        var avatar = (<Avatar size={this.props.size} src={pictureUrl} round={true} className="avatar"/>);
    }else {
        avatar = (<Avatar size={this.props.size}  round={true} className="avatar"/>);
    }

    return (
      <div className="event-host">
        {avatar}
        <div className="event-host-profile">
          <p className="event-host-name">{name}</p>
          <Rating
              empty="fa fa-star-o"
              full="fa fa-star"
              start={0}
              stop={5}
              readonly
              initialRate={stars}/>
        </div>
      </div>
    )
  }
}

export default EventHost;
