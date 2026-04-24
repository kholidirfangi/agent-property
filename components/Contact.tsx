"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

// ─── Animation ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function ContactSection() {
  return (
    <section className="bg-[#F8F8F6] py-20 md:py-28 text-[#0A1F44]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* ── LEFT (INFO) ── */}
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
              <span className="w-10 h-px bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#C9A84C]">
                Hubungi Saya
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Playfair Display', serif",
              }}
            >
              Siap Membantu Anda
              <br />
              <span className="text-[#C9A84C]">Menemukan Properti Terbaik</span>
            </motion.h2>

            {/* Desc */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-[#0A1F44]/70 mb-10 max-w-md"
            >
              Hubungi saya untuk konsultasi gratis. Saya akan membantu Anda
              menemukan solusi properti terbaik sesuai kebutuhan dan budget Anda.
            </motion.p>

            {/* Info List */}
            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  title: "WhatsApp",
                  value: "+62 812-3456-7890",
                },
                {
                  icon: Mail,
                  title: "Email",
                  value: "budi@property.com",
                },
                {
                  icon: MapPin,
                  title: "Lokasi",
                  value: "Jakarta Selatan",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={i}
                    custom={i + 3}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-11 h-11 flex items-center justify-center border border-[#C9A84C]/40 rounded-sm">
                      <Icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-sm text-[#0A1F44]/70">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/6281234567890"
              target="_blank"
              custom={7}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex mt-10 items-center gap-2 px-7 py-4 text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-[#C9A84C] rounded-sm"
            >
              Chat WhatsApp
            </motion.a>
          </div>

          {/* ── RIGHT (FORM) ── */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-8 border border-[#0A1F44]/10"
          >
            <form className="space-y-5">
              
              <div>
                <label className="text-sm font-medium">Nama</label>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  className="mt-2 w-full border border-[#0A1F44]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Nomor WhatsApp</label>
                <input
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  className="mt-2 w-full border border-[#0A1F44]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Kebutuhan</label>
                <select className="mt-2 w-full border border-[#0A1F44]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm">
                  <option>Beli Properti</option>
                  <option>Jual Properti</option>
                  <option>Investasi</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan kebutuhan Anda..."
                  className="mt-2 w-full border border-[#0A1F44]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#0A1F44] text-white py-4 text-sm font-bold tracking-[0.12em] uppercase rounded-sm"
              >
                Kirim Pesan
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}