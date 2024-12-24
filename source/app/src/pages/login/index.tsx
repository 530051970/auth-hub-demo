import { Alert, Button, Checkbox, Grid, Link, SpaceBetween, Spinner, Tabs } from '@cloudscape-design/components';
import { LOGIN_TYPE } from 'enum/common_types';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import yaml from 'yaml';
import OIDC from './component/oidc';
import SNS from './component/sns';
import User from './component/user';
import './style.scss';
import axios, { AxiosError } from 'axios';
import apiClient from 'request/client';
import { BUILTIN_COGNITO, EN_LANG, OIDC_STORAGE, ROUTES, TOKEN, USER_DETAIL, ZH_LANG, ZH_LANGUAGE_LIST } from 'common/constants';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Login: FC = () => {
  const [activeTabId, setActiveTabId] = useState(LOGIN_TYPE.OIDC);
  const [logging, setLogging] = useState(false as boolean);
  const [username, setUsername] = useState(null as any);
  const [password, setPassword] = useState(null as any);
  const [keep, setKeep] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("" as string);
  const [config, setConfig]=useState(null as any);
  const [selectedProvider, setSelectedProvider] = useState(null as any);
  const [selectedProviderName, setSelectedProviderName] = useState(null as any);
  // const [selectedThird, setSelectedThird]  = useState("" as string);
  const [tabs, setTabs] = useState([] as any[]);
  const [thirdLogin, setThirdLogin] = useState([] as any[]);
  const [projectName, setProjectName] = useState("" as string)
  const [author, setAuthor] = useState("" as string)
  const [version, setVersion] = useState(0)
  const { t, i18n } = useTranslation();
  const [lang, setLang]= useState('')
  const [isLoading, setIsloading] = useState(true as boolean)
  const [customizeCognito, setCustomizeCognito]  = useState(false)

  useEffect(()=>{
    if (ZH_LANGUAGE_LIST.includes(i18n.language)) {
      setLang(ZH_LANG)
      i18n.changeLanguage(ZH_LANG);
    } else {
      setLang(EN_LANG)
      i18n.changeLanguage(EN_LANG);
    }
    const loadConfig = async ()=> {
      let response = await fetch('/config.yaml')
      let data = await response.text()
      return yaml.parse(data);
    }
    loadConfig().then(configData =>{
      setConfig(configData)
    })
    setError("")
  },[])

  useEffect(()=>{
      updateEnv(config)
  },[config, username, password, lang, selectedProvider])

  const updateEnv = (config: any)=>{
    setIsloading(true)
    if(config!==null){
      let tmp_tabs: any[] =[]
      let tmp_third_login: any[] =[]
      setProjectName(config.project)
      setAuthor(config.author)
      if(config.login.user){
        tmp_tabs.push({
          label: <div style={{width:100, textAlign: 'right'}}>{t('auth:username')}</div>,
          id: "user",
          content: (<User 
                      username={username}
                      password={password}
                      setUsername={setUsername}
                      setPassword={setPassword}
                    />),
          disabled: config.login.user.disabled || false
        })
      }
      if(config.login.sns){
        tmp_tabs.push({
          label: <div style={{paddingLeft:15,width:120, textAlign: 'center'}}>{t('auth:sns')}</div>,
          id: "sns",
          disabled: config.login.sns.disabled || false,
          content: (<SNS 
                      username={username}
                      password={password}
                      setUsername={setUsername}
                      setPassword={setPassword}
                    />)
        })
      }
      if(config.login.oidc && config.login.oidc.providers.length > 0){
        const tmp_login_params = new Map<string, any>();
        const oidcOptions:any[] =[]
        let customizedcognito = false
        config.login.oidc.providers.forEach((item:any)=>{
          let description = ""
          switch (item.name) {
            case "keycloak":
              description = t('auth:keycloakDesc');
              break;
            case "authing":
              description = t('auth:authingDesc');
              break;
            default:
              description = t('auth:cognitoDesc');
              break;
          }
          oidcOptions.push({
            label: item.label,
            iconUrl:`imgs/${item.name}.png`,
            value: item.name,
            clientId: item.clientId,
            clientSecret: item.clientSecret,
            redirectUri: item.redirectUri,
            disabled: item.disabled || false,
            tags: [description]
          })
          tmp_login_params.set(item.name, item)
          if(item.name === 'Cognito') {
            customizedcognito = true
            setCustomizeCognito(true)
          }
        })
        if(!customizedcognito && localStorage.getItem(BUILTIN_COGNITO)==='true'){
          const builtinCognito = {
            label:'Cognito',
            iconUrl:`../../imgs/cognito.png`,
            value: 'Cognito',
            tags: ['Assert built-in user authentication service']
          }
          oidcOptions.push(builtinCognito)
          tmp_login_params.set("cognito", builtinCognito) 
        }

        tmp_tabs.push({
          label: <div style={{width:120, textAlign: 'center'}}>{t('auth:oidc')}</div>,
          id: "oidc",
          disabled: config.login.oidc.disabled || false,
          content: (<OIDC
            provider= {selectedProvider||oidcOptions[0]}
            username={username}
            password={password}
            oidcOptions={oidcOptions}
            setSelectedProviderName={setSelectedProviderName}
            setProvider={setSelectedProvider}
            setUsername={setUsername}
            setPassword={setPassword}
            setError={setError}
          />)
        })
      }
      if(config.login.third && config.login.third.length > 0){
        tmp_third_login = config.login.third
        setThirdLogin(tmp_third_login)
      }
      setTabs(tmp_tabs)
      setIsloading(false)
    }
  }

  const changeLanguage = () => {
    if(lang===EN_LANG){
      setLang(ZH_LANG)
      i18n.changeLanguage(ZH_LANG);
    } else {
      setLang(EN_LANG)
      i18n.changeLanguage(EN_LANG);
    }
  };

  const forgetPwd =()=>{
    navigate(ROUTES.FindPWD)
  }

  const toRegister =()=>{
    navigate(ROUTES.Register)
  }

  const loginSystem = () => {
    const ver = version
    setError("")
    setLogging(true)
    if(activeTabId === LOGIN_TYPE.OIDC && selectedProvider == null){
      setError("provideId is required")
      setVersion(ver + 1)
      setLogging(false)
      return;
    }
    if(username == null || username === ''){
      setError(t('auth:error.username').toString())
      setVersion(ver + 1)
      setLogging(false)
      return;
    }
    if(password == null || password === ''){
      setError(t('auth:error.username').toString())
      setVersion(ver + 1)
      setLogging(false)
      return;
    }
    oidcLogin()
  }

  let userInfo: any= {}
  const oidcLogin = async()=>{
    let response: any
    try{
      if (selectedProvider.value === "Cognito" && customizeCognito === false){
        response = await apiClient.post('/auth/login', {
          builtin_cognito: true,
          provider: selectedProvider.label.toLowerCase(),
          username,
          password
        })
      } else {
        response = await apiClient.post('/auth/login', {
          builtin_cognito: false,
          redirect_uri: selectedProvider.redirectUri,
          client_id: selectedProvider.clientId,
          provider: selectedProvider.label.toLowerCase(),
          username,
          password
        })
      }
    } catch (error){
      if(error instanceof AxiosError) {
        let detail = error.response?.data.detail
        if(typeof detail === 'string') detail=JSON.parse(detail)
        if(detail){
          setError(detail.error_description)
        }
      } else {
        setError("Unknown error, please contact the administrator.")
      }
      setLogging(false)
      return
    }
    localStorage.setItem(OIDC_STORAGE, JSON.stringify({
      provider: selectedProvider.label,
      client_id: selectedProvider.clientId,
      redirect_uri: selectedProvider.redirectUri
    }))
    console.log(response.data.body.access_token || response.data.body.AuthenticationResult)

    if(customizeCognito){
      userInfo = await axios.get(
        `${selectedProvider.redirectUri}/oidc/me`,
        {
          headers: {
            'Authorization': `Bearer ${response.data.body.access_token}`
          }
        }
      );
      localStorage.setItem(TOKEN, JSON.stringify(response.data.body));
      localStorage.setItem(USER_DETAIL, JSON.stringify(userInfo.data));
    } else {
      userInfo = await axios.get(
        `${selectedProvider.redirectUri}/oidc/me`,
        {
          headers: {
            'Authorization': `Bearer ${response.data.body.access_token}`
          }
        }
      );
      const authResult = response.data.body.AuthenticationResult || response.data.body
      localStorage.setItem(TOKEN, JSON.stringify({
        access_token: authResult?.AccessToken|| authResult?.access_token,
        expires_in : authResult?.ExpiresIn|| authResult?.expires_in,
        id_token: authResult?.IdToken|| authResult?.id_token,
        refresh_token: authResult?.RefreshToken|| authResult?.refresh_token,
        scope: "openid profile",
        token_type: authResult?.TokenType|| authResult?.token_type
      }));
      localStorage.setItem(USER_DETAIL, JSON.stringify(userInfo.data))  
    }
    navigate(ROUTES.Home)
    if(isLoading){
      return (
        <Spinner/>
      )
    }
  }
  
  return (
    isLoading?(<div style={{paddingTop:"40%", paddingLeft:"45%"}}><Spinner size="large" /></div>):(
    <div className="login-div">
      <SpaceBetween direction='vertical' size='m'>  
      <div className='container'>
        <div className='banner'>{projectName}</div>
        <div className='sub-title'>{t('auth:support-prefix')} {author} {t('auth:support-postfix')} <Link variant="info" onFollow={()=>changeLanguage()}>{t('auth:changeLang')}</Link></div>
        <div className='tab' style={{paddingLeft:'10%'}}>
          <Tabs
            onChange={({ detail }) =>
              setActiveTabId(detail.activeTabId)
            }
            activeTabId={activeTabId}
            tabs={tabs}
          />
          <div className='bottom-setting'>
            <Grid
              gridDefinition={[{ colspan: 4 },{ colspan: 8 }]}
            >
              <div>
                <Checkbox
                  onChange={({ detail }) =>
                    setKeep(detail.checked)
                  }
                  checked={keep}
                >
                  <span className='keep'>{t('auth:keepLogin')}</span>
                </Checkbox>
              </div>
              <div style={{textAlign:"right"}}>
                <Link onFollow={forgetPwd} >{t('auth:forgetPWD')}</Link>&nbsp;&nbsp;&nbsp;<Link onFollow={toRegister} >{t('auth:register')}</Link>
              </div>
            </Grid>
          </div>
          <div className='button-group'>
            <Button variant="primary" className='login' loading={logging} onClick={loginSystem}>{t('auth:login')}</Button>
            <Grid gridDefinition={[ { colspan: 5 },{ colspan: 2 },{ colspan: 5 } ]}>
              <div style={{marginTop: 20, borderBottom: '1px solid #ccc'}}></div>
              <div style={{textAlign:"center",paddingTop:8, color:"#ccc"}}>{t('auth:or')}</div>
              <div style={{marginTop: 20, borderBottom: '1px solid #ccc'}}></div>
            </Grid>
            <div style={{marginTop: 12}}>
              <Button className='login' onClick={loginSystem} disabled>{t('auth:sso')}</Button>
            </div>
            <div style={{marginTop:10,textAlign:'right',color:'red',fontWeight:800,height:16}}>{error}</div>
            {/* <div style={{height:20, marginTop: 16, color:"#d93a7f7a", fontWeight:"bold", fontSize:12}}>{(error!==""&& error!==null)?(<><span style={{fontWeight: 800}}>·</span>&nbsp;{error}</>):""}</div> */}
          </div>
          <div style={{display:'none'}}>{selectedProviderName}</div>
        </div>
      </div>
      </SpaceBetween> 
    </div>)
  );
};

export default Login;
