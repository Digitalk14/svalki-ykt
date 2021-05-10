import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { refreshTokenSetup } from '../utils/refreshToken'
import axios from 'axios'

const clientId = '759057918565-6mrkbjqh3tnu3hctgs95lo7h9komtr2k.apps.googleusercontent.com'

export const Login = (props) => {
    const onSuccess = ({ googleId }) => {
        axios({
            url: '/api/users.php',
            method: 'post',
            data: {
                googleId: googleId
            }
        })
            .then(res => {
                if (res.data) {
                    props.isLoggedIn(true)
                    refreshTokenSetup(res)
                }else{
                    props.showNotification('Доступ запрещён','error')
                }
            })

    }
    const onFailure = (res) => {
        props.isLoggedIn(false)
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}

            />
        </div>
    )
}

export const Logout = (props) => {
    const onSuccess = () => {
        props.isLoggedOut(false)
    }
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}