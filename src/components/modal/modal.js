import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { Form, SubmitButton, Select, Input, SubmitModal } from '../modal/formStyles'
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
            isSubmit: false,
            modalContent: ''
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
            this.state.userEmail.length < 1 ||
            this.state.userImages.length<1
        ) {
            this.setState({
                handleError: true
            })
            return false
        } else {
            this.setState({
                handleError: false,
                isSubmit: true,
                modalContent: 'Загрузка. Пожалуйста подождите'
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
        }).then(res =>
            this.setState({
                modalContent: 'Благодарим за неравнодушие!',
            }),
        )
            .catch(err =>
                this.setState({
                    modalContent: 'Упс, что-то пошло не так!',
                    isSubmit: false
                }),
            )
    }
    handleChangeType(e) {
        this.setState({
            trashType: e.target.value,
        })
    }
    getUploadLinks(links){
        this.setState({
            userImages: links,
        })
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.state.isSubmit ?
                    <SubmitModal>
                        <h1 style={{ textAlign: 'center' }}>
                            {this.state.modalContent}
                        </h1>

                    </SubmitModal>
                    :
                    <>
                        Заполните поля:
                        <Select
                            onChange={(e) => this.setState({ trashType: e.target.value })}
                            defaultValue="none"
                            valid={this.state.handleError && this.state.trashType === '' ? false : true}
                        >
                            <option value="none" disabled>Укажите тип</option>
                            {Statuses.filter(x => x !== 'Убрано' && x !== 'new').map((status, id) =>
                                <option key={id} value={status}>{status}</option>
                            )}
                        </Select>
                        <Select
                            defaultValue="none"
                            onChange={(e) => this.setState({ trashAmount: e.target.value })}
                            valid={this.state.handleError && this.state.trashAmount === '' ? false : true}
                        >
                            <option value="none" disabled>Укажите объём свалки</option>
                            {TrashAmounts.map((amount, i) =>
                                <option key={i} value={amount}>{amount}</option>
                            )}
                        </Select>
                        <UploadButton getUploadLinks={e=>this.getUploadLinks(e)}/>
                        <Input
                            onChange={e => this.setState({ userEmail: e.target.value })}
                            placeholder='E-mail*'
                            valid={this.state.handleError && this.state.userEmail.length < 1 ? false : true}
                        />
                        <Input valid={true} onChange={e => this.setState({ userPhone: e.target.value })} placeholder='Номер телефона' />
                        <Input valid={true} onChange={e => this.setState({ additionalText: e.target.value })} placeholder='Краткое описание' />
                        <SubmitButton type="submit" >Отправить</SubmitButton>
                    </>
                }

            </Form>
        )
    }
}