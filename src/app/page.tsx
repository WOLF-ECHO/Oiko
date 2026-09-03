"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Compass,
  Layers,
  Palette,
  Eye,
  CheckCircle2,
  Calendar,
  MessageCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS, SHOWROOM_ZONES } from "@/data/products";
import { JsonLdFaq } from "@/components/seo/JsonLd";

export default function HomePage() {
  const [activeZone, setActiveZone] = useState(0);
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const currentZone = SHOWROOM_ZONES[activeZone];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0C0B0A] px-4 sm:px-6 lg:px-8 py-20">
        {/* Ambient background imagery */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="VELMORA - Galerie Habitable Casablanca"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/70 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0C0B0A]/40 to-[#0C0B0A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161513]/80 backdrop-blur-md border border-[#C5A880]/30 text-xs text-[#C5A880] tracking-widest uppercase animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
            <span>Maison Marocaine de Mobilier &amp; d&apos;Art</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F9F6F0] font-light tracking-tight leading-[1.05]">
              L&apos;ART D&apos;HABITER
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#DEC5A5] font-light">
              Chapitre 01 : Géométrie Douce
            </p>
          </div>

          {/* Editorial Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#C4BEB4] font-light leading-relaxed">
            Des formes à contempler. Des pièces à vivre. VELMORA façonne des intérieurs d&apos;exception où le design contemporain dialogue avec la matière brute et l&apos;expression artistique.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-semibold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Découvrir la Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/showroom"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#161513]/90 backdrop-blur-md border border-[#282622] hover:border-[#C5A880] text-[#F9F6F0] text-xs font-medium tracking-[0.2em] uppercase transition-all hover:bg-[#1E1D1A] flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#C5A880]" />
              <span>Visiter le Showroom</span>
            </Link>
          </div>

          {/* Micro badges */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-[#282622]/60">
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Localisation</span>
              <span className="text-xs text-[#F9F6F0] font-medium block">Showroom Casablanca</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Confection</span>
              <span className="text-xs text-[#F9F6F0] font-medium block">Sur mesure &amp; Artisanale</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Service</span>
              <span className="text-xs text-[#F9F6F0] font-medium block">Livraison Gants Blancs</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Garantie</span>
              <span className="text-xs text-[#F9F6F0] font-medium block">5 Ans Structurelle</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE BANNER */}
      <div className="bg-[#161513] border-y border-[#282622] py-4 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-[#8E877D]">
          <span>Maison Marocaine de Mobilier d&apos;Art</span>
          <span className="text-[#C5A880]">•</span>
          <span>Casablanca Triangle d&apos;Or</span>
          <span className="text-[#C5A880]">•</span>
          <span>Rabat Souissi</span>
          <span className="text-[#C5A880]">•</span>
          <span>Marrakech Palmeraie</span>
          <span className="text-[#C5A880]">•</span>
          <span>Travertin Romain &amp; Marbre Marquina</span>
          <span className="text-[#C5A880]">•</span>
          <span>Tissus Italiens Bouclé d&apos;Alpaga</span>
          <span className="text-[#C5A880]">•</span>
          <span>Éditions d&apos;Art Numérotées</span>
          <span className="text-[#C5A880]">•</span>
          <span>Confection sur Mesure</span>
          <span className="text-[#C5A880]">•</span>
          <span>Maison Marocaine de Mobilier d&apos;Art</span>
          <span className="text-[#C5A880]">•</span>
          <span>Casablanca Triangle d&apos;Or</span>
          <span className="text-[#C5A880]">•</span>
          <span>Rabat Souissi</span>
          <span className="text-[#C5A880]">•</span>
          <span>Livraison Gants Blancs partout au Maroc</span>
          <span className="text-[#C5A880]">•</span>
        </div>
      </div>

      {/* 3. MANIFESTO / PHILOSOPHY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A] relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <SectionHeading
            chapter="01"
            eyebrow="Manifeste de Marque"
            title="« Nous ne créons pas seulement du mobilier. Nous composons des espaces où le design rencontre l'art. »"
            subtitle="Chez VELMORA, chaque pièce répond à une exigence : allier la pureté sculpturale d'une œuvre à la douceur intime d'un meuble fait pour être habité au quotidien."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
            <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#F9F6F0]">Matières Vivantes</h3>
              <p className="text-xs text-[#8E877D] leading-relaxed">
                Travertins romains bruts, noyer massif de l&apos;Atlas, laiton dinandé, lins denses et bouclés texturés. Des matières authentiques qui se patinent avec grâce.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#F9F6F0]">L&apos;Écho Artistique</h3>
              <p className="text-xs text-[#8E877D] leading-relaxed">
                Chaque ensemble de salon est conçu en dialogue direct avec une œuvre murale texturée ou une sculpture minérale, élevant l&apos;espace en galerie habitable.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#F9F6F0]">Excellence d&apos;Atelier</h3>
              <p className="text-xs text-[#8E877D] leading-relaxed">
                Un protocole rigoureux en 7 points : conformité stricte des cotes, solidité éprouvée, délais maîtrisés et livraison privée à Casablanca, Rabat et partout au Maroc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAPITRE 01 : GÉOMÉTRIE DOUCE (FEATURED PIECES) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#11100E] border-t border-[#282622]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              chapter="02"
              eyebrow="Première Collection"
              title="Chapitre 01 : Géométrie Douce"
              subtitle="Des silhouettes fluides, des arrondis bienveillants et des contrastes minéraux pour un salon harmonieux et apaisé."
              align="left"
            />

            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#DEC5A5] transition-colors group shrink-0"
            >
              <span>Voir toute la collection (12 pièces)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 4 UNIVERSES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A]">
        <div className="max-w-7xl mx-auto space-y-16">
          <SectionHeading
            chapter="03"
            eyebrow="Architecture de Gamme"
            title="Quatre Univers, Une Même Exigence"
            subtitle="Une partition équilibrée entre pièces d'ancrage pour le quotidien, expressions sculpturales et œuvres d'art exclusives."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Living */}
            <Link
              href="/collections?universe=Living"
              className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500"
            >
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                alt="VELMORA Living"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                  70% de la Maison
                </span>
                <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                  VELMORA Living
                </h3>
                <p className="text-xs text-[#C4BEB4] mt-2 line-clamp-3 leading-relaxed">
                  Canapés modulaires enveloppants, tables basses en travertin, consoles et miroirs dessinés pour habiter vos réceptions.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#C5A880] font-medium tracking-wider uppercase">
                  <span>Explorer Living</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Signature */}
            <Link
              href="/collections?universe=Signature"
              className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500"
            >
              <Image
                src="https://images.unsplash.com/photo-1580481077195-c3a821a58875?q=80&w=800&auto=format&fit=crop"
                alt="VELMORA Signature"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                  20% Différenciation
                </span>
                <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                  VELMORA Signature
                </h3>
                <p className="text-xs text-[#C4BEB4] mt-2 line-clamp-3 leading-relaxed">
                  Pièces sculpturales monumentales, marbres taillés d&apos;un bloc, finitions laiton et sur-mesure de prestige.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#C5A880] font-medium tracking-wider uppercase">
                  <span>Explorer Signature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Art */}
            <Link
              href="/art"
              className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500"
            >
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop"
                alt="VELMORA Art"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                  10% Identité Culturelle
                </span>
                <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                  VELMORA Art
                </h3>
                <p className="text-xs text-[#C4BEB4] mt-2 line-clamp-3 leading-relaxed">
                  Bas-reliefs en chaux naturelle, toiles texturées aux ocres de l&apos;Ourika et grands formats muraux certifiés.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#C5A880] font-medium tracking-wider uppercase">
                  <span>Découvrir la Galerie</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Éditions */}
            <Link
              href="/collections?universe=Éditions"
              className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500"
            >
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                alt="VELMORA Éditions"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                  Rareté &amp; Collaboration
                </span>
                <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                  VELMORA Éditions
                </h3>
                <p className="text-xs text-[#C4BEB4] mt-2 line-clamp-3 leading-relaxed">
                  Objets d&apos;art et paravents produits en séries limitées numérotées, nés de résidences de créateurs au Maroc.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#C5A880] font-medium tracking-wider uppercase">
                  <span>Explorer les Éditions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. "LA GALERIE HABITABLE" - SHOWROOM INTERACTIVE TOUR */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161513] border-t border-[#282622]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              chapter="04"
              eyebrow="Expérience Showroom"
              title="La Galerie Habitable"
              subtitle="Un espace de démonstration scénographié au Boulevard d'Anfa, pensé comme un appartement idéal où chaque angle est une inspiration."
              align="left"
            />

            <Link
              href="/showroom"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1D1A] border border-[#282622] hover:border-[#C5A880] text-xs uppercase tracking-wider text-[#F9F6F0] hover:text-[#C5A880] transition-all shrink-0"
            >
              <span>En savoir plus sur le lieu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Zone Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#282622]">
            {SHOWROOM_ZONES.map((zone, idx) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(idx)}
                className={`px-5 py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all shrink-0 ${
                  activeZone === idx
                    ? "bg-[#C5A880] text-[#0C0B0A] font-semibold shadow-lg"
                    : "bg-[#0C0B0A] text-[#8E877D] hover:text-[#F9F6F0] hover:bg-[#1E1D1A]"
                }`}
              >
                <span>{zone.name}</span>
              </button>
            ))}
          </div>

          {/* Active Zone Card Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0B0A] rounded-3xl p-6 sm:p-10 border border-[#282622]">
            <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
              <Image
                src={currentZone.image}
                alt={currentZone.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#0C0B0A]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#282622] text-[11px] text-[#C5A880] uppercase tracking-wider">
                Zone 0{activeZone + 1}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
                {currentZone.tagline}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0] font-light">
                {currentZone.name}
              </h3>
              <p className="text-sm text-[#C4BEB4] leading-relaxed">
                {currentZone.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#282622]">
                <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">
                  Éléments clés à découvrir :
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentZone.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#161513] border border-[#282622] text-xs text-[#EFECE6]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase text-center hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Réserver un créneau privé</span>
                </Link>

                <a
                  href="https://wa.me/212661234567?text=Bonjour%20VELMORA,%20je%20souhaite%20visiter%20la%20Galerie%20Habitable%20à%20Casablanca."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-[#C5A880]/40 text-[#C5A880] text-xs font-medium tracking-wider uppercase text-center hover:bg-[#C5A880]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Question WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTS & B2B PORTAL HIGHLIGHT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A] relative">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-b from-[#1E1D1A] to-[#161513] p-8 sm:p-14 border border-[#282622] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
              Pour Professionnels &amp; Studios de Design
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F9F6F0] font-light leading-tight">
              Architectes, Décorateurs &amp; Projets d&apos;Hospitality au Maroc
            </h2>
            <p className="text-sm text-[#C4BEB4] leading-relaxed">
              Un interlocuteur dédié, des remises professionnelles de 15% à 25%, l&apos;accès immédiat aux fichiers 3D/CAD et l&apos;envoi d&apos;une matériauthèque complète sous 48h.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#0C0B0A] border border-[#282622] space-y-1">
                <span className="text-[#C5A880] text-lg font-serif">48h</span>
                <span className="text-[11px] text-[#8E877D] block">Matériauthèque expédiée</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0C0B0A] border border-[#282622] space-y-1">
                <span className="text-[#C5A880] text-lg font-serif">BIM / 3D</span>
                <span className="text-[11px] text-[#8E877D] block">Modèles SketchUp &amp; CAD</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0C0B0A] border border-[#282622] space-y-1">
                <span className="text-[#C5A880] text-lg font-serif">Sur Mesure</span>
                <span className="text-[11px] text-[#8E877D] block">Villas, Hôtels, Airbnb</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/b2b"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F9F6F0] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A880] transition-colors"
              >
                <span>Accéder au Programme Partenaires</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#282622]">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt="Partenariats Architectes VELMORA"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs text-[#EFECE6] italic">
                « VELMORA a apporté la signature sculpturale indispensable pour notre projet de villa à Anfa Supérieur. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT STORIES / SOCIAL PROOF */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#11100E]">
        <div className="max-w-6xl mx-auto space-y-12">
          <SectionHeading
            chapter="05"
            eyebrow="Témoignages &amp; Réalisations"
            title="Ils Ont Choisi L&apos;Art d&apos;Habiter"
            subtitle="Découvrez les retours de nos premiers commanditaires, propriétaires de résidences d'exception et décorateurs au Maroc."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#C5A880]">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-[#C4BEB4] italic leading-relaxed">
                  « Le canapé Épure et la table basse en travertin ont totalement transformé notre salon à Casablanca. Le confort est d&apos;une profondeur incroyable et la finition du bouclé d&apos;alpaga est somptueuse. »
                </p>
              </div>
              <div className="pt-4 border-t border-[#282622]">
                <span className="text-xs text-[#F9F6F0] font-medium block">Sara &amp; Yassine E.</span>
                <span className="text-[11px] text-[#8E877D]">Propriétaires • Triangle d&apos;Or, Casablanca</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#C5A880]">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-[#C4BEB4] italic leading-relaxed">
                  « En tant qu&apos;architecte d&apos;intérieur à Rabat, trouver une maison capable de livrer des pièces sculpturales avec une rigueur de délai irréprochable au Maroc était inespéré. Mention spéciale au service gants blancs. »
                </p>
              </div>
              <div className="pt-4 border-t border-[#282622]">
                <span className="text-xs text-[#F9F6F0] font-medium block">Karim B.</span>
                <span className="text-[11px] text-[#8E877D]">Studio d&apos;Architecture • Rabat Souissi</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-[#C5A880]">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-[#C4BEB4] italic leading-relaxed">
                  « L&apos;association du fauteuil Galbe Solaire avec la toile texturée aux pigments d&apos;ocre crée un dialogue artistique immédiat. C&apos;est exactement la vision du Quiet Luxury qu&apos;il manquait au Maroc. »
                </p>
              </div>
              <div className="pt-4 border-t border-[#282622]">
                <span className="text-xs text-[#F9F6F0] font-medium block">Nadia M.</span>
                <span className="text-[11px] text-[#8E877D]">Collectionneuse d&apos;Art • Marrakech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SEO MOROCCAN FAQ SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A] border-t border-[#282622]">
        <div className="max-w-4xl mx-auto space-y-12">
          <SectionHeading
            chapter="06"
            eyebrow="Questions Fréquentes"
            title="Commander Chez VELMORA au Maroc"
            subtitle="Tout ce que vous devez savoir sur nos visites de showroom, la confection sur mesure, les modalités d'acompte et nos livraisons."
          />

          <div className="space-y-4">
            <details className="group bg-[#161513] border border-[#282622] rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#F9F6F0]">
                <h3 className="text-sm sm:text-base font-serif">
                  Où se trouve le showroom VELMORA et comment réserver une visite ?
                </h3>
                <span className="text-[#C5A880] transition group-open:-rotate-180">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-xs text-[#C4BEB4] leading-relaxed">
                Notre showroom « La Galerie Habitable » est situé au Boulevard d&apos;Anfa à Casablanca. Nous accueillons nos clients sur rendez-vous privé afin de leur dédier un conseiller en aménagement, une coupe d&apos;accueil et un accès tactile complet à notre matériauthèque. Vous pouvez réserver via notre formulaire en ligne ou directement sur WhatsApp.
              </p>
            </details>

            <details className="group bg-[#161513] border border-[#282622] rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#F9F6F0]">
                <h3 className="text-sm sm:text-base font-serif">
                  Quels sont les délais de fabrication et de livraison au Maroc ?
                </h3>
                <span className="text-[#C5A880] transition group-open:-rotate-180">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-xs text-[#C4BEB4] leading-relaxed">
                Nos pièces sur commande nécessitent en moyenne 2 à 4 semaines de confection artisanale selon la complexité et les tissus retenus. Nous assurons un taux de respect des délais supérieur à 95%, avec un suivi d&apos;avancement à mi-parcours et une coordination de livraison personnalisée à domicile.
              </p>
            </details>

            <details className="group bg-[#161513] border border-[#282622] rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#F9F6F0]">
                <h3 className="text-sm sm:text-base font-serif">
                  Comment fonctionne la livraison gants blancs ?
                </h3>
                <span className="text-[#C5A880] transition group-open:-rotate-180">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-xs text-[#C4BEB4] leading-relaxed">
                Nos équipes de livreurs spécialisés acheminent vos meubles protégés sous housses capitonnées, les installent exactement selon vos souhaits, retirent tous les emballages et vérifient chaque détail avec vous. Ce service couvre Casablanca, Rabat, Marrakech, Tanger, Fès, Meknès et l&apos;ensemble des villes du Royaume.
              </p>
            </details>

            <details className="group bg-[#161513] border border-[#282622] rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#F9F6F0]">
                <h3 className="text-sm sm:text-base font-serif">
                  Quelles sont les modalités de paiement et d&apos;acompte ?
                </h3>
                <span className="text-[#C5A880] transition group-open:-rotate-180">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-xs text-[#C4BEB4] leading-relaxed">
                Conformément aux pratiques des grandes maisons de design, la validation d&apos;une commande sur mesure s&apos;effectue avec un acompte à la signature de la fiche de spécification, le solde étant réglé à la livraison après validation de conformité. Nous acceptons les virements bancaires, chèques et règlements en showroom.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 10. FINAL VIP INVITATION BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#0C0B0A] via-[#161513] to-[#0C0B0A] relative border-t border-[#282622]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F9F6F0] font-light leading-tight">
            Composez Votre Intérieur d&apos;Exception
          </h2>

          <p className="text-sm sm:text-base text-[#C4BEB4] max-w-xl mx-auto font-light leading-relaxed">
            Prenez rendez-vous pour une visite privée de la Galerie Habitable à Casablanca ou sollicitez un entretien avec notre décorateur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver une Consultation</span>
            </Link>

            <a
              href="https://wa.me/212661234567?text=Bonjour%20VELMORA,%20je%20souhaite%20un%20rendez-vous%20personnalisé."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880]/10 text-xs font-medium tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct (+212)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Structured data FAQ */}
      <JsonLdFaq />
    </div>
  );
}
