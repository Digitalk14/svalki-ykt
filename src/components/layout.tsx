import styled from 'styled-components'

interface ILayoutProps {
    children: React.ReactNode
}

const LayoutBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`

export const Layout: React.FC<ILayoutProps> = ({children}) => {
    return(
        <LayoutBlock>
            {children}
        </LayoutBlock>
    )
}