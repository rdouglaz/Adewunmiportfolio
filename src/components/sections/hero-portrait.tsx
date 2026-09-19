"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreloader } from "../preloader";
import { BlurIn } from "../reveal-animations";

/**
 * HeroPortrait — cinematic 3D object built from the founder's photo.
 *
 * Lightweight CSS-3D (no extra WebGL scene) so it layers cleanly over the
 * fixed Spline keyboard background:
 *  - mouse-driven tilt + moving specular glare
 *  - gradient glow stage, orbit ring, film-grade color overlays
 *  - floating glass badges pulled forward with translateZ
 */
const HeroPortrait = () => {
  const { isLoading } = usePreloader();
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 20 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Math.max(-14, Math.min(14, -py * 16)),
      ry: Math.max(-18, Math.min(18, px * 20)),
      gx: (px + 0.5) * 100,
      gy: (py + 0.5) * 100,
    });
  };

  const resetTilt = () => {
    setIsHovering(false);
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 20 });
  };

  if (isLoading) return null;

  return (
    <BlurIn
      delay={1.15}
      duration={1.1}
      className="relative z-[2] flex w-full justify-center md:justify-end"
    >
      {/* Stage with perspective */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] [perspective:1400px]"
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={resetTilt}
      >
        {/* Cinematic glow stage */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-8 rounded-[3rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.35),rgba(56,189,248,0.22),rgba(251,191,36,0.14),rgba(59,130,246,0.35))] opacity-70 blur-3xl dark:opacity-90" />
          <div className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-sky-400/30 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-52 w-52 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/10 dark:border-white/10" />
        </div>

        {/* Orbit ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 animate-[spin_28s_linear_infinite] rounded-[2.6rem] border border-dashed border-sky-300/30 dark:border-sky-200/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 rounded-[2.6rem]"
        >
          <span className="absolute -top-1.5 left-10 h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_18px_4px_rgba(56,189,248,0.8)]" />
          <span className="absolute -bottom-1.5 right-12 h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_14px_3px_rgba(253,230,138,0.7)]" />
        </div>

        {/* Idle float */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Tilting 3D card */}
          <div
            ref={frameRef}
            className={cn(
              "relative aspect-[4/5] w-full overflow-hidden",
              "rounded-[1.8rem] border border-white/20",
              "bg-slate-900 shadow-[0_40px_80px_-20px_rgba(2,6,23,0.7),0_0_0_1px_rgba(255,255,255,0.06),0_0_60px_-10px_rgba(56,189,248,0.45)]",
              "dark:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9),0_0_70px_-12px_rgba(59,130,246,0.5)]",
              "[transform-style:preserve-3d] will-change-transform"
            )}
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: isHovering
                ? "transform 0.08s linear"
                : "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <Image
              src="/assets/adewunmi-portrait.png"
              alt="Adewunmi Saliu — AI Product Builder in his studio, surrounded by shipped products"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-cover object-center contrast-[1.06] saturate-[1.12]"
            />

            {/* Cinematic grade: light leak, vignette, bottom legibility */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-sky-200/20 mix-blend-soft-light"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_45%,rgba(2,6,23,0.55)_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-200/25 via-transparent to-transparent"
            />
            {/* Top light streak */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/90 to-transparent"
            />

            {/* Mouse-tracked specular glare */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
              style={{
                opacity: isHovering ? 1 : 0.35,
                background: `radial-gradient(420px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.5), transparent 65%)`,
              }}
            />

            {/* Caption — pulled forward in 3D */}
            <div
              className="absolute inset-x-0 bottom-0 p-5 [transform:translateZ(55px)]"
              style={{ transform: "translateZ(55px)" }}
            >
              <div className="rounded-2xl border border-white/15 bg-black/45 p-3.5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      Adewunmi Saliu
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-200/90">
                      AI Product Builder
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    </span>
                    Building
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating glass badges — forward in Z for parallax */}
          <div
            aria-hidden="true"
            className="absolute -left-4 top-8 sm:-left-8"
            style={{ transform: "translateZ(80px)" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/70 px-3 py-2 shadow-xl backdrop-blur-xl dark:bg-slate-900/70"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 text-white">
                <Sparkles size={15} />
              </span>
              <span>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  Ships weekly
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-zinc-400">
                  POD • Scribe • EduAtlas
                </span>
              </span>
            </motion.div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-3 bottom-28 sm:-right-6"
            style={{ transform: "translateZ(90px)" }}
          >
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/70 px-3 py-2 shadow-xl backdrop-blur-xl dark:bg-slate-900/70"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-sky-300 dark:bg-sky-400/15">
                <Cpu size={15} />
              </span>
              <span>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  Next.js • Supabase
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-zinc-400">
                  LLM • RAG • Workflows
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </BlurIn>
  );
};

export default HeroPortrait;
