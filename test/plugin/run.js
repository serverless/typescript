// Runs the built plugin (dist/plugin.js) on small schemas and type-checks
// probes against the definitions it writes. Run with `npm run test:plugin`.
const fs = require("fs");
const os = require("os");
const path = require("path");
const ts = require("typescript");
const Plugin = require("../../dist/plugin");

const ARN_PATTERN =
  "^arn:(aws[a-z-]*):lambda:([a-z0-9-]+):(\\d{12}):runtime\\/([a-z0-9]+)\\/alias\\/([A-Za-z0-9_]+)$";

const runtimeName = { enum: ["nodejs24.x", "python3.13"] };
const runtime = {
  anyOf: [
    runtimeName,
    { type: "string", pattern: ARN_PATTERN },
    {
      type: "object",
      patternProperties: { "^(Ref|Fn::.+)$": {} },
      additionalProperties: false,
    },
  ],
};
// Shared with `runtime` above, as resolved $refs are in the Framework schema.
const arnOnly = runtime.anyOf[1];

// Like the schedule event's `input`: the `not` branch takes `type: object`.
const input = {
  anyOf: [
    { type: "string" },
    {
      type: "object",
      oneOf: [
        {
          properties: { body: { type: "string" } },
          required: ["body"],
          additionalProperties: false,
        },
        { not: { required: ["body"] } },
      ],
    },
  ],
};
// One object used both as a branch under `type: object` and on its own.
const shared = { description: "Shared" };

const schema = {
  type: "object",
  properties: {
    runtime,
    arnOnly,
    // A pattern without allowed strings next to it stays a plain string.
    kmsKeyArn: { type: "string", pattern: "^arn:aws[a-z-]*:kms" },
    describedOnly: { description: "Any value" },
    notOnly: { not: { type: "string" } },
    ifOnly: { if: { type: "string" }, then: { maxLength: 3 } },
    input,
    typedShared: { type: "object", anyOf: [shared] },
    shared,
    tuple: {
      type: "array",
      items: [{ type: "string" }],
      additionalItems: { description: "Any value" },
    },
  },
  additionalProperties: false,
};

const cases = `
import type { AWS } from "./index";
const ok: AWS[] = [
  { runtime: "nodejs24.x" },
  { runtime: "arn:aws:lambda:us-east-1:123456789012:runtime/php/alias/prod" },
  { runtime: { Ref: "PhpRuntimeAlias" } },
  { arnOnly: "any string" },
  { kmsKeyArn: "\${ssm:/kms/arn}" },
  { describedOnly: ["a"] },
  { describedOnly: 5 },
  { notOnly: 5 },
  { ifOnly: true },
  { tuple: ["a", 1, ["b"]] },
  { input: "payload" },
  { input: { body: "payload" } },
  { input: { key: 1 } },
  { typedShared: { key: 1 } },
  { shared: 5 },
];
const rejected: AWS[] = [
  // @ts-expect-error typo in a runtime name
  { runtime: "nodejs24x" },
  // @ts-expect-error unknown runtime name
  { runtime: "nodejs99.x" },
  // @ts-expect-error a number is not a runtime
  { runtime: 24 },
  // @ts-expect-error input is a string or an object
  { input: 5 },
  // @ts-expect-error typedShared is an object
  { typedShared: 5 },
  // @ts-expect-error unknown key
  { unknownKey: true },
];
export { ok, rejected };
`;

async function main() {
  const original = JSON.stringify({ runtime, kms: schema.properties.kmsKeyArn });
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "serverless-typescript-"));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    await new Plugin({ configSchemaHandler: { schema } }).generateSchema();
  } finally {
    process.chdir(cwd);
  }

  const failures = [];
  if (JSON.stringify({ runtime, kms: schema.properties.kmsKeyArn }) !== original) {
    failures.push("the plugin changed the schema it was given");
  }
  const definitions = fs.readFileSync(path.join(dir, "index.d.ts"), "utf8");
  if (!definitions.includes("`arn:${string}`")) {
    failures.push("runtime pattern branch is not a template literal type");
  }

  fs.writeFileSync(path.join(dir, "cases.ts"), cases);
  const program = ts.createProgram([path.join(dir, "cases.ts")], {
    strict: true,
    noEmit: true,
  });
  for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
    const { line } = diagnostic.file
      ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
      : { line: -1 };
    failures.push(
      `cases.ts:${line + 1}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`
    );
  }

  if (failures.length) {
    console.error(`Plugin test failed (output in ${dir}):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  fs.rmSync(dir, { recursive: true, force: true });
  console.log("Plugin test passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
