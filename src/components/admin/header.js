import React, { useSa, useState } from 'react'
import styled from 'styled-components'
import { Logout } from '../Login/login'
import { dumpsByTypesStates, dumpsByStatuses } from '../sortByTypes'
import { Select } from '../modal/formStyles'


const HeaderBlock = styled.header`
    width: 100%;
    background: white;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 20px;
`
const SelectBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 20px;
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
            <SelectBlock>
                Фильтровать по типам свалок:
            <Select valid={true} onChange={e => handleChange(e.target.value)}>
                    <option value='all'>Показать все ({props.statuses.length})</option>
                    {Object.entries(dumpsByTypesStates(props.statuses)).map(([key, value], i) => {
                        return (
                            <option key={i} value={key}>{key} ({value.count})</option>
                        )
                    }
                    )}
                </Select>
            </SelectBlock>
            <SelectBlock>
                Фильтрова по статусу:
            <Select valid={true} onChange={e => handleChangeStatuses(e.target.value)}>
                    <option value='all'>Показать все ({props.statuses.length})</option>
                    {Object.entries(dumpsByStatuses(props.statuses)).map(([key, value], i) => {
                        return (
                            <option key={i} value={key}>{key} ({value.count})</option>
                        )
                    })}
                    {dumpsByStatuses(props.statuses)}
                </Select>
            </SelectBlock>
            <Logout isLoggedOut={(e) => props.isLoggedOut(e)} />
        </HeaderBlock>
    )


}