// Configuration the definitions must reject. Each entry fails to compile
// on its own, so `tsc` reports an unused @ts-expect-error when the
// definitions become too permissive (for example, a section typed as
// `unknown` or an index signature on AWS).
import type { AWS } from "../index";

export const invalidConfigurations: AWS[] = [
  // @ts-expect-error runtime outside the AwsLambdaRuntime union
  { service: "invalid", provider: { name: "aws", runtime: "nodejs99.x" } },
  // @ts-expect-error memorySize is a number
  { service: "invalid", provider: { name: "aws", memorySize: "512" } },
  // @ts-expect-error unknown top-level key
  { service: "invalid", provider: { name: "aws" }, unknownKey: true },
  // @ts-expect-error provider.name is required
  { service: "invalid", provider: {} },
  // @ts-expect-error a function needs a handler or an image
  { service: "invalid", provider: { name: "aws" }, functions: { api: { timeout: "30" } } },
];
