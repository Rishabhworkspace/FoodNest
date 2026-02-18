import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoodNest — Discover Food, Not Just Locations",
  description: "Netflix for Restaurants. Find cafes & restaurants near you with smart filters, mood-based discovery, and curated recommendations.",
  keywords: ["food discovery", "restaurants", "cafes", "dining", "FoodNest"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(outfit.variable, jakarta.variable, "scroll-smooth")}>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden min-h-screen selection:bg-primary selection:text-primary-foreground">
        <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {children}
      </body>
    </html>
  );
}
