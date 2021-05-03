import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import redTrash from '../../images/red_bin.png'
import blueTrash from '../../images/question.png'
import yellowTrash from '../../images/picnic.png'

const IconImg = styled.img`
    width: 20px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Select = styled.select`
    margin: 0 0 5px 0;
    padding: 5px;
    border: ${props => props.valid ? '1px solid #8080807d' : '1px solid red'};
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    background: white;
    outline: none;
`
const Input = styled.input`
    margin: 0 0 5px 0;
    padding: 5px;
    border: ${props => props.valid ? '1px solid #8080807d' : '1px solid red'};
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    background: white;
    ::-webkit-input-placeholder { 
        padding: 5px;
      }
`
const SubmitButton = styled.button`
    background: #91bb57;
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    outline: none;
`
const SubmitModal = styled.div`
      width: 300px;
`

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trashAmount: '',
            trashType: '',
            additionalText: '',
            userEmail: '',
            userPhone: '',
            handleError: false,
            isSubmit: false,
            modalContent: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        if (
            this.state.trashAmount === '' ||
            this.state.trashType === '' ||
            this.state.userEmail.length < 1
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
                images: 'https://cdn.sierrasun.com/wp-content/uploads/sites/4/2020/08/Trashproblem-tdt-081420-1-1024x1024.jpg'
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
                            <option value="Несанкционированные свалки">Несанкционированные свалки</option>
                            <option value="Мусор после пикников">Мусор после пикников</option>
                            <option value="Другое (кузовы машин и т.д.)">Другое (кузовы машин и т.д.)</option>
                        </Select>
                        <Select
                            defaultValue="none"
                            onChange={(e) => this.setState({ trashAmount: e.target.value })}
                            valid={this.state.handleError && this.state.trashAmount === '' ? false : true}
                        >
                            <option value="none" disabled>Укажите объём свалки</option>
                            <option>малый</option>
                            <option>средний</option>
                            <option>большой</option>
                        </Select>
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