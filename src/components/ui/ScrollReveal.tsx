"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgressBar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A880] via-[#DEC5A5] to-[#C5A880] z-50 origin-left"
      style={{
        scaleX: typeof window !== "undefined" ? undefined : 0,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}
