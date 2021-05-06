import React, { useSa, useState } from 'react'
import styled from 'styled-components'
import { Logout } from '../Login/login'

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
    return (
        <HeaderBlock>
            <select onChange={e =>handleChange(e.target.value)}>
                <option value='all'>Без фильтра</option>
                {Statuses.map((status, i) =>
                    <option key={i} value={status}>{status}</option>
                )}
            </select>
            <Logout isLoggedOut={(e)=>props.isLoggedOut(e)}/>

        </HeaderBlock>
    )


}