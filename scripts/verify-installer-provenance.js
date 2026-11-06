// Checks that the serverless npm package installed for definition generation
// was built by the Serverless Framework release workflow.
//
// Usage: node verify-installer-provenance.js <signatures.json> <version>
// where signatures.json is the output of
// `npm audit signatures --json --include-attestations`, which has already
// verified the signatures and attestation bundles it lists.
const fs = require("fs");

const EXPECTED_WORKFLOW = {
  repository: "https://github.com/serverless/serverless",
  path: ".github/workflows/release-framework.yml",
  ref: "refs/heads/main",
};
const SLSA_PROVENANCE = "https://slsa.dev/provenance/v1";

const fail = (message) => {
  console.error(`::error::${message}`);
  process.exit(1);
};

const [signaturesFile, version] = process.argv.slice(2);
if (!signaturesFile || !version) {
  fail("Usage: verify-installer-provenance.js <signatures.json> <version>");
}

const audit = JSON.parse(fs.readFileSync(signaturesFile, "utf8"));
if (audit.invalid.length || audit.missing.length) {
  fail(
    `Packages with invalid or missing signatures: ${[
      ...audit.invalid,
      ...audit.missing,
    ]
      .map((pkg) => `${pkg.name}@${pkg.version}`)
      .join(", ")}`
  );
}

const installer = audit.verified.find(
  (pkg) => pkg.name === "serverless" && pkg.version === version
);
if (!installer) fail(`serverless@${version} has no verified signature`);

const provenance = (installer.attestationBundles || []).find(
  (attestation) => attestation.predicateType === SLSA_PROVENANCE
);
if (!provenance) fail(`serverless@${version} has no provenance attestation`);

const statement = JSON.parse(
  Buffer.from(provenance.bundle.dsseEnvelope.payload, "base64").toString()
);
const subjects = statement.subject.map((subject) => subject.name);
if (!subjects.includes(`pkg:npm/serverless@${version}`)) {
  fail(`Provenance subject ${subjects.join(", ")} is not serverless@${version}`);
}

const workflow = statement.predicate.buildDefinition.externalParameters.workflow;
for (const [key, expected] of Object.entries(EXPECTED_WORKFLOW)) {
  if (workflow[key] !== expected) {
    fail(
      `serverless@${version} was built with workflow ${key} "${workflow[key]}", expected "${expected}"`
    );
  }
}

console.log(
  `serverless@${version} was built by ${workflow.repository}/${workflow.path} on ${workflow.ref}`
);
