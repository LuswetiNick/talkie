"use client";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { navigation } from "./navigation-links";

export default function DashboardUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer rounded-md">
          <AvatarImage alt="John Doe" src="" />
          <AvatarFallback className="rounded-md">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage alt="" src="" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">John Doe</span>
              <span className="truncate text-muted-foreground text-xs">
                john.doe@example.com
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
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
