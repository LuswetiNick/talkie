"use client";

import { Search } from "lucide-react";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { NavItem } from "@/components/ui/nav-item";
import DashboardUser from "./dashboard-user";
import { navigation } from "./navigation-links";

export default function DashboardHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 p-4 sm:px-6 lg:p-8">
        <Logo />
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <NavItem
                  href={item.href}
                  icon={item.icon}
                  key={item.href}
                  title={item.title}
                />
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex w-full max-w-xs flex-col gap-6">
                <InputGroup>
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <ThemeToggle />
              <span className="h-6 w-px bg-muted md:block" />
              <DashboardUser />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
