//6-80 (53)
//6-81v(54)

import React, { Component } from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const containerStyle = {
  // position: 'relative',  
  display: 'flex',
  width: '100%',
  height: '550px'
}
 
export class MapContainer extends Component {

  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

  render() {
  
    const location = this.props.ListLocation
    console.log(location)

    const AllLatLng = []
    const initCenterLat = []
    const initCenterLng = []
      
    {location.map(item => {
      AllLatLng.push({deviceIMEI: item.deviceIMEI, name: item.name, latitude: item.lat, longtitude: item.lng, locationTime: item.locationTime})
      initCenterLat.push(parseFloat(item.lat))
      initCenterLng.push(parseFloat(item.lng))
    })}

    const sumLat = initCenterLat.reduce((result,number) => result+number, 0)/AllLatLng.length
    var initCenterLatAvg = sumLat.toString()
    if (initCenterLatAvg === "NaN") {
      initCenterLatAvg = "0"
    }
    
    const sumLng = initCenterLng.reduce((result,number) => result+number, 0)/AllLatLng.length
    var initCenterLngAvg = sumLng.toString()
    if (initCenterLngAvg === "NaN") {
      initCenterLngAvg = "0"
    }

    const myLatLang = {lat: initCenterLatAvg, lng: initCenterLngAvg}
    console.log(myLatLang)

    return (
      <Map 
      google={this.props.google}
      zoom={16}
      containerStyle={containerStyle}
      initialCenter={myLatLang}
      center={myLatLang}
      >
        {AllLatLng.map(items => (
          <Marker
          name = {{deviceIMEI: items.deviceIMEI, name: items.name, locationTime: items.locationTime}}
          position={{lat: items.latitude, lng: items.longtitude}}
          onClick={this.onMarkerClick} 
          />
        ))}
        
        {Object.keys(this.state.selectedPlace).length !== 0 ? (
          <InfoWindow
          pixelOffset={"0"}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
            <div>
              <p>Device IMEI: {this.state.selectedPlace.name.deviceIMEI}</p>
              <p>Name: {this.state.selectedPlace.name.name}</p>
              <p>Latitude: {this.state.selectedPlace.position.lat}</p>
              <p>Longtitude: {this.state.selectedPlace.position.lng}</p>
              <p>Time: {this.state.selectedPlace.name.locationTime}</p>
            </div>
          </InfoWindow>
        ) : (
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
            <div>
            </div>
          </InfoWindow>
        )}


      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDrFxlxebch2VpFIyeRY11cd0JChlzAw-g')
})(MapContainer)