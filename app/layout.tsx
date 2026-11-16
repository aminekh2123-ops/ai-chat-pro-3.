
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat Pro",
  description: "Your smart AI assistant. Ask anything and get instant answers."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
