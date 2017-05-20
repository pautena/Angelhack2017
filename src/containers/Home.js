import React from 'react'
import {Row,Col} from 'reactstrap'
import HomeMap from '../components/HomeMap'
import EventList from '../components/EventList'
import {connect} from 'react-redux'
import {getEvents,getProfile} from '../actions'
import {browserHistory} from 'react-router'

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
      selectedEventId:-1
    }
  }

  componentDidMount(){
    this.props.onGetEvents();
    this.props.onGetProfile();
  }

  onClickEvent(eventId){
    console.log("onClickEvent. eventId: ",eventId);
    browserHistory.push(`/event/${eventId}`);
  }

  onMarkerEventClick(eventId){
    console.log("onMarkerEventClick. eventId: ",eventId);
    this.setState({selectedEventId:eventId});
  }

  render(){
    return(
      <Row>
        <Col xs={7}>
          <HomeMap
            events={this.props.events}
            onMarkerEventClick={this.onMarkerEventClick.bind(this)}/>
        </Col>
        <Col xs={5}>
          <EventList
            onClickEvent={this.onClickEvent.bind(this)}
            profile={this.props.profile}
            events={this.props.events}
            focusEventId={this.state.selectedEventId}
            onEventClick={(event)=>{}}/>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.data,
    profile: state.users.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetEvents: ()=>{
      dispatch(getEvents())
    },
    onGetProfile: ()=>{
      dispatch(getProfile())
    }
  }
}

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;
