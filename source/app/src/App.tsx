import React from 'react';
import AppRouter from 'routers';
import NoAccess from 'pages/no-access';
import { Amplify } from "aws-amplify";
import './index.scss';
import AutoLogout from 'secure/auto-logout';
import { MIDWAY, ROUTES, TOKEN } from 'common/constants';

const AppBody = () => {
  return <AppRouter/>
};

const App: React.FC = () => {
  Amplify.configure({
    Auth: { 
      Cognito: {
        userPoolId: MIDWAY.USER_POOL_ID,
        userPoolClientId: MIDWAY.USER_POOL_CLIENT_ID,
        identityPoolId: process.env.VITE_AWS_IDENTITY_POOL_ID||"",
        allowGuestAccess: true,
        loginWith: {
          oauth: {
            domain: MIDWAY.AUTH_DOMAIN,
            scopes: MIDWAY.SCOPES,
            redirectSignIn: MIDWAY.REDIRECT_SIGNIN,
            redirectSignOut: MIDWAY.REDIRECT_SIGNOUT,
            responseType: "code",
          }
          }
        }
      }
    },{ssr: true}
  )
  const token = localStorage.getItem(TOKEN)
  // TOKEN is not exsist
  if((token === '' || token === null) && ![ROUTES.Login, ROUTES.ChangePWD, ROUTES.FindPWD, ROUTES.Register].includes(window.location.pathname)){
    window.location.href=ROUTES.Login;
    return null;
  }
  //TODO: token is invalid
  // No Access
  if (window.location.pathname === '/noaccess') {
    return <NoAccess />;
  } else {
      return (
        <>
          <AutoLogout timeout={15 * 60 * 1000} />
          <AppBody/>
        </>
      );
  }
};

export default App;
