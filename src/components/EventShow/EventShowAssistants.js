import React from 'react'
import EventAssistantCollaboration from './EventAssistantCollaboration'
import EventAssistant from './EventAssistant'

class EventShowAssistants extends React.Component {
  render() {
    console.log("EventShowAssistants. props: ",this.props);

    var assistants = this.props.users.map((user) => (
        <EventAssistant
          key={user.id}
          id={user.id}
          name={user.firstname+" "+user.lastname}
          picture={user.pictureUrl}
          size={70}
          content={user.content}
          rating={user.stars}/>
    ))

    return (
      <div>
        <h3>Event assistants({this.props.users.length})</h3>
        <hr/>
        <div className="event-assistant-list">
          {assistants}
        </div>
      </div>
    )
  }
}

export default EventShowAssistants;
