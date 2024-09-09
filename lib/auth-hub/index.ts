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

import { Duration } from 'aws-cdk-lib';
import { AuthorizationType, Cors, EndpointType, LambdaIntegration, MethodLoggingLevel, RestApi, TokenAuthorizer } from 'aws-cdk-lib/aws-apigateway';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Code, Runtime, LayerVersion, Alias } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import path = require('path');

export interface AuthHubProps {
  readonly solutionName: string;
  readonly stage: string;
  readonly portalBucket: Bucket;
  }
  /**
   * Construct to integrate auth assets
   */

  export class AuthHub extends Construct {
    public apigw: RestApi;
    constructor(scope: Construct, id: string, props: AuthHubProps) {
        super(scope, id);
        const {solutionName, stage} = props;
        
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
          memorySize: 4096, // 
          timeout: Duration.seconds(10), 
          layers: [authLayer]
        });

        const version = authFunction.currentVersion;
        new Alias(this, 'AuthFunctionAlias', {
            aliasName: 'AuthFunctionAlias',
            version,
            provisionedConcurrentExecutions: 2,
        });
    
        // const authAuthorizerFunction = new Function(this, `${solutionName}AuthAuthorizerFunction`, {
        //   runtime: Runtime.PYTHON_3_11,
        //   code: Code.fromAsset('lib/auth-hub/lambda'),
        //   handler: 'authorizer.handler',
        //   layers: [authLayer]
        // });
    
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
              "OIDC-Issue",
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
  