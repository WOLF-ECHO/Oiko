"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#161513] border-b border-[#282622] text-xs text-[#C4BEB4] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="tracking-wider uppercase text-[11px] text-[#C5A880] font-medium">
            OÏKOS &bull; Maison de Design
          </span>
          <span className="text-[#6E675E]">&bull;</span>
          <span className="text-[#8E877D]">
            Showroom &amp; Studio au Boulevard d&apos;Anfa, Casablanca
          </span>
        </div>

        <div className="flex items-center justify-center w-full md:w-auto text-center gap-4">
          <span className="text-[#EFECE6] font-light">
            Livraison &amp; installation gants blancs partout au Maroc
          </span>

          <Link
            href="/configurateur"
            className="hidden sm:inline-flex items-center gap-1 text-[#C5A880] hover:text-[#DEC5A5] transition-colors font-medium underline underline-offset-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>Configurateur 3D Studio</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
