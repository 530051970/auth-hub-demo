import React, { useState } from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import SpaceBetween from "@cloudscape-design/components/space-between";
import CatalogList from './componments/CatalogList';
import { TAB_LIST } from 'enum/common_types';
import { useSearchParams } from 'react-router-dom';
import format from 'date-fns/format';
import { getExportS3Url, clearS3Object } from 'apis/data-catalog/api';
import './style.scss';
import {
  AppLayout,
  Box,
  Button,
  Container,
  ContentLayout,
  FormField,
  Grid,
  Header,
  Input,
  Link,
  Pagination,
  Select,
  Table,
  TextFilter,
} from '@cloudscape-design/components';
import CustomBreadCrumb from 'pages/left-menu/CustomBreadCrumb';
import Navigation from 'pages/left-menu/Navigation';
import { RouterEnum } from 'routers/routerEnum';
import { useTranslation } from 'react-i18next';
import HelpInfo from 'common/HelpInfo';
import { buildDocLink } from 'ts/common';
import { alertMsg } from 'tools/tools';

const DataGenerateHeader: React.FC = () => {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const [fileType, setFileType] = React.useState("xlsx");



  return (
    <Header variant="h2" 
      actions={<Button>Button</Button>}
      description={t('deletes3:deleteS3Desc')}
      >
      {t('deletes3:deleteS3')}
    </Header>
  );
};

const BatchDeleteS3: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const [keyword, setKeyword] = useState("")
  const [selectedAcount, setSelectedAcount] = useState(null as any)
  const [step, setStep] = useState(1)
  const [currentPageIndex, setCurrentPageIndex] = useState(1)


  const breadcrumbItems = [
    { text: t('breadcrumb.home'), href: RouterEnum.Home.path },
    { text: t('breadcrumb.batchDeleteS3'), href: RouterEnum.DataGenerate.path },
  ];

  const gotoNext = ()=>{
    setStep(step+1)
  }

  const gotoBefore = ()=>{
    setStep(step-1)
  }

  return (
    <AppLayout
      contentHeader={<DataGenerateHeader />}
      
      content={
        <ContentLayout className="catalog-layout">
          {step===1?(
            <div style={{paddingLeft:20, marginTop:60}}>
            <Container
              header={<div style={{paddingLeft:20,paddingTop:30}}><Header variant="h3">配置清理对象</Header></div>}
            >
              <div style={{padding:20,paddingBottom:40}}>
            <SpaceBetween direction='vertical' size='xxl'>
            <FormField
            
      description={<div>没有想要操作的账号？点击{" "}
      <Link
        href="#"
        variant="primary"
        fontSize="body-s"
      >
        这里
      </Link>{" "}配置新账号</div>}
      label="步骤1. 请选择账号"
    >
      <Select
      selectedOption={selectedAcount}
      onChange={({ detail }) =>
        setSelectedAcount(detail.selectedOption)
      }
      options={[]}
      loadingText="Loading instances"
      placeholder="请选择一个账号..."
      statusType="loading"
    />
    </FormField>
    {/* <div style={{height:5,width:'60%'}}></div> */}
    <FormField
      description="与Bucket的名字做匹配，名字中包含关键字的将被作为清理对象."
      label="步骤2. 请输入关键字"
    >
      <Input
        value={keyword}
        onChange={event =>
          setKeyword(event.detail.value)
        }
      />
    </FormField>
            </SpaceBetween>
            </div>
            
            </Container>
            </div>
          ):(
            <div style={{paddingLeft:20, marginTop:60}}>
            <Container
              header={<div style={{paddingLeft:20,paddingTop:30}}><Header variant="h3">命中桶对象</Header></div>}
            >
              <div style={{padding:20,paddingTop:5,width:'92%'}}>
                <div style={{display:'flex',justifyContent:'right'}}>
              <Pagination
      currentPageIndex={currentPageIndex}
      onChange={({ detail }) =>
        setCurrentPageIndex(detail.currentPageIndex)
      }
      pagesCount={5}
    /></div>
              <Table
              variant="embedded"
      columnDefinitions={[
        {
          id: "name",
          header: "名称",
          cell: item => (
            <div style={{fontWeight:'bold',width:300,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.name || "-"}</div>
          ),
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "account",
          header: "账号",
          cell: item => item.account || "-",
          sortingField: "alt"
        },
        {
          id: "region",
          header: "区域",
          cell: item => item.region || "-"
        },
        {
          id: "createdAt",
          header: "创建时间",
          cell: item => item.createdAt || "-"
        }
      ]}
      items={[
        {
          name: "admin-gluebucketgluesharedbucket5319aa20-p8h48gg8f7uc",
          account: "456882501179",
          region: "US West (N. California) us-west-1",
          createdAt: "February 8, 2023, 18:07:08 (UTC+08:00)",
        },
        {
          name: "admin-sensitivedataprotectionloglogbucket51b0ce04-shiqqfa3gjh9",
          account: "456882501179",
          region: "US West (N. Ohio) us-west-2",
          createdAt: "February 12, 2023, 18:07:08 (UTC+08:00)",
        },
        {
          name: "amazon-braket-qc-609a3ce0",
          account: "456882501179",
          region: "US East (N. Virginia) us-east-1",
          createdAt: "February 12, 2023, 18:07:08 (UTC+08:00)",
        },
        {
          name: "amazon-braket-us-east-1-456882501179",
          account: "456882501179",
          region: "US West (N. Ohio) us-west-2",
          createdAt: "February 12, 2023, 18:07:08 (UTC+08:00)",
        },
        {
          name: "amplify-datagenerator-staging-3c0a2-deployment",
          account: "456882501179",
          region: "US West (N. Ohio) us-west-2",
          createdAt: "February 12, 2023, 18:07:08 (UTC+08:00)",
        },
        {
          name: "cdk-hnb659fds-assets-456882501179-us-west-1",
          account: "456882501179",
          region: "Europe (London) eu-west-2",
          createdAt: "February 12, 2023, 18:07:08 (UTC+08:00)",
        }
      ]}
      loadingText="Loading resources"
      sortingDisabled
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
    />
            </div>
            <div style={{padding:30,paddingBottom:10, width:"63%",display:'flex',justifyContent:"right"}}>
            <SpaceBetween direction='horizontal' size='m'>
            
            </SpaceBetween>
            </div>
            </Container>
            
            </div>
          )}
           
           <div style={{paddingTop:20, paddingBottom:10,display:'flex',justifyContent:"right"}}>
            <SpaceBetween size='m' direction='horizontal'>
            {step!==1&&<Button onClick={gotoBefore}>上一步</Button>}
            <Button variant="primary" onClick={gotoNext}>下一步</Button>
            </SpaceBetween>
            </div>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={<CustomBreadCrumb breadcrumbItems={breadcrumbItems} />}
      navigation={<Navigation activeHref={RouterEnum.DataGenerate.path} />}
      navigationWidth={290}
    />
  );
};

export default BatchDeleteS3;
