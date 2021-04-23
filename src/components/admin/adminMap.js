import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import redBin from '../../images/red_bin.png'
import greenBin from '../../images/green_bin.png'
import newBin from '../../images/loading.png'
import question from '../../images/question.png'
import picnic from '../../images/picnic.png'
import { svalkiExamples } from '../svalki/svalkiExamples'
import { LocationMarker } from '../map/locationMarker'
import styled from 'styled-components'
import { Text } from '../typography'
import axios from 'axios'
import { Header } from './header'

const MapWrapper = styled.div`
    width: 100%;
    height: 800px;
    box-sizing: border-box;
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
let newIcon = L.icon({
    iconUrl: newBin,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
})

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: svalkiExamples,
            dumps: [],
            filteredStatus: 'all'
        }
        this.getPosition = this.getPosition.bind(this)
        this.filterStatus = this.filterStatus.bind(this)
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
    filterStatus(status){
        this.setState({
            filteredStatus: status
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
                case 'new':
                    return newIcon
            }
        }
        return (
            <MapWrapper >
                <Header pushStatus={(e)=>this.filterStatus(e)}/>
                <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker passPosition={this.getPosition} />
                    {this.state.dumps
                    .filter(stat=> {
                        if(this.state.filteredStatus==='all'){
                            return true
                        }else if(stat.status===this.state.filteredStatus){
                            return true
                        }
                    })
                    .map(({ positionLat, positionLon, status, images, text, name, category, checkStatus, level, additional, id }, index) => {
                        let position = []
                        position.push(positionLat)
                        position.push(positionLon)
                        const TrashCategory = () => {
                            switch (status) {
                                case 'red':
                                    return 'Несанкционированные свалки'
                                case 'green':
                                    return 'Убрано'
                                case 'question':
                                    return 'Другое (кузовы машин и т.д.)'
                                case 'picnic':
                                    return 'Мусор после пикников'
                                case 'new':
                                    return 'На проверке'
                            }
                        }
                        return (
                            <Marker key={index} position={position} icon={switchIcon(status)}>
                                <Popup minWidth={350}>
                                    {images.split(';').map((image, i) => {
                                        return (
                                            <LitterImage key={i} src={image} />
                                        )
                                    }
                                    )}
                                    <Text>Название: Свалка №{id}</Text>
                                    <Text>Категория мусора: {TrashCategory()}</Text>
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