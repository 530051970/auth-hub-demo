import React from 'react';
export interface CommonInfo {
   apiUrl?: string,
   user?: any,
   oidc?: any,
   updateOIDC: (newOIDC: string)=>void
}

const ConfigContext = React.createContext<CommonInfo | null>(null);
export default ConfigContext;
