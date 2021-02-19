import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import redBin from '../../images/red_bin.png'
import greenBin from '../../images/green_bin.png'
import question from '../../images/question.png'
import picnic from '../../images/picnic.png'
import { svalkiExamples } from '../svalki/svalkiExamples'
import { LocationMarker } from './locationMarker'

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

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: svalkiExamples,
        }
        this.getPosition = this.getPosition.bind(this)
    }
    getPosition(lat, lon, trashType) {
        let state = [...this.state.markers]
        let newPoint = {}
        newPoint.position = []
        newPoint.position.push(lat)
        newPoint.position.push(lon)
        newPoint.status = trashType
        state.push(newPoint)
        this.setState({
            markers: state
        })
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
                <MapContainer className="map" center={position} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker passPosition={this.getPosition} />
                    {this.state.markers.map(({ position, status }, index) => {
                        return (
                            <Marker key={index} position={position} icon={switchIcon(status)}>
                                <Popup >
                                    Some text
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
            </div>
        );
    }
}