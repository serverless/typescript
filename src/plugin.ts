import { compile } from "json-schema-to-typescript";
import fs from "fs";
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
    /**
     * https://github.com/serverless/typescript/issues/4
     * JSON Schema v6 `const` keyword converted to `enum`
     */
    const normalizedSchema = replaceAllConstForEnum(this.schema);

    /**
     * ignoreMinAndMaxItems: true -> maxItems: 100 in provider.s3.corsConfiguration definition is generating 100 tuples
     */
    const compiledDefinitions = await compile(normalizedSchema, "AWS", {
      ignoreMinAndMaxItems: true,
      unreachableDefinitions: true,
    });
    fs.writeFileSync("index.d.ts", compiledDefinitions);
  }
}

const replaceAllConstForEnum = (schema: JSONSchema4): JSONSchema4 => {
  if ("object" !== typeof schema) {
    return schema;
  }

  return Object.fromEntries(
    Object.entries(schema).map(([key, value]) => {
      if (key === "const") {
        return ["enum", [value]];
      }

      if (Array.isArray(value)) {
        return [key, value.map(replaceAllConstForEnum)];
      }

      if ("object" === typeof value && value !== null) {
        return [key, replaceAllConstForEnum(value)];
      }

      return [key, value];
    })
  );
};

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin;
