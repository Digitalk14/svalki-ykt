import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import axios from 'axios'

const clientId = process.env.GOOGLE_USER_ID;

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const GetAdmins: React.FC = () => {
  const onSuccess = (res:any) => {
    axios({
      url: "/api/addAdmin.php",
      method: "post",
      data: {
        name: res.dt.Ue,
        googleId: res.googleId,
      },
    }).then((res) => {
        alert('Вы добавлены в список админов!')
    })
    .catch(err=>{console.log(err)})
  };
  const onFailure = (res:any) => {
    console.log(res);
  };
  return (
    <LoginWrapper>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </LoginWrapper>
  );
};
