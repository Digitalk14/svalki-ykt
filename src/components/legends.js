import React from 'react'
import styled from 'styled-components'
import redBin from '../images/red_bin.png'
import greenBin from '../images/green_bin.png'
import question from '../images/question.png'
import picnic from '../images/picnic.png'
import { Text } from './typography'
import { dumpsByTypes } from './sortByTypes'

const LegendBlocks = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    box-sizing: border-box;
    padding: 0 20px;
`
const LegendsBlock = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    @media (max-width: 700px){
        width: 100%;
    }
`
const LegendImage = styled.img.attrs(props => ({
    src: props.src
}))`
    width: 25px;
    height: 25px;
    margin: 0 20px 0 0 ;
`

export const Legends = () => {
    return (
        <LegendBlocks>
            {Object.entries(dumpsByTypes()).map(([keys,block], i) => {
                switch (keys) {
                    case 'red':
                        return (
                            <LegendsBlock key={i}>
                                <LegendImage src={redBin} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                    case 'green':
                        return (
                            <LegendsBlock key={i}>
                                <LegendImage src={greenBin} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                    case 'question':
                        return (
                            <LegendsBlock key={i}>
                                <LegendImage src={question} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                    case 'picnic':
                        return (
                            <LegendsBlock key={i}>
                                <LegendImage src={picnic} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                }
            })}
        </LegendBlocks>
    )
}