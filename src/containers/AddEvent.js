import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Row,Col,InputGroup,InputGroupAddon,Input,Alert,
  DropdownToggle,Dropdown,DropdownItem,DropdownMenu } from 'reactstrap'
import ToggleSwitch from '../components/utils/ToggleSwitch'
import EnterInput from '../components/utils/EnterInput'
import Chip from '../components/utils/Chip'
import './AddEvent.css'
import Geosuggest from 'react-geosuggest'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Rating from 'react-rating'

var nextId=0;
class AddEvent extends React.Component{

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
      showDatePicker:false,
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

    this.props.onFinishCreateEvent();
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

  showCalendar(show){
    this.setState({showDatePicker:show});
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

    if(this.state.event.rating===-1){
      var rate = this.props.profile.stars;
    }else{
      var rate = this.state.event.rating;
    }

    var  eventTypes= ['Korean','Chinesse'];

    var eventTypeOptions = eventTypes.map((eventType)=><option value={eventType}/>);

    return(
      <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className}>

        <form onSubmit={this.onSubmit.bind(this)}>
          <ModalHeader toggle={this.toggle}>Create event</ModalHeader>
          <ModalBody>
              <Row>
                <Col xs={12}>
                    {this.state.error?<Alert color="danger">{this.state.error}</Alert>:null}
                </Col>

                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Event name</InputGroupAddon>
                    <Input name="name" onChange={this.onChangeEvent.bind(this)}/>
                  </InputGroup>
                </Col>
                <Col xs={12}>

                </Col>
                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Description</InputGroupAddon>
                    <Input name="description" onChange={this.onChangeEvent.bind(this)}/>
                  </InputGroup>
                </Col>
                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Type</InputGroupAddon>
                    <Input name="type" onChange={this.onChangeEvent.bind(this)} list="event-type"/>
                      <datalist id="event-type">
                        {eventTypeOptions}
                      </datalist>
                  </InputGroup>
                </Col>

                <Col xs={12} className="form-row">
                  <InfiniteCalendar
                    width={400}
                    height={200}
                    onSelect={this.onPickDate.bind(this)}/>
                </Col>
                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Rating</InputGroupAddon>
                        <Rating
                          empty="fa fa-star-o fa-2x"
                          full="fa fa-star fa-2x"
                          start={0}
                          stop={5}
                          onChange={(rate) => this.onChangeRating(rate)}
                          initialRate={rate}/>
                  </InputGroup>
                </Col>
                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Num people</InputGroupAddon>
                    <Input name="numPeople" type="number" onChange={this.onChangeEvent.bind(this)}/>
                  </InputGroup>
                </Col>
                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Tickets</InputGroupAddon>
                    <Input name="tickets" type="number" onChange={this.onChangeEvent.bind(this)}/>
                  </InputGroup>
                </Col>
                <Col xs={12} className="form-row">
                  <InputGroup>
                    <InputGroupAddon>Place</InputGroupAddon>
                    <Geosuggest className="form-control"
                       placeholder=""
                       onSuggestSelect={this.onPlacePicked.bind(this)}/>
                  </InputGroup>
                </Col>
              </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
            <Button color="secondary" onClick={this.handleCancel.bind(this)}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    );

  }
}

AddEvent = connect()(AddEvent)

export default AddEvent
