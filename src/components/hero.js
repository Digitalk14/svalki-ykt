import React from 'react'
import styled from 'styled-components'
import background from '../images/bg.jpg'
import { Heading, Text } from './typography'

const HeroWrapper = styled.div`
    width: 100%;
    background: url(${background}) no-repeat center center;
    height: 400px;
    box-sizing: border-box;
    padding: 20px 0 ;
`
const HeroContent = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: auto;
`

const Anchor = styled.a`
    background-color: #ffea00;
    padding: 20px;
`

export const Hero = () => {
    return (
        <HeroWrapper>
            <HeroContent>
                <Heading>
                    Карта мусора на природе рядом с Якутском
                </Heading>
                <Text>
                    При помощи этой карты будет собираться информация о мусоре, для последующих уборок и вывоза.
                </Text>
                <Anchor>
                    ДОБАВИТЬ ИНФОРМАЦИЮ О МУСОРЕ
                </Anchor>
            </HeroContent>
        </HeroWrapper>
    )
}