export const ZH_LANGUAGE_LIST = ['zh', 'zh-cn', 'zh_CN', 'zh-CN'];
export const EN_LANGUAGE_LIST = ['en', 'en-US', 'en_UK'];
export const ZH_TEXT = '简体中文';
export const EN_TEXT = 'English(US)';
export const EN_LANG = 'en';
export const ZH_LANG = 'zh';
export const LANGUAGE_ITEMS = [
  { id: EN_LANG, text: EN_TEXT },
  { id: ZH_LANG, text: ZH_TEXT },
];

export const TOKEN = "token"
export const USER = "user"
export const USER_DETAIL = "user_detail"
export const BUILTIN_COGNITO = "build_in_cognito"
export const API_URL = "api_url"
export const OIDC_STORAGE = "oidc"
export const OIDC_REDIRECT_URL = "oidc_uri"
export const PROVIDER = "provider"
export const CLIENT_ID = "client_id"
export const REFRESH_TOKEN = "refresh_token"
export const AUTO_LOGOUT_TIME = 15 * 60 * 1000

export const ROUTES = {
    Login: '/login',
    FindPWD: '/find-password',
    Register: '/create-account',
    ChangePWD: '/change-password',
    LoginCallback: '/signin',
    Home: '/'
  };