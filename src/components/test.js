import React, { Component } from 'react';
import MarkersList from './testMarkerslist';
import {Map, Marker, GoogleApiWrapper,InfoWindow} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


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
      edit : false,
      editID : 0,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  
      lat: 0,
      lng: 0,

      mapCenter: {
        lat: 35,
        lng: 7,
        name: ""
      },

      tab : [{
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
      }]
    };
  }
  

//Suppr et mod task

  handleDelete = todo => {
    const tab = this.state.tab.filter((t) => {
        return t.id !== todo
    });
    this.setState({ tab });
}

  handleEdit = (e) => {
 
    this.setState({edit: e.edit , editID:e.id})
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
      { enableHighAccuracy: true, timeout: 100000, maximumAge: 10000 },
      );
    } else {
      //  // No Support Web
      alert('ERR,')
    }
  }
  
  //Info Marker

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

// Autocomplete 

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
       
        // update center state
        this.setState({ mapCenter: latLng });


        if (this.state.edit){

          const newIds = this.state.tab.slice() //copy the array
          newIds[this.state.editID-1] = {id: id,
          name: this.state.address ,
          position: { lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng}} //execute the manipulations
          this.setState({tab: newIds}) //set the new state


        }

        else {
          var id = this.state.tab.length+1;

          var tab = this.state.tab.push({id: id,
              name: this.state.address ,
              position: { lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng}});
              
             this.setState({address:""})
  
        }
        this.setState({edit: false, address:""})

      })
      .catch(error => console.error('Error', error));
  };
 

  
  render() {

    const { lat, lng } = this.state;


    return (
      <div id='googleMaps'>

<div className='todo-app'>
      
{this.state.edit ? (<PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}

                    > 
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

            
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Modifier la ville',
                  className: 'todo-input edit',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                 
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#161a2b', cursor: 'pointer' , color:'#fff' , padding:'5px 0'};
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
) : (

  <PlacesAutocomplete
  value={this.state.address}
  onChange={this.handleChange}
  onSelect={this.handleSelect}

>


  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

    
    <div>
      <input
        {...getInputProps({
          placeholder: 'Ajouter une ville',
          className: 'todo-input',
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
            : { backgroundColor: '#161a2b', cursor: 'pointer' , color:'#fff' , padding:'5px 0'};
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
           
           )}
        


                <MarkersList tab = {this.state.tab} delete = {this.handleDelete} Edit = {this.handleEdit}/>

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

            
{this.state.tab.map(({id, name, position }) => (
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

