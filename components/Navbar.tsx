"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Listings", href: "#listings", active: true },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Testimonial", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Listings");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(10,31,68,0.10)]"
            : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-68px">
            {/* Logo */}
            <motion.a
              href="#"
              className="shrink-0 select-none"
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="text-[15px] font-bold tracking-[0.18em] uppercase"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  color: "#0A1F44",
                  letterSpacing: "0.18em",
                }}
              >
                Prestige Realty
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.2, duration: 0.4 }}
                  onClick={() => setActiveLink(link.label)}
                  className={`relative px-4 py-2 text-[11.5px] font-semibold tracking-[0.13em] uppercase transition-colors duration-200 group ${
                    activeLink === link.label
                      ? "text-[#C9A84C]"
                      : "text-[#1A2E55] hover:text-[#C9A84C]"
                  }`}
                  style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-[#C9A84C] origin-left"
                    initial={false}
                    animate={{ scaleX: activeLink === link.label ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button — desktop */}
            <motion.a
              href="#consultation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              whileHover={{ scale: 1.03, backgroundColor: "#132847" }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[10.5px] font-bold tracking-[0.15em] uppercase text-white rounded-sm transition-colors duration-200"
              style={{
                backgroundColor: "#0A1F44",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              }}
            >
              Konsultasi Gratis
            </motion.a>

            {/* Mobile Hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus:outline-none"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] w-6 bg-[#0A1F44]"
              />
              <motion.span
                animate={
                  isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-6 bg-[#0A1F44]"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] w-6 bg-[#0A1F44]"
              />
            </button>
          </div>
        </nav>

        {/* Thin golden accent line */}
        <div className="h-1px w-full bg-linear-to-r from-transparent via-[#C9A84C33] to-transparent" />
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-69px left-0 right-0 z-40 bg-white shadow-xl lg:hidden border-t border-[#E8E0D0]"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={() => {
                      setActiveLink(link.label);
                      setIsOpen(false);
                    }}
                    className={`py-3 px-2 text-[12px] font-semibold tracking-[0.14em] uppercase border-b border-[#F0EBE2] transition-colors duration-200 ${
                      activeLink === link.label
                        ? "text-[#C9A84C]"
                        : "text-[#1A2E55] hover:text-[#C9A84C]"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#consultation"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.35 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full text-center py-3 px-6 text-[11px] font-bold tracking-[0.16em] uppercase text-white rounded-sm"
                  style={{
                    backgroundColor: "#0A1F44",
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  }}
                >
                  Konsultasi Gratis
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so page content doesn't hide under fixed navbar */}
      <div className="h-69px" />
    </>
  );
}
