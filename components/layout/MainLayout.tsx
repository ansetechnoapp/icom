import Link from 'next/link';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <nav className="container flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <div className="flex md:hidden gap-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="font-bold text-lg">
              iCome
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-bold text-lg">
              iCome
            </Link>
            <div className="flex gap-4">
              <Button variant="ghost" className="text-sm">
                Components
              </Button>
              <Button variant="ghost" className="text-sm">
                Prebuilts
              </Button>
              <Button variant="ghost" className="text-sm">
                Accessories
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4">
            <Input
              placeholder="Search processors, GPUs, motherboards..."
              className="rounded-full"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Categories */}
          <div className="space-y-2">
            <h4 className="font-medium">Categories</h4>
            <div className="space-y-1 text-sm">
              <div className="hover:underline">CPUs/Processors</div>
              <div className="hover:underline">Graphics Cards</div>
              <div className="hover:underline">Motherboards</div>
              <div className="hover:underline">Storage</div>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h4 className="font-medium">Support</h4>
            <div className="space-y-1 text-sm">
              <div className="hover:underline">Contact Us</div>
              <div className="hover:underline">FAQ</div>
              <div className="hover:underline">Shipping</div>
              <div className="hover:underline">Returns</div>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="font-medium">Legal</h4>
            <div className="space-y-1 text-sm">
              <div className="hover:underline">Privacy Policy</div>
              <div className="hover:underline">Terms of Service</div>
              <div className="hover:underline">Warranty</div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <h4 className="font-medium">Connect</h4>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} iCome Hardware. All rights reserved.
        </div>
      </footer>
    </div>
  );
}