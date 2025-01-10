import { Button, SpaceBetween, Textarea } from '@cloudscape-design/components';
import { TOKEN, USER } from 'common/constants';
import React, { useEffect, useState } from 'react';
import { logout, changePassword, refreshAccessToken } from 'request/authing';
import apiClient from 'request/client';


const Home: React.FC = () => {
  const [accessToken, setAccessToken] = useState("" as string)
  const [userDetail, setUserDetail] = useState("" as string)

  const refresh= async()=>{
    const res = await refreshAccessToken();
    setAccessToken(res) 
  }

  const logoutSys=()=>{
    logout()
  }

  const changePWD=()=>{
    changePassword()
  }

  useEffect(()=>{
    const token = localStorage.getItem(TOKEN) || ""
    const userStorage = localStorage.getItem(USER) || ""
    if(token!==""){
      setAccessToken(JSON.parse(token).access_token);
    }
    setUserDetail(userStorage)
    if(!apiClient) return
  },[])
  return (
    <>
    <div style={{ height:'90%',marginTop:'10%',width:'70%',marginLeft:'10%'}}>
    <h2>Hi {userDetail}! Welcome to use AuthHubDemo.</h2>
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
       <Button onClick={()=>refresh()}>Refresh Token</Button>
       <Button onClick={()=>changePWD()}>Change Password</Button>
       <Button onClick={()=>logoutSys()}>Logout</Button>
    </SpaceBetween>
    </SpaceBetween>
    </div>
    </>
  );
};

export default Home;
