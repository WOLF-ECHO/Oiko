"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, Sparkles, ArrowRight } from "lucide-react";
import OikosLogo from "@/components/ui/OikosLogo";

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
    { name: "Configurateur 3D", href: "/configurateur", isSpecial: true },
    { name: "Le Showroom", href: "/showroom" },
    { name: "L'Atelier", href: "/atelier" },
    { name: "Espace B2B", href: "/b2b" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 w-full ${
          isScrolled
            ? "bg-[#0C0B0A]/95 backdrop-blur-xl border-b border-[#282622]/80 shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-3"
            : "bg-[#0C0B0A]/85 backdrop-blur-md border-b border-[#282622]/50 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Identity with Official OÏKOS Monogram */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="group inline-flex items-center hover:opacity-90 transition-opacity">
                <OikosLogo variant="horizontal" />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden xl:flex items-center justify-center space-x-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all relative py-1 flex items-center gap-1.5 ${
                      link.isSpecial
                        ? "text-[#C5A880] font-semibold bg-[#C5A880]/10 px-3 py-1 rounded-full border border-[#C5A880]/30 hover:bg-[#C5A880]/20"
                        : isActive
                        ? "text-[#C5A880] font-semibold"
                        : "text-[#C4BEB4] hover:text-[#F9F6F0]"
                    }`}
                  >
                    {link.isSpecial && <Sparkles className="w-3 h-3 text-[#C5A880] animate-pulse" />}
                    <span>{link.name}</span>
                    {isActive && !link.isSpecial && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#C5A880] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Golden Pill CTAs */}
            <div className="hidden lg:flex items-center justify-end space-x-3 shrink-0">
              <Link
                href="/configurateur"
                className="hidden md:inline-flex xl:hidden items-center gap-1.5 px-4 py-2 rounded-full border border-[#C5A880]/50 text-[#C5A880] text-[10.5px] font-semibold tracking-wider uppercase hover:bg-[#C5A880]/10 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>3D Studio</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] text-[#0C0B0A] text-[11px] font-bold tracking-[0.16em] uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.35)] transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Prendre RDV</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center justify-end space-x-2.5 lg:hidden">
              <Link
                href="/configurateur"
                className="p-2 rounded-full bg-[#161513] border border-[#C5A880]/40 text-[#C5A880]"
                aria-label="Configurateur 3D"
                title="Configurateur 3D"
              >
                <Sparkles className="w-4 h-4" />
              </Link>

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
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-medium">
              Navigation OÏKOS
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-2xl font-serif flex items-center justify-between border-b border-[#282622]/60 pb-3 ${
                  link.isSpecial
                    ? "text-[#C5A880] font-normal"
                    : "text-[#F9F6F0] hover:text-[#C5A880]"
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.isSpecial && <Sparkles className="w-4 h-4 text-[#C5A880]" />}
                  {link.name}
                </span>
                <ArrowRight className="w-4 h-4 text-[#8E877D]" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-[#282622] space-y-3">
            <Link
              href="/configurateur"
              className="w-full py-3.5 rounded-full bg-[#161513] border border-[#C5A880] text-[#C5A880] text-center text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#C5A880]/10 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Lancer le Configurateur 3D
            </Link>

            <Link
              href="/contact"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-center text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Prendre Rendez-vous / Contacter
            </Link>

            <div className="text-center text-[11px] text-[#8E877D] pt-2 space-y-1">
              <p>Showroom &amp; Studio : Boulevard d&apos;Anfa, Triangle d&apos;Or, Casablanca</p>
              <p className="text-[#C5A880]">koncept.morocco@gmail.com &bull; oikos.ma</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
