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
 * json-schema-to-typescript compiles it to an object type. `not` and `if`
 * are left out: they do not restrict a value to objects.
 */
const SHAPE_KEYWORDS = [
  "type",
  "$ref",
  "enum",
  "const",
  "anyOf",
  "oneOf",
  "allOf",
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
  "additionalItems",
  "items",
  "not",
  "if",
  "then",
  "else",
];

const REGEX_SYNTAX = "\\.[]()*+?{}|$^";
// Quantifiers that make the character before them optional or repeatable.
const OPTIONAL_QUANTIFIERS = "*?{";

const isSchema = (value: unknown): value is JSONSchema4 =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * The fixed text every match of `pattern` starts with, e.g. "arn:" for
 * "^arn:(aws[a-z-]*):lambda:...". Empty when the pattern is not anchored,
 * has an alternation, or starts with regex syntax.
 */
function literalPrefix(pattern: string): string {
  if (!pattern.startsWith("^") || pattern.includes("|")) {
    return "";
  }
  let prefix = "";
  for (const char of pattern.slice(1)) {
    if (REGEX_SYNTAX.includes(char)) {
      if (OPTIONAL_QUANTIFIERS.includes(char)) {
        prefix = prefix.slice(0, -1);
      }
      break;
    }
    prefix += char;
  }

  return /^[\w:/.-]*$/.test(prefix) ? prefix : "";
}

/**
 * In an anyOf/oneOf that lists allowed strings next to a string pattern
 * (such as a Lambda runtime: a runtime name, or a runtime alias ARN), types
 * the pattern branch as a template literal of its fixed prefix. Otherwise it
 * compiles to `string`, which absorbs the allowed strings and loses their
 * completions and typo errors. Branches are copied, not changed, because the
 * same schema object can be used elsewhere without the allowed strings.
 */
function typePatternBranchesNextToEnums(schema: JSONSchema4): void {
  for (const key of ["anyOf", "oneOf"] as const) {
    const branches = schema[key];
    if (!Array.isArray(branches)) {
      continue;
    }
    const listsAllowedStrings = branches.some(
      (branch) =>
        isSchema(branch) &&
        Array.isArray(branch.enum) &&
        branch.enum.every((value) => typeof value === "string")
    );
    if (!listsAllowedStrings) {
      continue;
    }
    schema[key] = branches.map((branch) => {
      if (
        !isSchema(branch) ||
        branch.type !== "string" ||
        typeof branch.pattern !== "string" ||
        "tsType" in branch
      ) {
        return branch;
      }
      const prefix = literalPrefix(branch.pattern);

      return prefix ? { ...branch, tsType: `\`${prefix}\${string}\`` } : branch;
    });
  }
}

const COMBINATORS = ["anyOf", "oneOf", "allOf"];

const hasShape = (schema: JSONSchema4) =>
  SHAPE_KEYWORDS.some((keyword) => keyword in schema);

/**
 * Adjusts the Framework schema (a deep copy) before compiling: types schemas
 * without a shape as `unknown` and keeps allowed-string unions next to
 * pattern branches. See the two notes above.
 *
 * Subschemas are replaced with adjusted copies rather than changed in place,
 * because resolved $refs share schema objects between places where the same
 * subschema means different things.
 */
function prepareSchema(
  schema: JSONSchema4,
  visited = new WeakSet<JSONSchema4>()
): void {
  if (visited.has(schema)) {
    return;
  }
  visited.add(schema);
  typePatternBranchesNextToEnums(schema);
  const prepare = (subschema: JSONSchema4, typedByParent: boolean) => {
    if (hasShape(subschema)) {
      prepareSchema(subschema, visited);

      return subschema;
    }

    // An anyOf/oneOf/allOf branch under a schema with a `type` takes that
    // type, such as `{ not: { required: ["body"] } }` under `type: object`.
    return typedByParent ? subschema : { ...subschema, tsType: "unknown" };
  };
  for (const key of SUBSCHEMA_MAPS) {
    const map: unknown = schema[key];
    if (isSchema(map)) {
      for (const [name, subschema] of Object.entries(map)) {
        if (isSchema(subschema)) {
          map[name] = prepare(subschema, false);
        }
      }
    }
  }
  for (const key of SUBSCHEMA_LISTS) {
    const list: unknown = schema[key];
    if (Array.isArray(list)) {
      const typedByParent = COMBINATORS.includes(key) && "type" in schema;
      schema[key] = list.map((subschema: unknown) =>
        isSchema(subschema) ? prepare(subschema, typedByParent) : subschema
      );
    }
  }
  for (const key of SUBSCHEMAS) {
    const subschema: unknown = schema[key];
    if (isSchema(subschema)) {
      schema[key] = prepare(subschema, false);
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
    prepareSchema(schema);
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
