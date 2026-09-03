import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  chapter?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  chapter,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 mb-3 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        {chapter && (
          <span className="text-[11px] font-serif tracking-[0.3em] text-[#C5A880] uppercase">
            {chapter}
          </span>
        )}
        {chapter && eyebrow && <span className="text-[#6E675E]">•</span>}
        {eyebrow && (
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8E877D] font-medium">
            {eyebrow}
          </span>
        )}
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F9F6F0] font-light tracking-tight leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-[#8E877D] font-light leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      <div
        className={`mt-5 flex items-center gap-2 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span className="w-8 h-[1px] bg-[#C5A880]/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
        <span className="w-8 h-[1px] bg-[#C5A880]/60" />
      </div>
    </div>
  );
}
