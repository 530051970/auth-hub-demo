import { AppLayout, Container, ContentLayout, Grid, Header, SegmentedControl, TextFilter } from "@cloudscape-design/components";
import CustomBreadCrumb from "common/component/bread-crumb";
import Navigation from "common/component/left-navigation";
import { ROUTES } from "common/constants";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './styles.scss';
import ModelView from "./comps/model-view";
import ProviderView from "./comps/provider-view";


interface ContentProps {
    filteringText: string;
    showType: string;
    setFilteringText: (text: string) => void;
    setShowType: (text: string) => void;
}
const ModelHeader: React.FC = () => {
    const { t } = useTranslation();

    return (
      <Header variant="h2" description={t('model:description')}>
        {t('model:title')}
      </Header>
    );
  };

  const Content: React.FC<ContentProps> = (props: ContentProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {filteringText, showType, setFilteringText, setShowType} = props;
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
    <div style={{float: "right"}}>
    <SegmentedControl
      selectedId={showType}
      onChange={({ detail }) =>
        setShowType(detail.selectedId)
      }
      label="Default segmented control"
      options={[
        { text: "Model View", id: "model" },
        { text: "Provider View", id: "provider" },
      ]}
    /></div>
        </Grid>
        
      
    </Container>
    </div>
    <div style={{marginTop: 30}}>
    {(showType === "model") ? (
            <ModelView data="model data"/>
        ) :(
            <ProviderView data="provider data"/>
        )
        }
    </div>
    
        </ContentLayout>
    )}
const Model: FC = () => {

    const { t } = useTranslation();
    const [
        filteringText,
        setFilteringText
      ] = React.useState("");
      const [
        showType,
        setShowType
      ] = React.useState("model");
  const breadcrumbItems = [
    {
      text: t('model:breadcrumb.home'),
      href: ROUTES.Home,
    },
    {
      text: t('model:breadcrumb.integration'),
      href: ROUTES.Model,
    },
  ];



  return (
    <AppLayout
      content={<Content 
        filteringText={filteringText} 
        showType={showType}
        setFilteringText={setFilteringText}
        setShowType={setShowType}
        />}
      headerSelector="#header"
      breadcrumbs={<CustomBreadCrumb breadcrumbItems={breadcrumbItems} />}
      navigation={<Navigation activeHref={ROUTES.Model}/>}
      navigationWidth={290}
    />
  );
};

export default Model;