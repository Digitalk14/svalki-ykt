import React from 'react'
import './App.css';
import Map from './components/map/map'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import redBin from './images/red_bin.png'
import greenBin from './images/green_bin.png'
import question from './images/question.png'
import picnic from './images/picnic.png'
import { svalkiExamples } from './components/svalki/svalkiExamples'




export default class App extends React.Component {


  render() {

    return (
      <div >
        <Map />
      </div>
    );
  }
}

