"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Send,
  Phone,
  ArrowRight,
  Download,
  Building2,
} from "lucide-react";

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studio: "",
    email: "",
    phone: "",
    city: "Casablanca",
    projectType: "Résidentiel Haut de Gamme (Villa / Penthouse)",
    needsSampleBox: true,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <SectionHeading
            chapter="B2B &bull; Studios &bull; Prescription"
            eyebrow="Partenariats Professionnels"
            title="L&apos;Espace Architectes &amp; Décorateurs"
            subtitle="Conçu pour les architectes d'intérieur, maîtres d'œuvre et promoteurs de projets d'exception au Maroc. Bénéficiez d'un accompagnement sur mesure, de tarifs professionnels et d'outils techniques dédiés."
          />
        </div>

        {/* 4 Professional Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Box Matériaux 48h</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Expédition gratuite à votre cabinet ou agence d&apos;une boîte d&apos;échantillons de travertin, marbre, noyer et tissus bouclés pour vos présentations clients.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Fichiers 3D &amp; CAD</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Bibliothèque complète de fichiers 3D (SketchUp, 3ds Max, OBJ, Revit) pour intégrer directement nos pièces dans vos rendus photoréalistes.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Tarifs Prescripteurs</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Barème professionnel avec remise exclusive de 15% à 25% selon les volumes de projet, conditions de paiement adaptées et devis sous 24h.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#161513] border border-[#282622] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">Interlocuteur Unique</h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Un responsable dédié au suivi de vos chantiers au Maroc : validation des cotes, synchronisation des plannings de pose et coordination gants blancs.
            </p>
          </div>
        </div>

        {/* Big Project Showcase & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#161513] rounded-3xl p-8 sm:p-14 border border-[#282622]">
          {/* Left Column: Hospitality & Architecture Vision */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
              Programmes Spéciaux
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0] font-light leading-tight">
              Hôtels Boutiques, Villas d&apos;Exception &amp; Espaces Corporate
            </h2>
            <p className="text-xs sm:text-sm text-[#C4BEB4] leading-relaxed">
              Que vous conceviez les suites d&apos;un riad contemporain à Marrakech, le salon d&apos;une villa à Anfa ou l&apos;espace de direction d&apos;un groupe à Casablanca, OÏKOS adapte ses volumes et réalise des pièces Signature exclusives.
            </p>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#282622] mt-4">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Projets d'architecture OÏKOS Maroc"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#0C0B0A] border border-[#282622] flex items-center justify-between text-xs text-[#8E877D]">
              <span>Directeur des Partenariats B2B (Casablanca) :</span>
              <a href="tel:0722033326" className="text-[#C5A880] font-medium hover:underline">
                07 22 03 33 26
              </a>
            </div>
          </div>

          {/* Right Column: Pro Partner Registration & Sample Box Request Form */}
          <div className="lg:col-span-6 bg-[#0C0B0A] p-8 sm:p-10 rounded-2xl border border-[#282622]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#F9F6F0]">Demande Professionnelle Reçue</h3>
                <p className="text-xs text-[#8E877D] max-w-sm mx-auto leading-relaxed">
                  Merci {formData.name}. Votre dossier partenaire et votre coffret d&apos;échantillons sont en cours de traitement. Notre responsable vous contactera sous 24 heures.
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/212722033326?text=Bonjour%20OÏKOS,%20je%20viens%20de%20remplir%20ma%20demande%20partenaire%20B2B."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold uppercase tracking-wider"
                  >
                    <span>Échanger directement sur WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block">
                    Formulaire Partenaire
                  </span>
                  <h3 className="font-serif text-2xl text-[#F9F6F0]">
                    Ouvrir un Compte Professionnel
                  </h3>
                  <p className="text-xs text-[#8E877D]">
                    Accédez aux tarifs remisés et recevez votre box de matières.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Votre Nom &amp; Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Nadia Bennani"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Nom de l&apos;Agence / Studio *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Studio Architecture Rabat"
                      value={formData.studio}
                      onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                      className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Email Professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@studio.ma"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+212 6 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Ville principale *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Fès">Fès</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Typologie de Projet
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Résidentiel Haut de Gamme">Résidentiel Haut de Gamme (Villa)</option>
                      <option value="Hôtellerie / Riad / Boutique Hôtel">Hôtellerie / Riad / Boutique Hôtel</option>
                      <option value="Restauration & Bar">Restauration &amp; Bar</option>
                      <option value="Espaces Professionnels / Sièges">Espaces Professionnels / Sièges</option>
                      <option value="Airbnb Collection de Luxe">Airbnb Collection de Luxe</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Votre message ou référence de projet
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez votre besoin : plans à chiffrer, catalogue 3D, visite privée du showroom..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#161513] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="sampleBox"
                    checked={formData.needsSampleBox}
                    onChange={(e) => setFormData({ ...formData, needsSampleBox: e.target.checked })}
                    className="rounded border-[#282622] text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <label htmlFor="sampleBox" className="text-xs text-[#C4BEB4] cursor-pointer">
                    Je souhaite recevoir gratuitement la Box d&apos;échantillons OÏKOS à mon agence.
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-semibold tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer la demande d&apos;ouverture de compte</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
