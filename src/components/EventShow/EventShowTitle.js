import React from 'react'
import {Row,Col} from 'reactstrap'
import EventBuyButton from './EventBuyButton'
import VoteButton from './VoteButton'

class EventShowTitle extends React.Component {

  getCanBuy(){
    return(
        <div>
          <EventBuyButton
            isJoined={this.props.onBuyTicket}
            onClickBuy={this.props.onBuyTicket}/>
          {this.props.isJoined?<VoteButton users={this.props.users}/>:null}
        </div>
    )
  }

  getCannotBuy(){
    return(
      <div style={{textAlign:'right',color:'#FC5561'}}>
        <i>You don't have enough reputation</i>
      </div>
    )
  }
  render() {
    return (
      <div className="event-show-title">
        <Row>
          <Col xs={this.props.canBuy?10:8}>
            <h1 className="event-show-title">{this.props.title}</h1>
          </Col>
          <Col xs={this.props.canBuy?2:4}>
              {this.props.canBuy?this.getCanBuy():this.getCannotBuy()}
          </Col>
        </Row>
        <p className="event-show-location">
          <span className="event-show-location-label"><b>Location: </b></span><br/>
          <span className="event-show-location-neighborhood">{this.props.location}</span>
        </p>
      </div>
    )
  }
}

export default EventShowTitle;
