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
