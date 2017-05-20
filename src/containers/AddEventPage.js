import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'
import './AddEventPage.css'
import AddEvent from '../components/AddEvent'
import {browserHistory} from 'react-router'

var nextId=0;
class AddEventPage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      event:{
        name:null,
        description:null,
        date: null,
        place:null,
        numPeople:null,
        tickets:null,
        rating:-1,
        type:null
      },
      error:null
    }
  }

  handleCancel(e){
    e.preventDefault();
    this.props.cancelCreateEvent();
  }

  onSubmit(e){
    e.preventDefault();
    var event = this.state.event;
    console.log("onSubmit. event: ",event);

    if(!event.name){
      this.setState({error:"Set the event name"});
      return;
    }
    if(!event.description){
      this.setState({error:"Set the event description"});
      return;
    }

    if(!event.type){
      this.setState({error:"Set the event tickets"});
      return;
    }

    if(!event.date){
      this.setState({error:"Set the event date"});
      return;
    }

    if(!event.place){
      this.setState({error:"Set the event place"});
      return;
    }

    if(!event.rating){
      this.setState({error:"Set the event rating"});
      return;
    }

    if(!event.numPeople){
      this.setState({error:"Set the event max people"});
      return;
    }

    if(!event.tickets){
      this.setState({error:"Set the event tickets"});
      return;
    }

    this.props.dispatch(addEvent(event.name,event.description,event.type,
                          event.date,event.place,event.rating,
                          parseInt(event.numPeople),parseInt(event.tickets)));

    browserHistory.push('/home');
  }

  onPickDate(date){
    console.log("onPickDate. date: ",date);
    var event = this.state.event;
    event.date=date;
    this.setState({event:event});
  }

  onPlacePicked(placePicked){
    console.log("onPlacePicked. place: ",placePicked);
    var place = {
      label:placePicked.label,
      placeId:placePicked.placeId,
      location:{
        lat:placePicked.location.lat,
        lng:placePicked.location.lng
      }
    }

    var event = this.state.event;
    event.place=place;
    this.setState({event:event});
  }

  onChangeEvent(e){
    var event = this.state.event;
    event[e.target.name] = e.target.value;
    this.setState({event:event});
  }

  onChangeRating(rate){
    if(this.props.profile.stars<rate){
      rate = this.props.profile.stars;
      this.setState({error:"This rate is too big for you"});
    }else{
      this.setState({error:null});
    }

    var event = this.state.event;
    event.rating=rate;
    this.setState({event:event});
  }

  render(){
    return(
      <div className="add-event-container">
        <AddEvent
          event={this.state.event}
          profile={this.props.profile}
          onSubmit={this.onSubmit.bind(this)}
          onChangeRating={this.onChangeRating.bind(this)}
          onChangeEvent={this.onChangeEvent.bind(this)}
          onPlacePicked={this.onPlacePicked.bind(this)}
          onPickDate={this.onPickDate.bind(this)}
          error={this.state.error}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.users.profile
  }
}

AddEventPage = connect(mapStateToProps)(AddEventPage)

export default AddEventPage
