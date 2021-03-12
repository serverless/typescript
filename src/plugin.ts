import { compile } from "json-schema-to-typescript";
import fs from "fs";
import type { JSONSchema4 } from "json-schema";
import * as _ from "lodash";

interface Serverless {
  configSchemaHandler: {
    schema: JSONSchema4;
  };
}

class ConfigSchemaHandlerTypescriptDefinitionsPlugin {
  private serverless: Serverless;

  constructor(serverless: Serverless) {
    this.serverless = serverless;
  }

  commands = {
    schema: {
      usage: "Get JSON schema definition and generate TS definitions",
      lifecycleEvents: ["generate"],
    },
  };

  hooks = {
    "schema:generate": this.generateSchema.bind(this),
  };

  async generateSchema() {
    const schema = _.cloneDeep(this.serverless.configSchemaHandler.schema);
    /**
     * ignoreMinAndMaxItems: true -> maxItems: 100 in provider.s3.corsConfiguration definition is generating 100 tuples
     */
    const compiledDefinitions = await compile(schema, "AWS", {
      ignoreMinAndMaxItems: true,
    });
    fs.writeFileSync("index.d.ts", compiledDefinitions);
  }
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin;
