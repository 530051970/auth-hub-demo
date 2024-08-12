#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { AuthHubDemoStack } from '../lib/auth-hub-demo-stack';

const app = new cdk.App();
const stack = new AuthHubDemoStack(app, 'AuthHubDemo', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
app.synth();


