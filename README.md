# Joy of Infrastructure as Code (IaC)

## What is IaC
- Build infrastructure from code
- Not, manually by hand
- Benefits
  - Maintainable
  - Repeatable
  - Visible
  - Version
  - No unicorns
  - Testable
  - Incremental

## Declarative vs. Imperative
- Declarative
  - Easier?
  - YAML or customer language
  - Harder to do this that imperative languages excel at:
    - Parameters
    - Conditions
    - Iteration
  - Ex: AWS Cloud Formation
  - Every AWS services have a way to manage using Cloud Formation
- Imperative
  - Harder to started
  - Harder to maintain
  - AWS CDK
- Why not both?

## What is AWS CDK
- Cloud Development Kit (CDK) build on top on Cloud Formation
- CDK is Node/Npm based
- While natively supporting TypeScript (recommended), also supports other languages using JII
  - C#
  - Java
  - Python
  - Etc.
- A CDK is made up of:
  - Application
  - Stack(s)
  - Constructs
- There are three levels of abstracts of Constructs
  - Level 1 (L1): Correspond directly to Cloud Formation
    - Start with Cfn
    - Example:
  - Level 2 (L2): Written by CDK team
    - With sensible defaults
    - Brining together multiple L1 constructs
    - Example:  
  - Level 3 (L3): Written by you or others
    - Level L1 and L2 constructs

## CDK Lifecycle
- cdk bootstrap
  - Already done outside the demo
  - Requires admin access
  - Create s3 buckets and other resources for CDK's use
- build
  - `npm run build`
  - In TypeScript compile to JavaScript
- cdk synth
  - To generate the cloud formation artifacts
- cdk diff
  - Optionally to see the differences that will be applied
- cdk deploy
  - To push the resources to AWS
- cdk destroy
  - To remove the resources
  - And, stop charging

## S3 Example
- Code: [demo-cdk-stack.ts](lib%2Fdemo-cdk-stack.ts)
- Unit Test(s): [demo-cdk.test.ts](test%2Fdemo-cdk.test.ts)
- `npm run cdk synth DemoCdkStack`
- `npm run cdk deploy DemoCdkStack`
- `npm run cdk destroy DemoCdkStack`

## Managed Flink Example
- Highlights
  - Uses an existing bucket
  - Assigns appropriate role
  - Uses L2 constructs still in alpha
- Code: [demo-flink-cdk-stack.ts](lib%2Fdemo-flink-cdk-stack.ts)
- `npm run cdk synth DemoFlinkCdkStack`
- `npm run cdk deploy DemoFlinkCdkStack`
- `npm run cdk destroy DemoFlinkCdkStack`

## ElastiCache Example
- Highlights
  - Creates a VPC
  - Uses L1 constructs
- Code: [demo-elasti-cache-cdk-stack.ts](lib%2Fdemo-elasti-cache-cdk-stack.ts)
- `npm run cdk synth DemoElastiCacheCdkStack`
- `npm run cdk deploy DemoElastiCacheCdkStack`
- `npm run cdk destroy DemoElastiCacheCdkStack`

## Challenges
- Drift
  - Always tempting to make changes manually
- Leveraging existing resources
- Integrating into CI/CD
- Names of the resources 

## References
- [CDK Workshop](https://cdkworkshop.com/)
- [CDK for Terraform](https://developer.hashicorp.com/terraform/cdktf)
- [CDK for Kubernetes](https://cdk8s.io/)
- [Construct Hub](https://constructs.dev/)