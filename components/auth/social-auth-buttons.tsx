"use client";

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
} from "./o-auth-provider";

export function SocialAuthButtons() {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].Icon;

    return (
      <BetterAuthActionButton
        action={() => {}}
        key={provider}
        variant="outline"
      >
        <Icon />
        {SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].name}
      </BetterAuthActionButton>
    );
  });
}
