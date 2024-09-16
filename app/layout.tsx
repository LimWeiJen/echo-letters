import type { Metadata } from "next";
import { Just_Another_Hand as Font } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Background from "@/components/shared/Background";

const fontSans = Font({ weight: '400', variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echo Letters",
  description: "Where your thoughts find timeless wisdom",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="transition-all overflow-hidden">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={cn("min-h-screen bg-gradient-to-b from-[#212334] to-[#131630] text-[#EDEDED] bg-transparent font-sans antialiased", fontSans.variable)}>
          <Background />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
