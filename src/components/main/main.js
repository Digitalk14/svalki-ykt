import React, { useState } from 'react'
import Map from '../map/map'
import { Hero } from '../hero'
import { Layout } from '../layout'
import { Theme } from '../globalStyles'
import { Counter } from '../counter'
import { Legends } from '../legends'
import { Targets } from '../targets'
import { HowTo } from '../howTo'
import { Notification } from '../notification/notification'

export const Main = () => {
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
    return (
        <Layout >
            <Theme />
            <Hero />
            <Map showNotification={showNotification} />
            <Legends />
            <Counter />
            <Targets />
            <HowTo />
            {isShow ?
                <Notification show message={notifContent.message} status={notifContent.status} />
                : null
            }
        </Layout>
    )
}