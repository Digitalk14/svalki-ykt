import { GoogleLogin, GoogleLogout } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";
import axios from "axios";
import React from "react";

interface ILoginProps {
  isLoggedIn: (event: boolean) => void;
  showNotification: (a: string, b: string) => void;
}
interface ILogoutProps {
  isLoggedOut: (a: boolean) => void;
}

const clientId = process.env.GOOGLE_USER_ID;

export const Login: React.FC<ILoginProps> = ({
  isLoggedIn,
  showNotification,
}) => {
  const onSuccess = ({ googleId }: any) => {
    axios({
      url: "/api/users.php",
      method: "post",
      data: {
        googleId: googleId,
      },
    }).then((res) => {
      if (res.data) {
        isLoggedIn(true);
        refreshTokenSetup(res);
      } else {
        showNotification("Доступ запрещён", "error");
      }
    });
  };
  const onFailure = () => {
    isLoggedIn(false);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
};

export const Logout: React.FC<ILogoutProps> = ({ isLoggedOut }) => {
  const onSuccess = () => {
    isLoggedOut(false);
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};
