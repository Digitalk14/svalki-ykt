import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { LocationMarker } from './locationMarker'
import styled from 'styled-components'
import { Text } from '../typography'
import axios from 'axios'
import { Statuses } from '../statuses/statuses'
import { SwitchIcon } from './switchIcon'
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


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
        }
        this.getPosition = this.getPosition.bind(this)
    }
    componentDidMount() {
        axios.get('/api/dumps.php')
            .then(res => {
                this.setState({
                    markers: res.data
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

        return (
            <MapWrapper >
                <MapContainer style={{ height: "100%" }} center={position} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker passPosition={this.getPosition} />
                    {this.state.markers.map(({ positionLat, positionLon, status, images, text, name, category, checkStatus, level, additional, id }, index) => {
                        let position = []
                        position.push(positionLat)
                        position.push(positionLon)
                        return (
                            <Marker key={index} position={position} icon={SwitchIcon(status)}>
                                <Popup minWidth={350}>
                                    {images.split(';').map((image, i) => {
                                        return (
                                            <LitterImage key={i} src={image} />
                                        )
                                    }
                                    )}
                                    <Text>Название: Свалка №{id}</Text>
                                    <Text>Категория мусора: {status}</Text>
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