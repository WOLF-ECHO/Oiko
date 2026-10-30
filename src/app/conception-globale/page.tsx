"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Compass,
  Building2,
  Home,
  Layers,
  Sparkles,
  CheckCircle2,
  Ruler,
  Calendar,
  ShieldCheck,
  MessageCircle,
  Send,
  FileText,
  Palette,
} from "lucide-react";

type ClientProfile = "particulier" | "b2b";

export default function ConceptionGlobalePage() {
  const [profile, setProfile] = useState<ClientProfile>("particulier");
  const [submitted, setSubmitted] = useState(false);

  const [brief, setBrief] = useState({
    // Common
    fullName: "",
    companyName: "",
    role: "Architecte d'intérieur / Décorateur",
    phone: "",
    email: "",
    city: "Casablanca",
    addressOrZone: "",
    // Project scope
    propertyType: "Villa contemporaine",
    b2bSector: "Hôtellerie / Boutique Hôtel / Riad",
    spacesToDesign: ["Salon de réception", "Salle à manger"],
    surfaceArea: "80 m² à 150 m²",
    seatQuantity: "10 à 30 pièces",
    styleAtmosphere: "Quiet Luxury & Minéral (Travertin, Bouclette, Noyer)",
    servicesNeeded: [
      "Étude d'implantation & Plans 2D/3D",
      "Fabrication de mobilier sur mesure",
      "Livraison & Installation Gants Blancs",
    ],
    timeline: "Sous 1 à 2 mois",
    budgetRange: "100 000 – 250 000 DH",
    hasPlans: "Oui, plans d'architecte ou photos disponibles",
    projectVision: "",
  });

  const residentialSpaces = [
    "Salon de réception",
    "Salon Marocain contemporain",
    "Salle à manger d'apparat",
    "Suite parentale & Dressing",
    "Terrasse & Jardin couvert",
    "Villa / Appartement complet",
  ];

  const b2bSpaces = [
    "Restaurant Gastronomique / Lounge",
    "Lobby & Suites d'Hôtel / Riad",
    "Bureaux de Direction & Boardroom",
    "Showroom / Boutique de Luxe",
    "Programme Immobilier / Villa Témoin",
    "Résidence Hôtelière / Airbnb Luxe",
  ];

  const availableDeliverables = [
    "Étude d'implantation & Plans 2D/3D",
    "Planches d'ambiance & Matériauthèque dédiée",
    "Fabrication de mobilier sur mesure",
    "Habillage mural, boiseries & agencement",
    "Éclairage architectural & Art mural",
    "Livraison & Installation Gants Blancs",
  ];

  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleSpaceToggle = (space: string) => {
    setBrief((prev) => ({
      ...prev,
      spacesToDesign: toggleItem(prev.spacesToDesign, space),
    }));
  };

  const handleDeliverableToggle = (service: string) => {
    setBrief((prev) => ({
      ...prev,
      servicesNeeded: toggleItem(prev.servicesNeeded, service),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const buildWhatsAppSummary = () => {
    const typeLabel =
      profile === "particulier"
        ? `Projet Résidentiel (${brief.propertyType})`
        : `Projet B2B / Professionnel (${brief.b2bSector} - ${brief.companyName || brief.role})`;

    const text = [
      `Bonjour OÏKOS, je souhaite soumettre un dossier de CONCEPTION GLOBALE (Clés en Main) :`,
      `• Profil : ${typeLabel}`,
      `• Contact : ${brief.fullName} (${brief.phone}) - ${brief.city}`,
      `• Espaces : ${brief.spacesToDesign.join(", ")}`,
      `• Surface / Volume : ${profile === "particulier" ? brief.surfaceArea : brief.seatQuantity}`,
      `• Direction esthétique : ${brief.styleAtmosphere}`,
      `• Prestations souhaitées : ${brief.servicesNeeded.join(", ")}`,
      `• Délai souhaité : ${brief.timeline}`,
      `• Budget indicatif : ${brief.budgetRange}`,
      `• Plans disponibles : ${brief.hasPlans}`,
      brief.projectVision ? `• Précisions : ${brief.projectVision}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/212722033326?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* 1. Editorial Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <SectionHeading
              chapter="Conception Globale &bull; Clés en Main"
              eyebrow="Architecture d'Intérieur &amp; Manufacture Sur Mesure"
              title="Conception Globale OÏKOS"
              subtitle="De la première esquisse architecturale jusqu'à l'installation gants blancs. Notre studio et notre atelier de Dar Bouazza (Casablanca) orchestrent l'aménagement intégral de vos résidences privées et projets professionnels."
            />
          </div>
        </ScrollReveal>

        {/* 2. The 4-Phase Turnkey Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 01
              </span>
              <Compass className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Relevé &amp; Direction Créative
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Analyse de vos plans ou prise de cotes sur site, définition des circulations et création de votre planche de matières (bois, tissus, pierres).
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 02
              </span>
              <Ruler className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Calepinage &amp; Modélisation
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Adaptation millimétrée de chaque pièce de mobilier (canapés, salons marocains contemporains, chaises, tables) aux proportions exactes du lieu.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 03
              </span>
              <Layers className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Manufacture d&apos;Atelier
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Fabrication intégrale dans notre atelier à Dar Bouazza (Casablanca) par nos maîtres ébénistes et tapissiers, avec contrôle qualité rigoureux.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 04
              </span>
              <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Installation Clés en Main
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Livraison gants blancs, mise en place scénographique complète partout au Maroc et garantie atelier de 6 mois.
            </p>
          </div>
        </div>

        {/* 3. Structured Project Brief Model (Particulier & B2B) */}
        <div className="bg-[#161513] border border-[#282622] rounded-3xl p-6 sm:p-12 space-y-10">
          {/* Profile Selector Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#282622] pb-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                Cahier des Charges Interactif
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#F9F6F0] font-light">
                Définir Votre Projet Clés en Main
              </h2>
              <p className="text-xs sm:text-sm text-[#8E877D] max-w-xl">
                Sélectionnez votre profil et renseignez les paramètres de votre espace pour permettre à notre bureau d&apos;études de préparer votre chiffrage et votre proposition d&apos;aménagement.
              </p>
            </div>

            {/* Dual Mode Switch: Particulier vs B2B */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#0C0B0A] border border-[#282622] self-start">
              <button
                type="button"
                onClick={() => {
                  setProfile("particulier");
                  setBrief((b) => ({
                    ...b,
                    spacesToDesign: ["Salon de réception", "Salle à manger d'apparat"],
                  }));
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  profile === "particulier"
                    ? "bg-[#C5A880] text-[#0C0B0A] shadow-lg"
                    : "text-[#8E877D] hover:text-[#F9F6F0]"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Particulier / Résidentiel</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfile("b2b");
                  setBrief((b) => ({
                    ...b,
                    spacesToDesign: ["Restaurant Gastronomique / Lounge", "Lobby & Suites d'Hôtel / Riad"],
                  }));
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  profile === "b2b"
                    ? "bg-[#C5A880] text-[#0C0B0A] shadow-lg"
                    : "text-[#8E877D] hover:text-[#F9F6F0]"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Professionnel / B2B</span>
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                  Dossier de Conception Globale Prêt
                </span>
                <h3 className="font-serif text-3xl text-[#F9F6F0]">
                  Merci, {brief.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#C4BEB4] leading-relaxed">
                  Votre fiche de spécifications ({profile === "particulier" ? "Résidentiel Privé" : "Projet B2B / Corporate"}) est structurée. Vous pouvez la transmettre directement à notre direction de projet sur WhatsApp ou par email pour une prise en charge sous 24h.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0C0B0A] border border-[#282622] text-left space-y-2 text-xs text-[#C4BEB4]">
                <p className="text-[#C5A880] font-semibold uppercase tracking-wider text-[11px] mb-2">
                  Synthèse du Cahier des Charges :
                </p>
                <p>• <strong>Profil :</strong> {profile === "particulier" ? brief.propertyType : `${brief.b2bSector} (${brief.companyName || brief.role})`}</p>
                <p>• <strong>Localisation :</strong> {brief.city} {brief.addressOrZone ? `(${brief.addressOrZone})` : ""}</p>
                <p>• <strong>Espaces :</strong> {brief.spacesToDesign.join(", ")}</p>
                <p>• <strong>Envergure :</strong> {profile === "particulier" ? brief.surfaceArea : brief.seatQuantity}</p>
                <p>• <strong>Direction esthétique :</strong> {brief.styleAtmosphere}</p>
                <p>• <strong>Budget &amp; Délai :</strong> {brief.budgetRange} • {brief.timeline}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href={buildWhatsAppSummary()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer le dossier sur WhatsApp</span>
                </a>
                <a
                  href={`mailto:oikosmaison@gmail.com?subject=${encodeURIComponent(`Dossier Conception Globale - ${brief.fullName}`)}&body=${encodeURIComponent(`Bonjour OÏKOS,\n\nVoici mon dossier de Conception Globale :\n- Nom : ${brief.fullName}\n- Téléphone : ${brief.phone}\n- Ville : ${brief.city}\n- Espaces : ${brief.spacesToDesign.join(", ")}\n- Envergure : ${profile === "particulier" ? brief.surfaceArea : brief.seatQuantity}\n- Style : ${brief.styleAtmosphere}\n- Prestations : ${brief.servicesNeeded.join(", ")}\n- Budget : ${brief.budgetRange}\n- Délai : ${brief.timeline}\n- Notes : ${brief.projectVision}`)}`}
                  className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#C5A880]/40 text-[#C5A880] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A880]/10 transition-colors"
                >
                  Envoyer par Email (oikosmaison@gmail.com)
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#8E877D] hover:text-[#F9F6F0] underline"
                >
                  Modifier les informations
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* SECTION 1: TYPOLOGIE & ESPACES */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>
                    1. {profile === "particulier" ? "Typologie du Bien & Espaces à Sublimer" : "Secteur d'Activité & Zones du Projet B2B"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {profile === "particulier" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                          Nature de la Résidence
                        </label>
                        <select
                          value={brief.propertyType}
                          onChange={(e) => setBrief({ ...brief, propertyType: e.target.value })}
                          className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="Villa contemporaine">Villa contemporaine</option>
                          <option value="Appartement de réception / Penthouse">Appartement de réception / Penthouse</option>
                          <option value="Riad ou Demeure de caractère">Riad ou Demeure de caractère</option>
                          <option value="Résidence secondaire / Balnéaire">Résidence secondaire / Balnéaire</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                          Surface Estimée à Aménager
                        </label>
                        <select
                          value={brief.surfaceArea}
                          onChange={(e) => setBrief({ ...brief, surfaceArea: e.target.value })}
                          className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="Moins de 50 m² (1 à 2 espaces)">Moins de 50 m² (1 à 2 espaces)</option>
                          <option value="50 m² à 120 m² (Réception complète)">50 m² à 120 m² (Réception complète)</option>
                          <option value="120 m² à 250 m² (Appartement / Niveau)">120 m² à 250 m² (Appartement / Niveau)</option>
                          <option value="Plus de 250 m² (Villa complète)">Plus de 250 m² (Villa complète)</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                          Secteur Professionnel
                        </label>
                        <select
                          value={brief.b2bSector}
                          onChange={(e) => setBrief({ ...brief, b2bSector: e.target.value })}
                          className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="Hôtellerie / Boutique Hôtel / Riad">Hôtellerie / Boutique Hôtel / Riad</option>
                          <option value="Restaurant / Café / Lounge">Restaurant / Café / Lounge</option>
                          <option value="Cabinet d'Architecture / Décoration">Cabinet d&apos;Architecture / Décoration</option>
                          <option value="Siège Social / Bureaux Exécutifs">Siège Social / Bureaux Exécutifs</option>
                          <option value="Promotion Immobilière / Villa Témoin">Promotion Immobilière / Villa Témoin</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                          Volume Estimé de Mobilier
                        </label>
                        <select
                          value={brief.seatQuantity}
                          onChange={(e) => setBrief({ ...brief, seatQuantity: e.target.value })}
                          className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="10 à 25 pièces (Espace ciblé)">10 à 25 pièces (Espace ciblé)</option>
                          <option value="25 à 60 pièces (Restaurant / Lobby)">25 à 60 pièces (Restaurant / Lobby)</option>
                          <option value="60 à 150 pièces (Établissement complet)">60 à 150 pièces (Établissement complet)</option>
                          <option value="Plus de 150 pièces (Grand programme)">Plus de 150 pièces (Grand programme)</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Plans ou Visuels Existants
                    </label>
                    <select
                      value={brief.hasPlans}
                      onChange={(e) => setBrief({ ...brief, hasPlans: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Oui, plans d'architecte ou photos disponibles">Oui, plans 2D/3D ou photos disponibles</option>
                      <option value="Bien en cours de construction / sur plan">Bien en cours de construction / sur plan</option>
                      <option value="Besoin d'un relevé de cotes par OÏKOS">Besoin d&apos;un relevé de cotes sur place par OÏKOS</option>
                    </select>
                  </div>
                </div>

                {/* Multi-select Spaces */}
                <div className="space-y-2.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Sélectionnez les espaces concernés (plusieurs choix possibles) :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(profile === "particulier" ? residentialSpaces : b2bSpaces).map((space) => {
                      const active = brief.spacesToDesign.includes(space);
                      return (
                        <button
                          key={space}
                          type="button"
                          onClick={() => handleSpaceToggle(space)}
                          className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            active
                              ? "bg-[#1E1D1A] border-[#C5A880] text-[#F9F6F0] font-medium"
                              : "bg-[#0C0B0A] border-[#282622] text-[#8E877D] hover:text-[#F9F6F0]"
                          }`}
                        >
                          <span>{space}</span>
                          {active && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 2: DIRECTION ESTHÉTIQUE & PRESTATIONS */}
              <div className="space-y-6 border-t border-[#282622] pt-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  <Palette className="w-4 h-4" />
                  <span>2. Direction Esthétique, Prestations &amp; Cadre Budgétaire</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Atmosphère &amp; Matières Privilégiées
                    </label>
                    <select
                      value={brief.styleAtmosphere}
                      onChange={(e) => setBrief({ ...brief, styleAtmosphere: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Quiet Luxury & Minéral (Travertin, Bouclette, Noyer)">
                        Quiet Luxury &amp; Minéral (Travertin, Bouclette, Noyer)
                      </option>
                      <option value="Contemporain Organique & Chaleureux (Terre cuite, Lin, Chêne)">
                        Contemporain Organique &amp; Chaleureux (Terre cuite, Lin, Chêne)
                      </option>
                      <option value="Héritage Marocain Modernisé (Velours, Laiton, Cèdre/Noyer)">
                        Héritage Marocain Modernisé (Velours, Laiton, Noyer)
                      </option>
                      <option value="Architectural & Contrasté (Ébène, Cuir, Marbre sombre)">
                        Architectural &amp; Contrasté (Ébène, Cuir, Marbre sombre)
                      </option>
                      <option value="À définir avec le Studio OÏKOS">
                        À définir avec les conseillers du Studio OÏKOS
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Enveloppe Budgétaire Estimée
                    </label>
                    <select
                      value={brief.budgetRange}
                      onChange={(e) => setBrief({ ...brief, budgetRange: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="50 000 – 100 000 DH">50 000 – 100 000 DH</option>
                      <option value="100 000 – 250 000 DH">100 000 – 250 000 DH</option>
                      <option value="250 000 – 500 000 DH">250 000 – 500 000 DH</option>
                      <option value="+500 000 DH (Projet Global / B2B)">+500 000 DH (Projet Global / B2B)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Horizon de Livraison Souhaité
                    </label>
                    <select
                      value={brief.timeline}
                      onChange={(e) => setBrief({ ...brief, timeline: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Urgent (Moins de 4 semaines)">Prioritaire (Moins de 4 semaines)</option>
                      <option value="Sous 1 à 2 mois">Sous 1 à 2 mois</option>
                      <option value="Sous 3 à 6 mois">Sous 3 à 6 mois</option>
                      <option value="En phase d'étude / Planification">En phase d&apos;étude / Planification</option>
                    </select>
                  </div>
                </div>

                {/* Prestations Clés en Main */}
                <div className="space-y-2.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Niveau d&apos;accompagnement souhaité :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableDeliverables.map((service) => {
                      const active = brief.servicesNeeded.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleDeliverableToggle(service)}
                          className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            active
                              ? "bg-[#1E1D1A] border-[#C5A880] text-[#F9F6F0] font-medium"
                              : "bg-[#0C0B0A] border-[#282622] text-[#8E877D] hover:text-[#F9F6F0]"
                          }`}
                        >
                          <span>{service}</span>
                          {active && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 3: COORDONNÉES & DESCRIPTION */}
              <div className="space-y-6 border-t border-[#282622] pt-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>3. Vos Coordonnées &amp; Vision du Projet</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Nom &amp; Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mehdi Bennani"
                      value={brief.fullName}
                      onChange={(e) => setBrief({ ...brief, fullName: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {profile === "b2b" && (
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Société / Cabinet / Établissement *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Studio Architecture / Hôtel..."
                        value={brief.companyName}
                        onChange={(e) => setBrief({ ...brief, companyName: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="06 XX XX XX XX / 07 XX XX XX XX"
                      value={brief.phone}
                      onChange={(e) => setBrief({ ...brief, phone: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={brief.email}
                      onChange={(e) => setBrief({ ...brief, email: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Ville du Projet *
                    </label>
                    <select
                      value={brief.city}
                      onChange={(e) => setBrief({ ...brief, city: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Casablanca">Casablanca &amp; Dar Bouazza</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Fès">Fès</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Autre ville">Autre ville</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Quartier / Zone (Optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Dar Bouazza, Californie, Souissi..."
                      value={brief.addressOrZone}
                      onChange={(e) => setBrief({ ...brief, addressOrZone: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                    Décrivez votre besoin, vos dimensions ou les modèles OÏKOS repérés (ex: CH1 Nelly, CH31 Cosmo...)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez vos attentes particulières, le nombre de convives, les contraintes d'espace ou vos inspirations..."
                    value={brief.projectVision}
                    onChange={(e) => setBrief({ ...brief, projectVision: e.target.value })}
                    className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-[#8E877D]">
                    Étude confidentielle sans engagement • Atelier OÏKOS : Errahma Bloc 80 N°112, Dar Bouazza, Casablanca.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.45)] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Générer Mon Dossier Clés en Main</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
