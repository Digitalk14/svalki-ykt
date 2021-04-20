import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Select = styled.select`
    margin: 0 0 5px 0;
    padding: 5px;
    border: 1px solid #8080807d;
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    background: white;
    outline: none;
`
// const Input = styled.input`
//     margin: 0 0 5px 0;
//     padding: 5px;
//     border: 1px solid #8080807d;
//     border-radius: 3px;
//     width: 300px;
//     box-sizing: border-box;
//     background: white;
//     ::-webkit-input-placeholder { 
//         padding: 5px;
//       }
// `
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

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trashAmount: '',
            trashType: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        if(this.state.trashAmount===''){
            
        }
        if (
            this.state.trashAmount==='' ||
            this.state.trashType===''
        ){
            return false
        }
        axios({
            method: 'post',
            url:'/api/addDump.php',
            data: {
                positionLat: this.props.positionLat,
                positionLon: this.props.positionLon,
                status: 'red',
                text: 'свалка №б/н',
                name: 'свалка №TEST',
                category: 'несанкционированная свалка',
                checkStatus: 'на проверке',
                level: 'много',
                additional: '',
                images: 'https://cdn.sierrasun.com/wp-content/uploads/sites/4/2020/08/Trashproblem-tdt-081420-1-1024x1024.jpg'
            }
        }).then(res=>console.log(res))
        .catch(err=>console.log('Error: ', err))
        // this.props.getPosition(this.state.trashType)
    }
    handleChangeType(e) {
        this.setState({
            trashType: e.target.value,
        })
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                Заполните поля:
                <Select defaultValue="none" onChange={(e) => this.setState({ trashAmount: e.target.value })}>
                    <option value="none" disabled>Укажите объём свалки</option>
                    <option>малый</option>
                    <option>средний</option>
                    <option>большой</option>
                </Select>
                <Select onChange={(e) => this.setState({ trashType: e.target.value })} defaultValue="none">
                    <option value="none" disabled>Укажите тип свалки</option>
                    <option value="red">крупно-габаритный</option>
                    <option value="question">строительный мусор</option>
                    <option value="picnic">бытовые отходы</option>
                </Select>
                <SubmitButton type="submit">Отправить</SubmitButton>
            </Form>
        )
    }
}