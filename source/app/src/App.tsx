import React, { Suspense } from 'react';
import AppRouter from 'routers';
import NoAccess from 'pages/no-access';
import './index.scss';
import AutoLogout from 'secure/auto-logout';
import ConfigProvider from 'context/config-provider';
import { ROUTES, TOKEN } from 'common/constants';
import { BrowserRouter } from 'react-router-dom';
// import LayoutHeader from 'common/layout-header';
const AppBody = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <ConfigProvider>
          <AppRouter/>
        </ConfigProvider>
      </BrowserRouter>
    </Suspense>
  )
  
};

const App: React.FC = () => {
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
          <AppBody />
        </>
      );
  }
};

export default App;
