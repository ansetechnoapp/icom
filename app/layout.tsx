import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "../src/components/layout/header";
import { Footer } from "../src/components/layout/footer";
import { Providers } from "../src/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "iCome Hardware | Premium Computer Components",
    template: "%s | iCome Hardware",
  },
  description: "Your one-stop shop for premium computer hardware and components. Build your dream PC with quality parts at competitive prices.",
  keywords: ["computer hardware", "PC components", "gaming PC", "computer parts", "PC builder"],
  authors: [{ name: "iCome Hardware" }],
  creator: "iCome Hardware",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://icomehardware.com",
    title: "iCome Hardware | Premium Computer Components",
    description: "Your one-stop shop for premium computer hardware and components. Build your dream PC with quality parts at competitive prices.",
    siteName: "iCome Hardware",
  },
  twitter: {
    card: "summary_large_image",
    title: "iCome Hardware | Premium Computer Components",
    description: "Your one-stop shop for premium computer hardware and components. Build your dream PC with quality parts at competitive prices.",
    creator: "@icomehardware",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
