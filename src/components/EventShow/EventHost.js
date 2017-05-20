import React from 'react'
import Rating from 'react-rating'

class EventHost extends React.Component {
  render() {
    return (
      <div className="event-host">
        <img src="http://lorempixel.com/100/100/people/1" />
        <div className="event-host-profile">
          <p className="event-host-name">John Doe</p>
          <Rating
              empty="fa fa-star-o"
              full="fa fa-star"
              start={0}
              stop={5}
              readonly
              initialRate={4}/>
        </div>
      </div>
    )
  }
}

export default EventHost;
