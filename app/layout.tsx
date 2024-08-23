import type { Metadata } from "next";
import { Just_Another_Hand as Font } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = Font({ weight: '400', variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
