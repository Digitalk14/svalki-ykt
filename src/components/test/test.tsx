import React from 'react'
const iframe = "<iframe src='https://svalki.ykt.ru/iframe' width='1000px' height='600px'></iframe>"
export const Test: React.FC = () => {
    return(
        <div>
            <div dangerouslySetInnerHTML={{__html: iframe}}></div>
        </div>
    )
}