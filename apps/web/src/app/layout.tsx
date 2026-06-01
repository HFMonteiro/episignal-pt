import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EpiSignal Demo",
  description: "Demo front-end for infectious disease surveillance signal detection"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

