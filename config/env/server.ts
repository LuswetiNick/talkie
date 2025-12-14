import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    ARCJET_KEY: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID cannot be empty"),
    GOOGLE_CLIENT_SECRET: z
      .string()
      .min(1, "GOOGLE_CLIENT_SECRET cannot be empty"),
    GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID cannot be empty"),
    GITHUB_CLIENT_SECRET: z
      .string()
      .min(1, "GITHUB_CLIENT_SECRET cannot be empty"),
    STREAM_VIDEO_SECRET_KEY: z
      .string()
      .min(1, "STREAM_VIDEO_SECRET_KEY cannot be empty"),
  },
  experimental__runtimeEnv: process.env,
});
