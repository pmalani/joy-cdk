#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { JoyCdkStack } from '../lib/joy-cdk-stack';

const app = new cdk.App();
new JoyCdkStack(app, 'JoyCdkStack');
