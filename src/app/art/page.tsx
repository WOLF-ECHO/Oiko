import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, Palette, ShieldCheck, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Art Contemporain & Éditions Numérotées | OÏKOS",
  description:
    "Explorez la collection OÏKOS Art : bas-reliefs à la chaux naturelle marocaine, toiles texturées aux pigments d'ocre et sculptures murales signées pour des intérieurs de caractère.",
};

export default function ArtPage() {
  const artProducts = PRODUCTS.filter((p) => p.universe === "Art" || p.universe === "Éditions");

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Editorial Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <SectionHeading
            chapter="Art &bull; Galerie &bull; Éditions"
            eyebrow="Expression Artistique"
            title="L&apos;Écho Mural : Quand le Meuble Devient Œuvre"
            subtitle="Chez OÏKOS, nous refusons les murs muets. Nos toiles grand format et bas-reliefs minéraux sont créés en écho intime avec nos silhouettes de mobilier."
          />
        </div>

        {/* Hero Artwork Panorama */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#282622] bg-[#161513]">
          <Image
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop"
            alt="Galerie d'Art Contemporain OÏKOS"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
              Concept Fondateur
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#F9F6F0] font-light">
              « Le meuble devient une œuvre. L&apos;intérieur devient une galerie habitable. »
            </h3>
          </div>
        </div>

        {/* Three Levels of Value Creation from Business Plan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Palette className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block">
              Niveau 01
            </span>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Art Mural &amp; Reliefs</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Bas-reliefs à la chaux, jeux d&apos;ombres minérales et compositions abstraites pensées pour s&apos;intégrer sans heurts au-dessus d&apos;un canapé ou d&apos;une console.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block">
              Niveau 02
            </span>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Œuvres Signature</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Grands formats immersifs (jusqu&apos;à 2,40 m), techniques mixtes de sables et pigments marocains bruts, pièces uniques numérotées et signées par l&apos;artiste.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block">
              Niveau 03
            </span>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Éditions &amp; Résidences</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Séries confidentielles (6 à 12 exemplaires seulement) nées d&apos;une carte blanche donnée à des plasticiens marocains et internationaux.
            </p>
          </div>
        </div>

        {/* Gallery Products Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#282622] pb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
              Sélection en Galerie (Chapitre 01)
            </h3>
            <span className="text-xs text-[#8E877D]">
              Toutes les œuvres sont livrées avec certificat d&apos;authenticité
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Artist Collaboration Callout */}
        <div className="bg-[#161513] border border-[#282622] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
              Résidences Artistiques
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
              Vous êtes Artiste Plasticien ou Céramiste ?
            </h3>
            <p className="text-xs text-[#C4BEB4] leading-relaxed">
              OÏKOS accueille chaque trimestre un créateur pour co-signer une édition limitée et exposer au cœur de la Galerie Habitable à Casablanca.
            </p>
          </div>

          <a
            href="mailto:koncept.morocco@gmail.com?subject=Candidature%20Résidence%20OÏKOS%20Art"
            className="px-8 py-3.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold uppercase tracking-wider hover:bg-[#DEC5A5] transition-colors shrink-0"
          >
            Proposer une collaboration
          </a>
        </div>
      </div>
    </div>
  );
}
