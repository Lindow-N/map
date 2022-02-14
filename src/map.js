import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
  width: '70%',
  height: '100%'
};

var markers = [
  {
    id: 1,
    name: "Paris",
    position: { lat: 48.856788489137216, lng: 2.3521950779098466 }
  },
  {
    id: 2,
    name: "Tokyo",
    position: { lat: 35.68060395408808, lng: 139.7690013067459 }
  },
  {
    id: 3,
    name: "Pékin",
    position: { lat: 39.90445096377794, lng: 116.40744327976226 }
  },
  {
    id: 4,
    name: "New York",
    position: { lat: 40.712776, lng: -74.005974 }
  },
  {
    id: 5,
    name: "Mexique",
    position: { lat: 23.63480446746952, lng: -102.55273572023772}
  }
];




export class SimpleMap extends Component {

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {} ,         // Shows the InfoWindow to the selected place upon a marker
   
     
    lat: 0,
      lng: 0,
  };

 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount(){
    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
      );
    } else {
      //  // No Support Web
      alert('ERR,')
    }
  }

  render() {
    
    const { lat, lng } = this.state;
    return (

    

      <Map
        google={this.props.google}
        zoom={3}
        style={mapStyles}
        initialCenter={{
          
          lat: 7,
          lng: 7

          
        }}
      >
       
       {markers.map(({id, name, position }) => (
         <Marker
         key={id}
         position={position}
         onClick={this.onMarkerClick}
         name={name}
       ></Marker>
       ))}

      <Marker position={{ lat, lng }} onClick={this.onMarkerClick} name="Votre position"/>
     
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>

      
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDE19jz0Ojpx2q-mepUlNKjlH5mUvrkHsM'
})(SimpleMap);