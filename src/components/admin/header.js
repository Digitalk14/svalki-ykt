import React, { useSa, useState } from 'react'
import styled from 'styled-components'
import { Logout } from '../Login/login'
import { dumpsByTypesStates, dumpsByStatuses } from '../sortByTypes'

const HeaderBlock = styled.header`
    width: 100%;
    background: white;
    z-index: 100;
    height: 100px;
`

export const Header = (props) => {
    const Statuses = ['new', 'Убрано', 'Другое (кузовы машин и т.д.)', 'Несанкционированные свалки', 'Мусор после пикников']
    const handleChange = (selectedStatus) => {
        props.pushStatus(selectedStatus)
    }
    const handleChangeStatuses = (selectedStatus) => {
        props.pushCheckStatus(selectedStatus)
    }
    return (
        <HeaderBlock>
            <div>
                Фильтровать по типам свалок:
            <select onChange={e => handleChange(e.target.value)}>
                    <option value='all'>Показать все ({props.statuses.length})</option>
                    {Object.entries(dumpsByTypesStates(props.statuses)).map(([key, value], i) => {
                        return (
                            <option key={i} value={key}>{key} ({value.count})</option>
                        )
                    }
                    )}
                </select>
            </div>
            <div>
                Фильтрова по статусу:
            <select onChange={e => handleChangeStatuses(e.target.value)}>
                    <option value='all'>Показать все ({props.statuses.length})</option>
                    {Object.entries(dumpsByStatuses(props.statuses)).map(([key, value], i) => {
                        return (
                            <option key={i} value={key}>{key} ({value.count})</option>
                        )
                    })}
                    {dumpsByStatuses(props.statuses)}
                </select>
            </div>
            <Logout isLoggedOut={(e) => props.isLoggedOut(e)} />
        </HeaderBlock>
    )


}