import ChangePWD from 'pages/change-pwd';
import FindPWD from 'pages/find-pwd';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/summary';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  console.log(`!!!!!!APPRouter`)
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/find-password" element={<FindPWD />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/change-password" element={<ChangePWD />} />
        <Route path="/" element={<Home />}/> 
      </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
