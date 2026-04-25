"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Briefcase, Landmark, Trees, Building } from "lucide-react";

// ─── Animation ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// ─── Data ───
const AREAS = [
  { name: "Jakarta Selatan", icon: Building2 },
  { name: "SCBD", icon: Briefcase },
  { name: "Menteng", icon: Landmark },
  { name: "BSD City", icon: Trees },
  { name: "PIK 2", icon: Building },
];

export default function AreaCoverageSection() {
  return (
    <section className="bg-[#0A1F44] text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── LEFT ── */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] font-semibold">
                Strategic Locations
              </span>
              <span className="w-8 h-px bg-[#C9A84C]" />
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              }}
            >
              Area Layanan Utama
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-white/70 mb-10"
            >
              Saya fokus pada kawasan paling prestisius di Jakarta dan
              sekitarnya, memastikan setiap properti memiliki nilai investasi
              tinggi dan kualitas hidup terbaik.
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {AREAS.map((area, i) => {
                const Icon = area.icon;

                return (
                  <motion.div
                    key={i}
                    custom={i + 3}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center justify-center gap-3 p-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm"
                  >
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                    <span className="text-xs text-white/90 font-semibold text-center">
                      {area.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-90 sm:h-105 rounded-sm overflow-hidden">
              {/* IMAGE */}
              <Image width={1000} height={1000}
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Area Properti Premium"
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0A1F44]/80 via-[#0A1F44]/40 to-transparent" />

              {/* BORDER */}
              <div className="absolute inset-0 border border-white/10 rounded-sm" />

              {/* LABEL */}
              <div className="absolute bottom-6 left-6">
                <p className="text-xs text-white/60 uppercase tracking-widest">
                  AREA PILIHAN
                </p>
                <p className="text-lg font-semibold text-[#C9A84C]">
                  Properti Premium Jakarta
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
