import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import WhatsAppConcierge from "@/components/layout/WhatsAppConcierge";
import { JsonLdOrganization, JsonLdLocalBusiness } from "@/components/seo/JsonLd";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C0B0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://velmora.ma"),
  title: {
    default: "VELMORA | Maison Marocaine de Mobilier Contemporain & d'Art",
    template: "%s | VELMORA Maroc",
  },
  description:
    "Maison marocaine de mobilier contemporain d'exception, pièces sculpturales et art mural. Showrooms privés à Casablanca et Rabat. Créations sur-mesure, matières nobles et livraison gants blancs au Maroc.",
  keywords: [
    "mobilier haut de gamme maroc",
    "meuble design casablanca",
    "mobilier contemporain maroc",
    "canapé sur mesure casablanca",
    "table basse travertin maroc",
    "architecte interieur maroc",
    "galerie mobilier art rabat",
    "velmora maroc",
    "mobilier quiet luxury maroc",
    "décoration d'intérieur marrakech",
  ],
  authors: [{ name: "VELMORA Studio" }],
  creator: "VELMORA",
  publisher: "VELMORA Maison de Design",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_US", "ar_MA"],
    url: "https://velmora.ma",
    siteName: "VELMORA",
    title: "VELMORA | Maison Marocaine de Mobilier Contemporain & d'Art",
    description:
      "L'Art d'Habiter. Pièces de mobilier contemporain sculpturales, toiles d'art et aménagement d'exception au Maroc. Showroom à Casablanca.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
        width: 1600,
        height: 900,
        alt: "VELMORA - Galerie Habitable Casablanca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELMORA | Maison Marocaine de Mobilier Contemporain & d'Art",
    description:
      "Mobilier contemporain d'exception, marbre, travertin et art mural au Maroc. Showroom Casablanca.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://velmora.ma",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <head>
        <JsonLdOrganization />
        <JsonLdLocalBusiness />
      </head>
      <body className="min-h-screen bg-[#0C0B0A] text-[#EFECE6] font-sans flex flex-col selection:bg-[#C5A880] selection:text-[#0C0B0A]">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppConcierge />
      </body>
    </html>
  );
}
