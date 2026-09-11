"use client";

import React, { useState } from "react";
import { CanonicalConfiguration, QuoteRequest } from "@/lib/configurator/types";
import { ConfiguratorStorage } from "@/lib/configurator/storage";
import { X, CheckCircle2, MessageCircle, Calendar, ShieldCheck, Mail, Phone, FileText } from "lucide-react";

interface QuoteRequestModalProps {
  configuration: CanonicalConfiguration;
  onClose: () => void;
}

export default function QuoteRequestModal({
  configuration,
  onClose,
}: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Casablanca",
    projectType: "Résidentiel Principal",
    budgetRange: "Dans l'estimation configurée",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ConfiguratorStorage.submitQuoteRequest({
      configurationId: configuration.configurationId,
      configuration,
      client: formData,
    });
    setSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const text = ConfiguratorStorage.formatWhatsAppMessage(configuration, formData.fullName);
    window.open(`https://wa.me/212722033326?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#161513] border border-[#282622] rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1E1D1A] p-5 sm:p-6 border-b border-[#282622] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-0.5">
              OÏKOS Studio &bull; Casablanca
            </span>
            <h3 className="font-serif text-2xl text-[#F9F6F0]">
              Demande de Devis Officiel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8E877D] hover:text-[#F9F6F0] bg-[#0C0B0A] border border-[#282622] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-medium">
                  Référence : {configuration.configurationId}
                </span>
                <h4 className="font-serif text-3xl text-[#F9F6F0]">
                  Merci, {formData.fullName}
                </h4>
                <p className="text-xs text-[#C4BEB4] max-w-md mx-auto leading-relaxed">
                  Votre configuration a bien été enregistrée dans notre studio de Casablanca. Un conseiller d&apos;atelier examine vos spécifications techniques et vous contactera sous 24h.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#DEC5A5] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Transmettre sur WhatsApp (07 22 03 33 26)</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-full border border-[#282622] text-xs text-[#C4BEB4] hover:text-[#F9F6F0] uppercase tracking-wider"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Configuration recap card */}
              <div className="p-4 rounded-2xl bg-[#0C0B0A] border border-[#282622] space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#282622]">
                  <span className="font-serif text-base text-[#F9F6F0]">{configuration.productName}</span>
                  <span className="text-[#C5A880] font-bold">{configuration.pricing.formattedTotal}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8E877D] pt-1">
                  <span>Dimensions : {configuration.dimensions.width} × {configuration.dimensions.depth} × {configuration.dimensions.height} cm</span>
                  <span>Réf : {configuration.configurationId}</span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Nom &amp; Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sara El Mansouri"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06 XX XX XX XX ou 07 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="votre-email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Ville de Livraison au Maroc
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                  Précisions d&apos;Atelier ou Remarques Particulières
                </label>
                <textarea
                  rows={2}
                  placeholder="Contraintes d'accès (ascenseur, étage), demande d'échantillons tissu..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Générer et Transmettre Mon Devis</span>
                </button>
                <p className="text-[10.5px] text-[#8E877D] text-center mt-2.5">
                  Engagement OÏKOS : Réponse personnalisée sous 24h &bull; Respect des délais &ge; 95%
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
