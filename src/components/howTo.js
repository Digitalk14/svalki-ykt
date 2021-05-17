import React from "react";
import styled from "styled-components";
import { Text } from "./typography";

const HowToBlock = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
`;

export const HowTo = () => {
  return (
    <HowToBlock>
      <Text margin="10px 0" textAlign="center">
        <b>Как добавить место нахождения мусора или свалки:</b>
      </Text>
      <Text margin="10px 0" textAlign="center">
        Приглашаем всех принять участие в наполнении карты информацией. Это
        делается просто и доступно каждому, у кого есть смартфон или компьютер.
      </Text>
      <Text margin="10px 0" textAlign="center">
        Как добавить информацию:
      </Text>
      <Text margin="10px 0" textAlign="center">
        1. Проверьте визуально, не занесено ли уже это место на карту. Важно
        указать точное местонахождение мусора.
      </Text>
      <Text margin="10px 0" textAlign="center">
        2. Если нет, то нажмите на карте эту локацию и выйдет форма заявки,
        которую необходимо заполнить.
      </Text>
      <Text margin="10px 0" textAlign="center">
        3. Вам откроется окно формы заявки: укажите тип мусора
        (несанкционированные свалки, мусор после пикников, другое);
        <br />
        Укажите объем свалки (малый, средний, большой); Сделайте и прикрепите
        фотографии мусора. Без фотографий заявка не отправляется.  <br />
        Укажите адрес вашей электронной почты и номер телефона (при желании)
        затем нажмите кнопку “отправить”. Ваша заявка отправлена! <br />
        Спасибо большое!
      </Text>
    </HowToBlock>
  );
};
