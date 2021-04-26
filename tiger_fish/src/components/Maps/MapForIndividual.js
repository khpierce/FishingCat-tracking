import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';


const containerStyle = {
  display: 'flex',
  width: 'calc(100% - 250px)',
  height: 'calc(100% - 70px)'
}


export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
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

    const data = this.props.listofLocationFromParent.FilterData
    const selectedDate = this.props.listofLocationFromParent.selectedDate

    if(Object.keys(data).length === 0) {
      alert("No Data.")
    }

    const LocationDateSelectedFileterArray = []
    var filtered = data.filter(item => item.locationDate.includes(selectedDate))

    if(selectedDate === null) {
      filtered = data
    }
    

    // console.log(LocationDateSelectedFileterArray)

    const AllLatLng = []
    const LatLngForPolyline = []

    {filtered.map(myLocation => {
      LatLngForPolyline.push({lat: parseFloat(myLocation.lat), lng: parseFloat(myLocation.lng)})
    })}

    const initCenterLat = []
    const initCenterLng = []
      
    {filtered.map(item => {
      // console.log(item)
      AllLatLng.push({deviceIMEI: item.deviceIMEI, latitude: item.lat, longtitude: item.lng, locationTime: item.locationTime, locationDate: item.locationDate})
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

    return (
      <Map 
      google={this.props.google}
      zoom={16}
      containerStyle={containerStyle}
      initialCenter={myLatLang}
      center={myLatLang}
      onClick={this.onMapClicked}
      >
        {AllLatLng.map(items => (
          <Marker
          name = {{Time: items.locationTime, Date: items.locationDate}}
          position={{lat: items.latitude, lng: items.longtitude}}
          onClick={this.onMarkerClick} 
          />
        ))}

        {Object.keys(this.state.selectedPlace).length !== 0 ? (
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
            <div>
              <p>Date: {this.state.selectedPlace.name.Date}</p>
              <p>Time: {this.state.selectedPlace.name.Time}</p>
              <p>Latitude: {this.state.selectedPlace.position.lat}</p>
              <p>Longtitude: {this.state.selectedPlace.position.lng}</p>
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

        <Polyline
        geodesic={true}
        path = {LatLngForPolyline}
        options = {{
          strokeColor: '#C30000',
          strokeOpacity: 1,
          strokeWeight: 6,
          icons: [
            {
                strokeWeight: 2,
                offset: '0%',
                repeat: '35px'
            }
          ]
        }} />

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDrFxlxebch2VpFIyeRY11cd0JChlzAw-g')
})(MapContainer)