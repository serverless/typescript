// A typical service file, checked against the generated index.d.ts so a
// release whose definitions reject common configuration is not published.
import type { AWS } from "../index";

const serverlessConfiguration: AWS = {
  service: "definitions-test",
  frameworkVersion: "4",
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
      events: [
        { httpApi: { method: "GET", path: "/items/{id}" } },
        { http: { method: "post", path: "items", cors: true } },
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
