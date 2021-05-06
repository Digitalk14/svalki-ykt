import React, { useState } from 'react'
import styled from 'styled-components'
import AdminMap from './adminMap'
import { Layout } from '../layout'
import { Theme } from '../globalStyles'
import { Login } from '../Login/login'

const StyledLogin = styled(props => <Login {...props} />)`
    left: 50%;
    top: 100px;
    margin: 100px 0;
`
const LoginWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
`

export const Admin = () => {
    const [isLoggedin, setLoggedin] = useState(false)
    return (
        <Layout >
            <Theme />
            {
                isLoggedin ?
                    <AdminMap isLoggedOut={e => setLoggedin(e)} />
                    :
                    <LoginWrapper>
                        <Login
                            isLoggedIn={e => setLoggedin(e)}
                        />
                    </LoginWrapper>
            }
        </Layout>
    )
}