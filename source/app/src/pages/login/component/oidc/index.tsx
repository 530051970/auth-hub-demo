import { Input, Select } from '@cloudscape-design/components';
import './style.scss';
import { useContext, useEffect } from 'react';
import ConfigContext from 'context/config-context';
interface OIDCProps {
    provider: any,
    username: string,
    password: string,
    oidcOptions: any[],
    setProvider: Function,
    setUsername: Function,
    setPassword: Function,
    setSelectedProviderName: Function
}
const OIDC = (props: OIDCProps) => {
    const {provider,
           username,
           password,
           oidcOptions,
           setProvider,
           setUsername,
           setPassword,
           setSelectedProviderName
           } = props
    const context = useContext(ConfigContext);

    const updateContext =(oidcContent: any)=>{
      context?.updateOIDC(oidcContent)
    }

    useEffect(()=>{
      console.log(`oidcOptions is ${oidcOptions}`)
    },[])
    
    return (<div className='oidc'>
        <div className='item'>
          <Select
            placeholder='Please choose one OIDC provider'
            selectedOption={provider}
            onChange={({ detail }:{detail: any}) => {
               updateContext(detail.selectedOption)
               setProvider(detail.selectedOption)
               setSelectedProviderName(detail.selectedOption.value)
              }
            }
            options={oidcOptions}
    />
         </div>
    {/* </Grid> */}
    {/* <Grid
      gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}
    >
        <div className='label'>Username</div> */}
        <div className='item'>
        <Input
      onChange={({ detail }) => setUsername(detail.value)}
      value={username}
      placeholder="Please input username"
    />
        </div>
        <div className='item'>
        <Input
        type='password'
      onChange={({ detail }) => setPassword(detail.value)}
      value={password}
      placeholder="Please input password"
    />
        </div>
    {/* </Grid>    */}
    
    
    </div>)
}

export default OIDC