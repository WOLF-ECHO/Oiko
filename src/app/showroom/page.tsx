import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SHOWROOM_ZONES } from "@/data/products";
import { MapPin, Calendar, Clock, Phone, Sparkles, Compass, ArrowRight, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Le Showroom Casablanca • La Galerie Habitable | OÏKOS",
  description:
    "Découvrez 'La Galerie Habitable' et le Studio de Conception de OÏKOS au Boulevard d'Anfa à Casablanca. Un showroom contemporain unique au Maroc. Visites privées sur rendez-vous au 07 22 03 33 26.",
};

export default function ShowroomPage() {
  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Editorial Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <SectionHeading
              chapter="Le Lieu Unique"
              eyebrow="Casablanca &bull; Triangle d'Or"
              title="La Galerie Habitable"
              subtitle="Notre showroom et studio de conception exclusif au Boulevard d'Anfa à Casablanca. Un espace immersif où le mobilier contemporain, les matières brutes et l'art mural sont mis en scène pour vous projeter."
            />
          </div>
        </ScrollReveal>

        {/* Hero Showroom Panorama */}
        <ScrollReveal yOffset={30}>
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#282622] bg-[#161513]">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
              alt="Showroom OÏKOS Casablanca"
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl space-y-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0C0B0A]/85 backdrop-blur-md text-[11px] uppercase tracking-wider text-[#C5A880] border border-[#282622] font-medium">
                Boulevard d&apos;Anfa, Casablanca
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#F9F6F0] font-light">
                Le Studio &amp; La Galerie Vivante de OÏKOS
              </h3>
            </div>
          </div>
        </ScrollReveal>

        {/* The 5 Immersive Zones Detailed */}
        <div className="space-y-12">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-2">
                Scénographie Intérieure
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0] font-light">
                Cinq Espaces Pour Vous Projeter à Casablanca
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWROOM_ZONES.map((zone, idx) => (
              <ScrollReveal key={zone.id} delay={idx * 0.1}>
                <div className="group rounded-2xl bg-[#161513] border border-[#282622] hover:border-[#C5A880]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E1D1A]">
                    <Image
                      src={zone.image}
                      alt={zone.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0C0B0A]/85 backdrop-blur-md text-[10px] text-[#C5A880] uppercase tracking-wider border border-[#282622] font-medium">
                      Zone 0{idx + 1}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A880] block mb-1">
                        {zone.tagline}
                      </span>
                      <h4 className="font-serif text-xl text-[#F9F6F0]">{zone.name}</h4>
                      <p className="text-xs text-[#8E877D] mt-2 leading-relaxed">
                        {zone.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#282622] space-y-2">
                      <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">
                        Spécificités :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {zone.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-[#0C0B0A] text-[11px] text-[#C4BEB4] border border-[#282622]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* 6th Card: Private Studio Consultation Callout */}
            <ScrollReveal delay={0.5}>
              <div className="rounded-2xl bg-gradient-to-br from-[#1E1D1A] to-[#161513] border border-[#C5A880]/50 p-8 flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block">
                    Visite Privilège
                  </span>
                  <h4 className="font-serif text-2xl text-[#F9F6F0] font-light">
                    Réserver le Showroom en Exclusivité
                  </h4>
                  <p className="text-xs text-[#C4BEB4] leading-relaxed">
                    Profitez d&apos;un créneau privé d&apos;une heure avec notre conseiller en aménagement. Étude de vos plans, café de bienvenue et sélection sur mesure d&apos;échantillons de matières nobles.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-center text-xs font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.35)] transition-all"
                >
                  Planifier ma visite privée
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Practical Showroom Information (CASABLANCA ONLY) */}
        <ScrollReveal yOffset={30}>
          <div className="bg-[#161513] border border-[#282622] rounded-3xl p-8 sm:p-14 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282622] pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-1">
                  Showroom Flagship &amp; Studio Unique
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0]">
                  Casablanca • Triangle d&apos;Or
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase self-start sm:self-auto">
                Sur Rendez-vous Privé
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#C4BEB4]">
              <div className="space-y-4">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>Angle Boulevard d&apos;Anfa &amp; Rue Bab Mansour, Triangle d&apos;Or, 20050 Casablanca</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Mardi au Samedi : 10h00 - 19h30 &bull; Dimanche &amp; Lundi sur demande spéciale</span>
                </p>
              </div>

              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Ligne Directe / WhatsApp : <strong className="text-[#F9F6F0]">07 22 03 33 26</strong></span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Email : <strong className="text-[#F9F6F0]">koncept.morocco@gmail.com</strong></span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#282622] flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-bold tracking-wider uppercase text-center hover:scale-105 transition-transform"
              >
                Prendre rendez-vous au showroom
              </Link>
              <a
                href="https://maps.google.com/?q=Boulevard+d+Anfa+Casablanca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 rounded-full border border-[#282622] hover:border-[#C5A880] text-xs text-[#F9F6F0] tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#C5A880]" />
                <span>Itinéraire Google Maps</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
