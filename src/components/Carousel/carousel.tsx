import styled from 'styled-components'

export const ImageWrapper = styled.div`
    width: 100%;
    position: relative;
    white-space: nowrap;
    height: 300px;
    display: flex;
    margin: 0 0 30px 0;
`

export const ImagesScroller = styled.div`
    width: 100%;
    position: absolute;
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    top: 0;
    left: 0;
    &::-webkit-scrollbar {
        width: 10px;
        height: 20px;
        border: none;
    }
    &::-webkit-scrollbar-thumb{
        background: #d6dee1;
        width: 20px;
        height: 20px;
        border-radius: 20px;
    }
`
export const LitterImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: contain;
`