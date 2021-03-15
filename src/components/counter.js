import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from './typography'
import { dumpsByTypes } from './sortByTypes'

const CounterWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const CounterBLocks = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const CounterBlock = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const Counter = () => {
    return (
        <CounterWrapper>
            <Heading>
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