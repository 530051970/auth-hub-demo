import { AppLayout, AttributeEditor, Button, Container, ContentLayout, FormField, Grid, Header, Input, Link, Pagination, SegmentedControl, Select, SpaceBetween, TextFilter, Toggle } from "@cloudscape-design/components";
import CustomBreadCrumb from "common/component/bread-crumb";
import Navigation from "common/component/left-navigation";
import { ROUTES } from "common/constants";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const ModelHeader: React.FC = () => {
    const { t } = useTranslation();
   
   

    return (
      <Header variant="h2" description={t('application:description')} >
        {t('application:title')}
      </Header>
    );
  };

  const Content: React.FC = () => {
    const { t } = useTranslation();
    const [appName, setAppName] = React.useState("");
    const [specifyModel, setSpecifyModel] = React.useState(false);
    const [items, setItems] = React.useState([
      { model: "", key: "" }
    ]);
    const [
    selectedOption,
    setSelectedOption
  ] = React.useState([{
    "label": "deepseek-ai/DeepSeek-R1",
    "value": "deepseek-ai/DeepSeek-R1",
    "tags": [
              "DeepSeek",
              "Text Generation"
          ]
    }]);
    return (
        <ContentLayout header={<ModelHeader />}>
            <div style={{marginTop: 13}}>
            <Container
      header={
        <Header
          variant="h3"
        >
          Create Application
        </Header>
      }
    >
      <SpaceBetween direction="vertical" size='m'>
      <FormField
      description="Input the name of the application"
      label="Application name"
    >
      <Input
        value={appName}
        onChange={event =>
          setAppName(event.detail.value)
        }
      />
    </FormField>
    <FormField
      description="If no model is specified, you must pass the model_id when calling the API."
      label="Specify Model"
    >
      <Toggle
      onChange={({ detail }) =>
        setSpecifyModel(detail.checked)
      }
      checked={specifyModel}
    />
      
    </FormField>
    {specifyModel && (<>
      <AttributeEditor
                  onAddButtonClick={() => setItems([...items, {model:"", key:""}])}
                  onRemoveButtonClick={({
                    detail: { itemIndex }
                  }) => {
                    const tmpItems = [...items];
                    tmpItems.splice(itemIndex, 1);
                    setItems(tmpItems);
                  } }
                  items={items}
                  addButtonText="Add new item"
                  definition={[
                    {
                      label: "Model",
                      info:"Select models used in this application",
                      control: item => (
                        // <Input
                        //   value={item.model}
                        //   placeholder="Enter key" />
                          <Select
      selectedOption={{label:item.model, value:item.model}}
      placeholder="Please select a model..."
      filteringType="auto"
      onChange={({ detail }:{detail:any}) =>{
        setSelectedOption(detail.selectedOption)
        item.model = detail.selectedOption.value
      }
      }
      options={[
        {
          "label": "deepseek-ai/DeepSeek-R1",
          "value": "deepseek-ai/DeepSeek-R1",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Zero",
          "value": "deepseek-ai/DeepSeek-R1-Zero",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
          "value": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
          "value": "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
          "value": "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
          "value": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
          "value": "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      },
      {
          "label": "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
          "value": "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
          "tags": [
              "DeepSeek",
              "Text Generation"
          ]
      }
      ]}
    />
                      )
                    },
                    {
                      label: "API Key",
                      info:"Input API key when invoke models",
                      control: item => (
                        <Input
                          value={item.key}
                          placeholder="Enter API Key..." />
                      )
                    }
                  ]}
                  empty="No items associated with the resource." removeButtonText={"Remove this item"}    />
    
    
    </>)}
    
    
    </SpaceBetween>
       
        
      
    </Container>
    </div>
    <div style={{float:"right",marginTop:20}}>
      <SpaceBetween direction="horizontal" size="m">
      <Button>Cancel</Button>
      <Button variant="primary">Save</Button>
      </SpaceBetween>
    
    </div>
  
    
        </ContentLayout>
    )}

const CreateApp: FC = () => {

    const { t } = useTranslation();
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




  return (
    <AppLayout
      content={<Content/>}
      headerSelector="#header"
      breadcrumbs={<CustomBreadCrumb breadcrumbItems={breadcrumbItems} />}
      navigation={<Navigation activeHref={ROUTES.App}/>}
      navigationWidth={290}
    />
  );
};

export default CreateApp;