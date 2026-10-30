"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Search, X, SlidersHorizontal, Sparkles, Compass, ArrowRight, MessageCircle } from "lucide-react";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialUniverse = searchParams.get("universe") || "All";
  const initialCategory = searchParams.get("category") || "All";

  const [selectedUniverse, setSelectedUniverse] = useState<string>(initialUniverse);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "ref-asc" | "name-asc">("featured");

  useEffect(() => {
    const u = searchParams.get("universe");
    const c = searchParams.get("category");
    if (u) setSelectedUniverse(u);
    if (c) setSelectedCategory(c);
  }, [searchParams]);

  const universes = ["All", "Signature", "Living", "Éditions"];
  const categories = [
    "All",
    "Chaises",
    "Fauteuils",
    "Canapés",
    "Tables basses",
    "Consoles & Miroirs",
    "Luminaires",
    "Art mural",
  ];

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PRODUCTS.length };
    categories.slice(1).forEach((cat) => {
      counts[cat] = PRODUCTS.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchUniverse =
        selectedUniverse === "All" || product.universe === selectedUniverse;
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.materials.some((m) => m.toLowerCase().includes(q));
      return matchUniverse && matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "ref-asc") {
        const numA = parseInt(a.id.replace(/\D/g, ""), 10) || 0;
        const numB = parseInt(b.id.replace(/\D/g, ""), 10) || 0;
        return numA - numB;
      }
      // featured first, then bestseller, then ref order
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedUniverse, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedUniverse("All");
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  const isUnintegratedCategory =
    selectedCategory !== "All" && (categoryCounts[selectedCategory] || 0) === 0;

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <SectionHeading
            chapter="Catalogue Officiel"
            eyebrow="Manufacture OÏKOS &bull; Pièces Référencées"
            title="Les Collections OÏKOS"
            subtitle="Découvrez nos collections de Chaises et Fauteuils façonnés sur mesure dans notre atelier de Casablanca (Dar Bouazza). Chaque modèle est personnalisable dans nos tissus, cuirs et essences de bois nobles."
          />
        </div>

        {/* Quick Category Highlight Cards (Chaises vs Fauteuils) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() =>
              setSelectedCategory(selectedCategory === "Chaises" ? "All" : "Chaises")
            }
            className={`group text-left p-6 sm:p-8 rounded-2xl border transition-all flex items-center justify-between gap-6 ${
              selectedCategory === "Chaises"
                ? "bg-[#1E1D1A] border-[#C5A880] shadow-[0_10px_30px_rgba(197,168,128,0.15)]"
                : "bg-[#161513] border-[#282622] hover:border-[#C5A880]/50"
            }`}
          >
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Collection Salle à Manger &amp; Réception
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0] group-hover:text-[#C5A880] transition-colors">
                Chaises &amp; Assises Hautes
              </h3>
              <p className="text-xs text-[#8E877D] leading-relaxed max-w-md">
                Silhouettes architecturales en bois massif, dossiers ajourés ou enveloppants, tabourets de bar et chaises de table sur mesure.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-serif text-3xl sm:text-4xl text-[#C5A880] block">
                {categoryCounts["Chaises"] || 0}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8E877D]">
                Modèles
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedCategory(selectedCategory === "Fauteuils" ? "All" : "Fauteuils")
            }
            className={`group text-left p-6 sm:p-8 rounded-2xl border transition-all flex items-center justify-between gap-6 ${
              selectedCategory === "Fauteuils"
                ? "bg-[#1E1D1A] border-[#C5A880] shadow-[0_10px_30px_rgba(197,168,128,0.15)]"
                : "bg-[#161513] border-[#282622] hover:border-[#C5A880]/50"
            }`}
          >
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Collection Lounge &amp; Détente
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0] group-hover:text-[#C5A880] transition-colors">
                Fauteuils Sculpturaux
              </h3>
              <p className="text-xs text-[#8E877D] leading-relaxed max-w-md">
                Fauteuils club organiques, bergères contemporaines, assises bouclette capitonnées et pièces maîtresses de salon.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-serif text-3xl sm:text-4xl text-[#C5A880] block">
                {categoryCounts["Fauteuils"] || 0}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8E877D]">
                Modèles
              </span>
            </div>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#161513] border border-[#282622] rounded-2xl p-4 sm:p-6 space-y-6">
          {/* Universe Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#282622] pb-5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#8E877D] mr-2 hidden sm:inline">
                Univers :
              </span>
              {universes.map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUniverse(u)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all shrink-0 ${
                    selectedUniverse === u
                      ? "bg-[#C5A880] text-[#0C0B0A] font-semibold"
                      : "bg-[#0C0B0A] text-[#C4BEB4] hover:text-[#F9F6F0] hover:bg-[#1E1D1A]"
                  }`}
                >
                  {u === "All" ? "Tous les univers" : `OÏKOS ${u}`}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "ref-asc" | "name-asc")}
                className="bg-[#0C0B0A] border border-[#282622] rounded-full px-3 py-1.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="featured">Sélection signature</option>
                <option value="ref-asc">Ordre catalogue (CH1 → CH55)</option>
                <option value="name-asc">Ordre alphabétique (A → Z)</option>
              </select>
            </div>
          </div>

          {/* Category & Search Filter Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              {categories.map((cat) => {
                const count = categoryCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? "bg-[#DEC5A5]/20 text-[#DEC5A5] border border-[#DEC5A5]/40 font-semibold"
                        : count > 0
                        ? "text-[#EFECE6] bg-[#0C0B0A] border border-[#282622] hover:border-[#C5A880]/50"
                        : "text-[#6E675E] hover:text-[#8E877D]"
                    }`}
                  >
                    <span>{cat === "All" ? "Toutes les pièces" : cat}</span>
                    {count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#C5A880]/20 text-[#C5A880]">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Rechercher réf (CH12), modèle, bois..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0C0B0A] border border-[#282622] rounded-full pl-9 pr-4 py-2 text-xs text-[#F9F6F0] placeholder-[#6E675E] focus:outline-none focus:border-[#C5A880]"
              />
              <Search className="w-3.5 h-3.5 text-[#8E877D] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-[#8E877D] hover:text-[#F9F6F0]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-[#8E877D] px-2">
          <span>
            Affichage de <strong className="text-[#F9F6F0]">{filteredProducts.length}</strong> pièce
            {filteredProducts.length > 1 ? "s" : ""} officielle{filteredProducts.length > 1 ? "s" : ""}
          </span>
          {(selectedUniverse !== "All" || selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-[#C5A880] hover:underline flex items-center gap-1"
            >
              <span>Réinitialiser les filtres</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>
        ) : isUnintegratedCategory ? (
          <div className="text-center py-20 px-6 bg-[#161513] rounded-3xl border border-[#282622] space-y-6 max-w-3xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                Catalogue Officiel en Cours de Numérisation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
                Collection « {selectedCategory} » — Sur Commande &amp; Showroom
              </h3>
              <p className="text-xs sm:text-sm text-[#C4BEB4] max-w-xl mx-auto leading-relaxed">
                Nous présentons exclusivement nos véritables réalisations d&apos;atelier. Les pièces de la catégorie{" "}
                <strong>{selectedCategory}</strong> sont actuellement en cours d&apos;intégration photographique et sont disponibles sur mesure dans notre atelier de Dar Bouazza ou via notre service de <strong>Conception Globale</strong>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setSelectedCategory("Chaises")}
                className="px-6 py-3 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider hover:bg-[#DEC5A5] transition-colors"
              >
                Voir les Chaises ({categoryCounts["Chaises"]})
              </button>
              <button
                onClick={() => setSelectedCategory("Fauteuils")}
                className="px-6 py-3 rounded-full bg-[#1E1D1A] border border-[#C5A880]/50 text-[#F9F6F0] text-xs font-semibold uppercase tracking-wider hover:border-[#C5A880] transition-colors"
              >
                Voir les Fauteuils ({categoryCounts["Fauteuils"]})
              </button>
              <Link
                href="/conception-globale"
                className="px-6 py-3 rounded-full border border-[#282622] text-[#C5A880] text-xs font-medium uppercase tracking-wider hover:bg-[#1E1D1A] transition-colors flex items-center gap-2"
              >
                <span>Projet Conception Globale</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-[#161513] rounded-3xl border border-[#282622] space-y-4">
            <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto opacity-40" />
            <h3 className="font-serif text-2xl text-[#F9F6F0]">Aucune pièce ne correspond à votre sélection</h3>
            <p className="text-xs text-[#8E877D] max-w-md mx-auto">
              Essayez de modifier vos filtres ou contactez notre conciergerie pour une demande de création sur mesure.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold uppercase tracking-wider"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* Bottom Bespoke Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#161513] border border-[#282622] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
              Atelier Sur-Mesure • Dar Bouazza, Casablanca
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
              Une création sur mesure ou un projet d&apos;aménagement complet ?
            </h3>
            <p className="text-xs sm:text-sm text-[#8E877D] max-w-xl leading-relaxed">
              Chacune de nos assises est confectionnée sur mesure au sein de notre atelier de Casablanca, selon les essences de bois nobles et les étoffes de votre choix. Découvrez également notre accompagnement en Conception Globale pour vos résidences et projets d&apos;exception.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/conception-globale"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Conception Globale</span>
            </Link>
            <a
              href="https://wa.me/212722033326?text=Bonjour%20OÏKOS,%20je%20souhaite%20un%20devis%20personnalisé%20sur%20vos%20collections."
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-[#C5A880]/50 text-[#C5A880] text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A880]/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Atelier</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0B0A] flex items-center justify-center text-[#C5A880]">Chargement du catalogue...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
