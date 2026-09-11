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
  Phone,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
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
            alt="OÏKOS - Maison de Design Casablanca"
            fill
            priority
            unoptimized
            className="object-cover object-center opacity-30 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/70 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0C0B0A]/40 to-[#0C0B0A]" />
        </div>

        {/* Hero Content with Staggered Entrance */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <ScrollReveal yOffset={20} duration={0.9}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161513]/85 backdrop-blur-md border border-[#C5A880]/40 text-xs text-[#C5A880] tracking-widest uppercase shadow-[0_0_20px_rgba(197,168,128,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
              <span>Maison de Design &amp; Mobilier d&apos;Art • Casablanca</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={25} duration={1}>
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F9F6F0] font-light tracking-tight leading-[1.05]">
                L&apos;ART D&apos;HABITER
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#DEC5A5] font-light">
                Des espaces qui ont une âme. Plus qu&apos;un intérieur, un art de vivre.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25} yOffset={20} duration={1}>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#C4BEB4] font-light leading-relaxed">
              Des formes à contempler. Des pièces à vivre. OÏKOS façonne des intérieurs d&apos;exception où le design contemporain dialogue avec la noblesse des matières brutes. Showroom &amp; Studio à Casablanca.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35} yOffset={20} duration={1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/configurateur"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.45)] transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Configurateur 3D Studio</span>
              </Link>

              <Link
                href="/collections"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#161513]/90 backdrop-blur-md border border-[#282622] hover:border-[#C5A880] text-[#F9F6F0] text-xs font-semibold tracking-[0.2em] uppercase transition-all hover:bg-[#1E1D1A] flex items-center justify-center gap-2"
              >
                <span>Découvrir la Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.45} yOffset={15} duration={1}>
            <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-[#282622]/60">
              <div className="space-y-1">
                <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Showroom Unique</span>
                <span className="text-xs text-[#F9F6F0] font-medium block">Boulevard d&apos;Anfa, Casablanca</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Ligne Directe</span>
                <a href="tel:0722033326" className="text-xs text-[#C5A880] font-medium block hover:underline">
                  07 22 03 33 26
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Service</span>
                <span className="text-xs text-[#F9F6F0] font-medium block">Gants Blancs partout au Maroc</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">Garantie</span>
                <span className="text-xs text-[#F9F6F0] font-medium block">5 Ans Structurelle</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MARQUEE BANNER */}
      <div className="bg-[#161513] border-y border-[#282622] py-4 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-[#8E877D]">
          <span>Maison Marocaine de Mobilier d&apos;Art</span>
          <span className="text-[#C5A880]">•</span>
          <span>Showroom Casablanca Triangle d&apos;Or</span>
          <span className="text-[#C5A880]">•</span>
          <span>Studio de Conception &amp; Matériauthèque</span>
          <span className="text-[#C5A880]">•</span>
          <span>Travertin Romain &amp; Marbre Noir Marquina</span>
          <span className="text-[#C5A880]">•</span>
          <span>Tissus Italiens Bouclé d&apos;Alpaga</span>
          <span className="text-[#C5A880]">•</span>
          <span>Éditions d&apos;Art Numérotées</span>
          <span className="text-[#C5A880]">•</span>
          <span>Confection sur Mesure</span>
          <span className="text-[#C5A880]">•</span>
          <span>Livraison Gants Blancs partout au Maroc</span>
          <span className="text-[#C5A880]">•</span>
          <span>Conciergerie : 07 22 03 33 26</span>
          <span className="text-[#C5A880]">•</span>
        </div>
      </div>

      {/* 3. MANIFESTO / PHILOSOPHY WITH SCROLL REVEAL */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A] relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <ScrollReveal>
            <SectionHeading
              chapter="01"
              eyebrow="Manifeste de Marque"
              title="« Nous ne créons pas seulement du mobilier. Nous composons des espaces où le design rencontre l'art. »"
              subtitle="Chez OÏKOS, chaque pièce répond à une exigence : allier la pureté sculpturale d'une œuvre à la douceur intime d'un meuble fait pour être habité au quotidien."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/50 transition-all space-y-4 hover:-translate-y-1 duration-300">
                <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F9F6F0]">Matières Vivantes</h3>
                <p className="text-xs text-[#8E877D] leading-relaxed">
                  Travertins romains bruts, noyer massif de l&apos;Atlas, laiton dinandé, lins denses et bouclés texturés. Des matières authentiques qui se patinent avec grâce.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/50 transition-all space-y-4 hover:-translate-y-1 duration-300">
                <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F9F6F0]">L&apos;Écho Artistique</h3>
                <p className="text-xs text-[#8E877D] leading-relaxed">
                  Chaque ensemble de salon est conçu en dialogue direct avec une œuvre murale texturée ou une sculpture minérale, élevant l&apos;espace en galerie habitable.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/50 transition-all space-y-4 hover:-translate-y-1 duration-300">
                <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F9F6F0]">Excellence d&apos;Atelier</h3>
                <p className="text-xs text-[#8E877D] leading-relaxed">
                  Un protocole rigoureux en 7 points : conformité stricte des cotes, solidité éprouvée, délais maîtrisés et livraison gants blancs partout au Maroc.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3.5 3D CONFIGURATOR STUDIO HIGHLIGHT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0C0B0A] via-[#141311] to-[#0C0B0A] border-t border-[#282622] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C5A880]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161513] border border-[#C5A880]/30 text-[11px] text-[#C5A880] uppercase tracking-widest mb-4">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>Studio Numérique 3D • Temps Réel</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#F9F6F0] font-light tracking-tight">
                  Le Configurateur 3D OÏKOS
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#C4BEB4] max-w-2xl font-light">
                  Personnalisez chaque création selon les exigences de votre espace. Dimensions ajustables au centimètre, matériauthèque tactile en rendu PBR, calcul de prix instantané et transmission directe à notre conciergerie.
                </p>
              </div>

              <Link
                href="/configurateur"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] transition-all hover:scale-105 shrink-0"
              >
                <span>Entrer dans le Studio 3D</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={0.1}>
              <Link
                href="/configurateur?category=sofas"
                className="group relative p-6 rounded-2xl bg-[#161513]/90 border border-[#282622] hover:border-[#C5A880]/60 transition-all duration-300 block hover:-translate-y-1"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#8E877D] mb-1">01 • Salon</div>
                <h3 className="font-serif text-xl text-[#F9F6F0] group-hover:text-[#C5A880] transition-colors">Canapés d&apos;Élite</h3>
                <p className="text-xs text-[#8E877D] mt-2 mb-4 leading-relaxed">
                  ASTRA, ÉPURE &amp; DUNE. Méridiennes, lins d&apos;Italie et bouclés d&apos;alpaga.
                </p>
                <div className="flex items-center justify-between text-xs text-[#C5A880] font-medium pt-3 border-t border-[#282622]/60">
                  <span>Dès 28 500 DH</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link
                href="/configurateur?category=armchairs"
                className="group relative p-6 rounded-2xl bg-[#161513]/90 border border-[#282622] hover:border-[#C5A880]/60 transition-all duration-300 block hover:-translate-y-1"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#8E877D] mb-1">02 • Assises</div>
                <h3 className="font-serif text-xl text-[#F9F6F0] group-hover:text-[#C5A880] transition-colors">Fauteuils Sculpturaux</h3>
                <p className="text-xs text-[#8E877D] mt-2 mb-4 leading-relaxed">
                  GALBE, KROMA &amp; SOLIS. Bases pivotantes, cuirs pleine fleur &amp; velours mohair.
                </p>
                <div className="flex items-center justify-between text-xs text-[#C5A880] font-medium pt-3 border-t border-[#282622]/60">
                  <span>Dès 11 900 DH</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Link
                href="/configurateur?category=tables"
                className="group relative p-6 rounded-2xl bg-[#161513]/90 border border-[#282622] hover:border-[#C5A880]/60 transition-all duration-300 block hover:-translate-y-1"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#8E877D] mb-1">03 • Minéral &amp; Bois</div>
                <h3 className="font-serif text-xl text-[#F9F6F0] group-hover:text-[#C5A880] transition-colors">Tables Basses &amp; Repas</h3>
                <p className="text-xs text-[#8E877D] mt-2 mb-4 leading-relaxed">
                  MONOLITHE, ATLAS &amp; HORIZON. Travertin Navona, Marbre Marquina &amp; Noyer massif.
                </p>
                <div className="flex items-center justify-between text-xs text-[#C5A880] font-medium pt-3 border-t border-[#282622]/60">
                  <span>Dès 14 500 DH</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Link
                href="/configurateur?category=beds"
                className="group relative p-6 rounded-2xl bg-[#161513]/90 border border-[#282622] hover:border-[#C5A880]/60 transition-all duration-300 block hover:-translate-y-1"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#8E877D] mb-1">04 • Chambre</div>
                <h3 className="font-serif text-xl text-[#F9F6F0] group-hover:text-[#C5A880] transition-colors">Lits Architecturaux</h3>
                <p className="text-xs text-[#8E877D] mt-2 mb-4 leading-relaxed">
                  ALCÔVE, STRATE &amp; SERENA. Têtes de lit capitonnées, chevets intégrés &amp; liseuses laiton.
                </p>
                <div className="flex items-center justify-between text-xs text-[#C5A880] font-medium pt-3 border-t border-[#282622]/60">
                  <span>Dès 26 000 DH</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. CHAPITRE 01 : GÉOMÉTRIE DOUCE (FEATURED PIECES) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#11100E] border-t border-[#282622]">
        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollReveal>
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
          </ScrollReveal>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.12} yOffset={35}>
                <ProductCard product={product} priority={idx === 0} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 4 UNIVERSES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A]">
        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollReveal>
            <SectionHeading
              chapter="03"
              eyebrow="Architecture de Gamme"
              title="Quatre Univers, Une Même Exigence"
              subtitle="Une partition équilibrée entre pièces d'ancrage pour le quotidien, expressions sculpturales et œuvres d'art exclusives."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Living */}
            <ScrollReveal delay={0.1}>
              <Link
                href="/collections?universe=Living"
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500 block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                  alt="OÏKOS Living"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-65 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                    70% de la Maison
                  </span>
                  <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                    OÏKOS Living
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
            </ScrollReveal>

            {/* Signature */}
            <ScrollReveal delay={0.2}>
              <Link
                href="/collections?universe=Signature"
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500 block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop"
                  alt="OÏKOS Signature"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-65 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                    20% Différenciation
                  </span>
                  <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                    OÏKOS Signature
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
            </ScrollReveal>

            {/* Art */}
            <ScrollReveal delay={0.3}>
              <Link
                href="/art"
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500 block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop"
                  alt="OÏKOS Art"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-65 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                    10% Identité Culturelle
                  </span>
                  <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                    OÏKOS Art
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
            </ScrollReveal>

            {/* Éditions */}
            <ScrollReveal delay={0.4}>
              <Link
                href="/collections?universe=Éditions"
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880] transition-all duration-500 block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                  alt="OÏKOS Éditions"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-65 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                    Rareté &amp; Collaboration
                  </span>
                  <h3 className="font-serif text-2xl text-[#F9F6F0] mt-1 group-hover:text-[#C5A880] transition-colors">
                    OÏKOS Éditions
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. "LA GALERIE HABITABLE" - SHOWROOM CASABLANCA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161513] border-t border-[#282622]">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <SectionHeading
                chapter="04"
                eyebrow="Showroom Casablanca"
                title="La Galerie Habitable"
                subtitle="Notre showroom &amp; studio au Boulevard d'Anfa, pensé comme un appartement idéal où chaque angle est une inspiration."
                align="left"
              />

              <Link
                href="/showroom"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1D1A] border border-[#282622] hover:border-[#C5A880] text-xs uppercase tracking-wider text-[#F9F6F0] hover:text-[#C5A880] transition-all shrink-0"
              >
                <span>Visite détaillée du lieu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

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
          <ScrollReveal yOffset={25}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0B0A] rounded-3xl p-6 sm:p-10 border border-[#282622]">
              <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
                <Image
                  src={currentZone.image}
                  alt={currentZone.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0C0B0A]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#282622] text-[11px] text-[#C5A880] uppercase tracking-wider font-medium">
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
                    Éléments à découvrir au showroom :
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
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-bold tracking-wider uppercase text-center hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Réserver à Casablanca</span>
                  </Link>

                  <a
                    href="https://wa.me/212722033326?text=Bonjour%20OÏKOS,%20je%20souhaite%20visiter%20la%20Galerie%20Habitable%20à%20Casablanca."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-[#C5A880]/40 text-[#C5A880] text-xs font-medium tracking-wider uppercase text-center hover:bg-[#C5A880]/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp (07 22 03 33 26)</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. ARCHITECTS & B2B PORTAL HIGHLIGHT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A] relative">
        <ScrollReveal yOffset={30}>
          <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-b from-[#1E1D1A] to-[#161513] p-8 sm:p-14 border border-[#282622] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
                Pour Professionnels &amp; Studios de Design
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F9F6F0] font-light leading-tight">
                Architectes, Décorateurs &amp; Projets d&apos;Hospitality au Maroc
              </h2>
              <p className="text-sm text-[#C4BEB4] leading-relaxed">
                Un interlocuteur dédié au Studio de Casablanca, des remises professionnelles de 15% à 25%, l&apos;accès immédiat aux fichiers 3D/CAD et l&apos;envoi d&apos;une matériauthèque complète sous 48h.
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
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F9F6F0] text-[#0C0B0A] text-xs font-bold tracking-wider uppercase hover:bg-[#C5A880] transition-colors"
                >
                  <span>Accéder au Programme Partenaires</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#282622]">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                alt="Partenariats Architectes OÏKOS"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs text-[#EFECE6] italic">
                  « OÏKOS a apporté la signature sculpturale indispensable pour notre projet de villa à Anfa Supérieur. »
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. CLIENT STORIES / SOCIAL PROOF */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#11100E]">
        <div className="max-w-6xl mx-auto space-y-12">
          <ScrollReveal>
            <SectionHeading
              chapter="05"
              eyebrow="Témoignages &amp; Réalisations"
              title="Ils Ont Choisi L&apos;Art d&apos;Habiter"
              subtitle="Découvrez les retours de nos premiers commanditaires, propriétaires de résidences d'exception et décorateurs au Maroc."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4 flex flex-col justify-between h-full hover:border-[#C5A880]/40 transition-colors">
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
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4 flex flex-col justify-between h-full hover:border-[#C5A880]/40 transition-colors">
                <div className="space-y-3">
                  <div className="flex gap-1 text-[#C5A880]">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-xs text-[#C4BEB4] italic leading-relaxed">
                    « En tant qu&apos;architecte d&apos;intérieur, trouver une maison capable de livrer des pièces sculpturales avec une rigueur de délai irréprochable au Maroc était inespéré. Mention spéciale au service gants blancs. »
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282622]">
                  <span className="text-xs text-[#F9F6F0] font-medium block">Karim B.</span>
                  <span className="text-[11px] text-[#8E877D]">Studio d&apos;Architecture • Casablanca</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4 flex flex-col justify-between h-full hover:border-[#C5A880]/40 transition-colors">
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
                  <span className="text-[11px] text-[#8E877D]">Collectionneuse d&apos;Art • Casablanca</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. SEO MOROCCAN FAQ SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0B0A] border-t border-[#282622]">
        <div className="max-w-4xl mx-auto space-y-12">
          <ScrollReveal>
            <SectionHeading
              chapter="06"
              eyebrow="Questions Fréquentes"
              title="Commander Chez OÏKOS au Maroc"
              subtitle="Tout ce que vous devez savoir sur nos visites de showroom à Casablanca, la confection sur mesure, les modalités d'acompte et nos livraisons."
            />
          </ScrollReveal>

          <div className="space-y-4">
            <details className="group bg-[#161513] border border-[#282622] rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#F9F6F0]">
                <h3 className="text-sm sm:text-base font-serif">
                  Où se trouve le showroom OÏKOS et comment réserver une visite ?
                </h3>
                <span className="text-[#C5A880] transition group-open:-rotate-180">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-xs text-[#C4BEB4] leading-relaxed">
                Notre showroom « La Galerie Habitable » et studio de conception se situent au Boulevard d&apos;Anfa à Casablanca. Les visites privées se font sur rendez-vous pour vous dédier un conseiller en aménagement et un accès tactile complet à notre matériauthèque. Vous pouvez réserver au 07 22 03 33 26 ou par email à koncept.morocco@gmail.com.
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
                Nos équipes spécialisées acheminent vos meubles protégés sous housses capitonnées, les installent exactement selon vos souhaits, retirent tous les emballages et vérifient chaque détail avec vous. Ce service couvre Casablanca, Rabat, Marrakech, Tanger, Fès, Meknès et l&apos;ensemble des villes du Royaume.
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
                Conformément aux pratiques des grandes maisons de design, la validation d&apos;une commande sur mesure s&apos;effectue avec un acompte à la signature de la fiche de spécification, le solde étant réglé à la livraison après validation de conformité. Nous acceptons les virements bancaires, chèques et règlements au showroom.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 10. FINAL VIP INVITATION BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#0C0B0A] via-[#161513] to-[#0C0B0A] relative border-t border-[#282622]">
        <ScrollReveal yOffset={30}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#F9F6F0] font-light leading-tight">
              Composez Votre Intérieur d&apos;Exception
            </h2>

            <p className="text-sm sm:text-base text-[#C4BEB4] max-w-xl mx-auto font-light leading-relaxed">
              Prenez rendez-vous pour une visite privée de la Galerie Habitable à Casablanca ou sollicitez un entretien avec notre studio au <strong>07 22 03 33 26</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.45)] transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une Consultation</span>
              </Link>

              <a
                href="https://wa.me/212722033326?text=Bonjour%20OÏKOS,%20je%20souhaite%20un%20rendez-vous%20personnalisé."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#C5A880]/50 text-[#C5A880] hover:bg-[#C5A880]/10 text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp : 07 22 03 33 26</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Structured data FAQ */}
      <JsonLdFaq />
    </div>
  );
}
