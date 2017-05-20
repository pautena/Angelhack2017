import React from 'react'
import MyGoogleMap from './MyGoogleMap'
import './HomeMap.css'


class HomeMap extends React.Component{

  render(){
    return(
      <div className="home-container">
        <h5>1km distance</h5>
        <MyGoogleMap events={this.props.events}/>
      </div>
    )
  }
}

export default HomeMap
