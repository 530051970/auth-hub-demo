import React from 'react';
export interface CommonInfo {
   builtInCognito?: string,
   apiUrl?: string,
   user?: any,
   oidc?: any,
   updateOIDC: (newOIDC: string)=>void
}

const ConfigContext = React.createContext<CommonInfo | null>(null);
export default ConfigContext;
