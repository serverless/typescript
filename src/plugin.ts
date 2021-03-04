import { InputData, JSONSchemaInput, quicktype } from "quicktype-core";
import { writeFileSync } from "fs";
import type { JSONSchema4 } from "json-schema";

interface Serverless {
  configSchemaHandler: {
    schema: JSONSchema4;
  };
}

class ConfigSchemaHandlerTypescriptDefinitionsPlugin {
  private schema: JSONSchema4;

  constructor(serverless: Serverless) {
    this.schema = serverless.configSchemaHandler.schema;
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
    const schemaInput = new JSONSchemaInput(undefined);
    await schemaInput.addSource({
      name: "AWS",
      schema: JSON.stringify(this.schema),
    });
    const inputData = new InputData();
    inputData.addInput(schemaInput);

    const { lines: serverlessTs } = await quicktype({
      inputData,
      lang: "typescript",
      rendererOptions: {
        "just-types": "true",
      },
    });

    writeFileSync("index.d.ts", serverlessTs.join("\n"));
  }
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin;
