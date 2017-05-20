import React from 'react'
import {Row,Col} from 'reactstrap'
import GoogleMap from '../components/GoogleMap'
import EventList from '../components/EventList'

class Home extends React.Component{

  render(){
    return(
      <Row>
        <Col xs={8}>
          <GoogleMap/>
        </Col>
        <Col xs={4}>
          <EventList/>
        </Col>
      </Row>
    )
  }
}

export default Home;
