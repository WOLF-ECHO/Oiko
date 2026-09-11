"use client";

import React, { useState } from "react";
import { CanonicalConfiguration } from "@/lib/configurator/types";
import { ConfiguratorStorage } from "@/lib/configurator/storage";
import { X, CheckCircle2, MessageCircle, Calendar, Sparkles, Phone, Compass } from "lucide-react";

interface DesignAdvisorModalProps {
  configuration: CanonicalConfiguration;
  onClose: () => void;
}

export default function DesignAdvisorModal({
  configuration,
  onClose,
}: DesignAdvisorModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Casablanca",
    roomType: "Salon de réception contemporain",
    preferredContact: "whatsapp" as "whatsapp" | "phone" | "email" | "showroom",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ConfiguratorStorage.submitAdvisorLead({
      configurationId: configuration.configurationId,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      roomType: formData.roomType,
      preferredContact: formData.preferredContact,
      notes: formData.notes,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#161513] border border-[#282622] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#282622] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
                Studio de Conception Privé
              </span>
              <h3 className="font-serif text-2xl text-[#F9F6F0]">
                Conseiller Design Dédié
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8E877D] hover:text-[#F9F6F0] bg-[#0C0B0A] border border-[#282622] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl text-[#F9F6F0]">Demande Prise en Compte</h4>
            <p className="text-xs text-[#8E877D] max-w-sm mx-auto leading-relaxed">
              Merci {formData.fullName}. Notre décorateur étudie votre configuration pour le modèle {configuration.productName} et prendra attache avec vous via {formData.preferredContact}.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider"
              >
                Retour au configurateur
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-[#C4BEB4] text-xs leading-relaxed">
              Bénéficiez de l&apos;expertise de notre studio de Casablanca pour valider les dimensions de votre pièce, l&apos;orientation de la lumière et l&apos;harmonie des textures.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10.5px] uppercase tracking-wider text-[#8E877D]">Votre Nom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Karim Benjelloun"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] uppercase tracking-wider text-[#8E877D]">Téléphone *</label>
                <input
                  type="tel"
                  required
                  placeholder="06 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10.5px] uppercase tracking-wider text-[#8E877D]">Canal de Contact Préféré</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "whatsapp", label: "WhatsApp" },
                  { id: "phone", label: "Appel Vocal" },
                  { id: "showroom", label: "Au Showroom" },
                  { id: "email", label: "Par Email" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: item.id as any })}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-medium transition-all ${
                      formData.preferredContact === item.id
                        ? "border-[#C5A880] bg-[#C5A880] text-[#0C0B0A] font-bold"
                        : "border-[#282622] bg-[#0C0B0A] text-[#8E877D] hover:text-[#F9F6F0]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10.5px] uppercase tracking-wider text-[#8E877D]">Description de Votre Projet</label>
              <textarea
                rows={2}
                placeholder="Pièce concernée, couleurs existantes, plans..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all"
              >
                Être Recontacté par un Décorateur
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
