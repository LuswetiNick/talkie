import type { ComponentProps, ElementType } from "react";
import { GitHubIcon, GoogleIcon } from "./auth-icons";

export const SUPPORTED_OAUTH_PROVIDERS = ["google", "github"] as const;
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SupportedOAuthProvider,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
  google: { name: "Continue with Google", Icon: GoogleIcon },
  github: { name: "Continue with GitHub", Icon: GitHubIcon },
};
