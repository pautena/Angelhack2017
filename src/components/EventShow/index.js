import React from 'react'
import './EventShow.css'
import EventShowTitle from './EventShowTitle'
import EventHost from './EventHost'
import EventShowPicture from './EventShowPicture'
import EventShowDescription from './EventShowDescription'
import EventShowAssistants from './EventShowAssistants'
import EventRating from './EventRating'

export class EventShow extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="event-show-presentation">
          <div className="event-show-details">
            <EventShowTitle />
            <h5>Hosted by</h5>
            <EventHost/>
            <EventRating />
            <div>Base price: 7$</div>
            <EventShowDescription />
          </div>
          <div className="event-show-picture">
            <EventShowPicture />
          </div>
        </div>
        <div className="event-show-assistants">
          <EventShowAssistants />
        </div>
      </div>


    )
  }
}

export default EventShow;
