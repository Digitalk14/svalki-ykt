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
    height: 300px;
    object-fit: contain;
`
const ImageWrapper = styled.div`
    width: 100%;
    position: relative;
    white-space: nowrap;
    height: 300px;
    display: flex;
    margin: 0 0 30px 0;
`
const ImagesScroller = styled.div`
    width: 100%;
    position: absolute;
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    top: 0;
    left: 0;
    &::-webkit-scrollbar {
        width: 10px;
        height: 20px;
        border: none;
    }
    &::-webkit-scrollbar-thumb{
        background: #d6dee1;
        width: 20px;
        height: 20px;
        border-radius: 20px;
    }
`
// -webkit-overflow-scrolling: touch;
//     scroll-snap-type: x mandatory;
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
                                                    <LitterImage key={i} src={image} />
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