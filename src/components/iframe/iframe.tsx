import React, { useState } from "react";
import styled from "styled-components";
import { Map } from "../map/map";
import { Theme } from "../globalStyles";
const MapWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin: 0;
`;

export const IFrame: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [notifContent, setNotifContent] = useState({
    message: "",
    status: "",
  });
  const showNotification = (message: string, status: string) => {
    setIsShow(true);
    setNotifContent({ ...notifContent, message: message, status: status });
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  };
  return (
    <MapWrapper>
      <Theme />
      <Map
        showNotification={showNotification}
        mapWrapperWidth="100%"
        mapWrapperHeight="100vh"
        mapWrapperMargin='0'
        mapWrapperPadding='0'
      />
    </MapWrapper>
  );
};
