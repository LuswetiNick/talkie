"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { NavItem } from "@/components/ui/nav-item";
import { DashboardCommand } from "./dashboard-command";
import DashboardUser from "./dashboard-user";
import { navigation } from "./navigation-links";

export default function DashboardHeader() {
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
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
                  <Button
                    className="h-8 w-[240px] justify-start text-muted-foreground hover:text-muted-foreground"
                    onClick={() => setCommandOpen((open) => !open)}
                    size="sm"
                    variant="outline"
                  >
                    <Search />
                    Search
                    <kbd className="ml-auto inline-flex gap-1 text-xs">
                      <Kbd>⌘</Kbd>
                      <Kbd>K</Kbd>
                    </kbd>
                  </Button>
                </div>
                <ThemeToggle />
                <span className="h-6 w-px bg-muted md:block" />
                <DashboardUser />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
