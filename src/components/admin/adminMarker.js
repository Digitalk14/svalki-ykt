import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import axios from 'axios'
import { Form, SubmitButton, Select, Input } from '../modal/formStyles'
import { TextBox } from '../typography'
import { Statuses, TrashAmounts } from '../statuses/statuses'
import { ImageWrapper, ImagesScroller, LitterImage } from '../Carousel/carousel'
import { AdminImages, DeleteImage } from '../adminImages/adminImages'

export default class AdminMarker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            changedStates: {},
            status: undefined,
            checkStatus: undefined,
            level: undefined,
            images: this.props.images.split(';').filter(x => x.length > 2)
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateImages = this.updateImages.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.images.join(';'))
        axios({
            method: 'post',
            url: '/api/changesDump.php',
            data: {
                id: this.props.id,
                status: this.state.status || this.props.status,
                checkStatus: this.state.checkStatus || this.props.checkStatus,
                level: this.state.level || this.props.level,
                images: this.state.images.join(';') || this.props.images
            }
        })
            .then(res => {
                if (typeof window !== 'undefined') {
                    window.location.reload()
                }
            })
            .catch(err => console.log(err))

    }
    updateImages(img) {
        let currentImages = this.state.images.join(';')
        console.log(currentImages)
        currentImages = currentImages + ';' + img
        this.setState({
            images: img.split(';').filter(x => x.length > 2)
        })
    }
    deleteImage(img) {
        let deleteConfirm = confirm("Вы уверены что хотите удалить изображение?")
        if(deleteConfirm){
            let imagesState = this.state.images
            if(imagesState.includes(img)){
                imagesState.splice(imagesState.indexOf(img),1)
                this.setState({
                    images: imagesState
                })
            }
        }
    }
    render() {
        return (
            <Marker position={this.props.position} icon={this.props.icon}>
                <Popup minWidth={350}>
                    <Form onSubmit={this.handleSubmit}>
                        Кликните по изображению чтобы удалить его:
                        <ImageWrapper>
                            <ImagesScroller>
                                {this.state.images.map((image, i) => {
                                    return (
                                        <LitterImage key={i} src={image} onClick={() => this.deleteImage(image)} />
                                    )
                                }
                                )}
                            </ImagesScroller>
                        </ImageWrapper>
                        <AdminImages images={this.props.images} updateImages={e => this.updateImages(e)} />
                        <TextBox>Название: Свалка №{this.props.id}</TextBox>
                        <TextBox>
                            Категория мусора:
                                <Select valid={true} onChange={e => this.setState({ status: e.target.value })}>
                                <option value={this.props.status}>{this.props.status}</option>
                                {Statuses.filter(x => x !== this.props.status).map((x, i) =>
                                    <option key={i} value={x}>{x}</option>)}
                            </Select>
                        </TextBox>
                        <TextBox>
                            Статус точки:
                            <Select valid={true} onChange={e => this.setState({ checkStatus: e.target.value })}>
                                <option value={this.props.checkStatus}>{this.props.checkStatus}</option>
                                <option value={this.props.checkStatus === 'проверено' ? 'не проверено' : 'проверено'}>{this.props.checkStatus === 'проверено' ? 'не проверено' : 'проверено'}</option>
                            </Select>
                        </TextBox>
                        <TextBox>
                            Степень замусоренности:
                            <Select valid={true} onChange={e => this.setState({ level: e.target.value })}>
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
