import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from './typography'
import { dumpsByTypes } from './sortByTypes'

const CounterWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
`
const CounterBLocks = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
`

const CounterBlock = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    @media (max-width:900px){
        width: 45%;
        margin-bottom: 30px;
    }
    @media (max-width:550px){
        width: 100%;
    }
`

export const Counter = () => {
    return (
        <CounterWrapper>
            <Heading margin='0 0 40px 0'>
                Обнаружено:
            </Heading>
            <CounterBLocks>
                {Object.values(dumpsByTypes()).map((block, i) =>
                    <CounterBlock key={i}>
                        <Heading>{block.count}</Heading>
                        <Text>{block.text}</Text>
                    </CounterBlock>
                )}
            </CounterBLocks>
        </CounterWrapper>
    )
}