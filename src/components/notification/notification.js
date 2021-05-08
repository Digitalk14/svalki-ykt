import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Notif = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    min-height: 50px;
    width: 300px;
    background: ${props => props.status === 'error' ? 'red' : 'green'};
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`
const P = styled.p`
    color: white;
    font-size: 20px;
    margin: 0;
`

export const Notification = ({ message, status, show }) => {
    const [isShow, setIsShow] = useState(show)
    useEffect(()=>{
        setTimeout(()=>{
            setIsShow(false)
        },3000)
    },[])
    if (isShow) {
        return <Notif status={status}><P>{message}</P></Notif>
    }
    return null
}