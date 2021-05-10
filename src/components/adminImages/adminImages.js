import React, { useState } from 'react'
import { UploadButton } from '../uploadCare/uploadCare'


export const AdminImages = (props) => {
    let images = props.images
    const getUploadLinks = (links) => {
        props.updateImages(images+';'+links)
    }
    
    return (
        <div>
            Добавить изображение
            <UploadButton getUploadLinks={getUploadLinks} />
        </div>
    )
}
export const DeleteImage = ({image}) => {
    console.log(image)
}