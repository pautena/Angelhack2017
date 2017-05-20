import React from 'react'
import EventAssistantCollaboration from './EventAssistantCollaboration'

class EventShowAssistants extends React.Component {
  render() {
    return (
      <div>
        <h3>Event assistants(4)</h3>
        <hr/>
        <div className="event-assistant-list">

        {[1,2,3,4].map((index) => (
            <EventAssistantCollaboration key={index} id={index} />
        ))}

        </div>
      </div>
    )
  }
}

export default EventShowAssistants;
