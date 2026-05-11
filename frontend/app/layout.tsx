import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Negotiation Tools",
  description: "KI-gestuetztes Verhandlungs-Cockpit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
