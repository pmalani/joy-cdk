#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { JoyCdkStack } from '../lib/joy-cdk-stack';
import { DemoCdkStack } from '../lib/demo-cdk-stack';
import { DemoElastiCacheCdkStack } from '../lib/demo-elasti-cache-cdk-stack';

const app = new cdk.App();
new DemoElastiCacheCdkStack(app, 'DemoElastiCacheCdkStack')
new DemoCdkStack(app, 'DemoCdkStack');
new JoyCdkStack(app, 'JoyCdkStack');
