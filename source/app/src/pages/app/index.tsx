import { AppLayout, Button, Container, ContentLayout, Grid, Header, Icon, Link, Pagination, SegmentedControl, TextFilter } from "@cloudscape-design/components";
import CustomBreadCrumb from "common/component/bread-crumb";
import Navigation from "common/component/left-navigation";
import RightModal from "common/component/right-modal";
import { ROUTES } from "common/constants";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AppDetail from "./app-details";

interface ContentProps {
    data: {
        application_name: string;
        model_id: string;
        key: string;
        type: string;
        created_at: string;
        created_by: string;
    }[];
    filteringText: string;
    setFilteringText: (text: string) => void;
}
const ModelHeader: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
      <Header variant="h2" description={t('application:description')} actions={
        <Button onClick={()=>navigate(ROUTES.CreateApp)}>{t('application:createApp')}</Button>
      }>
        {t('application:title')}
      </Header>
    );
  };

  const Content: React.FC<ContentProps> = (props: ContentProps) => {
    const { t } = useTranslation();

    const [currentPageIndex, setCurrentPageIndex] = React.useState(1);
    const {data, filteringText, setFilteringText} = props;
    const [showGuide, setShowGuide] = React.useState(false);
    const [currentApp, setCurrentApp] = React.useState(null as any);
    return (
        <ContentLayout header={<ModelHeader />}>
            <div style={{marginTop: 13}}>
            <Container
      header={
        <Header
          variant="h3"
        >
          Filter
        </Header>
      }
    >
        <Grid gridDefinition={[{colspan:8}, {colspan:4}]}>
            <div className="filtering">
        <TextFilter
      filteringText={filteringText}
      filteringPlaceholder="Find instances"
      filteringAriaLabel="Filter instances"
      onChange={({ detail }) =>
        setFilteringText(detail.filteringText)
      }
    />
    </div>
    <div style={{float: 'right'}}><Pagination
      currentPageIndex={currentPageIndex}
      onChange={({ detail }) =>
        setCurrentPageIndex(detail.currentPageIndex)
      }
      pagesCount={1}
    /></div>
        </Grid>
        
      
    </Container>
    </div>
    <div style={{marginTop: 30}}>
        <Grid gridDefinition={[{colspan:6},{colspan:6}]}>
           {data.map((item)=>{
            return (<Container
              >
                <Grid gridDefinition={[{colspan:9},{colspan:3}]}>
                <div style={{fontSize:16, fontWeight:800}}>
               {item.application_name}
               </div><div style={{float: 'right'}}><Link className="no-link" fontSize="body-s" onFollow={()=>{
                setCurrentApp(item);
                setShowGuide(true);
               }}>How to use?</Link></div>
                </Grid>
                
               
               <Grid gridDefinition={[{colspan:3},{colspan:9}]}>
               <div style={{marginTop:20,fontWeight:700}}>Model:</div>
               <div style={{marginTop:20}}>{item.type==="model"?item.model_id:"No model is specified. Please pass it in when calling the API."}</div>
               </Grid>
               <Grid gridDefinition={[{colspan:3},{colspan:9}]}>
               <div style={{fontWeight:700,marginTop:-8}}>Liscence:</div>
               <div>
                <Grid gridDefinition={[{colspan:4},{colspan:8}]}>
               <div style={{marginTop:-8}}>{item.key}</div><div style={{marginTop:-5}}><Icon name="copy" size="small"/></div>
               </Grid>
               </div>
               </Grid>
               
               <Grid gridDefinition={[{colspan:3},{colspan:9}]}>
                <div></div>
                <div style={{float:"right",fontSize: 12}}><span style={{fontStyle:'italic'}}>{item.created_by}</span> Created at <span style={{fontStyle:'italic'}}>{item.created_at}</span></div>
               </Grid>
              </Container>)
           })}
        </Grid>
    
    </div>
    <RightModal
                setShowModal={setShowGuide}
                showModal={showGuide}
                header={currentApp?.application_name||''}
                
                showFolderIcon={false}
              >
                <div className="add-identfier-modal">
                  <AppDetail data={currentApp}/>
                </div>
              </RightModal>
    
        </ContentLayout>
    )}

const Application: FC = () => {

    const { t } = useTranslation();
    const [
        filteringText,
        setFilteringText
      ] = React.useState("");
  const breadcrumbItems = [
    {
      text: t('application:breadcrumb.home'),
      href: ROUTES.Home,
    },
    {
      text: t('application:breadcrumb.application'),
      href: ROUTES.App,
    },
  ];


const data =[{
    application_name: "Shenlong Knowledge Base",
    type: "model",
    model_id: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
    key: "SDDDS2****34DS",
    created_at: "2025-01-23 16:37:28",
    created_by: "taroo"
},{
    application_name: "Shenlong Knowledge Base-New",
    type: "non-model",
    model_id: "",
    key: "ADRFOL****78UI",
    created_at: "2025-01-23 17:27:33",
    created_by: "taroo"
}]


  return (
    <AppLayout
      content={<Content
        data={data} 
        filteringText={filteringText} 
        setFilteringText={setFilteringText}
        />}
      headerSelector="#header"
      breadcrumbs={<CustomBreadCrumb breadcrumbItems={breadcrumbItems} />}
      navigation={<Navigation activeHref={ROUTES.App}/>}
      navigationWidth={290}
    />
  );
};

export default Application;