import { Box, Button, Cards, CollectionPreferences, Container, Grid, Header, Link, Pagination, SpaceBetween, Table } from "@cloudscape-design/components";
import { ROUTES } from "common/constants";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface ModelViewProps {
  data: any
}

// const Overview: React.FC<OverViewProps> = (props: OverViewProps) => {
const ModelView: FC<ModelViewProps> = (props: ModelViewProps) => {
    // const { data } = props;
    const data =[
        {
            "model_id": "deepseek-ai/DeepSeek-R1",
            "type": "Text Generation",
            "provider": "DeepSeek",
            "comment": "-"
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Zero",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
            "type": "Text Generation",
            "comment": "-",
            "provider": "DeepSeek",
        },
        {
            "model_id": "claude-3-5-haiku-20241022",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-3-5-sonnet-20241022",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-3-5-sonnet-20240620",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-3-haiku-20240307",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-3-opus-20240229",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-3-sonnet-20240229",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-2.1",
            "type": "LLM/CHAT",
            "comment": "max-token:200K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-instant-1.2",
            "type": "LLM/CHAT",
            "comment": "max-token:100K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-2",
            "type": "LLM/CHAT",
            "comment": "max-token:100K",
            "provider": "Anthropic"
        },
        {
            "model_id": "claude-instant-1",
            "type": "LLM/CHAT",
            "comment": "max-token:100K",
            "provider": "Anthropic"
        }
    ]

    const {t} = useTranslation();
    const [currentPageIndex, setCurrentPageIndex] = React.useState(1);
    return (
        <Container
      header={
        <Header
          variant="h3"
          counter={`(${data.length})`}
          description={t('model:modelDescription')}
          actions={
            <Pagination
      currentPageIndex={currentPageIndex}
      onChange={({ detail }) =>
        setCurrentPageIndex(detail.currentPageIndex)
      }
      openEnd
      pagesCount={1}
    />
          }
        >
          {t('model:model')}
        </Header>
      }
    >
      <Table
      renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      variant="embedded"
      columnDefinitions={[
        {
          id: "model_id",
          header: "Model",
          cell: item => item.model_id,
          sortingField: "model_id",
          isRowHeader: true
        },
        {
          id: "provider",
          header: "Provider",
          cell: item => item.provider,
          sortingField: "alt"
        },
        {
          id: "type",
          header: "Category",
          cell: item => item.type
        },
        {
          id: "description",
          header: "Description",
          cell: item => item.comment
        },
        {
          id: "actions",
          header: "Actions",
          cell: item => (
            <Link
              href={ROUTES.CreateApp}
              variant="info"
              ariaLabel={`Create Application`}
            >
              Create Application
            </Link>
          ),
          minWidth: 170
        }
      ]}
      columnDisplay={[
        { id: "model_id", visible: true },
        { id: "provider", visible: true },
        { id: "type", visible: true },
        { id: "description", visible: true },
        { id: "actions", visible: true }
      ]}
      items={data}
      loadingText="Loading resources"
      stickyColumns={{ first: 0, last: 1 }}
      trackBy="model_id"
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
    )
};
export default ModelView;
