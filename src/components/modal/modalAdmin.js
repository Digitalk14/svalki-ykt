import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { Form, SubmitButton, Select, Input, SubmitModal } from './formStyles'
import { Statuses, TrashAmounts } from '../statuses/statuses'
import { UploadButton } from '../uploadCare/uploadCare'

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trashAmount: '',
            trashType: '',
            additionalText: '',
            userEmail: '',
            userPhone: '',
            userImages: '',
            handleError: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
        this.getUploadLinks = this.getUploadLinks.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        if (
            this.state.trashAmount === '' ||
            this.state.trashType === '' ||
            this.state.userEmail.length < 1
            // this.state.userImages.length<1
        ) {
            this.setState({
                handleError: true
            })
            return false
        } else {
            this.setState({
                handleError: false,
                isSubmit: true,
            })
        }

        axios({
            method: 'post',
            url: '/api/addDump.php',
            data: {
                positionLat: this.props.positionLat,
                positionLon: this.props.positionLon,
                status: this.state.trashType,
                checkStatus: 'на проверке',
                level: this.state.trashAmount,
                additional: this.state.additionalText,
                email: this.state.userEmail,
                phone: this.state.userPhone || '',
                images: this.state.userImages
            }
        })
            .then(res => {
                // this.props.showNotification('Благодарим за неравнодушие!', '')
                if(typeof window !== 'undefined'){
                    window.location.reload()
                }
                // this.props.refreshTheMap(),
                // this.setState({
                //     trashType: '',
                //     trashAmount: '',
                //     additionalText: '',
                //     userEmail: '',
                //     userPhone: '',
                //     userImages: '',
                // }),
                // this.props.closePopup()
            })
            .catch(err =>
                this.props.showNotification('Упс, что-то пошло не так!', 'error'),
                this.props.closePopup()
            )
    }

    handleChangeType(e) {
        this.setState({
            trashType: e.target.value,
        })
    }
    getUploadLinks(links) {
        this.setState({
            userImages: links,
        })
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                Укажите тип мусора*:
                <Select
                    onChange={(e) => this.setState({ trashType: e.target.value })}
                    defaultValue="none"
                    valid={this.state.handleError && this.state.trashType === '' ? false : true}
                >
                    <option value='none'>Укажите тип мусора</option>
                    {Statuses.filter(x => x !== 'Убрано' && x !== 'new').map((status, id) =>
                        <option key={id} value={status}>{status}</option>
                    )}
                </Select>
                Укажите объём свалки*:
                <Select
                    defaultValue="none"
                    onChange={(e) => this.setState({ trashAmount: e.target.value })}
                    valid={this.state.handleError && this.state.trashAmount === '' ? false : true}
                >
                    <option value="none">Укажите объём свалки</option>
                    {TrashAmounts.map((amount, i) =>
                        <option key={i} value={amount}>{amount}</option>
                    )}
                </Select>
                Загрузите фото*: (максимум 5 МБ)
                <UploadButton getUploadLinks={e => this.getUploadLinks(e)} />
                Укажите Ваш e-mail*:
                <Input
                    onChange={e => this.setState({ userEmail: e.target.value })}
                    placeholder='E-mail*'
                    valid={this.state.handleError && this.state.userEmail.length < 1 ? false : true}
                />
                При желании можете оставить свой номер телефона:
                <Input valid={true} onChange={e => this.setState({ userPhone: e.target.value })} placeholder='Номер телефона' />
                Дополнительные примечания:
                <Input valid={true} onChange={e => this.setState({ additionalText: e.target.value })} placeholder='Краткое описание' />
                <SubmitButton type="submit" >Отправить</SubmitButton>
            </Form>
        )
    }
}