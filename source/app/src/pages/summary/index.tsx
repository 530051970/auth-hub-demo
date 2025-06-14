// export default Home;
import {
  AppLayout,
  AreaChart,
  Box,
  Button,
  Container,
  ContentLayout,
  Grid,
  Header,
  Link,
  SpaceBetween,
  Table, 
} from '@cloudscape-design/components';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import { ROUTES } from 'common/constants';

import CustomBreadCrumb from 'common/component/bread-crumb';

import Navigation from 'common/component/left-navigation';
import Pie from './comps/pie';
// import Pie from './comps/pie';

const HomeHeader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Header variant="h2" description="">
      {t('summary:dashboard')}
    </Header>
  );
};

const HomeContent: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <ContentLayout header={<HomeHeader />}>
      <div style={{marginTop: 13}}>
      <Container
        header={<Header variant="h3">{t('summary:getStarted')}</Header>}
        className="fix-mid-screen common-header"
      >
        <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}>
        <div
            className="flex-v justify-spacebetween"
            style={{ minWidth: 270 }}
          >
            <div style={{minHeight: 90}}>{t('summary:step1')}</div>
            <div className="mt-20">
              <Button
                onClick={() => navigate(ROUTES.Model)}
              >
                {t('summary:button.viewModels')}
              </Button>
            </div>
          </div>
          <div
            className="flex-v justify-spacebetween"
            style={{ minWidth: 250 }}
          >
            <div style={{minHeight: 90}}>{t('summary:step2')}</div>
            <div className="mt-20">
              <Button
                onClick={() => navigate(ROUTES.CreateApp)}
              >
                {t('summary:button.configApp')}
              </Button>
            </div>
          </div>
          <div
            className="flex-v justify-spacebetween"
            style={{ minWidth: 250 }}
          >
            <div style={{minHeight: 90}}>{t('summary:step3')}</div>
            <div className="mt-20">
              <Button
                onClick={() => navigate(ROUTES.App)}
              >
                {t('summary:button.useApi')}
              </Button>
            </div>
          </div>
        </Grid>
      </Container>
      </div>
      <div style={{marginTop: 25}}>
        <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
        <Container
        className="fix-mid-screen common-header"
      >
        <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 },{colspan: 4}]}>
              <div>
                <Box variant="awsui-key-label">
                  {t('summary:modelCnt')}
                </Box>
                <Link variant='awsui-value-large' className="no-link">18</Link>
              </div>
              <div>
                <Box variant="awsui-key-label">{t('summary:providerCnt')}</Box>
                <Link variant='awsui-value-large' className="no-link">2</Link>
              </div>
              <div>
                <Box variant="awsui-key-label">{t('summary:typeCnt')}</Box>
                <Link variant='awsui-value-large' className="no-link">3</Link>
              </div>
            </Grid>
       
      </Container>
      <Container
        
        className="fix-mid-screen common-header"
      >
        <div>
                <Box variant="awsui-key-label">
                  {t('summary:appCnt')}
                </Box>
                <Link variant='awsui-value-large' className="no-link">2</Link>
              </div>
       
      </Container>
        </Grid>
      
      </div>
      <div style={{marginTop: 25}}>
      <Container
        header={<Header variant="h3" description={t('summary:dataDesc')}>{t('summary:data')}</Header>}
        className="fix-mid-screen common-header"
      >
        <Grid gridDefinition={[{colspan:4},{colspan:4},{colspan:4}]}>
          <div >
            <Pie title={t('summary:modelCnt')} data={[
              { title: "DeepSeek-R1-Zero", percentage: 40, value: 40 },
              { title: "claude-3-5-haiku-20241022", percentage: 25, value: 25 },
              { title: "claude-3-opus-20240229", percentage: 20, value: 20 },
              { title: "DeepSeek-R1-Distill-Qwen-32B", percentage: 15, value: 15 }
            ]}/>
          </div>
          <div>
            <Pie title={t('summary:providerCnt')} data={[
          { title: "DeepSeek", percentage: 65, value: 18 },
          { title: "Anthropic", percentage: 35, value: 10 },
        ]}/></div>

          <div><Pie title={t('summary:appCnt')} data={[
          { title: "Shenlong Knowledge Base", percentage: 50, value: 1 },
          { title: "Shenlong Knowledge Base-New", percentage: 50, value: 1 }
        ]}/></div>

        </Grid>
        <div style={{marginTop:25, fontSize:14, fontWeight: 700,marginBottom: -5,marginLeft:3, color: 'rgb(0, 7, 22)'}}>{t('summary:hotModel')}</div>
        <Table
      renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: "variable",
          header: "Model id",
          cell: item => (
            item.model_id
          ),
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "alt",
          header: "Invoke Count",
          cell: item => item.cnt || "-",
          sortingField: "alt"
        },
        {
          id: "description",
          header: "Provider",
          cell: item => item.description || "-"
        }
      ]}
      items={[
        {
          model_id: "DeepSeek-R1-Zero",
          cnt: 32,
          description: "DeepSeek",
        },
        {
          model_id: "claude-3-5-haiku-20241022",
          cnt: 28,
          description: "Anthropic"
        },
        {
          model_id: "DeepSeek-R1-Distill-Qwen-32B",
          cnt: 12,
          description: "DeepSeek"
        },
        {
          model_id: "claude-3-opus-20240229",
          cnt: 8,
          description: "Anthropic"
        },
        {
          model_id: "DeepSeek-R1-Distill-Llama-8B",
          cnt: 3,
          description: "DeepSeek",
        }
      ]}
      loadingText="Loading resources"
      variant="embedded"
      sortingDisabled
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
           
          </SpaceBetween>
        </Box>
      }
      
    />
       
      </Container>
      </div>
      <div style={{marginTop: 25}}>
      <Container
        header={<Header variant="h3" description={t('summary:trafficDesc')}>{t('summary:traffic')}</Header>}
        className="fix-mid-screen common-header"
      >
        <AreaChart
      series={[
        {
          title: "DeepSeek",
          type: "area",
          data: [
            { x: new Date(1600963200000), y: 114 },
            { x: new Date(1600964100000), y: 136 },
            { x: new Date(1600965000000), y: 141 },
            { x: new Date(1600965900000), y: 123 },
            { x: new Date(1600966800000), y: 121 },
            { x: new Date(1600967700000), y: 119 },
            { x: new Date(1600968600000), y: 132 },
            { x: new Date(1600969500000), y: 126 },
            { x: new Date(1600970400000), y: 138 },
            { x: new Date(1600971300000), y: 144 },
            { x: new Date(1600972200000), y: 121 },
            { x: new Date(1600973100000), y: 113 },
            { x: new Date(1600974000000), y: 135 },
            { x: new Date(1600974900000), y: 113 },
            { x: new Date(1600975800000), y: 119 },
            { x: new Date(1600976700000), y: 124 },
            { x: new Date(1600977600000), y: 133 },
            { x: new Date(1600978500000), y: 135 },
            { x: new Date(1600979400000), y: 131 },
            { x: new Date(1600980300000), y: 136 },
            { x: new Date(1600981200000), y: 144 },
            { x: new Date(1600982100000), y: 115 },
            { x: new Date(1600983000000), y: 139 },
            { x: new Date(1600983900000), y: 128 },
            { x: new Date(1600984800000), y: 107 },
            { x: new Date(1600985700000), y: 110 },
            { x: new Date(1600986600000), y: 134 },
            { x: new Date(1600987500000), y: 111 },
            { x: new Date(1600988400000), y: 142 },
            { x: new Date(1600989300000), y: 130 },
            { x: new Date(1600990200000), y: 149 },
            { x: new Date(1600991100000), y: 121 }
          ],
          valueFormatter: function s(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                  "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                "K"
              : e.toFixed(2);
          }
        },
        {
          title: "Anthropic",
          type: "area",
          data: [
            { x: new Date(1600963200000), y: 10 },
            { x: new Date(1600964100000), y: 26 },
            { x: new Date(1600965000000), y: 45 },
            { x: new Date(1600965900000), y: 65 },
            { x: new Date(1600966800000), y: 76 },
            { x: new Date(1600967700000), y: 62 },
            { x: new Date(1600968600000), y: 83 },
            { x: new Date(1600969500000), y: 127 },
            { x: new Date(1600970400000), y: 104 },
            { x: new Date(1600971300000), y: 145 },
            { x: new Date(1600972200000), y: 121 },
            { x: new Date(1600973100000), y: 112 },
            { x: new Date(1600974000000), y: 145 },
            { x: new Date(1600974900000), y: 139 },
            { x: new Date(1600975800000), y: 128 },
            { x: new Date(1600976700000), y: 122 },
            { x: new Date(1600977600000), y: 145 },
            { x: new Date(1600978500000), y: 176 },
            { x: new Date(1600979400000), y: 201 },
            { x: new Date(1600980300000), y: 196 },
            { x: new Date(1600981200000), y: 213 },
            { x: new Date(1600982100000), y: 205 },
            { x: new Date(1600983000000), y: 216 },
            { x: new Date(1600983900000), y: 159 },
            { x: new Date(1600984800000), y: 238 },
            { x: new Date(1600985700000), y: 207 },
            { x: new Date(1600986600000), y: 187 },
            { x: new Date(1600987500000), y: 314 },
            { x: new Date(1600988400000), y: 165 },
            { x: new Date(1600989300000), y: 175 },
            { x: new Date(1600990200000), y: 230 },
            { x: new Date(1600991100000), y: 293 }
          ],
          valueFormatter: function s(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                  "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                "K"
              : e.toFixed(2);
          }
        }
      ]}
      xDomain={[
        new Date(1600963200000),
        new Date(1600991100000)
      ]}
      yDomain={[0, 500]}
      i18nStrings={{
        xTickFormatter: e =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: !1
            })
            .split(",")
            .join("\n"),
        yTickFormatter: function s(e) {
          return Math.abs(e) >= 1e9
            ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                "G"
            : Math.abs(e) >= 1e6
            ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
              "M"
            : Math.abs(e) >= 1e3
            ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
              "K"
            : e.toFixed(0);
        }
      }}
      ariaLabel="Stacked area chart"
      height={300}
      hideFilter
      xScaleType="time"
      xTitle="Time (UTC)"
      yTitle="Invoke times"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
       
      </Container>
      </div>
      
      
    </ContentLayout>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    {
      text: t('summary:breadcrumb.home'),
      href: ROUTES.Home,
    },
    {
      text: t('summary:breadcrumb.summary'),
      href: ROUTES.Home,
    },
  ];
  return (
    <AppLayout
      content={<HomeContent />}
      headerSelector="#header"
      breadcrumbs={<CustomBreadCrumb breadcrumbItems={breadcrumbItems} />}
      navigation={<Navigation activeHref={ROUTES.Home}/>}
      navigationWidth={290}
    />
  );
};

export default Home;
