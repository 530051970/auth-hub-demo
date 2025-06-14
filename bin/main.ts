#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { SuperApi } from '../lib/super-api';

const app = new cdk.App();
const stack = new SuperApi(app, 'SuperApi', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
app.synth();


