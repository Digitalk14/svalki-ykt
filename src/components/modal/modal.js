import React from 'react'

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            trashType: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.getPosition(this.state.trashType)
    }
    handleChangeType(e){
        this.setState({
            trashType: e.target.value,
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                Заполните поля:
                <select defaultValue="none">
                    <option value="none" disabled>Укажите объём свалки</option>
                    <option>малый</option>
                    <option>средний</option>
                    <option>большой</option>
                </select>
                <select onChange={this.handleChangeType} defaultValue="none">
                    <option value="none" disabled>Укажите тип свалки</option>
                    <option value="red">крупно-габаритный</option>
                    <option value="question">строительный мусор</option>
                    <option value="picnic">бытовые отходы</option>
                </select>
                <input placeholder="Укажите Ваше имя*" />
                <input placeholder="Укажите Ваш телефон или email" />
                <button type="submit">Отправить</button>
            </form>
        )
    }
}