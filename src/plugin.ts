import { compile } from "json-schema-to-typescript";
import fs from "fs";
import type { JSONSchema4 } from "json-schema";
import * as _ from "lodash";

interface Serverless {
  configSchemaHandler: {
    schema: JSONSchema4;
  };
}

/**
 * Keywords that give a schema a shape. A schema with none of them (for
 * example one that only has a description) accepts any value, but
 * json-schema-to-typescript compiles it to an object type.
 */
const SHAPE_KEYWORDS = [
  "type",
  "$ref",
  "enum",
  "const",
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  "if",
  "properties",
  "patternProperties",
  "additionalProperties",
  "items",
  "required",
  "tsType",
];

const SUBSCHEMA_MAPS = [
  "properties",
  "patternProperties",
  "definitions",
  "$defs",
];
const SUBSCHEMA_LISTS = ["anyOf", "oneOf", "allOf", "items"];
const SUBSCHEMAS = [
  "additionalProperties",
  "items",
  "not",
  "if",
  "then",
  "else",
];

const isSchema = (value: unknown): value is JSONSchema4 =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function typeUnconstrainedSchemasAsUnknown(schema: JSONSchema4): void {
  if (!SHAPE_KEYWORDS.some((keyword) => keyword in schema)) {
    schema.tsType = "unknown";

    return;
  }
  for (const key of SUBSCHEMA_MAPS) {
    const map: unknown = schema[key];
    if (isSchema(map)) {
      Object.values(map)
        .filter(isSchema)
        .forEach(typeUnconstrainedSchemasAsUnknown);
    }
  }
  for (const key of SUBSCHEMA_LISTS) {
    const list: unknown = schema[key];
    if (Array.isArray(list)) {
      list.filter(isSchema).forEach(typeUnconstrainedSchemasAsUnknown);
    }
  }
  for (const key of SUBSCHEMAS) {
    const subschema: unknown = schema[key];
    if (isSchema(subschema)) {
      typeUnconstrainedSchemasAsUnknown(subschema);
    }
  }
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
    typeUnconstrainedSchemasAsUnknown(schema);
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
