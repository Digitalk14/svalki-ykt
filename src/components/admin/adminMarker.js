import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import axios from 'axios'
import { Form, SubmitButton, Select, Input } from '../modal/formStyles'
import { TextBox } from '../typography'
import { Statuses, TrashAmounts } from '../statuses/statuses'

const LitterImage = styled.img`
    width: 100%;
`

export default class AdminMarker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            changedStates: {},
            status: undefined,
            checkStatus: undefined,
            level: undefined,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()

        let obj = {
            id: this.props.id,
            status: this.state.status || this.props.status,
            checkStatus: this.state.checkStatus || this.props.checkStatus,
            level: this.state.level || this.props.level
        }
        axios({
            method: 'post',
            url: '/api/changesDump.php',
            data: {
                id: this.props.id,
                status: this.state.status || this.props.status,
                checkStatus: this.state.checkStatus || this.props.checkStatus,
                level: this.state.level || this.props.level
            }
        }).then(res => console.log(res))
        this.props.getDumpData(obj)
        // const States = this.state.changedStates
        // for (let i in States) {
        //     console.log(i, States[i])
        // }
        // axios({
        //     method: 'post',
        //     url: '/api/changesDump.php',
        //     data: this.state.changedStates
        // }).then(res => console.log(res))
    }
    render() {
        return (
            <Marker position={this.props.position} icon={this.props.icon}>
                <Popup minWidth={350}>
                    <Form onSubmit={this.handleSubmit}>
                        {this.props.images.split(';').map((image, i) => {
                            return (
                                <LitterImage key={i} src={image} />
                            )
                        }
                        )}
                        <TextBox>Название: Свалка №{this.props.id}</TextBox>
                        <TextBox>
                            Категория мусора:
                                <Select onChange={e => this.setState({ status: e.target.value })}>
                                <option value={this.props.status}>{this.props.status}</option>
                                {Statuses.filter(x => x !== this.props.status).map((x, i) =>
                                    <option key={i} value={x}>{x}</option>)}
                            </Select>
                        </TextBox>
                        <TextBox>
                            Статус точки:
                            <Select onChange={e => this.setState({ checkStatus: e.target.value })}>
                                <option value={this.props.checkStatus}>{this.props.checkStatus}</option>
                                <option value='проверено'>проверено</option>
                            </Select>
                        </TextBox>
                        <TextBox>
                            Степень замусоренности:
                            <Select onChange={e => this.setState({ level: e.target.value })}>
                                <option value={this.props.level}>{this.props.level}</option>
                                {TrashAmounts.filter(x => x !== this.props.level).map((x, i) =>
                                    <option key={i} value={x}>{x}</option>
                                )}
                            </Select>
                        </TextBox>
                        <TextBox>e-mail: <a href={`mailto:${this.props.email}`}>{this.props.email}</a></TextBox>
                        <TextBox>Телефон: <a href={`tel:${this.props.phone}`}>{this.props.phone}</a></TextBox>
                        <TextBox>Доп. информация: {this.props.additional}</TextBox>
                        <SubmitButton type='submit'>Сохранить изменения</SubmitButton>
                    </Form>
                </Popup>
            </Marker>
        )
    }
}
