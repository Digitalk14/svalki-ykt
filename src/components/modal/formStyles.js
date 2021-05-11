import React from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`
export const SubmitButton = styled.button`
    background: #91bb57;
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    outline: none;
`
export const Select = styled.select`
    margin: 0 0 5px 0;
    padding: 5px;
    border: ${props => props.valid ? '1px solid #8080807d' : '1px solid red'};
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    background: white;
    outline: none;
`
export const Input = styled.input`
    margin: 0 0 5px 0;
    padding: 5px;
    border: ${props => props.valid ? '1px solid #8080807d' : '1px solid red'};
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    background: white;
    ::-webkit-input-placeholder { 
        padding: 5px;
      }
`
export const StyledInputMask = styled(props=> <InputMask {...props}/>)`
    margin: 0 0 5px 0;
    padding: 5px;
    border: 1px solid #8080807d;
    border-radius: 3px;
    width: 300px;
    box-sizing: border-box;
    background: white;
    ::-webkit-input-placeholder { 
        padding: 5px;
    }
`
export const SubmitModal = styled.div`
      width: 300px;
`