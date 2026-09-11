import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import WhatsAppConcierge from "@/components/layout/WhatsAppConcierge";
import { JsonLdOrganization, JsonLdLocalBusiness } from "@/components/seo/JsonLd";
import LuxuryScrollProgress from "@/components/ui/LuxuryScrollProgress";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://oikos.ma"),
  title: {
    default: "OÏKOS • Maison de Design & d'Art | L'Art d'Habiter Casablanca",
    template: "%s | OÏKOS Maison de Design",
  },
  description:
    "OÏKOS est une maison marocaine de mobilier contemporain d'exception, d'architecture intérieure et d'artisanat d'art. Showroom et Studio au Boulevard d'Anfa à Casablanca. Configurateur 3D sur mesure, livraison et installation gants blancs partout au Maroc.",
  keywords: [
    "OÏKOS",
    "OÏKOS Maroc",
    "OÏKOS Casablanca",
    "oikos maison de design",
    "mobilier haut de gamme maroc",
    "configurateur 3d mobilier maroc",
    "canapé sur mesure casablanca",
    "table travertin maroc",
    "architecte d'intérieur casablanca",
    "meuble contemporain maroc",
    "décoration de luxe maroc",
    "art mural chaux maroc",
    "quiet luxury maroc",
    "boulevard d'anfa mobilier",
  ],
  authors: [{ name: "OÏKOS Maison de Design" }],
  creator: "OÏKOS",
  publisher: "OÏKOS SARL",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "OÏKOS • Maison de Design & d'Art | Casablanca",
    description:
      "Des espaces qui ont une âme. Plus qu'un intérieur, un art de vivre. Mobilier contemporain d'exception, studio 3D et pièces sculpturales à Casablanca.",
    url: "https://oikos.ma",
    siteName: "OÏKOS Maison de Design",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "OÏKOS Maison de Design Casablanca",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OÏKOS • Maison de Design | L'Art d'Habiter",
    description:
      "Maison marocaine de mobilier d'exception, architecture intérieure et configurateur 3D à Casablanca.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
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
    canonical: "https://oikos.ma",
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
        <LuxuryScrollProgress />
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppConcierge />
      </body>
    </html>
  );
}
