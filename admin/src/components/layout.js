import React from 'react'
import styled from 'styled-components'

const LayoutBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`

export const Layout = ({children}) => {
    return(
        <LayoutBlock>
            {children}
        </LayoutBlock>
    )
}