import React, { useState } from 'react'
import styled from 'styled-components'
import { UploadButton } from '../uploadCare/uploadCare'

const DeleteButton = styled.button`
    border: none;
    background: red;
    color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px;
    cursor: pointer;
    z-index: 50;
`
const UploadButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
export const AdminImages = (props) => {
    let images = props.images
    const getUploadLinks = (links) => {
        props.updateImages(images+';'+links)
    }
    
    return (
        <UploadButtonWrapper>
            Добавить изображение:
            <UploadButton getUploadLinks={getUploadLinks} valid={true}/>
        </UploadButtonWrapper>
    )
}
export const DeleteImage = ({image}) => {
    const DeleteImage = () =>{
        console.log(image)
    }
    return(
        <DeleteButton type='button' onClick={()=>DeleteImage}>
            Удалить изображение
        </DeleteButton>
    )
}