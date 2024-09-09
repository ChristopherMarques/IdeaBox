"use client";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
