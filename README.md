# serverless/typescript

Typescript definitions for Serverless `serverless.ts` service file.

Since [v1.72.0](https://github.com/serverless/serverless/releases/tag/v1.72.0), the Serverless framework accepts `serverless.ts` as a valid service file in addition to the usual `serverless.yml`, `serverless.json` and `serverless.js` file formats.

This repository serves as a replacement of the community-maintained [DefinitelyTyped @types/serverless package](https://www.npmjs.com/package/@types/serverless). It aims to automate service file TypeScript definitions based on JSON-schema used by [serverless/serverless](https://github.com/serverless/serverless) for validation at the beginning of any Serverless CLI command. This automated pipeline is triggered every time a new release of Serverless framework is available. The pipeline ends with the publishing of the newly generated definitions to NPM, ensuring they are always up to date and consistent with the framework internal validation logic.

![TypeScript definition generation pipeline](https://miro.medium.com/max/1400/1*7TeqkHLkfPEXJ6f2NzbV3A.png)

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

## Contributing

> **No PR including modifications on `index.d.ts` will be accepted.** The service file Typescript definitions enclosed within this file are automatically generated at each new Serverless framework release. If any manual modification was added to this file, those would be overwritten during the next Serverless version release and TypeScript definitions generation process.

We love our contributors!

Check out our [help wanted](https://github.com/serverless/typescript/labels/help%20wanted) or [good first issue](https://github.com/serverless/typescript/labels/good%20first%20issue) labels to find issues we want to move forward on with your help.
