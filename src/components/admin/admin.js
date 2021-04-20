import React from 'react'
import AdminMap from './adminMap'
import { Layout } from '../layout'
import { Theme } from '../globalStyles'

export const Admin = () => {
    return (
        <Layout >
            <Theme />
            <AdminMap />
        </Layout>
    )
}