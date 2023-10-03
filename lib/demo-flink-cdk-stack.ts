import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import {Application, ApplicationCode, Runtime} from "@aws-cdk/aws-kinesisanalytics-flink-alpha";

export class DemoFlinkCdkStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const role = new iam.Role(this, "DemoFlinkCdkRole", {
            assumedBy: new iam.ServicePrincipal("kinesisanalytics.amazonaws.com")
        });

        const bucket = s3.Bucket.fromBucketName(this, "DemoFlinkCdkBucket", "word-count-jar-bucket");
        bucket.grantRead(role);

        new Application(this, "DemoFlinkCdkApplication", {
            runtime: Runtime.FLINK_1_15,
            role: role,
            code: ApplicationCode.fromBucket(bucket, "wordcount-0.1-1.jar")
        });
    }

}