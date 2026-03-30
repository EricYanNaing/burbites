import type { Metadata } from "next";
import { Roboto, Playwrite_IE } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layouts/app-shell";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const playwrite_ie = Playwrite_IE({
  variable: "--font-playwrite_ie",
  weight: ["100", "400"],
});

export const metadata: Metadata = {
  title: "Burbites",
  description: "Burmese food for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${playwrite_ie.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
