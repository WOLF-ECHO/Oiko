"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  Truck,
  Check,
  MessageCircle,
  Calendar,
  Share2,
  Sparkles,
} from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({
  product,
  related,
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState("160 × 200 cm");
  const [hasStorage, setHasStorage] = useState(false);
  const [salonConfig, setSalonConfig] = useState("Angle Droit");
  const [selectedTexture, setSelectedTexture] = useState("Bouclette d'alpaga");
  const [selectedWood, setSelectedWood] = useState("Noyer chaud");
  const [copied, setCopied] = useState(false);

  const currentImg = product.images[activeImage] || product.images[0];
  const isWhiteBgPoster = Boolean(
    currentImg?.includes("-studio.") || currentImg?.includes("-isolated.")
  );

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    let details = "";
    if (product.category === "Lits") {
      details = `Dimension souhaitée : ${selectedDimension} • Configuration : ${
        hasStorage ? "Avec coffre escamotable hydraulique" : "Standard (sans coffre)"
      } • Texture : ${selectedTexture} (couleur sur mesure au choix)`;
    } else if (product.category === "Salons") {
      details = `Configuration : ${salonConfig} • Revêtement : ${selectedTexture} (couleur sur mesure au choix)`;
    } else {
      details = `Revêtement : ${selectedTexture} • Finition structure/bois : ${selectedWood} (couleur sur mesure au choix)`;
    }
    const text = `Bonjour OÏKOS, je suis intéressé(e) par la pièce ${product.name} (${product.subtitle}).
${details}.
Pourriez-vous me transmettre la confirmation de faisabilité d'atelier et les délais de livraison ?`;
    window.open(`https://wa.me/212722033326?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between text-xs text-[#8E877D] border-b border-[#282622] pb-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux collections</span>
          </Link>

          <div className="flex items-center gap-2">
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-[#F9F6F0] font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Showcase (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div
              className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#282622] ${
                isWhiteBgPoster ? "bg-white" : "bg-[#161513]"
              }`}
            >
              <Image
                src={currentImg || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"}
                alt={product.name}
                fill
                priority
                unoptimized
                className={`${
                  isWhiteBgPoster ? "object-contain p-4" : "object-cover"
                } transition-transform duration-700 hover:scale-105`}
              />
              <div className="absolute top-4 left-4 bg-[#0C0B0A]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#282622] text-[11px] text-[#C5A880] uppercase tracking-wider font-medium">
                {product.universe}
              </div>

              {product.limitedEdition && (
                <div className="absolute top-4 right-4 bg-[#C5A880] text-[#0C0B0A] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Édition Limitée • {product.editionCount} ex.
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {product.images.map((img, idx) => {
                  const thumbWhite = img.includes("-studio.") || img.includes("-isolated.");
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        thumbWhite ? "bg-white" : "bg-[#161513]"
                      } ${
                        activeImage === idx
                          ? "border-[#C5A880] ring-1 ring-[#C5A880] opacity-100"
                          : "border-[#282622] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} vue ${idx + 1}`}
                        fill
                        unoptimized
                        className={thumbWhite ? "object-contain p-1.5" : "object-cover"}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Story Box */}
            <div className="bg-[#161513] border border-[#282622] p-8 rounded-2xl space-y-4 mt-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
                L&apos;Inspiration de la Pièce
              </span>
              <h4 className="font-serif text-2xl text-[#F9F6F0] font-light">
                Une Pièce, Une Histoire
              </h4>
              <p className="text-xs text-[#C4BEB4] leading-relaxed">
                {product.story}
              </p>
            </div>
          </div>

          {/* Right Column: Customizer & Order Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
                {product.subtitle}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F9F6F0] font-light leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-2xl sm:text-3xl font-serif text-[#F9F6F0]">
                  {product.formattedPrice}
                </span>
                <span className="text-xs text-[#8E877D]">
                  TTC • Fabrication sur mesure au Maroc
                </span>
              </div>
            </div>

            <p className="text-sm text-[#C4BEB4] leading-relaxed">
              {product.description}
            </p>

            {/* Dimensions Badge */}
            <div className="p-4 rounded-xl bg-[#161513] border border-[#282622] text-xs text-[#8E877D] space-y-1">
              <span className="text-[#F9F6F0] font-medium block">Dimensions &amp; Encombrement :</span>
              <p className="text-[#C4BEB4]">{product.dimensions}</p>
            </div>

            {/* Custom Bespoke Color Callout */}
            <div className="p-5 rounded-2xl bg-[#1B1916] border border-[#C5A880]/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>Teinte &amp; Revêtement 100% sur mesure</span>
              </div>
              <p className="text-xs text-[#C4BEB4] leading-relaxed">
                Notre atelier de confection réalise cette pièce dans la couleur exacte de votre choix. Aucune couleur n&apos;est imposée : nous sommes capables de créer votre modèle avec la nuance et le tissu souhaités (bouclettes, lins, velours, chenille ou nuancier client).
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-[#8E877D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Plus de 120 nuanciers de tissus et d&apos;essences de bois consultables au showroom de Dar Bouazza</span>
              </div>
            </div>

            {/* Interactive Customizer */}
            <div className="space-y-6 border-t border-[#282622] pt-6">
              {product.category === "Lits" && (
                <>
                  {/* Dimensions Selector */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8E877D] uppercase tracking-wider">
                        Sélectionnez votre dimension :
                      </span>
                      <span className="text-[#C5A880] font-medium font-serif text-sm">
                        {selectedDimension}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {["90 × 190 cm", "140 × 190 cm", "160 × 200 cm", "Sur mesure"].map((dim) => (
                        <button
                          key={dim}
                          type="button"
                          onClick={() => setSelectedDimension(dim)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            selectedDimension === dim
                              ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold ring-1 ring-[#C5A880]"
                              : "border-[#282622] bg-[#161513] text-[#A69F93] hover:border-[#6E675E]"
                          }`}
                        >
                          <span className="block font-medium">{dim}</span>
                          <span className="text-[10px] text-[#8E877D] block mt-0.5">
                            {dim === "90 × 190 cm"
                              ? "1 Place"
                              : dim === "140 × 190 cm"
                              ? "2 Places standard"
                              : dim === "160 × 200 cm"
                              ? "Queen size"
                              : "King size / Spécial"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage Box Option */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8E877D] uppercase tracking-wider">
                        Option Coffre de Rangement :
                      </span>
                      <span className="text-[#C5A880] font-medium">
                        {hasStorage ? "Avec sommier coffre" : "Standard (sans coffre)"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setHasStorage(false)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          !hasStorage
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold ring-1 ring-[#C5A880]"
                            : "border-[#282622] bg-[#161513] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        <span className="block font-medium">Standard</span>
                        <span className="text-[10px] text-[#8E877D] block mt-0.5">Sans coffre de rangement</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasStorage(true)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          hasStorage
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold ring-1 ring-[#C5A880]"
                            : "border-[#282622] bg-[#161513] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        <span className="block font-medium">Coffre Hydraulique</span>
                        <span className="text-[10px] text-[#8E877D] block mt-0.5">Sommier relevable intégré</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {product.category === "Salons" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8E877D] uppercase tracking-wider">
                      Configuration &amp; Orientation :
                    </span>
                    <span className="text-[#C5A880] font-medium">{salonConfig}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: "Angle Droit", sub: "Méridienne à droite" },
                      { label: "Angle Gauche", sub: "Méridienne à gauche" },
                      { label: "Panoramique en U", sub: "Double retour convivial" },
                      { label: "Dimensions sur mesure", sub: "Selon les plans de votre salon" },
                    ].map((cfg) => (
                      <button
                        key={cfg.label}
                        type="button"
                        onClick={() => setSalonConfig(cfg.label)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          salonConfig === cfg.label
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold ring-1 ring-[#C5A880]"
                            : "border-[#282622] bg-[#161513] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        <span className="block font-medium">{cfg.label}</span>
                        <span className="text-[10px] text-[#8E877D] block mt-0.5">{cfg.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Texture Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8E877D] uppercase tracking-wider">
                    Texture de revêtement souhaitée :
                  </span>
                  <span className="text-[#C5A880] font-medium">{selectedTexture}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "Bouclette d'alpaga",
                    "Velours soyeux",
                    "Chenille texturée",
                    "Lin lavé antitache",
                  ].map((tex) => (
                    <button
                      key={tex}
                      type="button"
                      onClick={() => setSelectedTexture(tex)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        selectedTexture === tex
                          ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold ring-1 ring-[#C5A880]"
                          : "border-[#282622] bg-[#161513] text-[#A69F93] hover:border-[#6E675E]"
                      }`}
                    >
                      {tex}
                    </button>
                  ))}
                </div>
              </div>

              {(product.category === "Chaises" || product.category === "Fauteuils") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8E877D] uppercase tracking-wider">
                      Finition Structure &amp; Bois :
                    </span>
                    <span className="text-[#C5A880] font-medium">{selectedWood}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["Noyer chaud", "Chêne miel naturel", "Chêne noir mat", "Laiton / Sur mesure"].map((wood) => (
                      <button
                        key={wood}
                        type="button"
                        onClick={() => setSelectedWood(wood)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          selectedWood === wood
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold ring-1 ring-[#C5A880]"
                            : "border-[#282622] bg-[#161513] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        {wood}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 border-t border-[#282622] pt-6">
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-semibold tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Demander un Devis WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/contact"
                  className="py-3 rounded-full bg-[#161513] border border-[#282622] hover:border-[#C5A880] text-[#F9F6F0] text-center text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Voir en Showroom</span>
                </Link>

                <button
                  onClick={handleShare}
                  className="py-3 rounded-full bg-[#161513] border border-[#282622] hover:border-[#C5A880] text-[#C4BEB4] hover:text-[#F9F6F0] text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Lien copié !" : "Partager"}</span>
                </button>
              </div>
            </div>

            {/* Key Quality Assurances */}
            <div className="border-t border-[#282622] pt-6 space-y-3">
              <div className="flex items-start gap-3 text-xs text-[#8E877D]">
                <Truck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F9F6F0] font-medium block">Livraison &amp; Installation Soignée à Domicile</span>
                  <span>Acheminement soigné, déballage et pose coordonnée à Casablanca, Rabat, Marrakech et tout le Maroc.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#8E877D]">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F9F6F0] font-medium block">Délai Maîtrisé ({product.leadTime.split("•")[0]})</span>
                  <span>Points de contrôle de confection avec photos d&apos;avancement transmises par WhatsApp.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#8E877D]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F9F6F0] font-medium block">Garantie &amp; Certificat d&apos;Authenticité</span>
                  <span>Chaque création est numérotée et accompagnée de son certificat signé par le studio.</span>
                </div>
              </div>
            </div>

            {/* Craft details list */}
            <div className="border-t border-[#282622] pt-6 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#F9F6F0] font-medium block">
                Caractéristiques d&apos;Atelier :
              </span>
              <ul className="space-y-2 text-xs text-[#8E877D]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        {related.length > 0 && (
          <div className="border-t border-[#282622] pt-16 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
                  Harmonie de Salon
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
                  À Associer Dans Votre Intérieur
                </h3>
              </div>
              <Link
                href="/collections"
                className="text-xs uppercase tracking-wider text-[#C5A880] hover:underline flex items-center gap-1"
              >
                <span>Toute la collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
