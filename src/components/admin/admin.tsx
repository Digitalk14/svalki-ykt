import React, { useState } from "react";
import styled from "styled-components";
import { AdminMap } from "./adminMap";
import { Layout } from "../layout";
import { Theme } from "../globalStyles";
import { Login } from "../Login/login";
import { Notification } from "../notification/notification";

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const Admin: React.FC = () => {
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
  const [isLoggedin, setLoggedin] = useState(false);
  return (
    <Layout>
      <Theme />
      
      {isLoggedin ? (
        <AdminMap
          isLoggedOut={(e: boolean) => setLoggedin(e)}
          showNotification={(a,b)=>showNotification(a,b)}
        />
      ) : (
        <LoginWrapper>
          <Login
            isLoggedIn={(e: boolean) => setLoggedin(e)}
            showNotification={(a, b) => showNotification(a, b)}
          />
        </LoginWrapper>
      )}
      {isShow ? (
        <Notification
          message={notifContent.message}
          status={notifContent.status}
        />
      ) : null}
    </Layout>
  );
};
