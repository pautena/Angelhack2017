import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import EventCard from './EventCard'
import {Row,Col} from 'reactstrap'
import './EventList.css'

class EventList extends React.Component{

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = ReactDOM.findDOMNode(this);
    // Determine if `domNode` fully fits inside `containerDomNode`.
    // If not, set the container's scrollTop appropriately.
  }


  render(){
    var username = this.props.profile.firstname+" "+this.props.profile.lastname;

    console.log("EventList. props: ",this.props);
    return(
      <Row className="event-list-container">
        {this.props.events.map(event =>
          <Col xs={12} key={event._id}>
            <EventCard
              id={event._id}
              title={event.name}
              content={event.place.label}
              date={event.date}
              type={event.type}
              active={event._id === this.props.focusEventId}
              scrollIntoView={this.scrollElementIntoViewIfNeeded.bind(this)}
              onClickCard={(id)=>{console.log("asdf");this.props.onClickEvent(id);}}
              backgroundImage={event.picture?event.picture:null}
              numPeople={event.numPeople}
              tickets={event.tickets}
              rating={event.rating}
              pictureUrl={this.props.profile.pictureUrl}
              pictureTooltip={username}
              onClick={() => this.props.onEventClick(event._id)}
              style={{cursor:'pointer'}}
            />
          </Col>
        )}
      </Row>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onEventClick: PropTypes.func.isRequired
}

export default EventList
