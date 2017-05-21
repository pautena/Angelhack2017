import React from 'react'
import './EventShow.css'
import EventShowTitle from './EventShowTitle'
import EventHost from './EventHost'
import EventShowPicture from './EventShowPicture'
import EventShowDescription from './EventShowDescription'
import EventShowAssistants from './EventShowAssistants'
import EventRating from './EventRating'
import EventShowMap from './EventShowMap'
import {connect} from 'react-redux'
import {buyTicket,getUserProfile,getEventUsers} from '../../actions'
import {Row,Col} from 'reactstrap'
import {browserHistory} from 'react-router'

export class EventShow extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  componentDidMount() {
      if(this.props.event){
        this.props.onGetUserProfile(this.props.event.owner);
        this.props.onGetEventUsers(this.props.event._id);
      }
  }

  render() {

    var canBuy=null;
    if(this.props.profile && this.props.event){
      canBuy=this.props.profile.stars > this.props.event.rating;
    }


    var isJoined= false;

    for (var i=0; i<this.props.users.length && !isJoined; ++i){
      var user = this.props.users[i]
      if(user.email===this.props.profile.email){
        isJoined=true;
      }
    }

    console.log("EventShow. isJoined: ",isJoined,", props: ",this.props);
    return (
      <Row className="event-container">
        <Col xs={12} className="event-show-presentation">
          <Col xs={6}  className="event-show-details">
            <EventShowTitle
              title={this.props.event.name}
              location={this.props.event.place.label}
              canBuy={canBuy}
              isJoined={isJoined}
              users={this.props.users}
              onBuyTicket={this.props.onBuyTicket}/>
            <h5>Hosted by</h5>
            <EventHost
              user={this.props.owner}
              size={60}/>
            <EventRating rating={this.props.event.rating}/>
            <EventShowDescription description={this.props.event.description}/>
          </Col>

          <Col xs={6}  className="event-show-picture">
            <Col xs={12}>
            <EventShowPicture picture={this.props.event.picture}/>
            </Col>
            <Col xs={12}  className="event-show-map">
              <EventShowMap place={this.props.event.place}/>
            </Col>
          </Col>
        </Col>
        <Col xs={12}  className="event-show-assistants">
          <EventShowAssistants users={this.props.users}/>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  console.log("ownProps: ",ownProps);
  var event = state.events.data.filter(event=>event._id===ownProps.params.id)[0];
  var props ={
    event: event,
    profile:state.users.profile
  }

  if(state.events.eventUsers){
    props.users=state.events.eventUsers.filter(obj=>obj.id===ownProps.params.id)[0].users;
  }else{
    props.users=[]
  }

  if(event && state.users.profiles){
    props.owner = state.users.profiles.filter(profile=>profile.id===event.owner)[0]
  }

  return props;
}


const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onBuyTicket: (bring)=>{
      dispatch(buyTicket(ownProps.params.id,bring))

      setTimeout(()=>{
        console.log("redirect to /home");
        browserHistory.push('/home')
      },1000);
    },
    onGetUserProfile:(ownerId)=>{
      dispatch(getUserProfile(ownerId));
    },
    onGetEventUsers:(eventId)=>{
      dispatch(getEventUsers(eventId));
    }
  }
}

EventShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShow)

export default EventShow;
