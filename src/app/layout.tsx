import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "~/lib/utils";
import { siteConfig } from "~/config/site";
import { SessionProvider } from "next-auth/react";
import { authSession } from "~/auth";
import ReactQueryProvider from "~/utils/react-query";
import { Toaster } from "sonner";

import "~/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authSession();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            geistSans.variable,
            geistMono.variable
          )}
        >
          <ReactQueryProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
