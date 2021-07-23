import styled from 'styled-components'
import { Heading, Text } from './typography'

const TargetsWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
`
const TargetsContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 40px 0;
    @media (max-width: 700px){
        flex-direction: column;
    }
`
const TargetBlock = styled.div`
    width: 40%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    @media (max-width: 700px){
        margin: 0 0 40px 0;
        width: 100%;
    }
`
const SvgIcon = styled.svg`
    margin-right: 10px;
    width: 40px;
`

export const Targets: React.FC = () => {
    return (
        <TargetsWrapper>
            <Heading  margin='0 0 40px 0'>
                Цели карты:
            </Heading>
            <TargetsContent>
                <TargetBlock>
                    <SvgIcon fill='#48ac6e' style={{width:'40px', height: '30px'}} viewBox='0 0 31.8 31.8'><path d='M.9 14.5C5.2 19.4 9.8 24 14.1 29c.4.5 1.3.3 1.6-.2 5.1-8.4 10.1-16.8 15-25.4.7-1.2-.5-2.1-1.3-.9C19.3 18 19 18.4 13.9 26.7c.5-.1 1.1-.1 1.6-.2-4.4-4.8-8.9-8.6-13.9-12.8-.4-.4-1.1.3-.7.8z'></path></SvgIcon>
                    <Text maxWidth='400px'>Показать обществу и властям масштабы замусоривания природы рядом с городом, наносимого экологического ущерба.</Text>
                </TargetBlock>
                <TargetBlock>
                <SvgIcon fill='#48ac6e' style={{width:'40px', height: '30px'}} viewBox='0 0 31.8 31.8'><path d='M.9 14.5C5.2 19.4 9.8 24 14.1 29c.4.5 1.3.3 1.6-.2 5.1-8.4 10.1-16.8 15-25.4.7-1.2-.5-2.1-1.3-.9C19.3 18 19 18.4 13.9 26.7c.5-.1 1.1-.1 1.6-.2-4.4-4.8-8.9-8.6-13.9-12.8-.4-.4-1.1.3-.7.8z'></path></SvgIcon>
                    <Text maxWidth='400px'>Максимально выявить и картографировать несанкционированные свалки и мусор рядом с городом, для последующей уборки тем или иным способом.</Text>
                </TargetBlock>
            </TargetsContent>
        </TargetsWrapper>
    )
}