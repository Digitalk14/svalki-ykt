import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import { Form, SubmitButton, Select, Input, StyledInputMask, DeleteButton } from '../modal/formStyles'
import { TextBox } from '../typography'
import { Statuses, TrashAmounts } from '../statuses/statuses'
import { ImageWrapper, ImagesScroller, LitterImage } from '../Carousel/carousel'
import { AdminImages } from '../adminImages/adminImages'

export default class AdminMarker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            changedStates: {},
            status: undefined,
            checkStatus: undefined,
            level: undefined,
            userPhone: undefined,
            userEmail: undefined,
            userText: undefined,
            images: this.props.images.split(';').filter(x => x.length > 2)
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateImages = this.updateImages.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        axios({
            method: 'post',
            url: '/api/changesDump.php',
            data: {
                id: this.props.id,
                status: this.state.status || this.props.status,
                checkStatus: this.state.checkStatus || this.props.checkStatus,
                level: this.state.level || this.props.level,
                images: this.state.images.join(';') || this.props.images,
                additional: this.state.userText || this.props.additional,
                email: this.state.userEmail || this.props.email,
                phone: this.state.userPhone || this.props.phone
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
        if (deleteConfirm) {
            let imagesState = this.state.images
            if (imagesState.includes(img)) {
                imagesState.splice(imagesState.indexOf(img), 1)
                this.setState({
                    images: imagesState
                })
            }
        }
    }
    handleDelete(id){
        let deleteConfirm = confirm("Вы уверены что хотите удалить свалку?")
        if(deleteConfirm){
            axios({
                method: 'post',
                url: '/api/deleteDump.php',
                data: {
                    id: id
                }
            })
            .then(res=>{
                if (typeof window !== 'undefined') {
                    window.location.reload()
                }
            })
            .catch(err=>console.log(true))
        }
    }
    render() {
        return (
            <Marker position={this.props.position} icon={this.props.icon}>
                <Popup minWidth={350}>
                    <Form onSubmit={this.handleSubmit}>
                        Кликните по изображению чтобы УДАЛИТЬ его:
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
                        <TextBox>Обновить email: <Input valid={true} value={this.state.userEmail || this.props.email} onChange={e => this.setState({ userEmail: e.target.value })} placeholder='Обновлённый email' /></TextBox>
                        <TextBox>Обновить телефон: <StyledInputMask mask='+7(999)9999-999' value={this.state.userPhone || this.props.phone} onChange={e => this.setState({ userPhone: e.target.value })} placeholder='Обновленный номер телефона' /></TextBox>
                        <TextBox>Обновить дом. информацию: <Input valid={true} value={this.state.userText || this.props.additional} onChange={e => this.setState({userText: e.target.value})} placeholder='Введите обновлённый текст' /></TextBox>
                        <SubmitButton type='submit'>Сохранить изменения</SubmitButton>
                        <DeleteButton type='button' onClick={()=>this.handleDelete(this.props.id)}>Удалить</DeleteButton>
                    </Form>
                </Popup>
            </Marker>
        )
    }
}
