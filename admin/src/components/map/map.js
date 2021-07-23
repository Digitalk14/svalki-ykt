import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import redBin from '../../images/red_bin.png'
import greenBin from '../../images/green_bin.png'
import question from '../../images/question.png'
import picnic from '../../images/picnic.png'
import { svalkiExamples } from '../svalki/svalkiExamples'
import { LocationMarker } from './locationMarker'
import styled from 'styled-components'
import { Text } from '../typography'
import axios from 'axios'

const MapWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    height: 800px;
    margin: 30px 0;
    padding: 0 20px;
    box-sizing: border-box;
    @media (max-width:700px){
        padding: 0;
        height: 80vh;
    }
`
const LitterImage = styled.img`
    width: 100%;
`

const iconSize = [25, 25];
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
            dumps: []
        }
        this.getPosition = this.getPosition.bind(this)
    }
    componentDidMount() {
        axios.get('/api/dumps.php')
            .then(res => {
                this.setState({
                    dumps: res.data
                })

            })
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
            <MapWrapper >
                <MapContainer style={{ height: "100%" }} center={position} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker passPosition={this.getPosition} />
                    {this.state.dumps.map(({ positionLat, positionLon, status, images, text, name, category, checkStatus, level, additional }, index) => {
                        let position = []
                        position.push(positionLat)
                        position.push(positionLon)
                        return (
                            <Marker key={index} position={position} icon={switchIcon(status)}>
                                <Popup minWidth={350}>
                                    {/* <LitterImage src={images[0]} /> */}
                                    <Text>Название: {name}</Text>
                                    <Text>Категория мусора: {category}</Text>
                                    <Text>Статус точки: {checkStatus}</Text>
                                    <Text>Степень замусоренности: {level}</Text>
                                    {additional ? <Text>Доп. информация: {additional}</Text> : null}
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
            </MapWrapper>
        );
    }
}