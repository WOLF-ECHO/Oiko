"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Calendar,
  Clock,
  Phone,
  Video,
  MapPin,
  CheckCircle2,
  Sparkles,
  Send,
  MessageCircle,
  ShieldCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [meetingType, setMeetingType] = useState<"showroom-casa" | "showroom-rabat" | "video" | "call">("showroom-casa");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("15:00");
  const [projectScope, setProjectScope] = useState<string>("Salon de réception contemporain");
  const [budgetRange, setBudgetRange] = useState<string>("25 000 - 60 000 DH");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "Casablanca",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Suggested dates: Next 5 business days
  const upcomingDates = [
    { label: "Aujourd'hui", day: "Lun 14", date: "2026-09-07" },
    { label: "Demain", day: "Mar 15", date: "2026-09-08" },
    { label: "Mercredi", day: "Mer 16", date: "2026-09-09" },
    { label: "Jeudi", day: "Jeu 17", date: "2026-09-10" },
    { label: "Vendredi", day: "Ven 18", date: "2026-09-11" },
    { label: "Samedi", day: "Sam 19", date: "2026-09-12" },
  ];

  const timeSlots = [
    "10:30",
    "11:30",
    "14:30",
    "15:30",
    "16:30",
    "17:30",
    "18:30",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getMeetingTypeLabel = () => {
    switch (meetingType) {
      case "showroom-casa":
        return "Visite Privée Showroom Casablanca (Triangle d'Or)";
      case "showroom-rabat":
        return "Visite Privée Showroom Rabat (Souissi)";
      case "video":
        return "Consultation Vidéo Décorateur (Google Meet / Zoom)";
      case "call":
        return "Rappel Téléphonique Prioritaire";
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <SectionHeading
            chapter="Conciergerie"
            eyebrow="Rendez-Vous &bull; Appel &bull; Visite"
            title="Planifier Votre Échange avec VELMORA"
            subtitle="Réservez une visite privée de la Galerie Habitable à Casablanca, planifiez un appel téléphonique prioritaire ou une séance d'aménagement à distance."
          />
        </div>

        {/* Main Grid: Form on Left, Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: The Interactive Appointment & Call Booking Module */}
          <div className="lg:col-span-8 bg-[#161513] rounded-3xl p-6 sm:p-10 border border-[#282622]">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                    Demande Enregistrée avec Succès
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0]">
                    Merci, {formData.firstName}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4BEB4] max-w-md mx-auto leading-relaxed">
                    Votre rendez-vous pour une <strong>{getMeetingTypeLabel()}</strong> le{" "}
                    <strong>{selectedDate || "date convenue"}</strong> à <strong>{selectedTime}</strong> a bien été transmis à notre conciergerie.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0C0B0A] border border-[#282622] max-w-md mx-auto text-left space-y-2 text-xs text-[#8E877D]">
                  <p className="text-[#F9F6F0] font-medium">Récapitulatif :</p>
                  <p>• Téléphone de confirmation : <span className="text-[#C5A880]">{formData.phone}</span></p>
                  <p>• Projet : <span className="text-[#F9F6F0]">{projectScope}</span> ({budgetRange})</p>
                  <p>• Un SMS et un message WhatsApp de confirmation vous ont été envoyés.</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/212661234567?text=Bonjour%20VELMORA,%20je%20viens%20de%20réserver%20un%20RDV%20pour%20${encodeURIComponent(formData.firstName)}%20(${encodeURIComponent(getMeetingTypeLabel())}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ouvrir sur WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3.5 rounded-full border border-[#282622] text-xs text-[#C4BEB4] hover:text-[#F9F6F0] uppercase tracking-wider"
                  >
                    Nouveau rendez-vous
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Choice of Meeting Type */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
                    1. Format Souhaité
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMeetingType("showroom-casa")}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                        meetingType === "showroom-casa"
                          ? "border-[#C5A880] bg-[#1E1D1A] shadow-md"
                          : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#F9F6F0] block">
                          Showroom Casablanca
                        </span>
                        <span className="text-[11px] text-[#8E877D] block mt-0.5">
                          Visite privée au Boulevard d&apos;Anfa
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMeetingType("showroom-rabat")}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                        meetingType === "showroom-rabat"
                          ? "border-[#C5A880] bg-[#1E1D1A] shadow-md"
                          : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#F9F6F0] block">
                          Showroom Rabat (Souissi)
                        </span>
                        <span className="text-[11px] text-[#8E877D] block mt-0.5">
                          Espace d&apos;accueil et matériauthèque
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMeetingType("call")}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                        meetingType === "call"
                          ? "border-[#C5A880] bg-[#1E1D1A] shadow-md"
                          : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                      }`}
                    >
                      <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#F9F6F0] block">
                          Rappel Téléphonique Prioritaire
                        </span>
                        <span className="text-[11px] text-[#8E877D] block mt-0.5">
                          Échange direct avec un conseiller
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMeetingType("video")}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                        meetingType === "video"
                          ? "border-[#C5A880] bg-[#1E1D1A] shadow-md"
                          : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                      }`}
                    >
                      <Video className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#F9F6F0] block">
                          Consultation Vidéo
                        </span>
                        <span className="text-[11px] text-[#8E877D] block mt-0.5">
                          Partage d&apos;écran sur vos plans
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Date & Time Slot Selection */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
                    2. Date &amp; Créneau d&apos;Accueil
                  </label>

                  {/* Dates Pills */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {upcomingDates.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDate(item.date)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedDate === item.date
                            ? "border-[#C5A880] bg-[#C5A880] text-[#0C0B0A]"
                            : "border-[#282622] bg-[#0C0B0A] text-[#8E877D] hover:text-[#F9F6F0] hover:bg-[#1E1D1A]"
                        }`}
                      >
                        <span className="text-[10px] uppercase block">{item.label}</span>
                        <span className="text-xs font-bold block mt-0.5">{item.day}</span>
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="pt-2">
                    <span className="text-[11px] text-[#8E877D] block mb-2">
                      Heure de rendez-vous :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedTime === time
                              ? "bg-[#C5A880] text-[#0C0B0A] font-bold"
                              : "bg-[#0C0B0A] text-[#C4BEB4] border border-[#282622] hover:border-[#C5A880]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Project Details */}
                <div className="space-y-3 border-t border-[#282622] pt-6">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
                    3. Nature du Projet d&apos;Intérieur
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Espace Concerné
                      </label>
                      <select
                        value={projectScope}
                        onChange={(e) => setProjectScope(e.target.value)}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Salon de réception contemporain">Salon de réception complet</option>
                        <option value="Salle à manger & Table travertin">Salle à manger &amp; Table d&apos;apparat</option>
                        <option value="Suite parentale & Espace nuit">Suite parentale &amp; Espace nuit</option>
                        <option value="Villa entière / Appartement complet">Aménagement d&apos;une villa entière</option>
                        <option value="Pièce Signature Unique / Art Mural">Pièce Signature unique / Art mural</option>
                        <option value="Projet Professionnel / Restaurant / Hôtel">Projet Professionnel / Hôtel / Restaurant</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Enveloppe Budgétaire Indicative
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="12 000 - 25 000 DH">12 000 - 25 000 DH</option>
                        <option value="25 000 - 60 000 DH">25 000 - 60 000 DH</option>
                        <option value="60 000 - 150 000 DH">60 000 - 150 000 DH</option>
                        <option value="+150 000 DH (Projet Global)">+150 000 DH (Projet Global)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Contact Coordinates */}
                <div className="space-y-3 border-t border-[#282622] pt-6">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
                    4. Vos Coordonnées
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Yassine"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="El Amrani"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="yassine@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#8E877D] block">
                      Notes ou souhaits particuliers (Facultatif)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Précisez vos dimensions, le quartier de votre bien ou toute demande spécifique..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-xs font-semibold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirmer ma demande de rendez-vous</span>
                  </button>
                  <p className="text-[11px] text-[#8E877D] text-center mt-3">
                    Confirmation immédiate par notre équipe commerciale sous 30 minutes. Données protégées (Loi CNDP 09-08).
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Direct Concierge & Showrooms Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* WhatsApp Direct Card */}
            <div className="bg-gradient-to-b from-[#1E1D1A] to-[#161513] border border-[#C5A880]/40 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Conciergerie WhatsApp Active</span>
              </div>
              <h4 className="font-serif text-2xl text-[#F9F6F0]">
                Besoin d&apos;une Réponse Instantanée ?
              </h4>
              <p className="text-xs text-[#C4BEB4] leading-relaxed">
                Notre conseiller en aménagement est disponible sur WhatsApp pour vous orienter, vous envoyer des photos d&apos;échantillons ou caler un créneau en direct.
              </p>
              <a
                href="https://wa.me/212661234567?text=Bonjour%20VELMORA,%20je%20souhaite%20un%20conseil%20pour%20mon%20projet%20d'intérieur."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#DEC5A5] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Lancer le Chat WhatsApp</span>
              </a>
            </div>

            {/* Casablanca Coordinates */}
            <div className="bg-[#161513] border border-[#282622] rounded-3xl p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
                Showroom Principal
              </span>
              <h4 className="font-serif text-xl text-[#F9F6F0]">
                Casablanca • Triangle d&apos;Or
              </h4>
              <div className="space-y-2 text-xs text-[#8E877D]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>Angle Bd d&apos;Anfa &amp; Rue Bab Mansour, 20050 Casablanca</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Mardi au Samedi : 10h00 - 19h30</span>
                </p>
                <p className="flex items-center gap-2 text-[#C4BEB4]">
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>+212 (0) 5 22 00 11 22</span>
                </p>
              </div>
            </div>

            {/* Rabat Coordinates */}
            <div className="bg-[#161513] border border-[#282622] rounded-3xl p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
                Studio de Conception
              </span>
              <h4 className="font-serif text-xl text-[#F9F6F0]">
                Rabat • Souissi
              </h4>
              <div className="space-y-2 text-xs text-[#8E877D]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>Avenue Mohammed VI, Souissi, Rabat</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Sur rendez-vous du Lundi au Vendredi</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
