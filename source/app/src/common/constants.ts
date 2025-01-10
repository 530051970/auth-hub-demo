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


  // domain: "us-east-1veitkbhlq.auth.us-east-1.amazoncognito.com",
  // scopes: ["openid", "email","aws.cognito.signin.user.admin", "profile"],
  // redirectSignIn: ["https://ai-animation.me.industry.gcr.aws.dev/auth-hub/login"],
  // redirectSignOut: ["https://ai-animation.me.industry.gcr.aws.dev/"],
export const MIDWAY = {
  USER_POOL_ID: "us-east-1_IM5zGhc8w",
  USER_POOL_CLIENT_ID: "2m165ontae26nt91gesos569pl",
  AUTH_DOMAIN: "us-east-1im5zghc8w.auth.us-east-1.amazoncognito.com",
  SCOPES: ["openid", "email","aws.cognito.signin.user.admin", "profile"],
  REDIRECT_SIGNIN: ["https://deu59wuttwjgy.cloudfront.net/login", "http://localhost:3088/login"],
  REDIRECT_SIGNOUT: ["https://deu59wuttwjgy.cloudfront.net", "http://localhost:3088"],
    
}