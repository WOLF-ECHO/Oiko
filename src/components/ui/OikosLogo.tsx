"use client";

import React from "react";

interface OikosLogoProps {
  className?: string;
  variant?: "full" | "horizontal" | "icon" | "stacked";
  theme?: "light" | "gold" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export function OikosIcon({
  className = "w-7 h-7",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="OÏKOS Monogramme"
    >
      {/* Two delicate dots representing the diaeresis on the Ï */}
      <circle cx="43" cy="14" r="4.5" fill={color} />
      <circle cx="57" cy="14" r="4.5" fill={color} />

      {/* Outer oval ring - sculptural luxury silhouette */}
      <ellipse
        cx="50"
        cy="58"
        rx="36"
        ry="36"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* Central vertical dividing axis */}
      <line
        x1="50"
        y1="22"
        x2="50"
        y2="94"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function OikosLogo({
  className = "",
  variant = "horizontal",
  theme = "gold",
  size = "md",
}: OikosLogoProps) {
  const colorMap = {
    gold: "#C5A880",
    light: "#F9F6F0",
    dark: "#0C0B0A",
  };

  const activeColor = colorMap[theme];

  if (variant === "icon") {
    const iconSizes = {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    };
    return <OikosIcon className={`${iconSizes[size]} ${className}`} color={activeColor} />;
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <OikosIcon className="w-12 h-12 mb-3" color={activeColor} />
        <span
          className="font-serif tracking-[0.32em] uppercase font-light text-2xl sm:text-3xl leading-none text-[#F9F6F0]"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          OÏKOS
        </span>
        <span className="text-[9px] tracking-[0.38em] uppercase text-[#C5A880] mt-1.5 font-medium">
          Maison de Design
        </span>
        <div className="w-8 h-[1px] bg-[#C5A880]/50 my-2" />
        <span className="text-[7.5px] tracking-[0.42em] uppercase text-[#8E877D]">
          L&apos;Art d&apos;Habiter
        </span>
      </div>
    );
  }

  // Default: Horizontal brand mark
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <OikosIcon className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" color="#C5A880" />
      <div className="flex flex-col items-start leading-none">
        <span
          className="font-serif tracking-[0.3em] uppercase text-2xl sm:text-[26px] font-light text-[#F9F6F0] leading-none"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          OÏKOS
        </span>
        <span className="text-[8px] sm:text-[8.5px] tracking-[0.38em] text-[#C5A880] uppercase mt-1 font-medium">
          Maison de Design &bull; Casablanca
        </span>
      </div>
    </div>
  );
}
