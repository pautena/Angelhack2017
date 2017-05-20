import React from 'react'
import MyGoogleMap from './MyGoogleMap'
import './HomeMap.css'


class HomeMap extends React.Component{

  render(){
    return(
      <div className="home-container">
        <select className="distance-select">
          <option default>1 km</option>
          <option>10 km</option>
          <option>20 km</option>
          <option>50 km</option>
        </select>
        <MyGoogleMap
          events={this.props.events}
          onMarkerClick={this.props.onMarkerEventClick}/>
      </div>
    )
  }
}

export default HomeMap
