import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";
export const requireUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/auth/get-started");
  }

  return session.user;
});
export const requireSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/get-started");
  }

  return session;
});

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
};
