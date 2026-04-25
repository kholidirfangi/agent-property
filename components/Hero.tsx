"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ─── Slides ───
const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80&auto=format&fit=crop",
    label: "Villa Modern · Bali",
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop",
    label: "Rumah Mewah · Jakarta Selatan",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop",
    label: "Hunian Premium · Serpong",
  },
];

// ─── Stats ───
const STATS = [
  { value: "150+", label: "Properti Terjual" },
  { value: "8+", label: "Tahun Pengalaman" },
  { value: "98%", label: "Klien Puas" },
  { value: "50+", label: "Listing Aktif" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-svh min-h-160 overflow-hidden">
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* FIRST IMAGE → FAST LCP */}
        {!mounted && (
          <Image
            src={SLIDES[0].url}
            alt={SLIDES[0].label}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* SLIDES AFTER MOUNT */}
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
              style={{ y: yParallax }}
            >
              <Image
                src={SLIDES[current].url}
                alt={SLIDES[current].label}
                fill
                sizes="100vw"
                className="object-cover scale-105"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0A1F44]/80 via-[#0A1F44]/50 to-black/80" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-20 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-28">
        <div className="max-w-3xl text-white">
          {/* TITLE */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Temukan Rumah
          </h1>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#C9A84C] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Impian Anda.
          </h1>

          {/* DESC */}
          <p className="text-white/70 max-w-md mb-8">
            Bersama{" "}
            <span className="text-white font-semibold">Budi Santoso</span>, agen
            properti profesional untuk kebutuhan Anda.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 text-center">
            <a className="px-6 py-4 bg-[#C9A84C] text-white text-sm font-bold uppercase rounded-sm">
              Lihat Listing
            </a>
            <a className="px-6 py-4 border border-white/40 text-white text-sm uppercase rounded-sm">
              Hubungi Agen
            </a>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="absolute bottom-0 w-full bg-[#0A1F44]/90 backdrop-blur">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className="py-4 text-center border-r border-white/10">
              <p className="text-[#C9A84C] text-xl font-bold">{s.value}</p>
              <p className="text-white/60 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
