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
        this.handleStates = this.handleStates.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getDumpData = this.getDumpData.bind(this)
    }
    getDumpData(obj){
        console.log(obj)
    }
    componentDidMount() {
        axios.get('/api/dumpsAdmin.php')
            .then(res => {
                this.setState({
                    dumps: res.data
                })
            })
    }
    // componentDidUpdate(prevProps, prevState){
    //     console.log(this.state.changedStates)
    // }
    handleStates(e, state, id) {
        if (this.state.changedStates.id && this.state.changedStates.id !== id) {
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
    handleSubmit(e) {
        e.preventDefault()
        const States = this.state.changedStates
        for (let i in States) {
            console.log(i, States[i])
        }
        axios({
            method: 'post',
            url: '/api/changesDump.php',
            data: this.state.changedStates
        }).then(res => console.log(res))
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
                                    getDumpData={this.getDumpData}
                                />
                                // <Marker key={index} position={position} icon={SwitchIcon(status)}>
                                //     <Popup minWidth={350}>
                                //         <Form onSubmit={this.handleSubmit}>
                                //             {images.split(';').map((image, i) => {
                                //                 return (
                                //                     <LitterImage key={i} src={image} />
                                //                 )
                                //             }
                                //             )}
                                //             <TextBox>Название: Свалка №{id}</TextBox>
                                //             <TextBox>
                                //                 Категория мусора:
                                //                 <Select onChange={e => this.handleStates(e.target.value, 'status', id)}>
                                //                     <option value={status}>{status}</option>
                                //                     {Statuses.filter(x => x !== status).map((x, i) =>
                                //                         <option key={i} value={x}>{x}</option>)}
                                //                 </Select>
                                //             </TextBox>
                                //             <TextBox>
                                //                 Статус точки:
                                //                 <Select onChange={e => this.handleStates(e.target.value, 'checkStatus', id)}>
                                //                     <option value={checkStatus}>{checkStatus}</option>
                                //                     <option value='проверено'>проверено</option>
                                //                 </Select>
                                //             </TextBox>
                                //             <TextBox>
                                //                 Степень замусоренности:
                                //                 <Select onChange={e => this.handleStates(e.target.value, 'level', id)} on>
                                //                     <option value={level}>{level}</option>
                                //                     {TrashAmounts.filter(x => x !== level).map((x, i) =>
                                //                         <option key={i} value={x}>{x}</option>
                                //                     )}
                                //                 </Select>
                                //             </TextBox>
                                //             <TextBox>e-mail: <a href={`mailto:${email}`}>{email}</a></TextBox>
                                //             <TextBox>Телефон: <a href={`tel:${phone}`}>{phone}</a></TextBox>
                                //             <TextBox>Доп. информация: {additional}</TextBox>
                                //             <SubmitButton type='submit'>Сохранить изменения</SubmitButton>
                                //         </Form>
                                //     </Popup>
                                // </Marker>
                            )
                        })}
                </MapContainer>
            </MapWrapper>
        );
    }
}