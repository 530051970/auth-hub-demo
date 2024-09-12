
import jwtDecode from 'jwt-decode';
import apiClient from './client';
import axios from 'axios';
import { API_URL, CLIENT_ID, OIDC_REDIRECT_URL, OIDC_STORAGE, PROVIDER, TOKEN, USER } from 'common/constants';

export const refreshAccessToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem(TOKEN) || "").refresh_token;
  const oidc = JSON.parse(localStorage.getItem(OIDC_STORAGE) || "")
  // const provider = localStorage.getItem(PROVIDER);
  // const clientId = localStorage.getItem(CLIENT_ID)

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

  const { access_token } = response.data.access_token;
  localStorage.setItem(TOKEN, JSON.stringify(response.data))
  return access_token;
};

export const isTokenExpired = (token:string) => {
  const decoded:any = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;

  return decoded.exp < now;
};


export const logout = () => {
    const oidc = JSON.parse(localStorage.getItem(OIDC_STORAGE) || "")
    const redirectUri = oidc.redirect_uri
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
    localStorage.removeItem(OIDC_STORAGE);
    // localStorage.removeItem()
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
