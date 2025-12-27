import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Cantina Bougainville 1",
    template: "%s | Cantina Bougainville 1",
  },
  description: "Cardápio da Cantina Bougainville 1 (praia e cantina/casa) com itens e preços.",
  applicationName: "Cantina Bougainville 1",
  keywords: [
    "cantina",
    "cardápio",
    "praia",
    "casa",
    "bebidas",
    "porções",
    "pedido",
    "whatsapp",
    "Cantina Bougainville 1",
  ],
  creator: "Otávio Emanoel de Lima",
  authors: [{ name: "Otávio Emanoel de Lima" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Cantina Bougainville 1",
    description: "Cardápio da Cantina Bougainville 1 (praia e cantina/casa) com itens e preços.",
    siteName: "Cantina Bougainville 1",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cantina Bougainville 1",
    description: "Cardápio da Cantina Bougainville 1 (praia e cantina/casa) com itens e preços.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
