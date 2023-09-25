import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ec from 'aws-cdk-lib/aws-elasticache';
import * as cdk from 'aws-cdk-lib';
import * as sm from 'aws-cdk-lib/aws-secretsmanager';

export class DemoElastiCacheCdkStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const secret = new sm.Secret(this, 'elastiCacheSecret', {
           generateSecretString: {
               secretStringTemplate: JSON.stringify({username: 'ecUser'}),
               generateStringKey: 'password',
               excludePunctuation: true,
               includeSpace: false,
               passwordLength: 16
           }
        });
        const vpc = new ec2.Vpc(this, 'ElastiCacheVpc', {maxAzs: 1});
        const subnetGroup = new ec.CfnSubnetGroup(this, 'ElastiCacheSubnetGroup', {
            description: 'subnets for elasticache cluster',
            subnetIds: vpc.privateSubnets.map(subnet => subnet.subnetId)
        });
        const securityGroup = new ec2.SecurityGroup(this, 'ElastiCacheSecurityGroup', {
            vpc,
        });
         const replicationGroup = new ec.CfnReplicationGroup(this, 'ElastiCacheReplicationGroup', {
            replicationGroupId: 'demo-elasti-cache-replication-group',
            replicationGroupDescription: 'Demo ElastiCache Replication Group',
            cacheNodeType: 'cache.t2.micro',
            engine: 'redis',
            numNodeGroups: 1,
            replicasPerNodeGroup: 1,
            automaticFailoverEnabled: true,
            cacheSubnetGroupName: subnetGroup.ref,
            securityGroupIds: [securityGroup.securityGroupId],
            authToken: secret.secretValueFromJson('password').unsafeUnwrap(),
            transitEncryptionEnabled: true
        });

        new cdk.CfnOutput(this, 'url', {
           value: `${replicationGroup.attrPrimaryEndPointAddress}:${replicationGroup.attrPrimaryEndPointPort}`
        });
    }

}