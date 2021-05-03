import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { svalkiExamples } from '../svalki/svalkiExamples'
import { LocationMarker } from '../map/locationMarker'
import styled from 'styled-components'
import { TextBox } from '../typography'
import axios from 'axios'
import { Header } from './header'
import { Statuses, TrashAmounts } from '../statuses/statuses'
import { SwitchIcon } from '../map/switchIcon'
import {Form, SubmitButton, Select, Input} from '../modal/formStyles'


const MapWrapper = styled.div`
    width: 100%;
    height: 800px;
    box-sizing: border-box;
`
const LitterImage = styled.img`
    width: 100%;
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
        this.handleStates = this.handleStates.bind(this)
    }
    componentDidMount() {
        axios.get('/api/dumpsAdmin.php')
            .then(res => {
                this.setState({
                    dumps: res.data
                })
            })
    }
    handleStates(e, state, id) {
        if (this.state.changedStates.id && this.state.changedStates.id !== id) {
            console.log(this.state.changedStates)
            this.setState({
                changedStates: {}
            })
            const array = {}
            array[state] = e
            array['id'] = id
            this.setState({
                changedStates: array,
            })
        } else {
            const array = { ...this.state.changedStates }
            array[state] = e
            array['id'] = id
            this.setState({
                changedStates: array,
            })
        }

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
                <Header pushStatus={(e) => this.filterStatus(e)} />
                <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker passPosition={this.getPosition} />
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
                                <Marker key={index} position={position} icon={SwitchIcon(status)}>
                                    <Popup minWidth={350}>
                                        <Form>
                                            {images.split(';').map((image, i) => {
                                                return (
                                                    <LitterImage key={i} src={image} />
                                                )
                                            }
                                            )}
                                            <TextBox>Название: Свалка №{id}</TextBox>
                                            <TextBox>
                                                Категория мусора:
                                                <Select onChange={e => this.handleStates(e.target.value, 'status', id)}>
                                                    <option value={status}>{status}</option>
                                                    {Statuses.filter(x => x !== status).map((x, i) =>
                                                        <option key={i} value={x}>{x}</option>)}
                                                </Select>
                                            </TextBox>
                                            <TextBox>
                                                Статус точки:
                                                <Select onChange={e => this.handleStates(e.target.value, 'checkStatus', id)}>
                                                    <option value={checkStatus}>{checkStatus}</option>
                                                    <option value='проверено'>проверено</option>
                                                </Select>
                                            </TextBox>
                                            <TextBox>
                                                Степень замусоренности:
                                                <Select onChange={e => this.handleStates(e.target.value, 'level', id)}>
                                                    <option value={level}>{level}</option>
                                                    {TrashAmounts.filter(x => x !== level).map((x, i) =>
                                                        <option key={i} value={x}>{x}</option>
                                                    )}
                                                </Select>
                                            </TextBox>
                                            <TextBox>e-mail: <a href={`mailto:${email}`}>{email}</a></TextBox>
                                            <TextBox>Телефон: <a href={`tel:${phone}`}>{phone}</a></TextBox>
                                            <TextBox>Доп. информация: {additional}</TextBox>
                                            <SubmitButton type='submit'>Сохранить изменения</SubmitButton>
                                        </Form>
                                    </Popup>
                                </Marker>
                            )
                        })}
                </MapContainer>
            </MapWrapper>
        );
    }
}