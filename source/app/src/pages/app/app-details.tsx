import { Container, Header, SpaceBetween, Tabs } from "@cloudscape-design/components";
import React from "react";
import { FC } from "react"

interface AppDetailProps {
    data: any
}

const AppDetail: FC<AppDetailProps> = (props: AppDetailProps) => {
    const {data} = props;
    return (<div style={{marginLeft:32}}>
    <div style={{ float:"left",fontSize: 12, marginBottom:5, width:"100%"}}><span style={{fontStyle:'italic'}}>{data.created_by}</span> Created at <span style={{fontStyle:'italic'}}>{data.created_at}</span></div>
    <div style={{float:"left",width:"90%"}}>
    <Tabs
      tabs={[
        {
          label: <div style={{float:"left", width:"100%"}}>Usage</div>,
          
          id: "usage",
          content: (<SpaceBetween direction="vertical" size="m">
          <Container
      header={
        <Header
          variant="h3"
          description="you must install the SDK to use this app"
        >
          Call By SDK
        </Header>
      }
    >
      <div style={{backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5, width:"95%",height:"200px"}}></div>
    </Container>
    <Container
      header={
        <Header
          variant="h3"
          description="you can also call it by rest api"
        >
          Call By RestApi
        </Header>
      }
    >
      <div style={{backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5, width:"95%",height:"200px"}}></div>
    </Container>
          
          
          </SpaceBetween>)
        },
        {
          label: "Log",
          id: "log",
          content: (<div style={{backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5, width:"100%",height:"800px"}}></div>)
        }
      ]}
    /></div>
    </div>)
}
export default AppDetail;