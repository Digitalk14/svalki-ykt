import React, { useState } from 'react'
import styled from 'styled-components'
import AdminMap from './adminMap'
import { Layout } from '../layout'
import { Theme } from '../globalStyles'
import { Login } from '../Login/login'
import { Notification } from '../notification/notification'

const LoginWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
`

export const Admin = () => {
    const [isShow, setIsShow] = useState(false)
    const [notifContent, setNotifContent] = useState({
        message: '',
        status: ''
    })
    const showNotification = (message, status) => {
        setIsShow(true)
        setNotifContent({ ...notifContent, message: message, status: status })
        setTimeout(() => {
            setIsShow(false)
        }, 3000)
    }
    const [isLoggedin, setLoggedin] = useState(false)
    return (
        <Layout >
            <Theme />
            {
                isLoggedin ?
                    <AdminMap isLoggedOut={e => setLoggedin(e)} showNotification={showNotification} />
                    :
                    <LoginWrapper>
                        <Login
                            isLoggedIn={e => setLoggedin(e)}
                            showNotification={showNotification}
                        />
                    </LoginWrapper>
            }
            {isShow ?
                <Notification show message={notifContent.message} status={notifContent.status} />
                : null
            }
        </Layout>
    )
}