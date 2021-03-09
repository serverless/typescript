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
  private schema: JSONSchema4;

  constructor(serverless: Serverless) {
    this.schema = _.cloneDeep(serverless.configSchemaHandler.schema);
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
    /**
     * ignoreMinAndMaxItems: true -> maxItems: 100 in provider.s3.corsConfiguration definition is generating 100 tuples
     */
    const compiledDefinitions = await compile(this.schema, "AWS", {
      ignoreMinAndMaxItems: true,
    });
    fs.writeFileSync("index.d.ts", compiledDefinitions);
  }
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin;
