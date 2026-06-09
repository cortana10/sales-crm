import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal AI Umrah CRM",
  description: "CRM for Umrah Sales Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-surface text-on-background font-body-sm antialiased">
        {children}
      </body>
    </html>
  );
}
