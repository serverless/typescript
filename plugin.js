const { compile } = require('json-schema-to-typescript');
const fs = require('fs');

class ConfigSchemaHandlerTypescriptDefinitionsPlugin {
  constructor(serverless, options) {
    this.schema = serverless.configSchemaHandler.schema
    this.options = options || {};

    this.commands = {
      schema: {
        usage: 'Get JSON schema definition and generate TS definitions',
        lifecycleEvents: ['generate'],
      }
    }

    this.hooks = {
      'schema:generate': this.generateSchema.bind(this)
    };
  }

  async generateSchema() {
    // This definition is causing memory trouble
    delete this.schema.properties.provider.properties.s3.additionalProperties.properties.replicationConfiguration

    /**
     * https://github.com/serverless/typescript/issues/4
     * JSON Schema v6 `const` keyword converted to `enum`
     */
    const normalizedSchema = replaceAllConstForEnum(this.schema);

    /**
     * format: false -> improves generation performances
     * ignoreMinAndMaxItems: true -> maxItems: 100 in provider.s3.corsConfiguration definition is generating 100 tuples
     */
    const compiledDefinitions = await compile(normalizedSchema, 'AWS', { format: false, ignoreMinAndMaxItems: true, unreachableDefinitions: true })
    fs.writeFileSync('index.d.ts', compiledDefinitions)
  }
}

function replaceAllConstForEnum(schema) {
  if ('object' !== typeof schema) {
    return schema
  }

  return Object.fromEntries(Object.entries(schema).map(([key, value]) => {
    if (key === 'const') {
      return ['enum', [value]]
    }

    if (Array.isArray(value)) {
      return [key, value.map(replaceAllConstForEnum)]
    }

    if ('object' === typeof value && value !== null) {
      return [key, replaceAllConstForEnum(value)]
    }

    return [key, value]
  }))
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin
