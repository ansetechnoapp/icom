"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface MobileNavProps {
  onClose: () => void;
}

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

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = React.useState<string[]>([]);

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto pb-32 shadow-md animate-in slide-in-from-left-80 md:hidden">
      <div className="relative z-20 bg-background p-4">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleCategory(item.name)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-muted"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform",
                        openCategories.includes(item.name) && "rotate-180"
                      )}
                    />
                  </button>
                  {openCategories.includes(item.name) && (
                    <div className="ml-4 mt-1 grid grid-flow-row auto-rows-max">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={cn(
                            "rounded-md px-3 py-2 text-sm",
                            pathname === child.href
                              ? "bg-muted font-medium"
                              : "hover:bg-muted"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-muted"
                      : "hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
