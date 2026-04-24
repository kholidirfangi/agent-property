"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Types ───────────────────────────────────────────────
type Category = "semua" | "dijual" | "disewa";

interface Listing {
  id: number;
  title: string;
  location: string;
  city: string;
  price: string;
  priceNote: string;
  type: "dijual" | "disewa";
  badge?: "Baru" | "Hot" | "Eksklusif" | "Featured";
  beds: number;
  baths: number;
  landSize: number;
  buildSize: number;
  image: string;
}

// ─── Data (Unsplash property images) ─────────────────────
const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Villa Modern dengan Kolam Renang",
    location: "Kemang, Jakarta Selatan",
    city: "Jakarta",
    price: "Rp 8,5 M",
    priceNote: "Harga Nego",
    type: "dijual",
    badge: "Featured",
    beds: 5,
    baths: 4,
    landSize: 450,
    buildSize: 380,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Rumah Cluster Premium BSD",
    location: "BSD City, Tangerang Selatan",
    city: "Tangerang",
    price: "Rp 3,2 M",
    priceNote: "KPR Ready",
    type: "dijual",
    badge: "Hot",
    beds: 4,
    baths: 3,
    landSize: 200,
    buildSize: 180,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Apartemen Mewah SCBD View City",
    location: "SCBD, Jakarta Pusat",
    city: "Jakarta",
    price: "Rp 45 Jt / bln",
    priceNote: "Sudah Furnished",
    type: "disewa",
    badge: "Eksklusif",
    beds: 3,
    baths: 2,
    landSize: 0,
    buildSize: 145,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Townhouse Minimalis Depok",
    location: "Cinere, Depok",
    city: "Depok",
    price: "Rp 1,8 M",
    priceNote: "Harga Final",
    type: "dijual",
    badge: "Baru",
    beds: 3,
    baths: 2,
    landSize: 120,
    buildSize: 110,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Rumah Hook Strategis Surabaya",
    location: "Pakuwon Indah, Surabaya",
    city: "Surabaya",
    price: "Rp 5,1 M",
    priceNote: "Harga Nego",
    type: "dijual",
    beds: 4,
    baths: 3,
    landSize: 280,
    buildSize: 240,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Vila Sewa Harian Seminyak Bali",
    location: "Seminyak, Bali",
    city: "Bali",
    price: "Rp 18 Jt / bln",
    priceNote: "Min. 6 Bulan",
    type: "disewa",
    badge: "Hot",
    beds: 3,
    baths: 3,
    landSize: 0,
    buildSize: 200,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&auto=format&fit=crop",
  },
];

// ─── Badge config ─────────────────────────────────────────
const BADGE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  Hot:       { bg: "#DC2626", text: "#fff",     label: "🔥 Hot" },
  Baru:      { bg: "#0A1F44", text: "#fff",     label: "✦ Baru" },
  Eksklusif: { bg: "#C9A84C", text: "#fff",     label: "★ Eksklusif" },
  Featured:  { bg: "#0A1F44", text: "#C9A84C",  label: "◆ Featured" },
};

// ─── Filter Tabs ──────────────────────────────────────────
const FILTERS: { id: Category; label: string }[] = [
  { id: "semua",  label: "Semua" },
  { id: "dijual", label: "Dijual" },
  { id: "disewa", label: "Disewa" },
];

// ─── Icons ────────────────────────────────────────────────
function BedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/>
      <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"/>
      <path d="M10 10H14"/>
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 00-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 002 2h12a2 2 0 002-2v-5"/>
      <line x1="10" y1="5" x2="8" y2="7"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18M3 12h18M3 17h18"/>
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Property Card ────────────────────────────────────────
function PropertyCard({ listing, index }: { listing: Listing; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col bg-white rounded-sm overflow-hidden"
      style={{
        boxShadow: hovered
          ? "0 20px 60px rgba(10,31,68,0.14), 0 4px 16px rgba(10,31,68,0.08)"
          : "0 2px 16px rgba(10,31,68,0.06), 0 1px 4px rgba(10,31,68,0.04)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,31,68,0.55) 0%, transparent 50%)",
          }}
        />

        {/* Badge */}
        {listing.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase rounded-sm"
            style={{
              backgroundColor: BADGE_STYLES[listing.badge].bg,
              color: BADGE_STYLES[listing.badge].text,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {BADGE_STYLES[listing.badge].label}
          </span>
        )}

        {/* Type pill */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase rounded-sm"
          style={{
            backgroundColor:
              listing.type === "dijual"
                ? "rgba(10,31,68,0.85)"
                : "rgba(201,168,76,0.9)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            backdropFilter: "blur(4px)",
          }}
        >
          {listing.type === "dijual" ? "Dijual" : "Disewa"}
        </span>

        {/* Location on image bottom */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            <LocationPinIcon />
          </span>
          <span
            className="text-[11px] text-white/80 font-medium truncate max-w-[200px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {listing.location}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3
          className="text-[15px] font-bold leading-snug mb-1"
          style={{ color: "#0A1F44", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px" }}
        >
          {listing.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span
            className="text-xl font-bold"
            style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {listing.price}
          </span>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-sm"
            style={{
              color: "#6B7280",
              backgroundColor: "#F5F5F5",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {listing.priceNote}
          </span>
        </div>

        {/* Specs */}
        <div
          className="flex items-center gap-4 pb-4 mb-4"
          style={{ borderBottom: "1px solid #F0F0F0" }}
        >
          <div className="flex items-center gap-1.5 text-[12px]" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>
            <BedIcon />
            <span>{listing.beds} KT</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px]" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>
            <BathIcon />
            <span>{listing.baths} KM</span>
          </div>
          {listing.landSize > 0 && (
            <div className="flex items-center gap-1.5 text-[12px]" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>
              <RulerIcon />
              <span>LT {listing.landSize}m²</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[12px]" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>
            <RulerIcon />
            <span>LB {listing.buildSize}m²</span>
          </div>
        </div>

        {/* CTA Row */}
        <div className="flex items-center gap-2 mt-auto">
          <motion.a
            href={`#listing-${listing.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase rounded-sm transition-colors duration-200"
            style={{
              backgroundColor: "#0A1F44",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Lihat Detail
            <ArrowRightIcon />
          </motion.a>

          {/* WhatsApp quick contact */}
          <motion.a
            href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(listing.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center justify-center w-10 h-10 rounded-sm"
            style={{ backgroundColor: "#25D366" }}
            aria-label="Tanya via WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Section ─────────────────────────────────────────
export default function ListingsSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("semua");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const filtered =
    activeFilter === "semua"
      ? LISTINGS
      : LISTINGS.filter((l) => l.type === activeFilter);

  return (
    <section
      id="listings"
      className="relative py-20 sm:py-28"
      style={{ backgroundColor: "#F8F8F6" }}
    >
      {/* Subtle top border accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] rounded-full"
        style={{ backgroundColor: "#C9A84C" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-3"
            style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
          >
            ✦ Properti Pilihan Terbaik
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              color: "#0A1F44",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.1,
            }}
          >
            Properti Unggulan
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-14 h-[2px] mb-5 origin-left"
            style={{ backgroundColor: "#C9A84C" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md text-[15px] leading-relaxed"
            style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
          >
            Koleksi properti eksklusif di lokasi strategis. Setiap properti telah diverifikasi
            dan siap untuk dihuni atau dijadikan investasi.
          </motion.p>
        </div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-10"
        >
          <div
            className="flex p-1 gap-1 rounded-sm"
            style={{ backgroundColor: "#EBEBEA" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="relative px-6 py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-sm transition-colors duration-200 focus:outline-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: activeFilter === f.id ? "#fff" : "#6B7280",
                  zIndex: 1,
                }}
              >
                {activeFilter === f.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-sm"
                    style={{ backgroundColor: "#0A1F44" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
                {/* Count badge */}
                <span
                  className="relative z-10 ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor:
                      activeFilter === f.id ? "rgba(201,168,76,0.3)" : "rgba(0,0,0,0.08)",
                    color: activeFilter === f.id ? "#C9A84C" : "#9CA3AF",
                  }}
                >
                  {f.id === "semua"
                    ? LISTINGS.length
                    : LISTINGS.filter((l) => l.type === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          >
            {filtered.map((listing, i) => (
              <PropertyCard key={listing.id} listing={listing} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-20 gap-3"
          >
            <span className="text-4xl">🏠</span>
            <p className="text-[15px]" style={{ color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
              Tidak ada listing untuk kategori ini.
            </p>
          </motion.div>
        )}

        {/* ── See All CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <motion.a
            href="#all-listings"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-8 py-4 text-[12px] font-bold tracking-[0.14em] uppercase rounded-sm transition-all duration-300"
            style={{
              border: "1.5px solid #0A1F44",
              color: "#0A1F44",
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#0A1F44";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#0A1F44";
            }}
          >
            Lihat Semua Properti
            <motion.span
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <ArrowRightIcon />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}