import {RemovalPolicy, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';

export class DemoCdkStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new s3.Bucket(this, 'DemoBucket', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            enforceSSL: true,
            versioned: true,
            // removalPolicy: RemovalPolicy.RETAIN // sensible default
            removalPolicy: RemovalPolicy.DESTROY, // for demo
            autoDeleteObjects: true
        });
    }

}