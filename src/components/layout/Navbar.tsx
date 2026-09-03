"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, MessageCircle, Phone, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Collections", href: "/collections" },
    { name: "Le Showroom", href: "/showroom" },
    { name: "L'Atelier", href: "/atelier" },
    { name: "Espace B2B", href: "/b2b" },
    { name: "Art & Éditions", href: "/art" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 w-full ${
          isScrolled
            ? "bg-[#0C0B0A]/90 backdrop-blur-xl border-b border-[#282622]/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5"
            : "bg-[#0C0B0A]/60 backdrop-blur-md border-b border-[#282622]/50 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 items-center gap-4">
            {/* Left: Brand Identity (col-span-3) */}
            <div className="lg:col-span-3 flex items-center justify-start">
              <Link href="/" className="group inline-flex flex-col items-start">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] text-[#F9F6F0] font-light group-hover:text-[#C5A880] transition-colors leading-none">
                  VELMORA
                </span>
                <span className="text-[8.5px] tracking-[0.38em] text-[#C5A880] uppercase mt-1 font-medium group-hover:text-[#DEC5A5] transition-colors">
                  Casablanca • Maison d&apos;Art
                </span>
              </Link>
            </div>

            {/* Center: Perfectly Balanced Desktop Nav (col-span-6) */}
            <nav className="hidden lg:flex items-center justify-center space-x-7 xl:space-x-8 lg:col-span-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all relative py-1.5 flex items-center justify-center ${
                      isActive
                        ? "text-[#C5A880] font-semibold"
                        : "text-[#C4BEB4] hover:text-[#F9F6F0]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C5A880] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions & Phone Hotline (col-span-3) */}
            <div className="hidden lg:flex items-center justify-end space-x-4 lg:col-span-3">
              {/* Direct Phone link */}
              <a
                href="tel:0722033326"
                className="text-[11px] tracking-wider text-[#C4BEB4] hover:text-[#C5A880] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                title="Ligne directe Casablanca"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-medium">07 22 03 33 26</span>
              </a>

              {/* WhatsApp Concierge */}
              <a
                href="https://wa.me/212722033326?text=Bonjour%20VELMORA,%20je%20souhaite%20des%20renseignements%20sur%20vos%20collections."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#C4BEB4] hover:text-[#C5A880] hover:bg-[#1E1D1A] rounded-full border border-[#282622] transition-all"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4 text-[#C5A880]" />
              </a>

              {/* Golden Pill CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-[11px] font-bold tracking-[0.16em] uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.35)] transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Prendre RDV</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center justify-end space-x-2.5 lg:hidden">
              <a
                href="tel:0722033326"
                className="p-2 rounded-full bg-[#161513] border border-[#282622] text-[#C5A880]"
                aria-label="Appeler VELMORA"
              >
                <Phone className="w-4 h-4" />
              </a>

              <Link
                href="/contact"
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-[10.5px] font-bold tracking-wider uppercase whitespace-nowrap"
              >
                RDV
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#EFECE6] hover:text-[#C5A880] focus:outline-none"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0C0B0A]/95 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col space-y-5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-medium">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-serif text-[#F9F6F0] hover:text-[#C5A880] transition-colors flex items-center justify-between border-b border-[#282622]/60 pb-3"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#8E877D]" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-[#282622] space-y-3.5">
            <Link
              href="/contact"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-center text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Réserver une visite privée à Casablanca
            </Link>

            <a
              href="https://wa.me/212722033326?text=Bonjour%20VELMORA,%20je%20souhaite%20des%20renseignements%20sur%20vos%20collections."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full border border-[#C5A880]/40 text-[#C5A880] text-center text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#C5A880]/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Concierge (07 22 03 33 26)
            </a>

            <div className="text-center text-[11px] text-[#8E877D] pt-2 space-y-1">
              <p>Showroom &amp; Studio : Boulevard d&apos;Anfa, Triangle d&apos;Or, Casablanca</p>
              <p className="text-[#C5A880]">koncept.morocco@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
