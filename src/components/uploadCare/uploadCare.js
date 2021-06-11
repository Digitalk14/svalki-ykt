import React from 'react'
import { Widget } from "@uploadcare/react-widget";
import styled from 'styled-components'

const StyledUploadButton = styled.div`
    margin: 5px 0;
    border: ${props => props.valid ? '1px solid white' : '1px solid red'};
    width: 153px;
    border-radius: 7px;
    padding: 1px;
`

export const UploadButton = (props) => {
    const onChange = (data) => {
        let currentUrl = ''
        if (data.count > 1) {
            for (let i = 0; i < data.count; i++) {
                currentUrl += data.cdnUrl + `nth/${i}/;`
            }
        } else {
            currentUrl += data.cdnUrl + `nth/0/`
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
        <StyledUploadButton valid={props.valid}>
            <Widget
                publicKey={process.env.UPLOAD_CARE_KEY}
                locale="ru"
                clearable
                onChange={onChange}
                multipleMax={0}
                multiple
                imagesOnly
                crop
                tabs='file camera gdrive instagram'
                validators={[maxDimensions(1920, 1920, 150000000)]}
                imageShrink="1024x1024"
            />
        </StyledUploadButton>
    )
}