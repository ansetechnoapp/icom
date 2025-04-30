"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Categories",
    href: "/categories",
    children: [
      {
        name: "CPUs",
        href: "/categories/cpus",
      },
      {
        name: "Motherboards",
        href: "/categories/motherboards",
      },
      {
        name: "Graphics Cards",
        href: "/categories/graphics-cards",
      },
      {
        name: "Memory",
        href: "/categories/memory",
      },
      {
        name: "Storage",
        href: "/categories/storage",
      },
      {
        name: "Cases",
        href: "/categories/cases",
      },
      {
        name: "Power Supplies",
        href: "/categories/power-supplies",
      },
      {
        name: "Cooling",
        href: "/categories/cooling",
      },
    ],
  },
  {
    name: "PC Builder",
    href: "/pc-builder",
  },
  {
    name: "Deals",
    href: "/deals",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export function MainNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() => setHoveredItem(item.name)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {item.name}
          </Link>
          {item.children && hoveredItem === item.name && (
            <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-md border bg-background p-2 shadow-lg">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-muted",
                    pathname === child.href
                      ? "bg-muted font-medium text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
