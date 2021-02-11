import React from 'react'
import './App.css';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import redBin from './images/red_bin.png'
import greenBin from './images/green_bin.png'
import question from './images/question.png'
import picnic from './images/picnic.png'
import { svalkiExamples } from './components/svalki/svalkiExamples'

const iconSize = [45, 45];
const iconAnchor = [12.5, 41];
const popupAnchor = [0, -45];

let redBinIcon = L.icon({
  iconUrl: redBin,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
  popupAnchor: popupAnchor
})
let greenBinIcon = L.icon({
  iconUrl: greenBin,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
  popupAnchor: popupAnchor
})
let questionIcon = L.icon({
  iconUrl: question,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
  popupAnchor: popupAnchor
})
let picnicIcon = L.icon({
  iconUrl: picnic,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
  popupAnchor: popupAnchor
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const position = [62.027115, 129.732188] //Yakutsk
    const switchIcon = (typeOfIcon) => {
      switch (typeOfIcon) {
        case 'red':
          return redBinIcon;
        case 'green':
          return greenBinIcon;
        case 'question':
          return questionIcon;
        case 'picnic':
          return picnicIcon
      }
    }
    return (
      <div >
        <MapContainer className="map" center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {svalkiExamples.map(({ position, status }, index) => {
            return (
              <Marker key={index} position={position} icon={switchIcon(status)}>

              </Marker>
            )
          })}
          <Marker position={position} icon={redBinIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

