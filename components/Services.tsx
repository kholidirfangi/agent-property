"use client";

import { motion } from "framer-motion";
import {
  Home,
  Key,
  TrendingUp,
  MapPin,
  Handshake,
  FileText,
} from "lucide-react";

// ─── Animations ───
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

const SERVICES = [
  {
    title: "Jual Properti",
    desc: "Saya membantu Anda menjual properti dengan strategi pemasaran yang tepat dan harga terbaik di pasar.",
    icon: Home,
  },
  {
    title: "Beli Properti",
    desc: "Temukan rumah atau investasi terbaik sesuai kebutuhan, lokasi, dan budget Anda.",
    icon: Key,
  },
  {
    title: "Konsultasi Investasi",
    desc: "Dapatkan insight profesional untuk memilih properti yang menguntungkan jangka panjang.",
    icon: TrendingUp,
  },
  {
    title: "Survey & Analisis Lokasi",
    desc: "Saya bantu analisa lokasi agar Anda tidak salah dalam mengambil keputusan.",
    icon: MapPin,
  },
  {
    title: "Negosiasi Harga",
    desc: "Saya bantu Anda mendapatkan harga terbaik melalui strategi negosiasi yang tepat.",
    icon: Handshake,
  },
  {
    title: "Pendampingan Transaksi",
    desc: "Mulai dari awal hingga akad, semua proses akan saya bantu agar aman dan lancar.",
    icon: FileText,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-[#0A1F44] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 py-20 md:py-28">
        {/* ── Header ── */}
        <div className="max-w-2xl mb-14">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="block w-10 h-px bg-[#C9A84C]" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#C9A84C]">
              Layanan Saya
            </span>
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            }}
          >
            Solusi Lengkap
            <br />
            <span className="text-[#C9A84C]">
              Untuk Kebutuhan Properti Anda
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-white/70 leading-relaxed"
          >
            Saya menyediakan layanan profesional untuk membantu Anda membeli,
            menjual, maupun berinvestasi properti dengan aman, cepat, dan
            menguntungkan.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={i}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative p-6 border border-white/10 transition-all duration-300 rounded-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#C9A84C]/20 to-transparent" />

                {/* ICON */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 border border-[#C9A84C]/40 rounded-sm">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>

                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>

                <p className="text-sm text-white/70 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          custom={10}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/70 mb-6">
            Bingung mulai dari mana? Konsultasi gratis sekarang.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-[#C9A84C] rounded-sm"
          >
            Hubungi Saya
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
