import React from 'react'
import EventCollaboration from './EventCollaboration'
import EventAssistant from './EventAssistant'

class EventShowAssistants extends React.Component {
  render() {
    return (
      <div className="event-assistant-collaboration">
        <EventAssistant id={this.props.id}/>
        <EventCollaboration />
      </div>
    )
  }
}

export default EventShowAssistants;
