import { drizzle } from "drizzle-orm/neon-http";
import { serverEnv } from "@/config/env/server";

const databaseUrl = serverEnv.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const db = drizzle(databaseUrl);
