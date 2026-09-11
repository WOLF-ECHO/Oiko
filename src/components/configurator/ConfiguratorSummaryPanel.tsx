"use client";

import React, { useState } from "react";
import { ConfiguratorProduct, CanonicalConfiguration, PriceBreakdown } from "@/lib/configurator/types";
import { getMaterialById } from "@/lib/configurator/materials";
import { getColorById } from "@/lib/configurator/colors";
import { FileText, Sparkles, Share2, ChevronDown, ChevronUp, ShieldCheck, Clock, Truck } from "lucide-react";

interface ConfiguratorSummaryPanelProps {
  product: ConfiguratorProduct;
  configuration: CanonicalConfiguration;
  pricing: PriceBreakdown;
  onRequestQuote: () => void;
  onOpenAdvisor: () => void;
  onOpenShare: () => void;
}

export default function ConfiguratorSummaryPanel({
  product,
  configuration,
  pricing,
  onRequestQuote,
  onOpenAdvisor,
  onOpenShare,
}: ConfiguratorSummaryPanelProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  // Resolved entities
  const primaryMat = getMaterialById(Object.values(configuration.materials)[0] || "");
  const primaryColor = getColorById(Object.values(configuration.colors)[0] || "");

  return (
    <div className="w-full bg-[#161513] border border-[#282622] rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-6 shadow-xl">
      {/* 1. Model & Identification */}
      <div className="border-b border-[#282622] pb-4 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
            {product.categoryLabel}
          </span>
          <span className="text-[9.5px] uppercase tracking-wider text-[#8E877D] font-mono">
            {configuration.configurationId}
          </span>
        </div>
        <h3 className="font-serif text-2xl text-[#F9F6F0] font-light leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-[#8E877D] line-clamp-1">{product.tagline}</p>
      </div>

      {/* 2. Key Specs Overview Chips */}
      <div className="space-y-3 text-xs">
        {/* Dimensions */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#282622]/60 text-[11.5px]">
          <span className="text-[#8E877D]">Dimensions :</span>
          <span className="text-[#F9F6F0] font-medium">
            L {configuration.dimensions.width} × P {configuration.dimensions.depth} × H {configuration.dimensions.height} cm
          </span>
        </div>

        {/* Selected Modules */}
        {configuration.modules.length > 0 && (
          <div className="flex items-center justify-between py-1.5 border-b border-[#282622]/60 text-[11.5px]">
            <span className="text-[#8E877D]">Module :</span>
            <span className="text-[#F9F6F0] font-medium text-right line-clamp-1 max-w-[180px]">
              {product.supportedModules?.find((m) => m.id === configuration.modules[0])?.name || "Standard"}
            </span>
          </div>
        )}

        {/* Selected Material & Color */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#282622]/60 text-[11.5px]">
          <span className="text-[#8E877D]">Matière :</span>
          <div className="flex items-center gap-1.5 text-right">
            {primaryColor && (
              <span
                className="w-3 h-3 rounded-full border border-[#282622] inline-block shrink-0"
                style={{ backgroundColor: primaryColor.hex }}
              />
            )}
            <span className="text-[#F9F6F0] font-medium line-clamp-1 max-w-[170px]">
              {primaryMat?.name || "Standard"}
            </span>
          </div>
        </div>

        {/* Selected Color */}
        {primaryColor && (
          <div className="flex items-center justify-between py-1.5 border-b border-[#282622]/60 text-[11.5px]">
            <span className="text-[#8E877D]">Nuance :</span>
            <span className="text-[#C5A880] font-medium">{primaryColor.name}</span>
          </div>
        )}

        {/* Delais */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#282622]/60 text-[11.5px]">
          <span className="text-[#8E877D]">Délai Confection :</span>
          <span className="text-[#F9F6F0]">{product.leadTime.split("•")[0]}</span>
        </div>
      </div>

      {/* 3. Pricing Section */}
      <div className="p-4 rounded-2xl bg-[#0C0B0A] border border-[#282622] space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">
              Estimation Totale TTC
            </span>
            <span className="font-serif text-3xl font-light text-[#F9F6F0]">
              {pricing.formattedTotal}
            </span>
          </div>

          <button
            onClick={() => setBreakdownOpen(!breakdownOpen)}
            className="text-[11px] text-[#C5A880] hover:text-[#DEC5A5] flex items-center gap-1 font-medium transition-colors"
          >
            <span>{breakdownOpen ? "Masquer" : "Détails"}</span>
            {breakdownOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Itemized Price Breakdown Drawer */}
        {breakdownOpen && (
          <div className="pt-3 border-t border-[#282622] space-y-1.5 animate-in fade-in duration-200">
            {pricing.itemized.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] text-[#8E877D]">
                <span className="line-clamp-1">{item.label}</span>
                <span className="text-[#F9F6F0] shrink-0 ml-2">
                  {item.amount > 0 ? `+${item.amount.toLocaleString("fr-MA")} DH` : "Inclus"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Action Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={onRequestQuote}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold tracking-[0.16em] uppercase hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
        >
          <FileText className="w-4 h-4" />
          <span>Demander un Devis Officiel</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenAdvisor}
            className="py-2.5 px-3 rounded-full bg-[#1E1D1A] border border-[#282622] hover:border-[#C5A880] text-xs text-[#F9F6F0] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px]">Conseiller Design</span>
          </button>

          <button
            onClick={onOpenShare}
            className="py-2.5 px-3 rounded-full bg-[#1E1D1A] border border-[#282622] hover:border-[#C5A880] text-xs text-[#C4BEB4] hover:text-[#F9F6F0] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px]">Partager</span>
          </button>
        </div>
      </div>

      {/* 5. Luxury Guarantees */}
      <div className="pt-2 border-t border-[#282622] space-y-1.5 text-[10.5px] text-[#6E675E]">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Livraison gants blancs Casablanca &amp; tout le Maroc</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Garantie d&apos;atelier OÏKOS de 5 ans</span>
        </div>
      </div>
    </div>
  );
}
