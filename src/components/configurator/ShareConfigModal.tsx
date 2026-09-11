"use client";

import React, { useState } from "react";
import { CanonicalConfiguration } from "@/lib/configurator/types";
import { ConfiguratorStorage } from "@/lib/configurator/storage";
import { X, Copy, Check, MessageCircle, Mail, Share2 } from "lucide-react";

interface ShareConfigModalProps {
  configuration: CanonicalConfiguration;
  onClose: () => void;
}

export default function ShareConfigModal({
  configuration,
  onClose,
}: ShareConfigModalProps) {
  const [copied, setCopied] = useState(false);

  // Generate shareable URL with encoded configuration
  const encoded = ConfiguratorStorage.encodeConfigToUrl(configuration);
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/configurateur?cfg=${configuration.configurationId}&payload=${encoded}`
    : `https://oikos.ma/configurateur?cfg=${configuration.configurationId}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    const text = `Découvrez ma configuration pour ${configuration.productName} (${configuration.pricing.formattedTotal}) sur le studio OÏKOS : ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleEmail = () => {
    const subject = `Configuration OÏKOS : ${configuration.productName} (${configuration.configurationId})`;
    const body = `Bonjour,\n\nVoici le lien vers la configuration personnalisée créée sur le studio 3D OÏKOS :\n\n${shareUrl}\n\nDimensions : L ${configuration.dimensions.width} x P ${configuration.dimensions.depth} x H ${configuration.dimensions.height} cm\nEstimation : ${configuration.pricing.formattedTotal}\n\nOÏKOS Maison de Design Casablanca`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#161513] border border-[#282622] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#282622] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#F9F6F0]">Partager Votre Création</h3>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880]">
                ID : {configuration.configurationId}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8E877D] hover:text-[#F9F6F0] bg-[#0C0B0A] border border-[#282622] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info card */}
        <div className="p-4 rounded-2xl bg-[#0C0B0A] border border-[#282622] space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#F9F6F0] font-serif text-sm">
            <span>{configuration.productName}</span>
            <span className="text-[#C5A880] font-sans font-bold">{configuration.pricing.formattedTotal}</span>
          </div>
          <p className="text-[11px] text-[#8E877D]">
            Ce lien unique permet de restaurer instantanément vos dimensions, modules, matières et finitions exactes sur n&apos;importe quel écran.
          </p>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-2">
          <label className="text-[10.5px] uppercase tracking-wider text-[#8E877D] block">
            Lien Direct Permanent
          </label>
          <div className="flex items-center gap-2 bg-[#0C0B0A] border border-[#282622] rounded-xl p-1.5 pl-3">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-[#C4BEB4] flex-grow focus:outline-none select-all truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-[#C5A880] text-[#0C0B0A] hover:bg-[#DEC5A5]"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copié !" : "Copier"}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#282622]">
          <button
            onClick={handleWhatsApp}
            className="py-3 rounded-xl bg-[#0C0B0A] border border-[#282622] hover:border-[#C5A880] text-xs text-[#F9F6F0] flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleEmail}
            className="py-3 rounded-xl bg-[#0C0B0A] border border-[#282622] hover:border-[#C5A880] text-xs text-[#F9F6F0] flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#C5A880]" />
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}
