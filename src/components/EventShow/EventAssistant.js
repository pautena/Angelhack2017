import React from 'react'
import Rating from 'react-rating'
import Avatar from 'react-avatar'

class EventAssistant extends React.Component {
  render() {
    console.log("EventAssistant. props: ",this.props);

    var pictureUrl=null;
    if(this.props.picture){
      pictureUrl= this.props.picture;
    }

    if(pictureUrl){
        var avatar = (<Avatar size={this.props.size} src={pictureUrl} round={true} className="avatar"/>);
    }else {
        avatar = (<Avatar size={this.props.size}  round={true} className="avatar"/>);
    }

    return (
      <div className="event-assistant">
        {avatar}
        <p className="event-assistant-name">{this.props.name}</p>
        <Rating
            empty="fa fa-star-o"
            full="fa fa-star"
            start={0}
            stop={5}
            readonly
            initialRate={this.props.rating}/>
          <i>
            Bring: {this.props.content.bring}
          </i>
      </div>
    )
  }
}

export default EventAssistant;
