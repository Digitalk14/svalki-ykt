import styled from 'styled-components'

interface INotificationProps {
    message: string,
    status: string
}

interface INotifProps {
    status?: string
}

const Notif = styled.div<INotifProps>`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: ${props => props.status === 'error' ? 'red' : 'green'};
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`
const P = styled.p`
    color: white;
    font-size: 20px;
    margin: 0;
`

export const Notification: React.FC<INotificationProps> = ({ message, status }) => {
    return <Notif status={status}><P>{message}</P></Notif>
}