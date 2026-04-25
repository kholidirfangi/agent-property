"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Listings",     href: "#listings" },
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const PROPERTY_TYPES = [
  { label: "Rumah Dijual",      href: "#listings" },
  { label: "Apartemen Dijual",  href: "#listings" },
  { label: "Vila & Resort",     href: "#listings" },
  { label: "Properti Disewa",   href: "#listings" },
  { label: "Properti Komersial",href: "#listings" },
  { label: "Tanah & Kavling",   href: "#listings" },
];

const POPULAR_AREAS = [
  "Jakarta Selatan", "BSD City", "Bali", "Surabaya",
  "Depok", "Serpong", "Bekasi", "Bandung",
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281234567890",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const CONTACT_INFO = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    label: "+62 812-3456-7890",
    href: "tel:+6281234567890",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "budi@brightonproperty.id",
    href: "mailto:budi@brightonproperty.id",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Gedung Brighton, Jl. Sudirman No. 88, Jakarta Selatan",
    href: "https://maps.google.com",
  },
];

// ─── Animation helpers ────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const} },
});

// ─── Footer Column Heading ────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="text-[11px] font-bold tracking-[0.24em] uppercase mb-5"
      style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </h4>
  );
}

// ─── Newsletter form ──────────────────────────────────────
// function NewsletterForm() {
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);

//   const handleSubmit = () => {
//     if (!email || !email.includes("@")) return;
//     setSent(true);
//     setEmail("");
//     setTimeout(() => setSent(false), 4000);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-2 mt-3">
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//         placeholder="email@anda.com"
//         className="flex-1 px-4 py-2.5 text-[13px] rounded-sm bg-white/10 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
//         style={{ fontFamily: "'Inter', sans-serif" }}
//         disabled={sent}
//       />
//       <motion.button
//         whileHover={{ scale: 1.04 }}
//         whileTap={{ scale: 0.96 }}
//         onClick={handleSubmit}
//         className="px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm whitespace-nowrap transition-colors duration-200"
//         style={{
//           backgroundColor: sent ? "#25D366" : "#C9A84C",
//           color: "#fff",
//           fontFamily: "'Inter', sans-serif",
//         }}
//       >
//         {sent ? "✓ Terkirim" : "Daftar"}
//       </motion.button>
//     </div>
//   );
// }

// ─── Scroll to top button ─────────────────────────────────
function ScrollTopButton() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      onClick={scrollTop}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Kembali ke atas"
      className="flex items-center justify-center w-10 h-10 rounded-sm transition-colors duration-200"
      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C";
        (e.currentTarget as HTMLElement).style.color = "#C9A84C";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  );
}

// ─── Main Footer ──────────────────────────────────────────
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#050F22" }}
    >
      {/* ── Decorative top gold line ── */}
      <div
        className="h-0.5 w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #C9A84C 30%, #C9A84C 70%, transparent 100%)",
        }}
      />

      {/* ── Diagonal texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(201,168,76,0.03) 80px, rgba(201,168,76,0.03) 81px)",
        }}
        aria-hidden
      />

      {/* ── Faint watermark ── */}
      <div
        className="absolute bottom-0 right-0 select-none pointer-events-none hidden xl:block"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "240px",
          fontWeight: 700,
          color: "rgba(201,168,76,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          transform: "translate(10%, 20%)",
        }}
        aria-hidden
      >
        PR
      </div>

      {/* ══════════════════════════════════════════
          CTA BAND (pre-footer)
      ══════════════════════════════════════════ */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Siap Menemukan Properti Impian?
              </p>
              <p
                className="text-[14px] mt-1"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
              >
                Konsultasikan kebutuhan Anda secara gratis hari ini.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm"
                style={{ backgroundColor: "#C9A84C", color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                Konsultasi Gratis
              </motion.a>
              <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat WhatsApp
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          MAIN FOOTER GRID
      ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Col 1: Brand ── */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Logo */}
            <a href="#" className="inline-block mb-4">
              <p
                className="text-xl font-bold tracking-[0.18em] uppercase text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Prestige Realty
              </p>
              <p
                className="text-[10px] tracking-[0.22em] uppercase mt-0.5"
                style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
              >
                by Brighton Property
              </p>
            </a>

            <p
              className="text-[14px] leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
            >
              Agen properti profesional berpengalaman yang siap membantu Anda menemukan,
              membeli, atau menjual properti terbaik di Indonesia.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-7">
              {CONTACT_INFO.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[13px] transition-colors duration-200 group"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
                >
                  <span
                    className="mt-0.5 shrink-0 transition-colors duration-200 group-hover:text-[#C9A84C]"
                    style={{ color: "#C9A84C" }}
                  >
                    {c.icon}
                  </span>
                  <span className="group-hover:text-white transition-colors duration-200 leading-snug">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center justify-center w-9 h-9 rounded-sm transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C";
                    (e.currentTarget as HTMLElement).style.color = "#C9A84C";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Quick links ── */}
          <motion.div
            variants={fadeUp(0.18)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColHeading>Navigasi</ColHeading>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-[14px] transition-colors duration-200 group"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    <motion.span
                      className="block w-3 h-px origin-left"
                      style={{ backgroundColor: "#C9A84C" }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Property types ── */}
          <motion.div
            variants={fadeUp(0.24)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColHeading>Jenis Properti</ColHeading>
            <ul className="space-y-3">
              {PROPERTY_TYPES.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    className="text-[14px] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4: Areas + Newsletter ── */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColHeading>Area Populer</ColHeading>
            <div className="flex flex-wrap gap-2 mb-10">
              {POPULAR_AREAS.map((area) => (
                <a
                  key={area}
                  href="#listings"
                  className="px-3 py-1.5 text-[11px] rounded-sm transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C";
                    (e.currentTarget as HTMLElement).style.color = "#C9A84C";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  {area}
                </a>
              ))}
            </div>

            {/* <ColHeading>Newsletter</ColHeading>
            <p
              className="text-[13px] leading-relaxed mb-2"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
            >
              Dapatkan info listing terbaru dan tips properti langsung ke email Anda.
            </p>
            <NewsletterForm /> */}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════ */}
      <motion.div
        variants={fadeUp(0.4)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left: copyright */}
            <p
              className="text-[12px] text-center sm:text-left"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
            >
              © {new Date().getFullYear()} Prestige Realty · Brighton Property. Hak Cipta Dilindungi.
            </p>

            {/* Center: legal links */}
            <div className="flex items-center gap-4">
              {["Kebijakan Privasi", "Syarat & Ketentuan", "Disclaimer"].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className="text-[11px] transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#C9A84C"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)"}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right: scroll top */}
            <ScrollTopButton />
          </div>
        </div>
      </motion.div>
    </footer>
  );
}