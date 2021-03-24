import React from 'react'
import styled from 'styled-components'

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
`
const Input = styled.input`
    margin: 0 0 5px 0;
    padding: 5px;
    border: 1px solid #8080807d;
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
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
`

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trashType: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.getPosition(this.state.trashType)
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
                <Select defaultValue="none">
                    <option value="none" disabled>Укажите объём свалки</option>
                    <option>малый</option>
                    <option>средний</option>
                    <option>большой</option>
                </Select>
                <Select onChange={this.handleChangeType} defaultValue="none">
                    <option value="none" disabled>Укажите тип свалки</option>
                    <option value="red">крупно-габаритный</option>
                    <option value="question">строительный мусор</option>
                    <option value="picnic">бытовые отходы</option>
                </Select>
                <Input placeholder="Укажите Ваше имя*" />
                <Input placeholder="Укажите Ваш телефон или email" />
                <SubmitButton type="submit">Отправить</SubmitButton>
            </Form>
        )
    }
}