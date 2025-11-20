import { defineConfig } from "drizzle-kit";
import { serverEnv } from "./config/env/server";

const databaseUrl = serverEnv.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./services/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
