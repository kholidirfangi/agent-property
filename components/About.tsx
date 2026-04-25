"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ─── Animation ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AboutAgent() {
  return (
    <section id="about" className="relative bg-[#0A1F44] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          
          {/* ── FOTO AGENT ── */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=85&auto=format&fit=crop"
                alt="Budi Santoso - Agen Properti"
                width={800}
                height={1000}
                className="w-full h-105 sm:h-130 object-cover"
              />
            </div>

            {/* Accent frame */}
            <div
              className="absolute -bottom-6 -right-6 w-full h-full border"
              style={{ borderColor: "#C9A84C" }}
            />

            {/* Floating experience badge */}
            <div
              className="absolute top-6 left-6 px-4 py-2 text-xs tracking-widest uppercase font-semibold"
              style={{
                backgroundColor: "rgba(10,31,68,0.8)",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "#C9A84C",
              }}
            >
              8+ Tahun Pengalaman
            </div>
          </motion.div>

          {/* ── CONTENT ── */}
          <div>
            {/* Tag */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="block w-10 h-px"
                style={{ backgroundColor: "#C9A84C" }}
              />
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                style={{ color: "#C9A84C" }}
              >
                Tentang Saya
              </span>
            </motion.div>

            {/* Nama */}
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Playfair Display', serif",
              }}
            >
              Budi Santoso
            </motion.h2>

            {/* Role */}
            <motion.p
              custom={1.2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-sm tracking-[0.2em] uppercase mb-6"
              style={{ color: "#C9A84C" }}
            >
              Agen Properti Profesional
            </motion.p>

            {/* Deskripsi */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-white/70 leading-relaxed mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Saya membantu klien menemukan properti terbaik — baik untuk
              hunian maupun investasi. Dengan pengalaman lebih dari 8 tahun,
              saya memahami bagaimana memilih lokasi strategis, menilai nilai
              properti, dan memastikan setiap transaksi berjalan aman.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-white/70 leading-relaxed mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Fokus saya adalah memberikan solusi yang jujur, transparan, dan
              sesuai kebutuhan Anda — bukan sekadar menjual, tapi membantu Anda
              membuat keputusan terbaik dalam jangka panjang.
            </motion.p>

            {/* Highlight */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {[
                "150+ Properti Terjual",
                "Klien Prioritas",
                "Respon Cepat",
                "Negosiasi Terbaik",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#C9A84C" }}
                  />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              custom={5}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-4 text-[13px] font-bold tracking-[0.12em] uppercase text-white rounded-sm"
              style={{
                backgroundColor: "#C9A84C",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Konsultasi Gratis
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}