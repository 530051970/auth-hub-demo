import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { AllowedMethods, Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { execSync } from 'child_process';
import { Construct } from 'constructs';
import { SolutionInfo } from './constant';
import path = require('path');
import apigateway = require('aws-sdk/clients/apigateway');
import { AuthHub } from './auth-hub';
import { AuthorizationType, IdentitySource, LambdaIntegration, RequestAuthorizer, TokenAuthorizer } from 'aws-cdk-lib/aws-apigateway';

export interface ApiProps {
  readonly bucketName: string;
}
export class AuthHubDemoStack extends Stack {
  readonly apiFunction: Function;
  readonly userPool?: UserPool
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const region = this.region
    
    const portalBucket = new Bucket(this, `${SolutionInfo.SOLUTION_STACK_NAME}PortalBucket`, {
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
  
    // Grant access to CloudFront
    const cloudfrontOAI = new OriginAccessIdentity(this, 'CloudFront-OAI', {
      comment: `OriginAccessIdentity (OAI) for ${id}`
    });

    portalBucket.addToResourcePolicy(new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [portalBucket.arnForObjects('*')],
      principals: [new CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }));

    const distribution = new Distribution(this, `${SolutionInfo.SOLUTION_STACK_NAME}Distribution`, {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(portalBucket, { originAccessIdentity: cloudfrontOAI }),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      errorResponses:[
        {
          responsePagePath:'/index.html',
          responseHttpStatus:200,
          httpStatus:403
        }
      ],
      
    });

    new BucketDeployment(this, 'portal_deploy', {
      memoryLimit: 512,
      sources: [this.genWebAssets()],
      destinationBucket: portalBucket,
    });

    const bizLayer = new LayerVersion(
      this,
      "APILambdaBizLayer",
      {
        code: Code.fromAsset(
          path.join(__dirname, "../source/api"),
          {
            bundling: {
              image: Runtime.PYTHON_3_11.bundlingImage,
              command: [
                "bash",
                "-c",
                `pip install -r requirements.txt -t /asset-output/python`,
              ],
            },
          },
        ),
        compatibleRuntimes: [Runtime.PYTHON_3_11],
        description: `Auth-Hub-Biz - API layer`,
      },
    )

    const bizFunction = new Function(this, `${SolutionInfo.SOLUTION_STACK_NAME}BizFunction`, {
      runtime: Runtime.PYTHON_3_11,
      code: Code.fromAsset('source/api'),
      handler: 'biz_api.handler',
      layers: [bizLayer]
    });

    const bizAuthorizerFunction = new Function(this, `${SolutionInfo.SOLUTION_STACK_NAME}BizAuthorizerFunction`, {
      runtime: Runtime.PYTHON_3_11,
      code: Code.fromAsset('source/api'),
      handler: 'authorizer.handler',
      layers: [bizLayer]
    });

    const bizAuthorizer = new RequestAuthorizer(this, `${SolutionInfo.SOLUTION_STACK_NAME}BizAuthorizer`, {
      handler: bizAuthorizerFunction,
      identitySources: [
        IdentitySource.header('Authorization'),
        IdentitySource.header('OIDC-Issuer')
      ],
    });

    const authHub = new AuthHub(this, 'AuthHub', {
      solutionName: SolutionInfo.SOLUTION_STACK_NAME,
      stage:'dev',
      region: this.region,
      portalBucket: portalBucket,
      url: distribution.distributionDomainName
    });

    authHub.node.addDependency(distribution)

    const resource = authHub.apigw.root.addResource('biz').addResource('summary');
    resource.addMethod('GET', new LambdaIntegration(bizFunction), {
      authorizer: bizAuthorizer,
      authorizationType: AuthorizationType.CUSTOM
    });

    new cdk.CfnOutput(this, 'portURL', {
      value: distribution.distributionDomainName,
    });
  }

  private genWebAssets(){
    const sourceDir = path.join(__dirname, '../source/app');
    execSync(`cd ${sourceDir} && rm -rf build && rm -rf node_modules && npm i && npm ci && npm run build`, { stdio: 'inherit' });
    return Source.asset(`${sourceDir}/build`)
  }

}
