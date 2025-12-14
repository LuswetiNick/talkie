import "server-only";

import { StreamClient } from "@stream-io/node-sdk";
import { clientEnv } from "@/config/env/client";
import { serverEnv } from "@/config/env/server";

export const streamVideo = new StreamClient(
  clientEnv.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  serverEnv.STREAM_VIDEO_SECRET_KEY
);
