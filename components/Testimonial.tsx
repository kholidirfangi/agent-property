"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

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

const TESTIMONIALS = [
  {
    name: "Andi Pratama",
    role: "Pembeli Rumah",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "Proses beli rumah jadi jauh lebih mudah. Saya dibantu dari awal sampai akad, semuanya transparan dan cepat.",
  },
  {
    name: "Siti Rahma",
    role: "Investor Properti",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "Sangat membantu dalam memilih properti untuk investasi. Insight yang diberikan benar-benar membuka wawasan saya.",
  },
  {
    name: "Budi Hartono",
    role: "Penjual Properti",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    text: "Rumah saya berhasil terjual dengan harga yang sangat baik. Prosesnya cepat dan profesional.",
  },
];

export default function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative bg-[#F8F8F6] text-[#0A1F44] overflow-hidden"
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
              Testimoni Klien
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
            Apa Kata
            <br />
            <span className="text-[#C9A84C]">Klien Saya</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[#0A1F44]/70 leading-relaxed"
          >
            Kepuasan klien adalah prioritas saya. Berikut beberapa pengalaman
            dari klien yang telah bekerja sama dengan saya.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative p-6 border border-[#0A1F44]/10 rounded-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-[#C9A84C]/10 to-transparent" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-[#0A1F44]/70 leading-relaxed mb-6">
                “{item.text}”
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0A1F44]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#0A1F44]/50">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
          <p className="text-[#0A1F44]/70 mb-6">
            Ingin hasil seperti mereka? Konsultasi sekarang.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 text-[13px] font-bold tracking-[0.12em] uppercase text-white rounded-sm"
            style={{ backgroundColor: "#C9A84C" }}
          >
            Hubungi Saya
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
