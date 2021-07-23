import React from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { Text } from '../typography'

const CookiesWrapper = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: white;
    box-shadow: 0 0 10px 10px #0000001f;
    z-index: 10000;
    padding: 20px;
    box-sizing: border-box;
`
const CookiesButton = styled.button`
    margin: 15px 0 0 0;
    border: none;
    background: #91bb57;
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
`

export const CookiesConsent: React.FC = () => {
    const [cookies,setCookies] = useCookies(['cookiesSvalki'])
    if(!cookies.cookiesSvalki){
        return(
            <CookiesWrapper onClick={()=>setCookies('cookiesSvalki','true')}>
                <Text textAlign='center'>Просматривая наш веб-сайт, вы соглашаетесь  с импользованием файлов cookie</Text>
                <CookiesButton>Принять</CookiesButton>
            </CookiesWrapper>
        )
    }else{
        return null
    }
    
}