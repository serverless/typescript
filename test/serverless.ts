// A typical service file, checked against the generated index.d.ts so a
// release whose definitions reject common configuration is not published.
import type { AWS } from "../index";

const serverlessConfiguration: AWS = {
  service: "definitions-test",
  frameworkVersion: "4",
  plugins: ["./local-plugin"],
  params: {
    default: { logLevel: "info" },
    prod: { logLevel: "warn" },
  },
  stages: {
    default: {
      params: { domain: "dev.example.com" },
    },
  },
  custom: {
    tableName: "items-${sls:stage}",
  },
  package: {
    individually: true,
    patterns: ["!tests/**"],
  },
  provider: {
    name: "aws",
    runtime: "nodejs24.x",
    region: "us-east-1",
    architecture: "arm64",
    memorySize: 512,
    environment: {
      TABLE_NAME: { Ref: "Table" },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:GetItem", "dynamodb:PutItem"],
            Resource: { "Fn::GetAtt": ["Table", "Arn"] },
          },
        ],
      },
    },
  },
  functions: {
    api: {
      handler: "src/api.handler",
      layers: [{ Ref: "SharedLambdaLayer" }],
      url: true,
      events: [
        { httpApi: { method: "GET", path: "/items/{id}" } },
        { http: { method: "post", path: "items", cors: true } },
      ],
    },
    uploads: {
      handler: "src/uploads.handler",
      events: [
        { s3: { bucket: "uploads", event: "s3:ObjectCreated:*", existing: true } },
        { sns: "notifications" },
        {
          eventBridge: {
            pattern: { source: ["aws.ec2"], "detail-type": ["EC2 Instance State-change Notification"] },
          },
        },
        { stream: { type: "dynamodb", arn: { "Fn::GetAtt": ["Table", "StreamArn"] } } },
      ],
    },
    worker: {
      handler: "src/worker.handler",
      runtime: "python3.13",
      timeout: 30,
      events: [
        { sqs: { arn: { "Fn::GetAtt": ["Queue", "Arn"] }, batchSize: 10 } },
        { schedule: "rate(5 minutes)" },
      ],
    },
  },
  layers: {
    shared: {
      path: "layers/shared",
      compatibleRuntimes: ["nodejs24.x"],
    },
  },
  resources: {
    Resources: {
      Table: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        },
      },
      Queue: { Type: "AWS::SQS::Queue" },
    },
  },
};

module.exports = serverlessConfiguration;
