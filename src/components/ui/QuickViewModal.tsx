"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Sparkles, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState("160 × 200 cm");
  const [hasStorage, setHasStorage] = useState(false);
  const [salonConfig, setSalonConfig] = useState("Angle Droit");
  const [tableSeats, setTableSeats] = useState("6 Couverts");
  const [selectedTexture, setSelectedTexture] = useState("Bouclette d'alpaga");
  const [selectedWood, setSelectedWood] = useState("Noyer chaud");
  const [selectedMattress, setSelectedMattress] = useState("Matelas Standard (Inclus)");

  if (!product) return null;

  const currentImg = product.images[selectedImage] || product.images[0];
  const isWhiteBgPoster = Boolean(
    currentImg?.includes("-studio.") || currentImg?.includes("-isolated.")
  );
  const isPackPoster = Boolean(currentImg?.includes("/packs/"));

  const handleWhatsAppQuote = () => {
    let details = "";
    if (product.category === "Offres exclusives") {
      details = `Prix de base du pack : ${product.formattedPrice} • Matelas souhaité : ${selectedMattress} • Tissu & Couleur : ${selectedTexture} (couleur au choix)`;
    } else if (product.category === "Lits") {
      details = `Dimension souhaitée : ${selectedDimension} • Configuration : ${
        hasStorage ? "Avec coffre escamotable hydraulique" : "Standard (sans coffre)"
      } • Teinte & Tissu : ${selectedTexture} (couleur au choix)`;
    } else if (product.category === "Salons") {
      details = `Configuration : ${salonConfig} • Revêtement : ${selectedTexture} (couleur sur mesure au choix)`;
    } else if (product.category === "Tables à manger") {
      details = `Capacité souhaitée : ${tableSeats} • Finition plateau/bois : ${selectedWood} • Tissu chaises : ${selectedTexture}`;
    } else {
      details = `Revêtement : ${selectedTexture} • Finition structure/bois : ${selectedWood} (couleur sur mesure au choix)`;
    }
    const text = `Bonjour OÏKOS, je souhaite recevoir un devis personnalisé pour la pièce ${product.name} (${product.subtitle}).
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
            className={`relative ${
              isPackPoster ? "aspect-[4/5]" : "aspect-[4/3]"
            } w-full rounded-xl overflow-hidden ${
              isWhiteBgPoster ? "bg-white" : isPackPoster ? "bg-[#0E0D0B]" : "bg-[#1E1D1A]"
            }`}
          >
            <Image
              src={currentImg}
              alt={product.name}
              fill
              unoptimized
              className={`${
                isWhiteBgPoster
                  ? "object-contain p-3"
                  : isPackPoster
                  ? "object-contain p-1"
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
              {product.images.map((img, idx) => {
                const thumbWhite = img.includes("-studio.") || img.includes("-isolated.");
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      thumbWhite ? "bg-white" : "bg-[#1E1D1A]"
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
                      unoptimized
                      className={thumbWhite ? "object-contain p-1" : "object-cover"}
                    />
                  </button>
                );
              })}
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

            {/* Interactive Configurator per Category */}
            <div className="space-y-4 pt-2 border-t border-[#282622]">
              {product.category === "Offres exclusives" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/40 text-xs space-y-1">
                    <span className="text-[#C5A880] font-semibold uppercase tracking-wider block text-[11px]">
                      Information Literie &amp; Matelas
                    </span>
                    <p className="text-[11px] text-[#EFECE6] leading-relaxed">
                      Un matelas (160 × 200 cm) est inclus dans ce pack. <strong>Différents matelas sont disponibles au choix</strong> (orthopédique, mémoire de forme, hôtelier) et <strong>le prix du pack changera si le matelas est modifié</strong>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8E877D] uppercase tracking-wider">Choix du Matelas :</span>
                      <span className="text-[#C5A880] font-medium">{selectedMattress}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Matelas Standard (Inclus)",
                        "Matelas Orthopédique HR",
                        "Matelas Mémoire de Forme",
                        "Matelas Hôtelier Premium",
                      ].map((mat) => (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => setSelectedMattress(mat)}
                          className={`p-2 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            selectedMattress === mat
                              ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                              : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {product.category === "Lits" && (
                <>
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
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
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
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
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
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          hasStorage
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                            : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        Avec sommier coffre
                      </button>
                    </div>
                  </div>
                </>
              )}

              {product.category === "Salons" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8E877D] uppercase tracking-wider">Configuration &amp; Sens :</span>
                    <span className="text-[#C5A880] font-medium">{salonConfig}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Angle Droit", "Angle Gauche", "Panoramique en U", "Dimensions sur mesure"].map((cfg) => (
                      <button
                        key={cfg}
                        type="button"
                        onClick={() => setSalonConfig(cfg)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          salonConfig === cfg
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                            : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        {cfg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.category === "Tables à manger" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8E877D] uppercase tracking-wider">Capacité &amp; Format :</span>
                    <span className="text-[#C5A880] font-medium">{tableSeats}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["4 Couverts", "6 Couverts", "8 Couverts", "Dimensions sur mesure"].map((cap) => (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => setTableSeats(cap)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          tableSeats === cap
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                            : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Texture selector for all products */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8E877D] uppercase tracking-wider">Texture de revêtement :</span>
                  <span className="text-[#C5A880] font-medium">{selectedTexture}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                      className={`p-2 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        selectedTexture === tex
                          ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                          : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                      }`}
                    >
                      {tex}
                    </button>
                  ))}
                </div>
              </div>

              {(product.category === "Chaises" ||
                product.category === "Fauteuils" ||
                product.category === "Tables à manger") && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8E877D] uppercase tracking-wider">Teinte Bois / Plateau :</span>
                    <span className="text-[#C5A880] font-medium">{selectedWood}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Noyer chaud", "Chêne miel naturel", "Marbre / Verre & Bois", "Chêne noir / Laiton"].map((wood) => (
                      <button
                        key={wood}
                        type="button"
                        onClick={() => setSelectedWood(wood)}
                        className={`p-2 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          selectedWood === wood
                            ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F9F6F0] font-semibold"
                            : "border-[#282622] bg-[#0C0B0A] text-[#A69F93] hover:border-[#6E675E]"
                        }`}
                      >
                        {wood}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bespoke color note */}
              <div className="p-3 rounded-xl bg-[#0C0B0A] border border-[#282622] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#C5A880] font-medium text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Couleur 100% au choix du client</span>
                </div>
                <p className="text-[11px] text-[#8E877D] leading-relaxed">
                  Notre atelier confectionne cette pièce dans la couleur exacte que vous souhaitez à partir de notre matériauthèque (plus de 120 nuances disponibles).
                </p>
              </div>
            </div>
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
