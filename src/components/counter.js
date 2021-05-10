import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Heading, Text } from './typography'
import { dumpsByTypesStates } from './sortByTypes'

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
    height: 100%;
    justify-content: space-between;
    @media (max-width:900px){
        width: 45%;
        margin-bottom: 30px;
    }
    @media (max-width:550px){
        width: 100%;
    }
`

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counters: {}
        }

    }
    componentDidMount() {
        axios.get('/api/dumps.php')
            .then(res => {
                this.setState({
                    counters: res.data
                })
            })
    }
    render() {
        return (
            <CounterWrapper>
                <Heading margin='0 0 40px 0'>
                    Обнаружено:
                </Heading>
                <CounterBLocks>
                    {
                        Object.entries(dumpsByTypesStates(this.state.counters)).map(([key, value], i) => {
                            return (
                                <CounterBlock key={i}>
                                    <Heading fontSize='24px' textAlign='center'>{key}</Heading>
                                    <Heading fontSize='24px'>{value.count}</Heading>
                                </CounterBlock>
                            )
                        })
                    }
                </CounterBLocks>
            </CounterWrapper>
        )
    }
}
export default Counter