import * as cdk from 'aws-cdk-lib';
import { DemoCdkStack } from '../lib/demo-cdk-stack';
import {Template} from "aws-cdk-lib/assertions";
test('s3 bucket', () => {

    const app = new cdk.App();
    const stack = new DemoCdkStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
        VersioningConfiguration: {
            Status: "Enabled"
        }
    });

});