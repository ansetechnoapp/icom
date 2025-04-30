"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Heart, User, Menu, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "./search-bar";
import { UserAccountNav } from "./user-account-nav";
import { CartDrawer } from "../cart/cart-drawer";

export function Header() {
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 md:gap-10">
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Image
              src="/logo.svg"
              alt="iCome Hardware"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="hidden font-bold sm:inline-block">
              iCome Hardware
            </span>
          </Link>
          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full max-w-sm md:flex">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <CartDrawer />
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="icon" aria-label="Login">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="container pb-4 md:hidden">
          <SearchBar />
        </div>
      )}
      {showMobileMenu && <MobileNav onClose={() => setShowMobileMenu(false)} />}
    </header>
  );
}
