import React from 'react'

class EventShowDescription extends React.Component {
  render() {
    return (
      <div className="event-description">
        <h3>Event Description</h3>
        <hr />
        <p>{this.props.description}</p>        
      </div>
    )
  }
}

export default EventShowDescription;
