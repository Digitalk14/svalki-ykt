import styled from "styled-components";
import { Logout } from "../Login/login";
import { dumpsByTypesStates, dumpsByStatuses } from "../sortByTypes";
import { Select } from "../modal/formStyles";
import React from "react";

interface IHeaderProps {
  pushStatus: (e: string) => void;
  pushCheckStatus: (e: string) => void;
  changeView: () => void;
  isLoggedOut: (a: boolean) => void;
  statuses: any;
}

const HeaderBlock = styled.header`
  width: 100%;
  background: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px;
`;

export const Header: React.FC<IHeaderProps> = (props) => {
  const handleChange = (selectedStatus: string) => {
    props.pushStatus(selectedStatus);
  };
  const handleChangeStatuses = (selectedStatus: string) => {
    props.pushCheckStatus(selectedStatus);
  };
  return (
    <HeaderBlock>
      <SelectBlock>
        Фильтровать по типам свалок:
        <Select valid={true} onChange={(e) => handleChange(e.target.value)}>
          <option value="all">Показать все ({props.statuses.length})</option>
          {Object.entries(dumpsByTypesStates(props.statuses)).map(
            ([key, value], i) => {
              return (
                <option key={i} value={key}>
                  {key} ({value})
                </option>
              );
            }
          )}
        </Select>
      </SelectBlock>
      <SelectBlock>
        Фильтровать по статусу:
        <Select
          valid={true}
          onChange={(e) => handleChangeStatuses(e.target.value)}
        >
          <option value="all">Показать все ({props.statuses.length})</option>
          {Object.entries(dumpsByStatuses(props.statuses)).map(
            ([key, value], i) => {
              return (
                <option key={i} value={key}>
                  {key} ({value})
                </option>
              );
            }
          )}
          {dumpsByTypesStates(props.statuses)}
        </Select>
      </SelectBlock>
      <SelectBlock>
          Представить в виде:
          <Select valid={true}
          onChange={(e) => props.changeView()}
          >
            <option>Карты</option>
            <option>Таблицы</option>
          </Select>
      </SelectBlock>
      <Logout isLoggedOut={(e) => props.isLoggedOut(e)} />
    </HeaderBlock>
  );
};
