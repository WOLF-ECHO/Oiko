"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, MessageCircle, ArrowRight } from "lucide-react";

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Collections", href: "/collections" },
    { name: "Le Showroom", href: "/showroom" },
    { name: "L'Atelier", href: "/atelier" },
    { name: "Espace B2B", href: "/b2b" },
    { name: "Art & Éditions", href: "/art" },
    { name: "Contact & RDV", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0C0B0A]/85 backdrop-blur-xl border-b border-[#282622]/80 shadow-2xl py-3.5"
            : "bg-[#0C0B0A]/40 backdrop-blur-md border-b border-[#282622]/40 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#F9F6F0] font-light group-hover:text-[#C5A880] transition-colors">
              VELMORA
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#8E877D] uppercase -mt-0.5 group-hover:text-[#C4BEB4] transition-colors">
              Maison Marocaine • Art &amp; Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] transition-all relative py-1 ${
                    isActive
                      ? "text-[#C5A880] font-medium"
                      : "text-[#C4BEB4] hover:text-[#F9F6F0]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A880] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://wa.me/212661234567?text=Bonjour%20VELMORA,%20je%20souhaite%20des%20renseignements%20sur%20vos%20collections."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#C4BEB4] hover:text-[#C5A880] hover:bg-[#1E1D1A] rounded-full transition-all"
              title="Conciergerie WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Prendre RDV</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link
              href="/contact"
              className="px-3.5 py-1.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-[11px] font-semibold tracking-wider uppercase"
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
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0C0B0A]/95 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 md:hidden animate-in fade-in duration-300">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E877D]">
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

          <div className="mt-auto pt-8 border-t border-[#282622] space-y-4">
            <Link
              href="/contact"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-center text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Réserver une visite privée
            </Link>

            <a
              href="https://wa.me/212661234567?text=Bonjour%20VELMORA,%20je%20souhaite%20des%20renseignements%20sur%20vos%20collections."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full border border-[#C5A880]/40 text-[#C5A880] text-center text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#C5A880]/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Concierge WhatsApp (+212)
            </a>

            <p className="text-center text-[11px] text-[#8E877D] pt-2">
              Casablanca • Triangle d&apos;Or &bull; Sur rendez-vous
            </p>
          </div>
        </div>
      )}
    </>
  );
}
