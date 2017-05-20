import React from 'react'

class EventShowTitle extends React.Component {
  render() {
    return (
      <div class="event-show-title">
        <h1 class="event-show-title">Event title</h1>
        <p class="event-show-location">
          <span class="event-show-location-label">Location: </span>
          <span class="event-show-location-city">City, </span>
          <span class="event-show-location-neighborhood">neighborhood</span>
        </p>
      </div>
    )
  }
}

export default EventShowTitle;
