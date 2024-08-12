import { Button, SpaceBetween, Textarea } from '@cloudscape-design/components';
import { Constant } from 'common/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logout, changePassword, refreshAccessToken } from 'request/authing';
import apiClient from 'request/client';


const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [accessToken, setAccessToken] = useState("" as string)
  // const [refreshToken, setRefreshToken] = useState("" as string)

  const refresh=()=>{
    refreshAccessToken();
    // apiClient.get("/auth/token/refresh")   
  }

  const logoutSys=()=>{
    logout()
  }

  const changePWD=()=>{
    changePassword()
  }

  useEffect(()=>{
    const token = localStorage.getItem(Constant.TOKEN) || ""
    let tokenDetail;
    try {
      tokenDetail = JSON.parse(token);
    } catch (e) {
      console.error("Failed to parse token", e);
      // Handle the error, e.g., clear the storage or redirect to login
    }
    // const tokenDetail = JSON.parse(token)
    if(token!==''){
      setAccessToken(tokenDetail.access_token);
      // setRefreshToken(tokenDetail.refresh_token);
    }
    if(!apiClient) return
    apiClient.get("/biz/summary")
  },[])
  return (
    <div style={{ height:'90%',marginTop:'10%',width:'70%',marginLeft:'10%'}}>
    <h2>Welcome to use AuthHubDemo.</h2>
    <div style={{marginTop:30,marginBottom:20}}>
    <SpaceBetween direction='vertical' size='s'>
    <div>currentToken: </div>
    <Textarea
      disabled
      onChange={({ detail }) => setAccessToken(detail.value)}
      value={accessToken}
      placeholder="This is a placeholder"
    />
    </SpaceBetween>
    </div>
    <SpaceBetween direction='vertical' size='s'>
    <div>You can:</div> 
    <SpaceBetween direction='horizontal' size='m'>
       <Button disabled>Refresh Token</Button>
       <Button disabled>Change Password</Button>
       <Button onClick={()=>logoutSys()}>Logout</Button>
    </SpaceBetween>
    </SpaceBetween>
    </div>
  );
};

export default Home;
