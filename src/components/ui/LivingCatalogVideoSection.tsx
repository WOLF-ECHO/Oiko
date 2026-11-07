"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface VideoChapter {
  id: string;
  refCode: string;
  title: string;
  category: string;
  desc: string;
  startTime: number;
  endTime: number;
  timeLabel: string;
  slug: string;
  thumb: string;
}

const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: "ch017",
    refCode: "CH017",
    title: "Fauteuil Lounge Kyoto",
    category: "Fauteuils",
    desc: "Bouclette beige écru & montants latéraux en noyer massif",
    startTime: 6,
    endTime: 13.5,
    timeLabel: "00:06",
    slug: "fauteuil-lounge-kyoto-ch017",
    thumb: "/images/chairs/ch017-studio.jpg",
  },
  {
    id: "l001",
    refCode: "L001",
    title: "Lit Piano Cannelé",
    category: "Lits & Suites",
    desc: "Tête de lit et cadre capitonnés à cannelures verticales",
    startTime: 14,
    endTime: 19.5,
    timeLabel: "00:14",
    slug: "lit-piano-l001",
    thumb: "/images/beds/l001-piano-isolated.png",
  },
  {
    id: "s0008",
    refCode: "S0008",
    title: "Grand Salon Panoramique Palais",
    category: "Salons",
    desc: "Double méridienne symétrique en U en tissu crème soyeux",
    startTime: 20,
    endTime: 28,
    timeLabel: "00:20",
    slug: "grand-salon-panoramique-en-u-palais-s0008",
    thumb: "/images/salons/s0008-studio.jpg",
  },
  {
    id: "tm002",
    refCode: "TM002",
    title: "Table Ovale Cannelée Verona",
    category: "Tables à manger",
    desc: "Double fût cannelé en noyer massif & 6 chaises bouclette",
    startTime: 29,
    endTime: 35.5,
    timeLabel: "00:29",
    slug: "table-ovale-cannelee-verona-6-places-tm002",
    thumb: "/images/tables/tm002-studio.jpg",
  },
  {
    id: "s0013",
    refCode: "S0013",
    title: "Salon Modulaire Velours Olive",
    category: "Salons",
    desc: "Modules profonds en velours vert olive & pouf assorti",
    startTime: 36,
    endTime: 44,
    timeLabel: "00:36",
    slug: "salon-modulaire-velours-cotele-olive-s0013",
    thumb: "/images/salons/s0013-studio.jpg",
  },
];

export default function LivingCatalogVideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(50);

  const activeChapter =
    VIDEO_CHAPTERS.find(
      (c) => currentTime >= c.startTime && currentTime <= c.endTime
    ) || VIDEO_CHAPTERS[0];

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    }
  };

  const seekToChapter = (seconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = seconds;
    v.play();
    setIsPlaying(true);
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E0D0C] border-t border-[#282622] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-[#C5A880]/5 blur-[130px]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: 9:16 Vertical Film Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal>
              <div className="relative w-full max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden border border-[#C5A880]/40 bg-[#161513] shadow-[0_25px_70px_rgba(0,0,0,0.85)] group">
                <video
                  ref={videoRef}
                  src="/videos/oikos-catalog-film.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => {
                    if (e.currentTarget.duration) {
                      setDuration(e.currentTarget.duration);
                    }
                  }}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#0C0B0A]/80 backdrop-blur-md border border-[#C5A880]/40 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F9F6F0] font-medium">
                      Film de Collection 3D
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#0C0B0A]/80 backdrop-blur-md border border-[#282622] text-[10px] text-[#C5A880] font-semibold tracking-wider">
                    Réf. {activeChapter.refCode}
                  </span>
                </div>

                {/* Bottom Controls & Live Chapter Pill */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0C0B0A]/95 via-[#0C0B0A]/65 to-transparent space-y-3">
                  {/* Active product mini-card inside video */}
                  <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-[#161513]/90 backdrop-blur-md border border-[#282622]">
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] block">
                        À l&apos;écran ({activeChapter.timeLabel}) &bull; {activeChapter.category}
                      </span>
                      <p className="font-serif text-sm text-[#F9F6F0] truncate">
                        {activeChapter.title}
                      </p>
                    </div>
                    <Link
                      href={`/collections/${activeChapter.slug}`}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-[10px] font-bold uppercase tracking-wider hover:bg-[#DEC5A5] transition-colors flex items-center gap-1"
                    >
                      <span>Voir</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-[#282622] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A880] to-[#DEC5A5] transition-all duration-200"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-[#161513]/90 border border-[#282622] text-[#F9F6F0] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors cursor-pointer"
                        aria-label={isPlaying ? "Pause" : "Lecture"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={toggleMute}
                        className="px-3 py-1.5 rounded-full bg-[#161513]/90 border border-[#282622] text-[#F9F6F0] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>Activer le son</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>Son activé</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="p-2 rounded-full bg-[#161513]/90 border border-[#282622] text-[#F9F6F0] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors cursor-pointer"
                      title="Plein écran"
                      aria-label="Plein écran"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Editorial Story & Interactive Chapter Selector */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Le Livre de Collection Prend Vie</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F9F6F0] font-light leading-tight">
                  Du Livre d&apos;Édition à Votre Intérieur en 3D
                </h2>

                <p className="text-xs sm:text-sm text-[#C4BEB4] leading-relaxed max-w-2xl">
                  Découvrez comment nos pièces de collection — fauteuils sculpturaux, lits capitonnés, grands salons panoramiques et tables à manger en noyer massif — prennent forme dans notre atelier de Dar Bouazza. Cliquez sur l&apos;une des 5 créations du film ci-dessous pour la visualiser instantanément dans la vidéo ou accéder à sa fiche sur mesure.
                </p>
              </div>
            </ScrollReveal>

            {/* 5 Interactive Chapters */}
            <div className="space-y-3">
              {VIDEO_CHAPTERS.map((chapter, idx) => {
                const isActive =
                  currentTime >= chapter.startTime && currentTime <= chapter.endTime;
                return (
                  <ScrollReveal key={chapter.id} delay={0.12 + idx * 0.06}>
                    <div
                      onClick={() => seekToChapter(chapter.startTime)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isActive
                          ? "bg-[#1E1D1A] border-[#C5A880] shadow-[0_10px_30px_rgba(197,168,128,0.15)]"
                          : "bg-[#161513] border-[#282622] hover:border-[#C5A880]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* White bg product studio thumbnail */}
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-[#282622]">
                          <Image
                            src={chapter.thumb}
                            alt={chapter.title}
                            fill
                            unoptimized
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-[10px] font-semibold tracking-wider">
                              {chapter.timeLabel}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-[#8E877D]">
                              Réf. {chapter.refCode} &bull; {chapter.category}
                            </span>
                          </div>
                          <h3 className="font-serif text-base sm:text-lg text-[#F9F6F0] truncate">
                            {chapter.title}
                          </h3>
                          <p className="text-xs text-[#8E877D] truncate">
                            {chapter.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/collections/${chapter.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3.5 py-2 rounded-full border border-[#282622] hover:border-[#C5A880] text-xs text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0C0B0A] transition-colors flex items-center gap-1 font-medium uppercase tracking-wider"
                        >
                          <span className="hidden sm:inline">Fiche</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Bottom Callout */}
            <ScrollReveal delay={0.4}>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E877D]">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Toutes les pièces du film sont confectionnées sur mesure dans votre couleur au choix.</span>
                </span>
                <Link
                  href="/collections"
                  className="text-[#C5A880] hover:underline uppercase tracking-wider font-semibold"
                >
                  Explorer les 69 modèles du catalogue &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
