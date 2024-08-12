import axios, { AxiosInstance } from 'axios';
import { refreshAccessToken, isTokenExpired, logout } from './authing';
import { Constant } from 'common/constants';

const apiClient = axios.create({
  baseURL: '',
  // withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config: any) => {
    config.baseURL = localStorage.getItem(Constant.API_URL);
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // config.withCredentials = true;
    const excludedPaths = ['/login'];
    if (excludedPaths.some(path => config.url.includes(path))) {
      config.headers['Authorization'] = `Auth-api-key`;
      return config;
    }
    let token = localStorage.getItem(Constant.TOKEN);
    if(token){
      const accessToken = JSON.parse(token).access_token
      if (accessToken){
        if(isTokenExpired(accessToken)) {
          try {
            token = await refreshAccessToken();
          } catch (error) {
            logout();
            window.location.href = '/login';
            return Promise.reject(error);
          }
        } else {
          config.headers['Access-Control-Allow-Origin'] = ['*'];
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          config.headers['OidcIssuer'] = localStorage.getItem(Constant.OIDC_REDIRECT_URL);

        }
      }
      return config;
      // return 
    } else {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      window.location.href = '/login';
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
