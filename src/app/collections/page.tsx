"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS, Product } from "@/data/products";
import { Filter, Search, X, SlidersHorizontal, Sparkles } from "lucide-react";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialUniverse = searchParams.get("universe") || "All";

  const [selectedUniverse, setSelectedUniverse] = useState<string>(initialUniverse);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const universes = ["All", "Living", "Signature", "Art", "Éditions"];
  const categories = ["All", "Canapés", "Fauteuils", "Tables basses", "Consoles & Miroirs", "Luminaires", "Art mural"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchUniverse =
        selectedUniverse === "All" || product.universe === selectedUniverse;
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchUniverse && matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0; // default order
    });
  }, [selectedUniverse, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedUniverse("All");
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <SectionHeading
            chapter="Catalogue"
            eyebrow="Chapitre 01 &bull; Pièces Numérotées"
            title="Les Collections OÏKOS"
            subtitle="Explorez nos créations contemporaines de mobilier, pièces architecturales et œuvres murales pensées pour transcender les intérieurs marocains."
          />
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
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0C0B0A] border border-[#282622] rounded-full px-3 py-1.5 text-xs text-[#F9F6F0] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="featured">Sélection signature</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
              </select>
            </div>
          </div>

          {/* Category & Search Filter Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-colors shrink-0 ${
                    selectedCategory === cat
                      ? "bg-[#DEC5A5]/20 text-[#DEC5A5] border border-[#DEC5A5]/40"
                      : "text-[#8E877D] hover:text-[#F9F6F0]"
                  }`}
                >
                  {cat === "All" ? "Toutes catégories" : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Travertin, Noyer, Canapé..."
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
            {filteredProducts.length > 1 ? "s" : ""}
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
              Atelier sur-mesure au Maroc
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
              Vous recherchez des dimensions ou matières spécifiques ?
            </h3>
            <p className="text-xs text-[#8E877D] max-w-xl">
              Toutes nos pièces Living et Signature peuvent être calibrées sur mesure selon les plans de votre architecte ou de votre intérieur.
            </p>
          </div>

          <a
            href="https://wa.me/212722033326?text=Bonjour%20OÏKOS,%20je%20souhaite%20commander%20une%20pièce%20sur%20mesure."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:scale-105 transition-transform shrink-0"
          >
            Consulter notre atelier
          </a>
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
