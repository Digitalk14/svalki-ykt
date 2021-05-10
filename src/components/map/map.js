import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { LocationMarker } from './locationMarker'
import styled from 'styled-components'
import { Text } from '../typography'
import axios from 'axios'
import { SwitchIcon } from './switchIcon'
import {ImageWrapper, ImagesScroller, LitterImage} from '../Carousel/carousel'

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

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
        }
        this.getPosition = this.getPosition.bind(this)
        this.refreshTheMap = this.refreshTheMap.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }
    componentDidMount() {
        axios.get('/api/dumps.php')
            .then(res => {
                this.setState({
                    markers: res.data
                })
            })
            .catch(err=>{
                console.log(err)
                this.props.showNotification('Проблема при загрузке карты','error')
            })
    }
    refreshTheMap() {
        axios.get('/api/dumps.php')
            .then(res => {
                this.setState({
                    markers: res.data
                })
            })
            .catch(err=>{
                console.log(err)
                this.props.showNotification('Проблема при загрузке карты','error')
            })
    }
    closePopup(){
        console.log(this.popupRef.current)
        this.popupRef.current._source._map._popup._closeButton.onclick()
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
                <MapContainer style={{ height: "100%" }} center={position} zoom={13} scrollWheelZoom={true} c>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        passPosition={this.getPosition}
                        refreshTheMap={this.refreshTheMap}
                        showNotification={this.props.showNotification}
                        closePopup={this.closePopup}
                    />
                    {this.state.markers.map(({ positionLat, positionLon, status, images, text, name, category, checkStatus, level, additional, id }, index) => {
                        let position = []
                        position.push(positionLat)
                        position.push(positionLon)
                        return (
                            <Marker key={index} position={position} icon={SwitchIcon(status)}>
                                <Popup minWidth={350} >
                                    <ImageWrapper>
                                        <ImagesScroller>
                                            {images.split(';').filter(x => x.length > 2).map((image, i) => {
                                                return (
                                                    <a href={image} target="_blank">
                                                    <LitterImage key={i} src={image} />
                                                    </a>
                                                )
                                            }
                                            )}
                                        </ImagesScroller>
                                    </ImageWrapper>
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