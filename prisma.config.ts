import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local may not exist (e.g. in CI/production where env vars are set directly)
}

// DIRECT_URL is preferred for Prisma CLI commands (migrate, studio) since it bypasses
// connection poolers, which can be unreliable for schema operations. Falling back to
// DATABASE_URL keeps `prisma generate` (which doesn't need a live connection) working
// even if only DATABASE_URL has been configured.
const datasourceUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: datasourceUrl,
  },
});
