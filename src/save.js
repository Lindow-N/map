import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper,InfoWindow} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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

  const mapStyles = {
    width: '70%',
    height: '100%'
  };

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  
      lat: 0,
      lng: 0,

      mapCenter: {
        lat: 7,
        lng: 7,
        name: ""
      }
    };
  }

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

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0], console.log(results)))
      .then(latLng => {
        console.log('Success', latLng);
        // update center state
        this.setState({ mapCenter: latLng });
        var id = markers.length+1;

        var tab = markers.push({id: id,
            name: this.state.address ,
            position: { lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng}});
            console.log(markers);
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {

    const { lat, lng } = this.state;


    return (
      <div id='googleMaps'>

<div className='todo-app'>
      
     
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}

          className='todo-input'
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Ajouter une ville',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        </div>


        <div className='map'>
        <Map 
          google={this.props.google}
          zoom={3}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          minZoom= {3}
          style={mapStyles}

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
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDE19jz0Ojpx2q-mepUlNKjlH5mUvrkHsM')
})(MapContainer)