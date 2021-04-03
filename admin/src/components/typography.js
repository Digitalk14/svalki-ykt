import styled from 'styled-components'

export const Heading = styled.h1`
    text-align: ${(props)=>props.textAlign?props.textAlign:'left'};
    margin: ${(props)=>props.margin?props.margin:'0'};
    max-width:${(props)=>props?props.maxWidth:'100%'};
    color: #2c4b58;
    font-size: 52px;
`
export const Text = styled.p`
    text-align: ${(props)=>props.textAlign?props.textAlign:'left'};
    margin: ${(props)=>props.margin?props.margin:'0'};
    max-width:${(props)=>props?props.maxWidth:'100%'};
    font-size: 16px;
`