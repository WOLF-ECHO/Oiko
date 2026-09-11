"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Clock } from "lucide-react";

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const quickPrompts = [
    {
      title: "Visite Showroom Casablanca",
      text: "Bonjour OÏKOS, je souhaite planifier une visite privée au showroom du Boulevard d'Anfa à Casablanca.",
    },
    {
      title: "Devis Configurateur 3D",
      text: "Bonjour OÏKOS, j'ai configuré un modèle sur votre studio 3D et je souhaite valider un devis personnalisé.",
    },
    {
      title: "Demande Échantillons (Architecte)",
      text: "Bonjour l'équipe OÏKOS, je suis architecte d'intérieur et je souhaite recevoir votre matériauthèque sous 48h.",
    },
    {
      title: "Catalogue Mobilier OÏKOS (PDF)",
      text: "Bonjour, pourriez-vous me transmettre le catalogue complet OÏKOS en format PDF ?",
    },
  ];

  const handleSendPrompt = (promptText: string) => {
    const encoded = encodeURIComponent(promptText);
    window.open(`https://wa.me/212722033326?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const encoded = encodeURIComponent(customMsg);
    window.open(`https://wa.me/212722033326?text=${encoded}`, "_blank");
    setCustomMsg("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#161513] text-[#F9F6F0] border border-[#C5A880]/50 shadow-[0_10px_35px_rgba(0,0,0,0.85)] hover:border-[#C5A880] transition-all hover:scale-105 active:scale-95"
          aria-label="Ouvrir la conciergerie WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A880]" />
          </span>
          <MessageCircle className="w-5 h-5 text-[#C5A880]" />
          <span className="text-xs tracking-wider uppercase font-semibold hidden sm:inline text-[#EFECE6]">
            Conciergerie OÏKOS
          </span>
        </button>
      )}

      {/* Concierge Modal Drawer */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-[#161513] border border-[#282622] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#1E1D1A] p-4 border-b border-[#282622] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#F9F6F0] font-semibold">
                  Conciergerie OÏKOS
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#C5A880]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Casablanca &bull; Réponse instantanée</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8E877D] hover:text-[#F9F6F0] p-1 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <p className="text-xs text-[#C4BEB4] leading-relaxed">
              Bienvenue chez OÏKOS Casablanca. Comment pouvons-nous accompagner votre projet d&apos;intérieur ?
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8E877D] font-medium block">
                Demandes rapides :
              </span>
              {quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(item.text)}
                  className="w-full text-left p-2.5 rounded-lg bg-[#0C0B0A] border border-[#282622] hover:border-[#C5A880]/60 hover:bg-[#1E1D1A] transition-all text-xs text-[#EFECE6] flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{item.title}</span>
                  <Send className="w-3 h-3 text-[#8E877D] group-hover:text-[#C5A880] transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>

            {/* Custom input */}
            <form onSubmit={handleSendCustom} className="pt-2 flex gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Votre message direct..."
                className="flex-grow bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0] placeholder-[#6E675E] focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#C5A880] text-[#0C0B0A] hover:bg-[#DEC5A5] transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="bg-[#0C0B0A] px-4 py-2.5 border-t border-[#282622] flex items-center justify-between text-[10px] text-[#8E877D]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C5A880]" />
              7j/7 &bull; 07 22 03 33 26
            </span>
            <span>oikos.ma</span>
          </div>
        </div>
      )}
    </div>
  );
}
