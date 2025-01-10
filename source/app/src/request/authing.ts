
import jwtDecode from 'jwt-decode';
import apiClient from './client';
import { signOut } from "aws-amplify/auth";
import axios from 'axios';
import { API_URL, MIDWAY, OIDC_REDIRECT_URL, OIDC_STORAGE, TOKEN, USER } from 'common/constants';
import { Amplify } from 'aws-amplify';

export const refreshAccessToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem(TOKEN) || "").refresh_token;
  const oidc = JSON.parse(localStorage.getItem(OIDC_STORAGE) || "")

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  if (!oidc.provider) {
    throw new Error('No provider available');
  }
  if (!oidc.client_id) {
    throw new Error('No client available');
  }
  if(!apiClient) return
  const response = await apiClient.post('/auth/token/refresh', {
    provider: oidc.provider.toLowerCase(),
    client_id: oidc.client_id,
    refresh_token: refreshToken,
    redirect_uri: oidc.redirect_uri
  });

  const { access_token } = response.data;
  localStorage.setItem(TOKEN, JSON.stringify(response.data))
  return access_token;
};

export const isTokenExpired = (token:string) => {
  const decoded:any = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;

  return decoded.exp < now;
};


export const logout = () => {
    const oidc = localStorage.getItem(OIDC_STORAGE) || ""
    if(oidc === "midway"){
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
      signOut({ global: true })
    } else {
      const redirectUri = JSON.parse(oidc).redirect_uri
      const token = localStorage.getItem(TOKEN)
      if(!redirectUri || !token) return
        axios.get(
          `${redirectUri}/api/v2/logout`,
          {
            headers: {
              'Authorization': `Bearer ${JSON.parse(token).access_token}`
            }
          }
        );
    }
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(OIDC_STORAGE);
    window.location.href='/login';
};


export const changePassword = () => {
  const redirectUri = localStorage.getItem(OIDC_REDIRECT_URL)
  const token = localStorage.getItem(TOKEN)
  if(!redirectUri || !token) return
  axios.get(
      `${redirectUri}/api/v2/logout`,
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token).access_token}`
        }
      }
  );
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
  localStorage.removeItem(API_URL);
  window.location.href='/login';
};
