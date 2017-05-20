import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Row,Col,InputGroup,InputGroupAddon,Input,Alert} from 'reactstrap'
import Geosuggest from 'react-geosuggest'

class AddEventLeft extends React.Component{

  render(){
    var  eventTypes= [{id:0,name:'Korean'},{id:1,name:'Chinesse'}];

    var eventTypeOptions = eventTypes.map((eventType)=>{
        return (<option key={eventType.id} value={eventType.name}/>);
    });

    return(
      <Col xs={this.props.xs} className="add-event-left-container">

        <Col xs={12} className="form-row">
          <InputGroup>
            <InputGroupAddon>Event name</InputGroupAddon>
            <Input name="name" onChange={this.props.onChangeEvent}/>
          </InputGroup>
        </Col>
        <Col xs={12}>

        </Col>
        <Col xs={12} className="form-row">
          <InputGroup>
            <InputGroupAddon>Description</InputGroupAddon>
            <Input name="description" onChange={this.props.onChangeEvent}/>
          </InputGroup>
        </Col>
        <Col xs={12} className="form-row">
          <InputGroup>
            <InputGroupAddon>Type</InputGroupAddon>
            <Input name="type" onChange={this.props.onChangeEvent} list="event-type"/>
              <datalist id="event-type">
                {eventTypeOptions}
              </datalist>
          </InputGroup>
        </Col>

        <Col xs={12} className="form-row">
          <InputGroup>
            <InputGroupAddon>Num people</InputGroupAddon>
            <Input name="numPeople" type="number" onChange={this.props.onChangeEvent}/>
          </InputGroup>
        </Col>
        <Col xs={12} className="form-row">
          <InputGroup>
            <InputGroupAddon>Tickets</InputGroupAddon>
            <Input name="tickets" type="number" onChange={this.props.onChangeEvent}/>
          </InputGroup>
        </Col>
        <Col xs={12} className="form-row">
          <InputGroup>
            <InputGroupAddon>Place</InputGroupAddon>
            <Geosuggest className="form-control"
               placeholder=""
               onSuggestSelect={this.props.onPlacePicked}/>
          </InputGroup>
        </Col>
      </Col>
    );
  }
}

export default AddEventLeft
