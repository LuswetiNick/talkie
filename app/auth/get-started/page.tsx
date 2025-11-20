import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/data/user/require-user";
import { SocialAuthButtons } from "../_components/social-auth-buttons";

export default async function GetStartedPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome to Talkie!</CardTitle>
            <CardDescription>
              Proceed with your Google or Github account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <SocialAuthButtons />
          </CardContent>
          <CardFooter className="px-6 text-center">
            <p className="text-muted-foreground text-xs">
              By clicking continue, you agree to our{" "}
              <Link className="underline" href="#">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline" href="#">
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
