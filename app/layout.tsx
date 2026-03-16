import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppDataProvider } from "@/contexts/app-data-context";

export const metadata: Metadata = {
  title: "Doce Lucro",
  description:
    "Sistema mobile-first para doceiras controlarem encomendas, custos, receitas, caixa e lucro.",
  applicationName: "Doce Lucro",
  appleWebApp: {
    capable: true,
    title: "Doce Lucro",
    statusBarStyle: "default"
  },
  formatDetection: {
    telephone: false
  }
};

export const viewport: Viewport = {
  themeColor: "#d94680",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppDataProvider>{children}</AppDataProvider>
      </body>
    </html>
  );
}
