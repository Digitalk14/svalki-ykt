import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { svalkiExamples } from '../svalki/svalkiExamples'
import { LocationMarker } from '../map/locationMarker'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from './header'
import { SwitchIcon } from '../map/switchIcon'
import AdminMarker from './adminMarker'



const MapWrapper = styled.div`
    width: 100%;
    height: 800px;
    box-sizing: border-box;
`

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: svalkiExamples,
            dumps: [],
            filteredStatus: 'all',
            changedStates: {},
            changedDumpId: ''
        }
        this.getPosition = this.getPosition.bind(this)
        this.filterStatus = this.filterStatus.bind(this)
        this.refreshTheMap = this.refreshTheMap.bind(this)
    }
    componentDidMount() {
        axios.get('/api/dumpsAdmin.php')
            .then(res => {
                this.setState({
                    dumps: res.data
                })
            })
    }
    refreshTheMap() {
        axios.get('/api/dumpsAdmin.php')
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
    filterStatus(status) {
        this.setState({
            filteredStatus: status
        })
    }
    render() {
        const position = [62.027115, 129.732188] //Yakutsk

        return (
            <MapWrapper >
                <Header pushStatus={(e) => this.filterStatus(e)} isLoggedOut={(e)=>this.props.isLoggedOut(e)}/>
                <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker passPosition={this.getPosition} updateDupms={this.refreshTheMap}/>
                    {this.state.dumps
                        .filter(stat => {
                            if (this.state.filteredStatus === 'all') {
                                return true
                            } else if (stat.status === this.state.filteredStatus) {
                                return true
                            }
                        })
                        .map(({ positionLat, positionLon, status, images, checkStatus, level, additional, id, email, phone }, index) => {
                            let position = []
                            position.push(positionLat)
                            position.push(positionLon)
                            return (
                                <AdminMarker
                                    key={index}
                                    position={position}
                                    icon={SwitchIcon(status)}
                                    images={images}
                                    id={id}
                                    status={status}
                                    checkStatus={checkStatus}
                                    level={level}
                                    email={email}
                                    phone={phone}
                                    additional={additional}
                                    refreshTheMap={this.refreshTheMap}
                                />
                            )
                        })}
                </MapContainer>
            </MapWrapper>
        );
    }
}