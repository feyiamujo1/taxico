import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxico",
  description:
    "Move and Pay Freely at the lowest prices with Taxico!",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "Taxico",
      url: "/icon.png"
    }
  },
  generator: "Next.js",
  applicationName: "Taxico",
  referrer: "origin-when-cross-origin"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative box-border  w-full h-full"}>{children}</body>
    </html>
  );
}
