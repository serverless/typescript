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
     * format: false -> improves generation performances
     * ignoreMinAndMaxItems: true -> maxItems: 100 in provider.s3.corsConfiguration definition is generating 100 tuples
     */
    const compiledDefinitions = await compile(this.schema, 'AWS', { format: false, ignoreMinAndMaxItems: true })
    fs.writeFileSync('index.d.ts', compiledDefinitions)
  }
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin
