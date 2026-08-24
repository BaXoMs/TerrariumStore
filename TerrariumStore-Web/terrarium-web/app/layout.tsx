import type { Metadata } from "next";
import { Fjalla_One, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fjalla",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Terrarium Store — Reptiles & Veterinaria Especializada",
    template: "%s | Terrarium Store",
  },
  description:
    "Tienda especializada en reptiles y animales exóticos en Puebla. Catálogo, veterinaria, agendar cita y casos clínicos.",
  keywords: ["reptiles", "pogona", "gecko leopardo", "veterinaria exóticos", "Puebla"],
  openGraph: {
    title: "Terrarium Store",
    description: "Reptiles & Veterinaria Especializada en Puebla",
    url: "https://terrariumstore.mx",
    siteName: "Terrarium Store",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terrarium Store",
    description: "Reptiles & Veterinaria Especializada en Puebla",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://terrariumstore.mx"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fjallaOne.variable} ${inter.variable} ${jbMono.variable}`}
    >
      <body className="font-body bg-page text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
