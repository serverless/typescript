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

  generateSchema() {
    console.log(this.schema)
  }
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin
