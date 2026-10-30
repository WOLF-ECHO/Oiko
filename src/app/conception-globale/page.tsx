"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PRODUCTS, Product } from "@/data/products";
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
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Phone,
  Mail,
  Sliders,
} from "lucide-react";

type ClientProfile = "particulier" | "b2b";

export default function ConceptionGlobalePage() {
  const [profile, setProfile] = useState<ClientProfile>("particulier");
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);
  const [passportId, setPassportId] = useState<string>("");

  const [brief, setBrief] = useState({
    // Common contact
    fullName: "",
    companyName: "",
    role: "Architecte d'intérieur / Décorateur",
    phone: "",
    email: "",
    city: "Casablanca",
    addressOrZone: "",
    visitAtelier: true,
    // Step 1: Project Scope
    propertyType: "Villa contemporaine",
    b2bSector: "Hôtellerie / Boutique Hôtel / Riad",
    spacesToDesign: ["Salon de réception", "Salle à manger d'apparat"],
    // Step 2: Dimensions & Layout
    surfaceArea: "120 m² à 250 m² (Réception complète)",
    seatQuantity: "25 à 60 pièces (Restaurant / Lobby)",
    projectStatus: "En cours de gros œuvre / second œuvre",
    layoutStyle: "Salon en L & Salon Marocain contemporain",
    hasPlans: "Oui, plans d'architecte ou photos disponibles",
    // Step 3: Aesthetic Atmosphere & Noble Materials
    styleAtmosphere: "Quiet Luxury & Minéral (Travertin, Bouclette, Noyer)",
    selectedMaterials: ["Noyer massif", "Tissu bouclé", "Travertin", "Laiton brossé"],
    // Step 4: Selected Favorite Catalog Models (CH1 to CH55)
    selectedProductSlugs: ["fauteuil-nelly-ch1", "chaise-lucca-ch2"],
    // Step 5: Deliverables, Budget, Timing
    servicesNeeded: [
      "Étude d'implantation & Plans 2D/3D",
      "Fabrication de mobilier sur mesure",
      "Livraison & Installation Installation Soignée à Domicile",
    ],
    timeline: "Sous 1 à 2 mois",
    budgetRange: "100 000 – 250 000 DH",
    projectVision: "",
  });

  const residentialSpaces = [
    "Salon de réception contemporain",
    "Salon Marocain contemporain",
    "Salle à manger d'apparat",
    "Suite parentale & Espace nuit",
    "Terrasse couverte & Véranda",
    "Villa ou Penthouse complet",
  ];

  const b2bSpaces = [
    "Restaurant Gastronomique & Bar",
    "Lobby, Réception & Suites d'Hôtel",
    "Bureaux de Direction & Salle de Conseil",
    "Showroom & Espace Retail de Luxe",
    "Villa Témoin / Promotion Immobilière",
    "Résidence Hôtelière & Airbnb de Luxe",
  ];

  const atmospheres = [
    {
      id: "quiet-luxury",
      title: "Quiet Luxury & Minéral",
      desc: "Lignes pures, travertin romain, bouclette ivoire et noyer huilé mat.",
      badge: "Signature OÏKOS",
    },
    {
      id: "marocain-moderne",
      title: "Salon Marocain Contemporain",
      desc: "Banquettes basses architecturales, velours ras et tables en marbre épurées.",
      badge: "Héritage Réinventé",
    },
    {
      id: "organique-chaud",
      title: "Contemporain Organique",
      desc: "Bois de chêne naturel, lin lavé lourd, arrondis doux et céramique artisanale.",
      badge: "Sérénité & Nature",
    },
    {
      id: "architectural-sombre",
      title: "Élégance Sombre & Contrastée",
      desc: "Chêne ébénisé noir, cuir pleine fleur, laiton brossé et marbres profonds.",
      badge: "Caractère Affirmé",
    },
  ];

  const nobleMaterialsList = [
    "Noyer massif de l'Atlas",
    "Chêne blanchi naturel",
    "Chêne teinté noir ébène",
    "Tissu bouclé italien d'alpaga",
    "Velours ras doux haute résistance",
    "Lin lourd naturel",
    "Cuir pleine fleur",
    "Travertin romain",
    "Marbre noir Marquina",
    "Laiton brossé",
  ];

  const availableDeliverables = [
    "Étude d'implantation & Plans 2D/3D",
    "Planches d'ambiance & Matériauthèque dédiée",
    "Fabrication de mobilier sur mesure en atelier",
    "Habillage mural, boiseries & agencement",
    "Éclairage architectural & Décoration",
    "Livraison & Installation Installation Soignée à Domicile",
  ];

  const toggleArrayItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleSpaceToggle = (space: string) => {
    setBrief((prev) => ({
      ...prev,
      spacesToDesign: toggleArrayItem(prev.spacesToDesign, space),
    }));
  };

  const handleMaterialToggle = (mat: string) => {
    setBrief((prev) => ({
      ...prev,
      selectedMaterials: toggleArrayItem(prev.selectedMaterials, mat),
    }));
  };

  const handleProductToggle = (slug: string) => {
    setBrief((prev) => ({
      ...prev,
      selectedProductSlugs: toggleArrayItem(prev.selectedProductSlugs, slug),
    }));
  };

  const handleDeliverableToggle = (service: string) => {
    setBrief((prev) => ({
      ...prev,
      servicesNeeded: toggleArrayItem(prev.servicesNeeded, service),
    }));
  };

  // Generate Passport ID on submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const id = `OIK-CG-2026-${randomHex}`;
    setPassportId(id);
    setSubmitted(true);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  // Selected products details
  const selectedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => brief.selectedProductSlugs.includes(p.slug));
  }, [brief.selectedProductSlugs]);

  // Recommended products based on atmosphere
  const recommendedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => !brief.selectedProductSlugs.includes(p.slug)).slice(0, 4);
  }, [brief.selectedProductSlugs]);

  const buildWhatsAppSummary = () => {
    const typeLabel =
      profile === "particulier"
        ? `Résidentiel Privé (${brief.propertyType})`
        : `B2B Professionnel (${brief.b2bSector} - ${brief.companyName || brief.role})`;

    const selectedChairsNames = selectedProducts.map((p) => `${p.name} (${p.subtitle.split("•")[1]?.trim() || "Réf" })`).join(", ");

    const text = [
      `🏛️ DOSSIER DE CONCEPTION GLOBALE — OÏKOS`,
      `Réf. Passeport : ${passportId || "OIK-CG-2026"}`,
      `---------------------------------------`,
      `• Profil : ${typeLabel}`,
      `• Contact : ${brief.fullName} (${brief.phone})`,
      `• Ville : ${brief.city} ${brief.addressOrZone ? `(${brief.addressOrZone})` : ""}`,
      `• Espaces : ${brief.spacesToDesign.join(", ")}`,
      `• Envergure : ${profile === "particulier" ? brief.surfaceArea : brief.seatQuantity}`,
      `• Avancement : ${brief.projectStatus}`,
      `• Direction de style : ${brief.styleAtmosphere}`,
      `• Matières privilégiées : ${brief.selectedMaterials.join(", ")}`,
      selectedChairsNames ? `• Modèles OÏKOS retenus : ${selectedChairsNames}` : "",
      `• Prestations souhaitées : ${brief.servicesNeeded.join(", ")}`,
      `• Budget estimé : ${brief.budgetRange}`,
      `• Délai souhaité : ${brief.timeline}`,
      `• RDV Atelier Dar Bouazza souhaité : ${brief.visitAtelier ? "OUI (10h00 - 19h00)" : "Non, par correspondance"}`,
      brief.projectVision ? `• Précisions : ${brief.projectVision}` : "",
      `---------------------------------------`,
      `Merci de m'indiquer la disponibilité d'un conseiller pour l'étude de ce projet.`,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/212722033326?text=${encodeURIComponent(text)}`;
  };

  const stepsLabels = [
    "1. Typologie & Espaces",
    "2. Cotes & Configuration",
    "3. Style & Matières",
    "4. Modèles Catalogue",
    "5. Prestations & Contact",
  ];

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* 1. Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <SectionHeading
              chapter="Service Clés en Main &bull; Conception Globale"
              eyebrow="Architecture d'Intérieur &amp; Manufacture d'Atelier"
              title="Conception Globale OÏKOS"
              subtitle="De la première esquisse architecturale à la livraison installation soignée. Notre studio et notre atelier à Dar Bouazza (Casablanca) conçoivent et fabriquent vos intérieurs de prestige sur mesure."
            />
          </div>
        </ScrollReveal>

        {/* 2. 4-Phase Turnkey Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3 hover:border-[#C5A880]/50 transition-all">
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
              Analyse des plans ou visite sur site, définition des flux de circulation et sélection tactile de la matériauthèque.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3 hover:border-[#C5A880]/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 02
              </span>
              <Ruler className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Calepinage &amp; Modélisation 3D
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Plans d&apos;implantation 2D/3D et adaptation millimétrée de vos chaises, salons marocains et fauteuils.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3 hover:border-[#C5A880]/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 03
              </span>
              <Layers className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Manufacture à Dar Bouazza
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Façonnage artisanal intégral dans notre atelier de Casablanca par nos maîtres ébénistes et tapissiers d&apos;art.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#161513] border border-[#282622] space-y-3 hover:border-[#C5A880]/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                Étape 04
              </span>
              <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h3 className="font-serif text-xl text-[#F9F6F0]">
              Installation Installation Soignée à Domicile
            </h3>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Mise en place scénographique soignée partout au Maroc et garantie atelier de 6 mois certifiée.
            </p>
          </div>
        </div>

        {/* 3. THE INTERACTIVE DIAGNOSTIC QUESTIONNAIRE ENGINE */}
        <div id="diagnostic-engine" className="bg-[#161513] border border-[#282622] rounded-3xl p-6 sm:p-12 space-y-10 shadow-2xl">
          {/* Header & Mode Switch */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#282622] pb-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                Moteur de Diagnostic de Projet Clés en Main
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#F9F6F0] font-light">
                {submitted ? "Votre Passeport Projet OÏKOS" : "Configurez Votre Cahier des Charges"}
              </h2>
              <p className="text-xs sm:text-sm text-[#8E877D] max-w-xl">
                {submitted
                  ? "Votre dossier complet est synthétisé et prêt à être transmis à notre direction d'atelier."
                  : "Parcourez les 5 étapes interactives pour cadrer votre vision, sélectionner vos modèles favoris et recevoir une étude chiffrée sous 24h."}
              </p>
            </div>

            {!submitted && (
              <div className="inline-flex p-1.5 rounded-2xl bg-[#0C0B0A] border border-[#282622] self-start">
                <button
                  type="button"
                  onClick={() => {
                    setProfile("particulier");
                    setBrief((b) => ({
                      ...b,
                      spacesToDesign: ["Salon de réception contemporain", "Salle à manger d'apparat"],
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
                      spacesToDesign: ["Restaurant Gastronomique & Bar", "Lobby, Réception & Suites d'Hôtel"],
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
            )}
          </div>

          {/* Stepper Progress Bar (Only during wizard) */}
          {!submitted && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8E877D]">
                <span className="text-[#C5A880] font-semibold uppercase tracking-wider">
                  Étape 0{step} / 05 &bull; {stepsLabels[step - 1]}
                </span>
                <span className="hidden sm:inline">
                  {Math.round((step / 5) * 100)}% complété
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#0C0B0A] rounded-full overflow-hidden border border-[#282622]">
                <div
                  className="h-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] transition-all duration-500 rounded-full"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>

              {/* Step Pills Navigation */}
              <div className="hidden md:grid grid-cols-5 gap-2 pt-2">
                {stepsLabels.map((lbl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setStep(idx + 1)}
                    className={`text-left p-2.5 rounded-xl border text-[11px] transition-all ${
                      step === idx + 1
                        ? "border-[#C5A880] bg-[#1E1D1A] text-[#F9F6F0] font-medium"
                        : step > idx + 1
                        ? "border-[#282622] bg-[#0C0B0A] text-[#C5A880]"
                        : "border-[#282622]/50 bg-[#0C0B0A]/40 text-[#6E675E]"
                    }`}
                  >
                    <span className="block">{lbl}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SUBMITTED VIEW: THE LUXURY PROJECT PASSPORT */}
          {submitted ? (
            <div className="py-8 space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto">
              {/* Passport Header Badge */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1E1D1A] to-[#12110F] border border-[#C5A880] relative overflow-hidden space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282622] pb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-bold block mb-1">
                      Passeport Officiel de Conception Globale
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0]">
                      {brief.fullName}
                    </h3>
                    <p className="text-xs text-[#8E877D] mt-1">
                      {profile === "particulier" ? "Projet Résidentiel Privé" : `Projet B2B • ${brief.companyName || brief.role}`} &bull; {brief.city}
                    </p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] text-[#8E877D] uppercase tracking-widest block">
                      Référence Unique
                    </span>
                    <span className="font-mono text-lg sm:text-xl text-[#C5A880] font-bold tracking-wider">
                      {passportId}
                    </span>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase tracking-wider font-semibold">
                      Dossier Qualifié
                    </span>
                  </div>
                </div>

                {/* Synthesis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#C4BEB4]">
                  <div className="space-y-3 bg-[#0C0B0A] p-5 rounded-2xl border border-[#282622]">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                      Périmètre &amp; Configuration
                    </span>
                    <p>• <strong>Espaces :</strong> {brief.spacesToDesign.join(", ")}</p>
                    <p>• <strong>Envergure :</strong> {profile === "particulier" ? brief.surfaceArea : brief.seatQuantity}</p>
                    <p>• <strong>Avancement :</strong> {brief.projectStatus}</p>
                    <p>• <strong>Agencement souhaité :</strong> {brief.layoutStyle}</p>
                  </div>

                  <div className="space-y-3 bg-[#0C0B0A] p-5 rounded-2xl border border-[#282622]">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                      Style, Matières &amp; Modalités
                    </span>
                    <p>• <strong>Direction :</strong> {brief.styleAtmosphere}</p>
                    <p>• <strong>Matières sélectionnées :</strong> {brief.selectedMaterials.join(", ")}</p>
                    <p>• <strong>Prestations :</strong> {brief.servicesNeeded.join(", ")}</p>
                    <p>• <strong>Budget &amp; Délai :</strong> {brief.budgetRange} &bull; {brief.timeline}</p>
                  </div>
                </div>

                {/* Selected Furniture Highlights */}
                {selectedProducts.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                      Modèles OÏKOS Sélectionnés par le Client ({selectedProducts.length}) :
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedProducts.map((p) => (
                        <div key={p.id} className="p-3 rounded-xl bg-[#0C0B0A] border border-[#282622] flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#161513] shrink-0 border border-[#282622]">
                            <Image src={p.images[0]} alt={p.name} fill unoptimized className="object-contain p-1" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="font-serif text-xs text-[#F9F6F0] block truncate">{p.name}</span>
                            <span className="text-[10px] text-[#C5A880] block">{p.subtitle.split("•")[1]?.trim()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Atelier Appointment Notice */}
                <div className="p-4 rounded-2xl bg-[#0C0B0A] border border-[#C5A880]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <div>
                      <span className="text-[#F9F6F0] font-medium block">
                        Atelier &amp; Matériauthèque OÏKOS :
                      </span>
                      <span className="text-[#8E877D] text-[11px]">
                        Errahma Bloc 80 N°112, Dar Bouazza, Casablanca &bull; Mardi au Samedi : 10h00 - 19h00
                      </span>
                    </div>
                  </div>
                  <span className="text-[#C5A880] text-xs font-semibold whitespace-nowrap">
                    {brief.visitAtelier ? "✓ Visite privée demandée" : "Visite à distance"}
                  </span>
                </div>
              </div>

              {/* Instant Transmission Actions */}
              <div className="space-y-4 text-center">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Transmission Directe en 1 Clic
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={buildWhatsAppSummary()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(197,168,128,0.4)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Transmettre mon dossier sur WhatsApp (07 22 03 33 26)</span>
                  </a>

                  <a
                    href={`mailto:oikosmaison@gmail.com?subject=${encodeURIComponent(`Dossier Conception Globale [${passportId}] - ${brief.fullName}`)}&body=${encodeURIComponent(`Bonjour l'équipe OÏKOS,\n\nVoici mon dossier de Conception Globale :\nRéférence : ${passportId}\nNom : ${brief.fullName}\nTéléphone : ${brief.phone}\nVille : ${brief.city}\nProfil : ${profile === "particulier" ? brief.propertyType : brief.b2bSector}\nEspaces : ${brief.spacesToDesign.join(", ")}\nBudget : ${brief.budgetRange}\nDélai : ${brief.timeline}\nPrécisions : ${brief.projectVision}`)}`}
                    className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#C5A880]/50 text-[#C5A880] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A880]/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Envoyer par Email (oikosmaison@gmail.com)</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="text-xs text-[#8E877D] hover:text-[#F9F6F0] underline underline-offset-4"
                  >
                    Modifier mes réponses / Nouveau questionnaire
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* WIZARD FORM: 5 INTERACTIVE STEPS */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1: TYPOLOGIE & ESPACES */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                      Étape 01 &bull; Destination &amp; Espaces à Sublimer
                    </span>
                    <h3 className="font-serif text-2xl text-[#F9F6F0]">
                      {profile === "particulier"
                        ? "Quel type de résidence souhaitez-vous aménager ?"
                        : "Quel est le secteur d'activité de votre établissement ?"}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(profile === "particulier"
                      ? [
                          { title: "Villa contemporaine", desc: "Grands volumes, salon européen & marocain" },
                          { title: "Appartement de prestige / Penthouse", desc: "Réception citadine soignée" },
                          { title: "Riad ou Demeure de caractère", desc: "Patio, alcôves & volumes traditionnels" },
                          { title: "Résidence secondaire / Balnéaire", desc: "Matières naturelles, lin & lumière" },
                        ]
                      : [
                          { title: "Hôtellerie / Boutique Hôtel / Riad", desc: "Suites de prestige & lobby" },
                          { title: "Restaurant / Café / Lounge", desc: "Banquettes, chaises & acoustique" },
                          { title: "Bureaux de Direction & Siège", desc: "Espaces exécutifs statutaires" },
                          { title: "Promotion Immobilière / Villa Témoin", desc: "Mise en scène pour valorisation" },
                        ]
                    ).map((item) => {
                      const active =
                        profile === "particulier"
                          ? brief.propertyType === item.title
                          : brief.b2bSector === item.title;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => {
                            if (profile === "particulier") {
                              setBrief({ ...brief, propertyType: item.title });
                            } else {
                              setBrief({ ...brief, b2bSector: item.title });
                            }
                          }}
                          className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                            active
                              ? "bg-[#1E1D1A] border-[#C5A880] shadow-[0_10px_25px_rgba(197,168,128,0.15)]"
                              : "bg-[#0C0B0A] border-[#282622] hover:border-[#6E675E]"
                          }`}
                        >
                          <span className={`text-sm font-serif ${active ? "text-[#C5A880]" : "text-[#F9F6F0]"}`}>
                            {item.title}
                          </span>
                          <span className="text-[11px] text-[#8E877D] leading-relaxed">
                            {item.desc}
                          </span>
                          {active && (
                            <span className="text-[10px] text-[#C5A880] font-bold uppercase tracking-widest pt-2 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Sélectionné
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Spaces Multi-select */}
                  <div className="space-y-3 pt-4 border-t border-[#282622]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-wider text-[#8E877D] block">
                        Cochez les espaces concernés par le projet (plusieurs choix possibles) :
                      </label>
                      <span className="text-[11px] text-[#C5A880]">
                        {brief.spacesToDesign.length} espace(s) sélectionné(s)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(profile === "particulier" ? residentialSpaces : b2bSpaces).map((space) => {
                        const active = brief.spacesToDesign.includes(space);
                        return (
                          <button
                            key={space}
                            type="button"
                            onClick={() => handleSpaceToggle(space)}
                            className={`p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                              active
                                ? "bg-[#1E1D1A] border-[#C5A880] text-[#F9F6F0] font-medium"
                                : "bg-[#0C0B0A] border-[#282622] text-[#8E877D] hover:text-[#F9F6F0]"
                            }`}
                          >
                            <span>{space}</span>
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                active
                                  ? "bg-[#C5A880] border-[#C5A880] text-[#0C0B0A]"
                                  : "border-[#6E675E]"
                              }`}
                            >
                              {active && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: COTES & CONFIGURATION */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                      Étape 02 &bull; Cotes, Envergure &amp; Configuration Spatiale
                    </span>
                    <h3 className="font-serif text-2xl text-[#F9F6F0]">
                      Précisons les volumes et l&apos;état d&apos;avancement
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        {profile === "particulier" ? "Surface Approximative à Aménager" : "Volume Estimé de Sièges / Assises"}
                      </label>
                      <select
                        value={profile === "particulier" ? brief.surfaceArea : brief.seatQuantity}
                        onChange={(e) => {
                          if (profile === "particulier") {
                            setBrief({ ...brief, surfaceArea: e.target.value });
                          } else {
                            setBrief({ ...brief, seatQuantity: e.target.value });
                          }
                        }}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        {profile === "particulier" ? (
                          <>
                            <option value="Moins de 50 m² (1 salon ciblé)">Moins de 50 m² (1 salon ciblé)</option>
                            <option value="50 m² à 120 m² (Réception complète)">50 m² à 120 m² (Réception complète)</option>
                            <option value="120 m² à 250 m² (Réception complète)">120 m² à 250 m² (Grande réception)</option>
                            <option value="Plus de 250 m² (Villa ou Riad entier)">Plus de 250 m² (Villa ou Riad entier)</option>
                          </>
                        ) : (
                          <>
                            <option value="10 à 25 pièces (Espace VIP / Lounge)">10 à 25 pièces (Espace VIP / Lounge)</option>
                            <option value="25 à 60 pièces (Restaurant / Lobby)">25 à 60 pièces (Restaurant / Lobby)</option>
                            <option value="60 à 150 pièces (Établissement complet)">60 à 150 pièces (Établissement complet)</option>
                            <option value="Plus de 150 pièces (Grand programme)">Plus de 150 pièces (Grand programme)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Stade du Projet
                      </label>
                      <select
                        value={brief.projectStatus}
                        onChange={(e) => setBrief({ ...brief, projectStatus: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Sur plan d'architecte / En construction">Sur plan d&apos;architecte / En construction</option>
                        <option value="En cours de gros œuvre / second œuvre">En cours de gros œuvre / second œuvre</option>
                        <option value="Bien terminé / Ameublement immédiat">Bien terminé / Ameublement immédiat</option>
                        <option value="Rénovation d'un intérieur existant">Rénovation d&apos;un intérieur existant</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Plans &amp; Prise de Cotes
                      </label>
                      <select
                        value={brief.hasPlans}
                        onChange={(e) => setBrief({ ...brief, hasPlans: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Oui, plans d'architecte ou photos disponibles">Oui, plans 2D/3D ou photos disponibles</option>
                        <option value="Croquis sommaire / Cotes manuelles">Croquis sommaire / Cotes manuelles</option>
                        <option value="Besoin d'un relevé sur place par l'équipe OÏKOS">Besoin d&apos;un relevé sur site par l&apos;équipe OÏKOS</option>
                      </select>
                    </div>
                  </div>

                  {/* Agencement typologique */}
                  <div className="space-y-3 pt-4 border-t border-[#282622]">
                    <label className="text-xs uppercase tracking-wider text-[#8E877D] block">
                      Quelle configuration d&apos;assise imaginez-vous prioritairement ?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        "Salon en L & Salon Marocain contemporain",
                        "Grand ensemble face-à-face avec fauteuils centraux",
                        "Salle à manger 8 à 14 couverts avec chaises sculpturales",
                        "Coin Lounge lecture & Fauteuils bouclette",
                        "Aménagement banquetting & chaises en série (B2B)",
                        "Agencement libre sur proposition du Studio OÏKOS",
                      ].map((item) => {
                        const active = brief.layoutStyle === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setBrief({ ...brief, layoutStyle: item })}
                            className={`p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                              active
                                ? "bg-[#1E1D1A] border-[#C5A880] text-[#F9F6F0] font-medium"
                                : "bg-[#0C0B0A] border-[#282622] text-[#8E877D] hover:text-[#F9F6F0]"
                            }`}
                          >
                            <span>{item}</span>
                            {active && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DIRECTION ESTHÉTIQUE & MATIÈRES */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                      Étape 03 &bull; Direction Esthétique &amp; Nuancier de Matières
                    </span>
                    <h3 className="font-serif text-2xl text-[#F9F6F0]">
                      Définissez l&apos;ambiance émotionnelle de vos espaces
                    </h3>
                  </div>

                  {/* Atmosphere Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {atmospheres.map((atm) => {
                      const active = brief.styleAtmosphere.startsWith(atm.title);
                      return (
                        <button
                          key={atm.id}
                          type="button"
                          onClick={() => setBrief({ ...brief, styleAtmosphere: `${atm.title} - ${atm.desc}` })}
                          className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                            active
                              ? "bg-[#1E1D1A] border-[#C5A880] shadow-[0_10px_30px_rgba(197,168,128,0.2)]"
                              : "bg-[#0C0B0A] border-[#282622] hover:border-[#6E675E]"
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
                              {atm.badge}
                            </span>
                            <h4 className="font-serif text-lg text-[#F9F6F0]">
                              {atm.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[#8E877D] leading-relaxed">
                            {atm.desc}
                          </p>
                          {active && (
                            <span className="text-[10px] text-[#C5A880] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Ambiance Sélectionnée
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Noble Materials Selector */}
                  <div className="space-y-3 pt-4 border-t border-[#282622]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-wider text-[#8E877D] block">
                        Cochez les matières nobles que vous souhaitez voir vivre dans vos pièces :
                      </label>
                      <span className="text-[11px] text-[#C5A880]">
                        {brief.selectedMaterials.length} matière(s) retenue(s)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {nobleMaterialsList.map((mat) => {
                        const active = brief.selectedMaterials.includes(mat);
                        return (
                          <button
                            key={mat}
                            type="button"
                            onClick={() => handleMaterialToggle(mat)}
                            className={`px-4 py-2 rounded-full text-xs transition-all border flex items-center gap-2 ${
                              active
                                ? "bg-[#C5A880] text-[#0C0B0A] border-[#C5A880] font-semibold shadow-md"
                                : "bg-[#0C0B0A] text-[#C4BEB4] border-[#282622] hover:border-[#C5A880]"
                            }`}
                          >
                            <span>{mat}</span>
                            {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CATALOGUE COUPS DE CŒUR */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                        Étape 04 &bull; Modèles Coups de Cœur OÏKOS
                      </span>
                      <h3 className="font-serif text-2xl text-[#F9F6F0]">
                        Sélectionnez les modèles qui vous inspirent
                      </h3>
                      <p className="text-xs text-[#8E877D]">
                        Cliquez sur les sièges de la manufacture que vous souhaiteriez intégrer ou chiffrer.
                      </p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-full bg-[#1E1D1A] border border-[#C5A880]/50 text-xs text-[#C5A880] font-medium shrink-0">
                      {brief.selectedProductSlugs.length} modèle(s) sélectionné(s)
                    </div>
                  </div>

                  {/* Grid of chairs/armchairs with fast toggle */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                    {PRODUCTS.map((product) => {
                      const active = brief.selectedProductSlugs.includes(product.slug);
                      return (
                        <div
                          key={product.id}
                          onClick={() => handleProductToggle(product.slug)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between group ${
                            active
                              ? "bg-[#1E1D1A] border-[#C5A880] ring-1 ring-[#C5A880]"
                              : "bg-[#0C0B0A] border-[#282622] hover:border-[#6E675E]"
                          }`}
                        >
                          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#161513] mb-2">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              unoptimized
                              className="object-contain p-2 group-hover:scale-105 transition-transform"
                            />
                            {active && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#C5A880] text-[#0C0B0A] flex items-center justify-center">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-serif text-xs text-[#F9F6F0] block truncate">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-[#8E877D] block">
                              {product.subtitle.split("•")[1]?.trim()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: PRESTATIONS, BUDGET & CONTACT */}
              {step === 5 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                      Étape 05 &bull; Prestations, Budget &amp; Coordonnées
                    </span>
                    <h3 className="font-serif text-2xl text-[#F9F6F0]">
                      Finalisons votre dossier de Conception Globale
                    </h3>
                  </div>

                  {/* Prestations */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wider text-[#8E877D] block">
                      Niveau d&apos;accompagnement d&apos;Atelier souhaité :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableDeliverables.map((serv) => {
                        const active = brief.servicesNeeded.includes(serv);
                        return (
                          <button
                            key={serv}
                            type="button"
                            onClick={() => handleDeliverableToggle(serv)}
                            className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                              active
                                ? "bg-[#1E1D1A] border-[#C5A880] text-[#F9F6F0] font-medium"
                                : "bg-[#0C0B0A] border-[#282622] text-[#8E877D] hover:text-[#F9F6F0]"
                            }`}
                          >
                            <span>{serv}</span>
                            {active && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#282622]">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Enveloppe Budgétaire Cible
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

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Délai / Date de Livraison Souhaitée
                      </label>
                      <select
                        value={brief.timeline}
                        onChange={(e) => setBrief({ ...brief, timeline: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Prioritaire (Moins de 4 semaines)">Prioritaire (Moins de 4 semaines)</option>
                        <option value="Sous 1 à 2 mois">Sous 1 à 2 mois</option>
                        <option value="Sous 3 à 6 mois">Sous 3 à 6 mois</option>
                        <option value="En phase d'étude / Planification">En phase d&apos;étude / Planification</option>
                      </select>
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="space-y-4 pt-4 border-t border-[#282622]">
                    <span className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold block">
                      Vos Coordonnées Officielles
                    </span>

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
                          <option value="Casablanca & Dar Bouazza">Casablanca &amp; Dar Bouazza</option>
                          <option value="Rabat">Rabat</option>
                          <option value="Marrakech">Marrakech</option>
                          <option value="Tanger">Tanger</option>
                          <option value="Fès">Fès</option>
                          <option value="Agadir">Agadir</option>
                          <option value="Autre ville">Autre ville au Maroc</option>
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
                        Notes libres ou contraintes particulières
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: besoin d'un salon marocain avec 8 mètres linéaires, table travertin ovale 12 places..."
                        value={brief.projectVision}
                        onChange={(e) => setBrief({ ...brief, projectVision: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-4 py-3 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    {/* Atelier Visit Checkbox */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0C0B0A] border border-[#282622]">
                      <input
                        type="checkbox"
                        id="visitAtelier"
                        checked={brief.visitAtelier}
                        onChange={(e) => setBrief({ ...brief, visitAtelier: e.target.checked })}
                        className="mt-0.5 rounded border-[#282622] text-[#C5A880] focus:ring-[#C5A880]"
                      />
                      <label htmlFor="visitAtelier" className="text-xs text-[#C4BEB4] cursor-pointer space-y-0.5">
                        <span className="font-semibold text-[#F9F6F0] block">
                          Je souhaite être reçu en priorité à l&apos;Atelier de Dar Bouazza
                        </span>
                        <span className="text-[#8E877D] block text-[11px]">
                          Errahma Bloc 80 N°112, Dar Bouazza, Casablanca &bull; Mardi au Samedi : 10h00 - 19h00
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls between Steps */}
              <div className="pt-6 border-t border-[#282622] flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3.5 rounded-full border border-[#282622] text-xs text-[#C4BEB4] hover:text-[#F9F6F0] hover:bg-[#1E1D1A] uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Précédent</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-8 py-3.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider hover:bg-[#DEC5A5] flex items-center gap-2 transition-all shadow-lg"
                  >
                    <span>Étape Suivante</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.45)] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Générer Mon Passeport Projet</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
