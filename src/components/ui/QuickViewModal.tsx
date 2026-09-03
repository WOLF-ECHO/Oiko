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

  if (!product) return null;

  const currentFabric = product.fabricOptions ? product.fabricOptions[selectedFabric] : null;
  const currentMaterial = product.materialOptions ? product.materialOptions[selectedMaterial] : null;

  const handleWhatsAppQuote = () => {
    const text = `Bonjour VELMORA, je souhaite recevoir un devis personnalisé pour : ${product.name} (${product.formattedPrice}). Finition : ${currentFabric?.name || currentMaterial?.name || "Standard"}.`;
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
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#1E1D1A]">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 hover:scale-105"
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
                    selectedImage === idx
                      ? "border-[#C5A880] ring-1 ring-[#C5A880]"
                      : "border-[#282622] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#282622] flex items-center justify-between text-xs text-[#8E877D]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              Garantie 5 ans &amp; Certificat
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
                <span className="text-xs text-[#8E877D]">TTC • Hors options spéciales</span>
              </div>
            </div>

            <p className="text-xs text-[#C4BEB4] leading-relaxed">
              {product.description}
            </p>

            {/* Dimensions */}
            <div className="bg-[#0C0B0A] p-3 rounded-lg border border-[#282622] text-xs text-[#8E877D]">
              <span className="text-[#C4BEB4] font-medium block mb-0.5">Dimensions :</span>
              {product.dimensions}
            </div>

            {/* Fabric Swatch Options */}
            {product.fabricOptions && product.fabricOptions.length > 0 && (
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

            {/* Material / Wood Options */}
            {product.materialOptions && product.materialOptions.length > 0 && (
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
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Demander un Devis WhatsApp</span>
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
                Voir au Showroom
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
