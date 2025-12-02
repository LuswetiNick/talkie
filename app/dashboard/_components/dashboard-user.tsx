"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavItem } from "@/components/ui/nav-item";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { navigation } from "./navigation-links";

function getInitials(name?: string): string {
  if (!name) {
    return "U";
  }
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DashboardUser() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-md" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session?.user.image ? (
          <Avatar className="size-8 cursor-pointer rounded-full">
            <AvatarImage
              alt={session?.user?.name}
              src={session?.user?.image ?? undefined}
            />
            <AvatarFallback className="rounded-md">
              {getInitials(session?.user?.name)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <GeneratedAvatar
            className="size-8 cursor-pointer rounded-full"
            seed={session?.user?.name || getInitials(session?.user?.name)}
            variant="initials"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {session?.user.image ? (
              <Avatar className="size-8 cursor-pointer rounded-full">
                <AvatarImage
                  alt={session?.user?.name}
                  src={session?.user?.image ?? undefined}
                />
                <AvatarFallback className="rounded-md">
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <GeneratedAvatar
                className="size-8 cursor-pointer rounded-full"
                seed={session?.user?.name || getInitials(session?.user?.name)}
                variant="initials"
              />
            )}
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session?.user?.name}
              </span>
              <span className="truncate text-muted-foreground text-xs">
                {session?.user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuGroup className="flex flex-col md:hidden">
          {navigation.map((item) => (
            <DropdownMenuItem asChild key={item.href}>
              <NavItem href={item.href} icon={item.icon} title={item.title} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className="w-full justify-start"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/auth/get-started");
                  },
                },
              })
            }
            size="sm"
            variant="ghost"
          >
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
