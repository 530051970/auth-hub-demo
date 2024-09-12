/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { CfnCondition, CfnOutput, CfnParameter, CfnStack, Duration, Fn } from 'aws-cdk-lib';
import { AuthorizationType, Cors, EndpointType, LambdaIntegration, MethodLoggingLevel, RestApi, TokenAuthorizer } from 'aws-cdk-lib/aws-apigateway';
import { CfnUserPool, CfnUserPoolUser, CfnUserPoolUserToGroupAttachment, OAuthScope, UserPool, UserPoolClient, UserPoolDomain } from 'aws-cdk-lib/aws-cognito';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Code, Runtime, LayerVersion, Alias } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { AWSError, CognitoIdentityServiceProvider } from 'aws-sdk';
import { Construct } from 'constructs';
import path = require('path');

export interface AuthHubProps {
  readonly solutionName: string;
  readonly stage: string;
  readonly portalBucket: Bucket;
  readonly region: string;
  readonly url: string;
  }

  /**
   * Construct to integrate auth assets
   */

  export class AuthHub extends Construct {
    public apigw: RestApi;
    // readonly userPool: UserPool;
    // readonly userPoolClient: UserPoolClient;
    constructor(scope: Construct, id: string, props: AuthHubProps) {
        super(scope, id);
        const {solutionName, stage} = props;
        // const region = props.region

        // Define a CfnParameter to accept a boolean (string) parameter from the command line
        const cognitoParameter = new CfnParameter(scope, 'cognito', {
          type: 'String', 
          allowedValues: ['true', 'false'], // Accepts true/false as valid values
          default: 'true', // Default to true if not provided
          description: 'Whether to create Cognito User Pool or not',
        });

        // Convert the string value to a boolean
        const enableCognito = new CfnCondition(this, 'NoPrivateSubnet', { expression: Fn.conditionEquals(cognitoParameter, 'true')});
        // const createCognito = createCognitoParam.valueAsString === 'true';

        // Conditionally create the Cognito resources if the parameter is true
        // if (createCognito) {
        const userPool = new UserPool(scope, `${new Date().toISOString()}UserPool`, {
            selfSignUpEnabled: true,
            signInAliases: { username: true },
            autoVerify: { email: false }, 
            passwordPolicy: {
                    requireDigits: false,
                    requireLowercase: false,
                    requireSymbols: false,
                    requireUppercase: false,
                    minLength: 6,
            },
          });
        

          // const privateCfnSubnet = new CfnSubnet(this, 'PrivateSubnet', {
          //   vpcId: vpc.vpcId,
          //   availabilityZone: vpc.availabilityZones[0],
          //   cidrBlock: cidrBlock, // Adjust the CIDR block based on your requirements
          //   mapPublicIpOnLaunch: false,
          // });
          const userPoolResource = userPool.node.defaultChild as CfnUserPool;
        
          userPoolResource.cfnOptions.condition = enableCognito
          // const username = 'demo'
        // userExists(username, userPool.userPoolId, props.region).then(exists => {
        //   if (!exists) {
            // const defaultUser = new CfnUserPoolUser(this, 'defaultUser', {
            //   userPoolId: userPool.userPoolId,
            //   username: username, 
            //   userAttributes: [
            //     { name: 'email', value: 'dummy@amazon.com' }, 
            //   ],
            // });
            // defaultUser.cfnOptions.condition = enableCognito
          //  }
        const userPoolClient = new UserPoolClient(this, 'OidcUserPoolClient', {
          userPool,
          generateSecret: true,
          authFlows: {
            userPassword: true,
            adminUserPassword: true,
            custom: true
          },
          oAuth: {
            flows: {
              authorizationCodeGrant: true
            },
            scopes: [
              OAuthScope.OPENID, 
              OAuthScope.EMAIL,
              OAuthScope.PROFILE,
            ],
            callbackUrls: [`${props.url}/callback`], 
            logoutUrls: [`${props.url}logout`],
          },
        });

        const userPoolDomain = new UserPoolDomain(this, 'OidcUserPoolDomain', {
          userPool,
          cognitoDomain: {
            domainPrefix: 'cognito-authing', // 自定义域名前缀
          },
        });

        (userPoolClient.node.defaultChild as CfnUserPool).cfnOptions.condition = enableCognito

        const setPasswordPolicy = new CfnUserPoolUser(this, 'SetUserPassword', {
          userPoolId: userPool.userPoolId,
          username: 'demo',
          messageAction: 'SUPPRESS',
          userAttributes: [
            { name: 'password', value: '123456' },
            { name: 'email', value: 'dummy@amazon.com' }
          ],
        });
        setPasswordPolicy.cfnOptions.condition = enableCognito
        const authLayer = new LayerVersion(
          this,
          "APILambdaAuthLayer",
          {
            code: Code.fromAsset(
              path.join(__dirname, "./lambda"),
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
            description: `Auth-Hub - API layer`,
          },
        )

        const authFunction = new Function(this, `${solutionName}AuthFunction`, {
          runtime: Runtime.PYTHON_3_11,
          code: Code.fromAsset('lib/auth-hub/lambda'),
          handler: 'auth_api.handler',
          memorySize: 4096,
          timeout: Duration.seconds(10),
          environment: {
            cognito_client_id: userPoolClient?.userPoolClientId,
            user_pool_id: userPool?.userPoolId
          }, 
          layers: [authLayer]
        });

        // authFunction.node.addDependency(userPoolClient)

        const version = authFunction.currentVersion;
        new Alias(this, 'AuthFunctionAlias', {
            aliasName: 'AuthFunctionAlias',
            version,
            provisionedConcurrentExecutions: 2,
        });
    
        this.apigw = new RestApi(this, `${solutionName}AuthAPI`, {
          restApiName: `${solutionName}AuthAPI Service`,
          endpointConfiguration: {
            types: [EndpointType.REGIONAL],
          },
          defaultCorsPreflightOptions: {
            allowHeaders: [
              "Content-Type",
              "X-Amz-Date",
              "Authorization",
              "OIDC-Issuer",
              "X-Api-Key",
              "X-Amz-Security-Token",
            ],
            allowMethods: Cors.ALL_METHODS,
            allowCredentials: true,
            allowOrigins: Cors.ALL_ORIGINS,
          },
          deployOptions:{
            stageName: stage,
            loggingLevel: MethodLoggingLevel.INFO,
            dataTraceEnabled: true,
            metricsEnabled: true
          }
        });

        new CfnOutput(this, 'UserPoolId', {
          value: userPool.userPoolId,
        });

        new CfnOutput(this, 'UserPoolClientId', {
          value: userPoolClient.userPoolClientId,
        });

        new CfnOutput(this, 'UserPoolDomain', {
          value: `https://${userPoolDomain.domainName}.auth.${props.region}.amazoncognito.com`,
        });
    
        // const authorizer = new TokenAuthorizer(this, `${solutionName}AuthAuthorizer`, {
        //   handler: authAuthorizerFunction
        // });
        const loginResource = this.apigw.root.addResource('login')
        loginResource.addMethod('POST', new LambdaIntegration(authFunction));
        const tokenResource = this.apigw.root.addResource('auth').addResource('token')
        const verifyResource = tokenResource.addResource('verify');
        verifyResource.addMethod('GET', new LambdaIntegration(authFunction));
    
        const refreshResource = tokenResource.addResource('refresh');
        refreshResource.addMethod('POST', new LambdaIntegration(authFunction));

        const configFile = 'auth.json';
        const randomTag = `random-${Math.random().toString(36).substr(2, 5)}`;
        const configLambda = new AwsCustomResource(this, 'WebConfig', {
          logRetention: RetentionDays.ONE_DAY,
          onUpdate: {
            action: 'putObject',
            parameters: {
              Body: JSON.stringify({
                auth_url: this.apigw.url
              }),
              Bucket: props.portalBucket.bucketName,
              CacheControl: 'max-age=0, no-cache, no-store, must-revalidate',
              ContentType: 'application/json',
              Key: configFile,
            },
            service: 'S3',
            physicalResourceId: PhysicalResourceId.of(`config-${randomTag}`),
          },
          policy: AwsCustomResourcePolicy.fromStatements([
            new PolicyStatement({
              actions: ['s3:PutObject'],
              resources: [props.portalBucket.arnForObjects(configFile)]
            })
          ])
        });
      }
  }
  