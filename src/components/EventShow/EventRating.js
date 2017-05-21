import React from 'react'
import Rating from 'react-rating'

class EventRating extends React.Component {
  render() {
    return (
      <div className="event-rating">
        <p>Minimum user rating:</p>
          <Rating
              empty="fa fa-star-o"
              full="fa fa-star"
              start={0}
              stop={5}
              readonly
              initialRate={this.props.rating}/>
      </div>
    )
  }
}

export default EventRating;
