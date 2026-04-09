import type { Metadata } from "next";
import { Roboto, Playwrite_IE } from "next/font/google";
import "./globals.css";
import { ShellSwitch } from "@/components/layouts/shell-switch";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { getServerLocale } from "@/lib/i18n/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      className={`${roboto.variable} ${playwrite_ie.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LocaleProvider initialLocale={locale}>
          <ShellSwitch>{children}</ShellSwitch>
        </LocaleProvider>
      </body>
    </html>
  );
}
