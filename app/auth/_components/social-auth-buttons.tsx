"use client";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { BetterAuthActionButton } from "./better-auth-action-button";
import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
} from "./o-auth-provider";

export function SocialAuthButtons() {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].Icon;

    return (
      <BetterAuthActionButton
        action={() =>
          authClient.signIn.social(
            {
              provider,
              callbackURL: "/dashboard",
            },
            {
              onSuccess: () => {
                toast.success("Redirecting to dashboard...");
              },
              onError: (error) => {
                toast.error(error.error?.message ?? "Failed to sign up");
              },
            }
          )
        }
        key={provider}
        variant="outline"
      >
        <Icon />
        {SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].name}
      </BetterAuthActionButton>
    );
  });
}
