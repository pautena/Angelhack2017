import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class MyGoogleMap extends React.Component{

  constructor(props){
    super(props);
    this.state={
      currentLocation:{lat:41.3978044,lng:2.1905242}
    }
  }

  componentDidMount(){
    if (navigator.geolocation) {
      console.log("this navigator have geolocation");
      navigator.geolocation.getCurrentPosition((position) =>{
        console.log("current position: ",position);
        this.setState({
          currentLocation:{
            lat:position.coords.latitude,
            lng:position.coords.longitude
          }
        });
      }, () =>{
        console.error("this navigator not have geolocation");
      });
    }
  }

  render(){
    console.log("MyGoogleMap. props: ",this.props);
    const GettingStartedGoogleMap = withGoogleMap(props => (
        <GoogleMap
          ref={this.props.onMapLoad}
          defaultZoom={14}
          defaultCenter={this.state.currentLocation}
        >
        {this.props.events.map((event, index) => (
          <Marker
            key={index}
            position={event.place.location}
            onClick={() => props.onMarkerRightClick(index)}
          />
        ))}
        </GoogleMap>
      ));

    return(
      <GettingStartedGoogleMap
        containerElement={
          <div style={{ height: `400px` }} />
        }
        mapElement={
          <div style={{ height: `400px` }} />
        }
      />
    );
  }
}

export default MyGoogleMap;
