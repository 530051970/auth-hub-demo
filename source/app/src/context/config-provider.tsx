import React, { useState, useEffect } from 'react';
import ConfigContext, { CommonInfo } from './config-context';

// import { Constant } from 'common/constants';
import { API_URL, APP_URL } from 'common/constants';
import { alertMsg } from 'common/utils';

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [commonInfo, setCommonInfo] = useState<CommonInfo | null>(null);

  useEffect(()=>{
    const fetchConfig = async () => {
      try {
        const response = await fetch('/auth.json');
        const data: any = await response.json();
        localStorage.setItem(API_URL, data.api_url);
        localStorage.setItem(APP_URL, data.app_url);
      } catch (error) {
        alertMsg('Please check auth.json file', 'error');
        console.error('Failed to fetch config:', error);
      }
    };
    fetchConfig();
  },[])

  const updateOIDC = (newOIDC: string) => {
    setCommonInfo((prevInfo: any) => ({
      ...prevInfo,
      oidc: newOIDC
    }));
  };
  
  return (
    <ConfigContext.Provider value={{...commonInfo, updateOIDC}}>{children}</ConfigContext.Provider>
  );
};
export default ConfigProvider;
