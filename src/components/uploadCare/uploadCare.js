import React from 'react'
import { Widget } from "@uploadcare/react-widget";

export const UploadButton = (props) => {
    const onChange = (data) => {
        let currentUrl = ''
        if (data.count > 1) {
            for (let i = 0; i < data.count; i++) {
                currentUrl += data.cdnUrl+`nth/${i}/;`
            }
        } else {
            currentUrl+=data.cdnUrl+`nth/0/`
        }
        props.getUploadLinks(currentUrl)
    }
    const maxDimensions = (width, height, weight) => {
        return function (fileInfo) {
            var imageInfo = fileInfo.originalImageInfo;
            if (imageInfo !== null) {
                if (imageInfo.width > width || imageInfo.height > height || fileInfo.size > weight) {
                    throw new Error('dimensions');
                }
            }
        };
    }
    return (
        <Widget
            publicKey={process.env.UPLOAD_CARE_KEY}
            locale="ru"
            clearable
            onChange={onChange}
            multipleMax={3}
            multiple
            imagesOnly
            tabs='file camera url gdrive instagram'
            validators={[maxDimensions(1920, 1080, 5000000)]}
            imageShrink="1024x1024"
        />
    )
}