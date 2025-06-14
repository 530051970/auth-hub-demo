import { Badge, Box, Button, Container, Grid, Link, SpaceBetween } from "@cloudscape-design/components";
import RightModal from "common/component/right-modal";
import React, { FC } from "react";
import ProviderDetails from "./provider-details";
import { useTranslation } from "react-i18next";

interface ProviderViewProps {
  data: any
}

// const Overview: React.FC<OverViewProps> = (props: OverViewProps) => {
const ProviderView: FC<ProviderViewProps> = (props: ProviderViewProps) => {
    // const { data } = props;
    const data = [
    //     {
    //   key:"amazon",
    //   name: "Amazon Web Service",
    //   mainProduct: "Nova/Titan",
    //   description: "AI and ML have been a focus for Amazon for over 20 years, and many of the capabilities customers use with Amazon are driven by ML. Amazon Nova models are built by leveraging Amazon’s decades of experience to make ML accessible to anyone who wants to use it. ",
    //   catagory: "Chat/Text Embedding/TTS",
    //   models:[{
    //       "model_id":"Titan-text-embeddings-v2",
    //       "type":"TEXT EMBEDDING",
    //       "comment": "-"
    //   }]
    // },
    {
      key:"bedrock",
      name: "Amazon Bedrock",
      mainProduct: "Titan/Claude/AI21",
      description: "Amazon Bedrock is a fully managed service from AWS that allows businesses to build and deploy generative AI applications. It provides API access to various foundation models (FMs), including Amazon's Titan models, Anthropic's Claude, Stability AI, and AI21 Labs.",
      catagory: "LLM/CHAT/Text Embedding/TTS",
      models: []
    },
    {
        key:"anthropic",
        name: "Anthropic",
        mainProduct: "Claude",
        description: "Anthropic is a research company dedicated to building reliable, interpretable, and steerable AI systems. Its cutting-edge model, Claude, has been adopted by millions of businesses and consumers due to its strong performance focus.",
        catagory: "LLM/CHAT",
        models:[
            {
                "model_id": "claude-3-5-haiku-20241022",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-3-5-sonnet-20241022",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-3-5-sonnet-20240620",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-3-haiku-20240307",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-3-opus-20240229",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-3-sonnet-20240229",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-2.1",
                "type": "LLM/CHAT",
                "comment": "max-token:200K"
            },
            {
                "model_id": "claude-instant-1.2",
                "type": "LLM/CHAT",
                "comment": "max-token:100K"
            },
            {
                "model_id": "claude-2",
                "type": "LLM/CHAT",
                "comment": "max-token:100K"
            },
            {
                "model_id": "claude-instant-1",
                "type": "LLM/CHAT",
                "comment": "max-token:100K"
            }
        ]
      },{
        key:"deepseek",
        name: "DeepSeek",
        mainProduct: "DeepSeek R1/V3/VL2",
        description: "Founded in 2023, is a Chinese company dedicated to making AGI a reality. Unravel the mystery of AGI with curiosity. Answer the essential question with long-termism.",
        catagory: "Text",
        models:[
                {
                    "model_id": "deepseek-ai/DeepSeek-R1",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Zero",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
                    "type": "Text",
                    "comment": "-"
                },
                {
                    "model_id": "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
                    "type": "Text",
                    "comment": "-"
                }
            ]
      }]
    const {t} = useTranslation();
    const [showDetails, setShowDetails] = React.useState<boolean>(false)
    const [details, setDetails] = React.useState<any>({})
    return (
        <SpaceBetween direction="vertical" size={"m"} >
        {data.map((item)=>{
            return (<Container
                disableContentPaddings
                key={item.key}
            >
              <Grid gridDefinition={[{colspan: 3},{colspan: 9}]} disableGutters>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center",height:"100%"}}>
                <img
                    src={`/imgs/${item.key}.png`}
                    alt="placeholder"
                    style={{width:"200px", display:"block",borderTopLeftRadius: 16, borderBottomLeftRadius: 16}}
                  />
                </div>
              <div style={{margin:15, marginLeft:20}}>
              <SpaceBetween direction="vertical" size="s">
                <SpaceBetween direction="vertical" size="xxs">
                  <Box variant="h2">
                    <Link fontSize="heading-m" href="#" className="no-link" onFollow={()=>{setShowDetails(true);setDetails(item)}}>
                      {item.name}
                    </Link>
                  </Box>
                  <Box variant="small">{item.mainProduct}</Box>
                </SpaceBetween>
                <Box variant="p">
                  {item.description}
                </Box>
                <Grid gridDefinition={[{colspan:6},{colspan:6}]}>
                <SpaceBetween direction="vertical" size="xxs">
                  <Box fontSize="body-s">{t('model:nowHave')}</Box>
                  <Box fontWeight="bold">{item.models.length} {t('model:models')}</Box>
                </SpaceBetween>
                <SpaceBetween direction="vertical" size="xxs">
                  <Box fontSize="body-s">{t('model:coverage')}</Box>
                  <Box fontWeight="bold">
                    <SpaceBetween direction="horizontal" size="xxxs">
                        {item.catagory.split("/").map((catagoryItem)=>{
                            return <Badge color="grey" >{catagoryItem}</Badge>
                        })
                        }
                    </SpaceBetween>
                    
                  </Box>
                </SpaceBetween>
                </Grid>
              </SpaceBetween></div>
              </Grid>
              
              
            </Container>)
        })}
        <RightModal
                setShowModal={setShowDetails}
                showModal={showDetails}
                header={details.name}
                showFolderIcon={false}
              >
                <div className="add-identfier-modal">
                  <ProviderDetails data={details}/>
                </div>
              </RightModal>
    </SpaceBetween>
    )
};
export default ProviderView;