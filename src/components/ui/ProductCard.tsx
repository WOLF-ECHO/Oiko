"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import QuickViewModal from "@/components/ui/QuickViewModal";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <div className="group relative flex flex-col bg-[#161513] rounded-2xl overflow-hidden border border-[#282622] hover:border-[#C5A880]/50 transition-all duration-500 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
        {/* Image Container with Aspect Ratio */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1E1D1A]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span className="px-2.5 py-1 rounded-full bg-[#0C0B0A]/80 backdrop-blur-md text-[10px] tracking-wider uppercase text-[#C5A880] border border-[#282622]">
              {product.universe}
            </span>
            {product.limitedEdition && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-[9px] tracking-widest uppercase font-bold">
                Édition Limitée
              </span>
            )}
            {product.bestseller && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#1E1D1A]/90 text-[#F9F6F0] text-[9px] tracking-widest uppercase border border-[#282622]">
                Iconique
              </span>
            )}
          </div>

          {/* Quick View Button on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="w-full py-2.5 rounded-full bg-[#F9F6F0]/90 backdrop-blur-md text-[#0C0B0A] text-xs font-medium uppercase tracking-wider hover:bg-[#C5A880] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aperçu rapide</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#8E877D] uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <span>{product.leadTime.split("•")[0]}</span>
            </div>

            <Link href={`/collections/${product.slug}`} className="block group/title">
              <h3 className="font-serif text-lg text-[#F9F6F0] group-hover/title:text-[#C5A880] transition-colors flex items-center justify-between">
                <span>{product.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-[#C5A880] shrink-0 ml-1" />
              </h3>
            </Link>

            <p className="mt-1 text-xs text-[#8E877D] line-clamp-2 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#282622] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#8E877D] uppercase tracking-wider block">
                Prix indicatif
              </span>
              <span className="text-sm font-semibold text-[#F9F6F0]">
                {product.formattedPrice}
              </span>
            </div>

            <Link
              href={`/collections/${product.slug}`}
              className="text-xs text-[#C5A880] hover:text-[#DEC5A5] font-medium tracking-wider uppercase underline underline-offset-4"
            >
              Personnaliser
            </Link>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}
