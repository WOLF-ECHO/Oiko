"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function LuxuryScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#9E8056] via-[#C5A880] to-[#DEC5A5] z-[60] origin-left shadow-[0_0_8px_rgba(197,168,128,0.6)]"
    />
  );
}
