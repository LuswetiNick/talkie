import { bottts, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface AvatarProps {
  seed: string;
  variant: "bottts" | "initials";
}

export const generateAvatarUri = ({ seed, variant }: AvatarProps) => {
  let avatar;

  if (variant === "bottts") {
    avatar = createAvatar(bottts, {
      seed,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
    });
  }
  return avatar.toString();
};
