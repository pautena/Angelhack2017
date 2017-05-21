import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class EventShowMap extends React.Component{

  render(){
    console.log("EventShowMap. props: ",this.props);
    var place = this.props.place;
    if(place){
      var location =place.location;
    }else{
      location={lat:0,lng:0};
    }

    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={this.props.onMapLoad}
        defaultZoom={14}
        defaultCenter={location}
      >
      <Marker
        position={location}
      />
      </GoogleMap>
    ));

    return(
      <GettingStartedGoogleMap
        containerElement={
          <div className="event-map-container" />
        }
        mapElement={
          <div className="event-map-element" />
        }
      />
    );
  }
}

export default EventShowMap
