import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { "@": rootDir } },
  test: { include: ["src/**/*.test.ts", "config/**/*.test.ts"], environment: "node" },
});
