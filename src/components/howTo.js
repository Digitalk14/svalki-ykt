import React from 'react'
import styled from 'styled-components'
import { Text } from './typography'

const HowToBlock = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
`

export const HowTo = () => {
    return(
        <HowToBlock>
            <Text margin='10px 0' textAlign='center'><b>Как добавить место нахождения мусора или свалки:</b></Text>
            <Text margin='10px 0' textAlign='center'>Приглашаем всех принять участие в наполнении карты информацией. Это делается просто и доступно каждому, у кого есть WhatsApp на смартфоне.</Text>
            <Text margin='10px 0' textAlign='center'>Как добавить информацию:</Text>
            <Text margin='10px 0' textAlign='center'>1. Проверьте визуально, не занесено ли уже это место на карту.</Text>
            <Text margin='10px 0' textAlign='center'>2. Если нет или у вас не получается проверить, то нажмите ниже кнопку "добавить информацию о мусоре".</Text>
            <Text margin='10px 0' textAlign='center'>3. Вам откроется чат в WhatsApp. Напишите, какой тип муcора вы видите: мусор после пикников, несанкционированную свалку или что-то другое. Примерно оцените объемы: мало, среднее количество, много, очень много. Сделайте и прикрепите 1-2 фотографии мусора. Также важно указать точное местонахождение мусора. Для этого надо быть в точке, где он находится, нажать в чате WhatsApp кнопку прикрепления и выбрать "место" в открывшемся списке.</Text>
            <Text margin='10px 0' textAlign='center'>Заявки по WhatsApp (+79142987052) принимаются с 09:00 до 18:00 ч.</Text>
        </HowToBlock>
    )
}