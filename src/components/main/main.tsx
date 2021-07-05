import { useState } from "react";
import { Map } from "../map/map";
import { Hero } from "../hero";
import { Layout } from "../layout";
import { Theme } from "../globalStyles";
import { Counter } from "../counter";
import { Legends } from "../legends";
import { Targets } from "../targets";
import { HowTo } from "../howTo";
import { Notification } from "../notification/notification";
import { CookiesConsent } from "../cookiesConsent/cookiesConsent";

export const Main: React.FC = () => {
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
    <Layout>
      <Theme />
      <Hero />
      <Map showNotification={showNotification} />
      <Legends />
      <Counter />
      <Targets />
      <HowTo />
      {isShow ? (
        <Notification
          message={notifContent.message}
          status={notifContent.status}
        />
      ) : null}
      <CookiesConsent />
    </Layout>
  );
};
