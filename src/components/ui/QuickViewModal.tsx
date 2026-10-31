"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Check, Sparkles, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState("160 × 200 cm");
  const [hasStorage, setHasStorage] = useState(false);

  if (!product) return null;

  const currentImg = product.images[selectedImage] || product.images[0];
  const isWhiteBgBed = Boolean(currentImg?.includes("/beds/") && currentImg?.includes("-isolated."));
  const isCutout = Boolean(currentImg?.startsWith("/images/chairs/") && !currentImg?.includes("/chairs-staged/"));

  const currentFabric = product.fabricOptions ? product.fabricOptions[selectedFabric] : null;
  const currentMaterial = product.materialOptions ? product.materialOptions[selectedMaterial] : null;

  const handleWhatsAppQuote = () => {
    let details = "";
    if (product.category === "Lits") {
      details = `Dimension souhaitée : ${selectedDimension} • Configuration : ${hasStorage ? "Avec coffre escamotable hydraulique" : "Standard (sans coffre)"} • Teinte : au choix du client`;
    } else {
      details = `Finition : ${currentFabric?.name || currentMaterial?.name || "Standard"}`;
    }
    const text = `Bonjour OÏKOS, je souhaite recevoir un devis personnalisé pour la pièce ${product.name} (${product.formattedPrice}).
${details}.
Pourriez-vous me confirmer les disponibilités d'atelier et les délais de livraison ?`;
    window.open(`https://wa.me/212722033326?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#161513] border border-[#282622] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#8E877D] hover:text-[#F9F6F0] bg-[#0C0B0A]/70 rounded-full border border-[#282622] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery & Image Preview */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#0C0B0A] border-b md:border-b-0 md:border-r border-[#282622]">
          <div
            className={`relative aspect-[4/3] w-full rounded-xl overflow-hidden ${
              isWhiteBgBed
                ? "bg-white"
                : isCutout
                ? "bg-[radial-gradient(circle_at_50%_55%,#2B2822_0%,#171614_65%,#0E0D0C_100%)]"
                : "bg-[#1E1D1A]"
            }`}
          >
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              unoptimized
              className={`${
                isWhiteBgBed
                  ? "object-contain p-4"
                  : isCutout
                  ? "object-contain p-8"
                  : "object-cover"
              } transition-transform duration-500 hover:scale-105`}
            />
            <div className="absolute top-3 left-3 bg-[#0C0B0A]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#282622] text-[10px] uppercase tracking-wider text-[#C5A880] font-medium">
              {product.universe}
            </div>
          </div>

          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border transition-all ${
                    img.includes("-isolated.") ? "bg-white" : "bg-[#1E1D1A]"
                  } ${
                    selectedImage === idx
                      ? "border-[#C5A880] ring-1 ring-[#C5A880]"
                      : "border-[#282622] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className={img.includes("-isolated.") ? "object-contain p-1" : "object-cover"}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#282622] flex items-center justify-between text-xs text-[#8E877D]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              Garantie 6 mois &amp; Certificat
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              {product.leadTime}
            </span>
          </div>
        </div>

        {/* Right: Product Info & Configurator */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-1">
                {product.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0] font-light">
                {product.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-xl font-medium text-[#F9F6F0]">
                  {product.formattedPrice}
                </span>
                <span className="text-xs text-[#8E877D]">TTC • Fabrication sur mesure au Maroc</span>
              </div>
            </div>

            <p className="text-xs text-[#C4BEB4] leading-relaxed">
              {product.description}
            </p>

            {/* If product is a Bed: show interactive Dimension and Storage options */}
            {product.category === "Lits" && (
              <div className="space-y-4 pt-2 border-t border-[#282622]">
                {/* Dimensions selector */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8E877D] uppercase tracking-wider">Dimension au choix :</span>
                    <span className="text-[#C5A880] font-medium">{selectedDimension}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["90 × 190 cm", "140 × 190 cm", "160 × 200 cm", "Sur mesure"].map((dim) => (
                      <button
                        key={dim}
                        type="button"
                        onClick={() => setSelectedDimension(dim)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                          selectedDimension === dim
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                            : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        {dim}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage option */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Option Coffre de Rangement :
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHasStorage(false)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                        !hasStorage
                          ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                          : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                      }`}
                    >
                      Sans coffre (Standard)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasStorage(true)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                        hasStorage
                          ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                          : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                      }`}
                    >
                      Avec sommier coffre
                    </button>
                  </div>
                </div>

                {/* Bespoke color note */}
                <div className="p-3 rounded-xl bg-[#0C0B0A] border border-[#282622] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#C5A880] font-medium text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Teinte &amp; Tissu à votre convenance</span>
                  </div>
                  <p className="text-[11px] text-[#8E877D] leading-relaxed">
                    Atelier capable de créer le lit dans la couleur exacte de votre choix (bouclette, velours, lin ou nuancier RAL).
                  </p>
                </div>
              </div>
            )}

            {/* Fabric Swatch Options for Seating */}
            {product.category !== "Lits" && product.fabricOptions && product.fabricOptions.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8E877D]">Sélection Tissu &amp; Matière :</span>
                  <span className="text-[#C5A880] font-medium">
                    {currentFabric?.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.fabricOptions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFabric(idx)}
                      className={`group relative p-1 rounded-full border transition-all ${
                        selectedFabric === idx
                          ? "border-[#C5A880] scale-110"
                          : "border-[#282622] hover:border-[#6E675E]"
                      }`}
                      title={item.name}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/30"
                        style={{ backgroundColor: item.hex }}
                      />
                      {selectedFabric === idx && (
                        <span className="absolute inset-0 flex items-center justify-center text-[#0C0B0A]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material / Wood Options for Seating */}
            {product.category !== "Lits" && product.materialOptions && product.materialOptions.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8E877D]">Finition Bois &amp; Pierre :</span>
                  <span className="text-[#C5A880] font-medium">
                    {currentMaterial?.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.materialOptions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMaterial(idx)}
                      className={`relative p-1 rounded-full border transition-all ${
                        selectedMaterial === idx
                          ? "border-[#C5A880] scale-110"
                          : "border-[#282622] hover:border-[#6E675E]"
                      }`}
                      title={item.name}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/30"
                        style={{ backgroundColor: item.hex }}
                      />
                      {selectedMaterial === idx && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-[#282622] space-y-3">
            <button
              onClick={handleWhatsAppQuote}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Demander un Devis Personnalisé</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/collections/${product.slug}`}
                onClick={onClose}
                className="py-2.5 rounded-full border border-[#282622] text-[#C4BEB4] hover:text-[#F9F6F0] hover:border-[#C5A880] text-center text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
              >
                <span>Fiche complète</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="py-2.5 rounded-full bg-[#1E1D1A] text-[#C5A880] hover:bg-[#282622] text-center text-xs tracking-wider uppercase transition-colors"
              >
                Prendre RDV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
