import React from 'react'
import Rating from 'react-rating'

class EventAssistant extends React.Component {
  render() {
    return (
      <div className="event-assistant">
        <img src={"http://lorempixel.com/80/80/people/" + this.props.id } />
        <p className="event-assistant-name">John Doe</p>
        <Rating
            empty="fa fa-star-o"
            full="fa fa-star"
            start={0}
            stop={5}
            readonly
            initialRate={4}/>
      </div>
    )
  }
}

export default EventAssistant;
