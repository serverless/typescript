// Fails when generated definitions drop an exported type that the previous
// definitions had: projects importing that type would stop compiling.
//
// Usage: node check-exported-types.js <previous.d.ts> <next.d.ts>
const fs = require("fs");

const exportedTypes = (file) =>
  new Set(
    [
      ...fs
        .readFileSync(file, "utf8")
        .matchAll(/^export (?:type|interface) ([A-Za-z0-9_$]+)/gm),
    ].map((match) => match[1])
  );

const [previousFile, nextFile] = process.argv.slice(2);
if (!previousFile || !nextFile) {
  console.error("Usage: check-exported-types.js <previous.d.ts> <next.d.ts>");
  process.exit(1);
}

const previous = exportedTypes(previousFile);
const next = exportedTypes(nextFile);
const removed = [...previous].filter((name) => !next.has(name));
const added = [...next].filter((name) => !previous.has(name));

if (added.length) console.log(`Added types: ${added.join(", ")}`);
if (removed.length) {
  console.error(`::error::Removed types: ${removed.join(", ")}`);
  process.exit(1);
}
console.log(`All ${previous.size} previously exported types are still exported`);
