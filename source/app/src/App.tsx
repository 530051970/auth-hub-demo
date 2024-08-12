import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRouter from 'routers';

import { Spinner } from '@cloudscape-design/components';
import { Constant } from 'common/constants';
import NoAccess from 'pages/no-access';
import { RouterEnum } from 'routers/routerEnum';
import './index.scss';
import AutoLogout from 'secure/auto-logout';
import ConfigProvider from 'context/config-provider';
// import ConfigContext, { AuthDetails } from 'context/config-context';

const AppBody = () => {
  // const [isLoading, setIsloading] = useState(true)
  // console.log(`!!!!!app`)
  // if(isLoading){
  //   return (
  //     <div className="page-loading">
  //       <Spinner />
  //     </div>
  //   )
  // }
  return (
          <>
          <AppRouter/>
        </>)
};

const App: React.FC = () => {
  // const configContext = useContext(ConfigContext);
  // if(!configContext) {
  //    return <>Error: ConfigContext not found</>
  // }
  // const { config, login, logout } = configContext;
  if (window.location.pathname === '/noaccess') {
    return <NoAccess />;
  } else {
      return (
        <ConfigProvider>
          <AutoLogout timeout={15 * 60 * 1000} />
          <AppBody/>
        </ConfigProvider>

        // </BrowserRouter>
      );
  }
};

export default App;
