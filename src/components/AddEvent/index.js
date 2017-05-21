import React from 'react'
import {Row,Button,Col,Alert} from 'reactstrap'
import AddEventLeft from './AddEventLeft'
import AddEventRight from './AddEventRight'
import Rating from 'react-rating'


class AddEvent extends React.Component{

  render(){
    if(this.props.event.rating===-1){
      var rate = this.props.profile.stars;
    }else{
      var rate = this.props.event.rating;
    }


      return(
          <div>
            <form onSubmit={this.props.onSubmit}>
              <Row>
                <Col xs={10} style={{marginBottom:'32px'}}>
                  <h1>Create event</h1>
                </Col>
                <Col xs={2}>
                    <button
                      className="btn-create-event"
                      style={{float:'right',marginRight:'16px',opacity:1}}>
                      Create
                    </button>
                </Col>
                <Col xs={12} style={{paddingLeft:'32px',paddingRight:'32px'}}>
                    {this.props.error?<Alert color="danger">{this.props.error}</Alert>:null}
                </Col>
                <Col xs={12} className="add-event-rating-container">
                  <Rating
                    className="add-event-rating"
                    empty="fa fa-star-o fa-2x"
                    full="fa fa-star fa-2x"
                    start={0}
                    stop={5}
                    onChange={(rate) => this.props.onChangeRating(rate)}
                    initialRate={rate}/>
                </Col>
                <AddEventLeft {...this.props} xs={6}/>
                <AddEventRight {...this.props} xs={6}/>
              </Row>
              <div>
              </div>
            </form>
          </div>
        );
  }
}

export default AddEvent
