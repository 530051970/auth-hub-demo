
import jwtDecode from 'jwt-decode';
import apiClient from './client';
import { Constant } from 'common/constants';
import { useContext } from 'react';
import ConfigContext from 'context/config-context';
import axios from 'axios';

// curl --request POST \
//   --url https://<authing-domain>/oidc/token \
//   --header 'Content-Type: application/x-www-form-urlencoded' \
//   --data 'grant_type=refresh_token
    //  &client_id=<your-client-id>
    // &client_secret=<your-client-secret>
    // &refresh_token=<your-refresh-token>&scope=openid'
export const refreshAccessToken = async () => {
  // const { clientId, oidcProvider } = oidcInfo;
  // const refreshToken = localStorage.getItem('refresh_token');
  const refreshToken = JSON.parse(localStorage.getItem(Constant.TOKEN) || "").refresh_token;
  const provider = localStorage.getItem(Constant.PROVIDER);
  const clientId = localStorage.getItem(Constant.CLIENT_ID)

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  if (!provider) {
    throw new Error('No provider available');
  }
  if (!clientId) {
    throw new Error('No client available');
  }
  if(!apiClient) return
  const response = await apiClient.post('token/refresh', {
    // grant_type: 'refresh_token',
    oidc_provider: provider,
    client_id: clientId,
    // client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const { access_token } = response.data;
//   setLocalToken(access_token);
  localStorage.setItem(Constant.TOKEN, response.data)
  return access_token;
};

export const isTokenExpired = (token:string) => {
  const decoded:any = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;

  return decoded.exp < now;
};


export const logout = () => {
    const redirectUri = localStorage.getItem(Constant.OIDC_REDIRECT_URL)
    const token = localStorage.getItem(Constant.TOKEN)
    if(!redirectUri || !token) return
    axios.get(
        `${redirectUri}/api/v2/logout`,
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(token).access_token}`
          }
        }
    );
    localStorage.removeItem(Constant.TOKEN);
    localStorage.removeItem(Constant.USER);
    localStorage.removeItem(Constant.API_URL);
    window.location.href='/login';
};


export const changePassword = () => {
  const redirectUri = localStorage.getItem(Constant.OIDC_REDIRECT_URL)
  const token = localStorage.getItem(Constant.TOKEN)
  if(!redirectUri || !token) return
  axios.get(
      `${redirectUri}/api/v2/logout`,
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token).access_token}`
        }
      }
  );
  localStorage.removeItem(Constant.TOKEN);
  localStorage.removeItem(Constant.USER);
  localStorage.removeItem(Constant.API_URL);
  window.location.href='/login';
};
