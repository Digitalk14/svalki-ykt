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
`
const LegendsBlock = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
            {Object.values(dumpsByTypes()).map((block, i) => {
                switch (block.status) {
                    case 'red':
                        return (
                            <LegendsBlock>
                                <LegendImage src={redBin} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                    case 'green':
                        return (
                            <LegendsBlock>
                                <LegendImage src={greenBin} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                    case 'question':
                        return (
                            <LegendsBlock>
                                <LegendImage src={question} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                    case 'picnic':
                        return (
                            <LegendsBlock>
                                <LegendImage src={picnic} />
                                <Text>{block.text}</Text>
                            </LegendsBlock>
                        )
                }
            })}
        </LegendBlocks>
    )
}