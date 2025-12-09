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
      <header className="w-full border-b">
        <div className="flex h-16 items-center gap-4 p-4 sm:gap-6 sm:px-6 lg:gap-8 lg:p-8">
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

            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                aria-label="Search"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-muted-foreground md:w-auto md:justify-start md:px-3"
                onClick={() => setCommandOpen((open) => !open)}
                size="sm"
                variant="outline"
              >
                <Search className="h-4 w-4" />
                <span className="ml-2 hidden md:inline">Search</span>
                <kbd className="ml-auto hidden gap-1 text-xs md:inline-flex">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </kbd>
              </Button>
              <ThemeToggle />
              <span className="hidden h-6 w-px bg-muted md:block" />
              <DashboardUser />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
