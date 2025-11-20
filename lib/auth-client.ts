import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/config/env/client";
import type { auth } from "./auth";

const baseUrl = clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL is not defined");
}

export const authClient = createAuthClient({
  baseURL: baseUrl,
  plugins: [inferAdditionalFields<typeof auth>()],
});
