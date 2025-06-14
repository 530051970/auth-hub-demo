import { ROUTES } from 'common/constants';
import LayoutHeader from 'common/component/top-header';
import Application from 'pages/app';
import Bill from 'pages/bill';
import ChangePWD from 'pages/change-pwd';
import FindPWD from 'pages/find-pwd';
import Log from 'pages/log';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/summary';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Model from 'pages/model';
import CreateApp from 'pages/app/create-app';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.Login} element={<Login />} />
      <Route path={ROUTES.FindPWD} element={<FindPWD />} />
      <Route path={ROUTES.Register} element={<Register />} />
      <Route path={ROUTES.ChangePWD} element={<ChangePWD />} />
      <Route path={ROUTES.Home} element={ <><LayoutHeader/><Home /></>}/> 
      <Route path={ROUTES.Model} element={ <><LayoutHeader/><Model /></>}/> 
      <Route path={ROUTES.App} element={ <><LayoutHeader/><Application /></>}/> 
      <Route path={ROUTES.CreateApp} element={ <><LayoutHeader/><CreateApp /></>}/> 
      <Route path={ROUTES.Log} element={ <><LayoutHeader/><Log /></>}/> 
      <Route path={ROUTES.Bill} element={ <><LayoutHeader/><Bill /></>}/> 
    </Routes>
  );
};

export default AppRouter;
