import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next";

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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}