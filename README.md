# serverless/typescript

Typescript definitions for Serverless service file.

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
