import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next";
import CookieConsent from '@/app/ui/CookieConsent';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Alcina Dados & IA",
  description: "Consultoria especializada em Dados & IA para empresas que querem tomar decisões melhores.",
  icons: {
    icon: "/logo/alcina-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="7e388684-b05b-4f59-8e76-b3509d8aae8c"></Script>
        <CookieConsent />
      </body>
    </html>
  );
}