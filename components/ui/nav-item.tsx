"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
  className?: string;
  /**
   * When true, match the pathname exactly. Defaults to true.
   * If false, parent routes can be considered active via prefix matching.
   */
  exact?: boolean;
}

export function NavItem({
  icon: Icon,
  title,
  href,
  className = "",
  exact = true,
}: NavItemProps) {
  const pathname = usePathname();

  const isActive =
    pathname != null &&
    (exact
      ? pathname === href
      : pathname === href || pathname.startsWith(href));

  return (
    <li>
      <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 font-medium text-sm transition-colors duration-300 hover:text-muted-foreground",
          className,
          isActive && "rounded-md bg-accent px-2 py-1 text-muted-foreground"
        )}
        href={href}
      >
        <Icon className={cn("h-4 w-4", isActive && "text-muted-foreground")} />
        <span>{title}</span>
      </Link>
    </li>
  );
}
