import { Box, Cards, Grid, Link, SpaceBetween } from "@cloudscape-design/components";
import { ROUTES } from "common/constants";
import React, { FC } from "react";

interface ProviderDetailsProps {
    data:{
        key:string;
        name: string;
        mainProduct: string;
        description: string;
        catagory: string;
        models:{
            model_id:string;
            type: string;
            comment: string;
        }[];
    }
}

const ProviderDetails: FC<ProviderDetailsProps> = (props: ProviderDetailsProps) => {
    const {data} = props;

    return (<div style={{paddingLeft:32,paddingRight:32}}>
        <div style={{fontSize:12, color:'#5f6b7a',marginBottom:25}}> {data.description}</div>
        <Cards
      cardDefinition={{
        header: item => (
          <div style={{fontSize:16, fontWeight:800}}>
            {item.model_id}
          </div>
        ),
        sections: [
          {
            id: "description",
            header: "",
            content: item => (
            <SpaceBetween direction="vertical" size="s">
            <Grid gridDefinition={[{colspan:5},{colspan:7}]}>
                <Box variant="p" color="inherit" >
                    <span style={{fontSize:12}}>{item.type}</span></Box>
                <Box variant="p" color="inherit"><span style={{fontSize:12}}>{item.comment}</span></Box>
                
            </Grid>
            <div> <Link
              href={ROUTES.CreateApp}
              variant="info"
              ariaLabel={`Create Application`}
            >
              Create Application
            </Link></div>
            </SpaceBetween>
            )
          }
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
      items={data.models}
      loadingText="Loading resources"
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
        
        </div>)
};
export default ProviderDetails;