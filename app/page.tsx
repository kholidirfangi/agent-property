import AboutSection from "@/components/About";
import AreaCoverageSection from "@/components/Area";
import ContactSection from "@/components/Contact";
import FAQSection from "@/components/Faq";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import ListingsSection from "@/components/Listing";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/Services";
import TestimonialSection from "@/components/Testimonial";

export default function Page() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ListingsSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <AreaCoverageSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
}
