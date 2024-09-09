import { ROUTES } from 'common/constants';
import ConfigProvider from 'context/config-provider';
import ChangePWD from 'pages/change-pwd';
import FindPWD from 'pages/find-pwd';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/summary';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
      <ConfigProvider>
      <Routes>
        <Route path={ROUTES.Login} element={<Login />} />
        <Route path={ROUTES.FindPWD} element={<FindPWD />} />
        <Route path={ROUTES.Register} element={<Register />} />
        <Route path={ROUTES.ChangePWD} element={<ChangePWD />} />
        <Route path={ROUTES.Home} element={<Home />}/> 
      </Routes>
      </ConfigProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
