import type { Metadata } from "next";
import { Montserrat, Geist } from 'next/font/google'
import "./globals.css";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const montserrat = Montserrat({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Card Management",
  description: "Tenha controle do seu cartão compartilhado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
