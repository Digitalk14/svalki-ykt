import styled from 'styled-components'
import background from '../images/svalka-min.jpeg'
import { Heading, Text } from './typography'
import logo from '../images/logo.png'

const HeroWrapper = styled.div`
    width: 100%;
    background: url(${background}) no-repeat center center;
    background-size: cover; 
    box-sizing: border-box;
    padding: 150px 0;
    display: flex;
    align-items: center;
    @media (max-width:700px){
        padding: 40px 0;
    }
`
const HeroContent = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: auto;
    padding: 0 20px;
    @media (max-width:700px){
        align-items: center
    }
`

const Anchor = styled.a`
    background-color: #ffea00;
    padding: 20px 30px;
    cursor: pointer;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    color: #333;

`

const Logo = styled.img.attrs({
    src: logo
})`
    width: 150px;
    position: fixed;
    left: 20px;
    top: 20px;
    @media (max-width:700px){
        position: relative;
        left: 0;
        top: 0;
    }
`

export const Hero: React.FC = () => {
    return (
        <HeroWrapper>
            <HeroContent>
                <Logo />
                <Heading maxWidth='550px'>
                    Карта свалок Якутска и прилежащих территорий
                </Heading>
                <Text maxWidth='400px' margin='40px 0'>
                    При помощи этой карты будет собираться информация о мусоре, для последующих уборок и вывоза.
                </Text>
                <Anchor href='#mapTarget'>
                    ДОБАВИТЬ ИНФОРМАЦИЮ О МУСОРЕ
                </Anchor>
            </HeroContent>
        </HeroWrapper>
    )
}