# serverless/typescript

Typescript definitions for Serverless service file.

## Installation

```
npm i @serverless/typescript --save-dev
```

or

```
yarn add @serverless/typescript --dev
```

## Usage

`serverless.ts` file

```ts
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-nodejs-typescript',
  frameworkVersion: '*',
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
```

## Remaining improvements

### Use Record<> instead

```js
awsKmsArn: { type: 'object' }
```

generates

```ts
export type AwsKmsArn = {
  [k: string]: unknown;
}
```

It could be improved, to generate

```ts
export type AwsKmsArn = Record<string, unknown>
```

### allOf and anyOf usage for required properties

```js
awsIamPolicyStatement: {
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'string' },
    c: { type: 'string' },
  }
  additionalProperties: false,
  allOf: [
    { required: ['a'] },
    anyOf:[{ required: ['b'] }, { required: ['c'] }],
  ]
}
```

generates


```ts
export type awsIamPolicyStatement = {
  [k: string]: unknown;
}
```


It could be improved, to generate

```ts
export type awsIamPolicyStatement =
  | {
      a: string;
      b?: string;
      c: string;
    }
  | {
      a: string;
      b: string;
      c?: string;
    }
```

### const keyword

```js
disabledDeprecation: { const: '*' }
```

generates

```ts
export type disabledDeprecation = {
  [k: string]: unknown;
}
```

It could be improved, to generate

```ts
export type disabledDeprecation = "*"
```
