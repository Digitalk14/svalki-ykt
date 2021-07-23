import styled from 'styled-components'

interface TypographyProps {
    textAlign?: string,
    margin?:string,
    maxWidth?:string,
    fontSize?:string,
}

export const Heading= styled.h1<TypographyProps>`
    text-align: ${(props)=>props.textAlign?props.textAlign:'left'};
    margin: ${(props)=>props.margin?props.margin:'0'};
    max-width:${(props)=>props?props.maxWidth:'100%'};
    color: #2c4b58;
    font-size: ${(props) => props?props.fontSize:'52px'};
`
export const Text = styled.p<TypographyProps>`
    text-align: ${(props)=>props.textAlign?props.textAlign:'left'};
    margin: ${(props)=>props.margin?props.margin:'0'};
    max-width:${(props)=>props?props.maxWidth:'100%'};
    font-size: 16px;
`
export const TextBox = styled.div<TypographyProps>`
    text-align: ${(props)=>props.textAlign?props.textAlign:'left'};
    margin: ${(props)=>props.margin?props.margin:'0'};
    max-width:${(props)=>props?props.maxWidth:'100%'};
    font-size: 16px;
`