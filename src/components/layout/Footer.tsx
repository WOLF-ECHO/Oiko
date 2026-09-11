"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, MapPin, Mail, Sparkles } from "lucide-react";
import OikosLogo from "@/components/ui/OikosLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#080807] border-t border-[#282622] text-[#C4BEB4] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#282622]/80">
          <div className="lg:col-span-6 space-y-5">
            <OikosLogo variant="horizontal" />

            <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0] font-light leading-tight mt-3">
              « Des espaces qui ont une âme. Plus qu&apos;un intérieur, un art de vivre. »
            </h3>

            <p className="text-xs sm:text-sm text-[#8E877D] max-w-lg leading-relaxed">
              OÏKOS est une maison marocaine de mobilier contemporain d&apos;exception, d&apos;architecture intérieure et d&apos;expression artistique. Showroom &amp; Studio de conception au Boulevard d&apos;Anfa, Casablanca.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <div className="bg-[#161513] p-6 sm:p-8 rounded-2xl border border-[#282622] space-y-4">
              <h4 className="text-base text-[#F9F6F0] font-medium">
                Le Cercle Privé OÏKOS
              </h4>
              <p className="text-xs text-[#8E877D] leading-relaxed">
                Recevez en avant-première les lancements de collections, les invitations aux vernissages privés du showroom de Casablanca et les séries d&apos;art limitées.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-[#C5A880] bg-[#C5A880]/10 p-3 rounded-lg border border-[#C5A880]/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Votre inscription est confirmée. Bienvenue dans l&apos;univers OÏKOS.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-[#0C0B0A] border border-[#282622] rounded-full px-4 py-3 text-xs text-[#F9F6F0] placeholder-[#6E675E] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:bg-[#DEC5A5] transition-all flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>S&apos;inscrire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation & Address Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16">
          {/* Col 1: Collections */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0] font-semibold">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#8E877D]">
              <li>
                <Link href="/collections?universe=Living" className="hover:text-[#C5A880] transition-colors">
                  OÏKOS Living
                </Link>
              </li>
              <li>
                <Link href="/collections?universe=Signature" className="hover:text-[#C5A880] transition-colors">
                  OÏKOS Signature
                </Link>
              </li>
              <li>
                <Link href="/collections?universe=Art" className="hover:text-[#C5A880] transition-colors">
                  OÏKOS Art &amp; Toiles
                </Link>
              </li>
              <li>
                <Link href="/collections?universe=Éditions" className="hover:text-[#C5A880] transition-colors">
                  Éditions Limitées
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#C5A880] transition-colors">
                  Chapitre 01 : Géométrie Douce
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio & Outils 3D */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0] font-semibold">
              Studio &amp; 3D
            </h5>
            <ul className="space-y-2.5 text-xs text-[#8E877D]">
              <li>
                <Link href="/configurateur" className="text-[#C5A880] hover:text-[#DEC5A5] transition-colors flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>Configurateur 3D Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/showroom" className="hover:text-[#C5A880] transition-colors">
                  La Galerie Habitable (Showroom)
                </Link>
              </li>
              <li>
                <Link href="/atelier" className="hover:text-[#C5A880] transition-colors">
                  L&apos;Atelier &amp; Savoir-Faire
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-[#C5A880] transition-colors">
                  Espace Architectes (B2B)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A880] transition-colors">
                  Prendre Rendez-vous
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Showroom Casablanca */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0] font-semibold">
              Showroom &amp; Studio
            </h5>
            <div className="space-y-2 text-xs text-[#8E877D] leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Angle Boulevard d&apos;Anfa &amp; Rue Bab Mansour, Triangle d&apos;Or, Casablanca</span>
              </p>
              <p className="text-[11px]">Mardi au Samedi : 10h00 - 19h30</p>
              <p className="text-[11px] text-[#C5A880] font-medium">Sur rendez-vous privé</p>
            </div>
          </div>

          {/* Col 4: Contacts Officiels */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0] font-semibold">
              Contact &amp; Conciergerie
            </h5>
            <div className="space-y-2 text-xs text-[#8E877D]">
              <p className="flex items-center gap-2 text-[#F9F6F0]">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href="tel:0722033326" className="hover:text-[#C5A880] transition-colors font-medium">
                  07 22 03 33 26
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href="mailto:koncept.morocco@gmail.com" className="hover:text-[#C5A880] transition-colors">
                  koncept.morocco@gmail.com
                </a>
              </p>
              <p className="text-[11px] text-[#8E877D] pt-1">
                Site officiel : <strong className="text-[#F9F6F0]">oikos.ma</strong>
              </p>
              <p className="text-[11px] text-[#8E877D]">
                Livraison gants blancs : Casablanca, Rabat, Marrakech, Tanger, Fès et tout le Maroc.
              </p>
            </div>
          </div>

          {/* Col 5: Engagements */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0] font-semibold">
              Excellence OÏKOS
            </h5>
            <div className="space-y-2 text-[11px] text-[#8E877D]">
              <div className="border border-[#282622] p-2.5 rounded-lg bg-[#0C0B0A]">
                <span className="text-[#C5A880] font-bold block text-sm">&ge; 95%</span>
                <span>Livraisons à l&apos;heure garanties</span>
              </div>
              <div className="border border-[#282622] p-2.5 rounded-lg bg-[#0C0B0A]">
                <span className="text-[#C5A880] font-bold block text-sm">&lt; 3%</span>
                <span>Taux de défaut strict</span>
              </div>
              <div className="border border-[#282622] p-2.5 rounded-lg bg-[#0C0B0A]">
                <span className="text-[#C5A880] font-bold block text-sm">48h</span>
                <span>Matériauthèque expédiée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-[#282622]/60 flex flex-col md:flex-row items-center justify-between text-xs text-[#6E675E] gap-4">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} OÏKOS Maison de Design SARL. Casablanca, Maroc.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Marque déposée OMPIC</span>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <Link href="/contact" className="hover:text-[#C4BEB4] transition-colors">
              Mentions Légales &amp; CNDP
            </Link>
            <Link href="/contact" className="hover:text-[#C4BEB4] transition-colors">
              Conditions Générales de Vente
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A880] hover:text-[#DEC5A5] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@oikos.ma</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
