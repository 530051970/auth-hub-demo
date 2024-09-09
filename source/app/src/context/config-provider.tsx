import React, { useState, useEffect, useContext } from 'react';
import ConfigContext, { CommonInfo } from './config-context';
import { alertMsg } from 'ts/common';
// import { Constant } from 'common/constants';
import { useLocation } from 'react-router-dom';
import { API_URL } from 'common/constants';

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const path = useLocation().pathname;
  const [commonInfo, setCommonInfo] = useState<CommonInfo | null>(null);

  useEffect(()=>{
    const fetchConfig = async () => {
      try {
        const response = await fetch('/auth.json');
        const data: any = await response.json();
        localStorage.setItem(API_URL, data.api_url);
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
