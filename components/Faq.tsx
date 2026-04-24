"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// ─── Data ───
const FAQS = [
  {
    q: "Apakah bisa konsultasi gratis?",
    a: "Ya, saya menyediakan konsultasi gratis untuk membantu Anda memahami kebutuhan properti Anda sebelum mengambil keputusan.",
  },
  {
    q: "Apakah saya harus membayar di awal?",
    a: "Tidak. Untuk pembelian properti, biasanya tidak ada biaya di awal. Semua akan dijelaskan secara transparan.",
  },
  {
    q: "Area mana saja yang Anda cover?",
    a: "Saya fokus di area Jakarta Selatan, SCBD, BSD City, PIK 2, Menteng, dan sekitarnya.",
  },
  {
    q: "Berapa lama proses jual properti?",
    a: "Tergantung kondisi pasar dan harga, namun saya akan membantu mempercepat proses dengan strategi pemasaran yang tepat.",
  },
  {
    q: "Apakah Anda membantu proses KPR?",
    a: "Ya, saya bisa membantu mengarahkan Anda ke bank yang sesuai dan membantu proses pengajuan KPR.",
  },
];

// ─── Animation ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section className="bg-[#F8F8F6] text-[#0A1F44] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 md:px-20">
        
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#C9A84C]">
              FAQ
            </span>
            <span className="w-8 h-px bg-[#C9A84C]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Playfair Display', serif",
            }}
          >
            Pertanyaan Umum
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="text-[#0A1F44]/70 max-w-xl mx-auto"
          >
            Berikut beberapa pertanyaan yang sering ditanyakan oleh klien sebelum memulai proses properti.
          </motion.p>
        </div>

        {/* ── FAQ List ── */}
        <div className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = activeIndex === i;

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i + 3}
                className="border border-[#0A1F44]/10 bg-white rounded-sm"
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {item.q}
                  </span>

                  <span className="ml-4">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#C9A84C]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#C9A84C]" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-[#0A1F44]/70 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={10}
          className="mt-16 text-center"
        >
          <p className="text-[#0A1F44]/70 mb-6">
            Masih ada pertanyaan? Jangan ragu untuk menghubungi saya.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center px-7 py-4 text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-[#C9A84C] rounded-sm"
          >
            Hubungi Saya
          </a>
        </motion.div>
      </div>
    </section>
  );
}