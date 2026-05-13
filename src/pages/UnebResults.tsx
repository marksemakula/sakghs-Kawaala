import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuChevronDown, LuMenu, LuX, LuArrowLeft,
  LuBookOpen, LuMail, LuAward, LuCalendar,
  LuMapPin, LuPhone,
} from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/* ─────────────────────────────
   Brand
   ───────────────────────────── */
const PRIMARY   = '#FFD700';
const SECONDARY = '#800E13';

/* ─────────────────────────────
   Nav
   ───────────────────────────── */
const navItems = [
  {
    label: 'About Us',
    items: [
      { label: 'School Profile',                     href: '/school-profile' },
      { label: 'Mission and Vision',                 href: '/#mission-vision' },
      { label: 'Core Values',                        href: '/#core-values' },
      { label: 'Board of Governors',                 href: '/#board-of-governors' },
      { label: "Principal's Message",                href: '/principals-message' },
      { label: 'Administration and Management Team', href: '/#administration' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Academic Program',        href: '/#programs' },
      { label: 'Curriculum Subjects',     href: '/#programs' },
      { label: 'Departments',             href: '/#programs' },
      { label: 'UNEB Results - Archives', href: '/uneb-results' },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Apply Now',        href: '/#apply-now' },
      { label: 'Resources - Fees', href: '/#fees' },
      { label: 'FAQs',             href: '/#faqs' },
      { label: 'Documents',        href: '/#documents' },
      { label: 'Overview',         href: '/#admissions' },
    ],
  },
  {
    label: 'Student Life',
    items: [
      { label: 'Articles',                    href: '/#articles' },
      { label: 'Images',                      href: '/#gallery' },
      { label: 'Student Clubs and Societies', href: '/#clubs-societies' },
    ],
  },
];

/* ─────────────────────────────
   Header
   ───────────────────────────── */
const PageHeader: React.FC = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : `bg-gradient-to-r from-[${SECONDARY}] to-[#5C0A0F] py-5`
      }`}
      style={!scrolled ? { background: `linear-gradient(to right, ${SECONDARY}, #5C0A0F)` } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className={`h-11 w-11 flex items-center justify-center overflow-hidden rounded-full border-2 transition-colors ${
              scrolled ? 'border-[#800E13]/30 group-hover:border-[#800E13]' : 'border-[#FFD700]/30 group-hover:border-[#FFD700]'
            }`}>
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-full w-full object-contain" loading="eager" />
            </div>
            <div className="leading-tight">
              <div className={`text-sm lg:text-base font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                St. Andrew Kaggwa Gombe HS
              </div>
              <div className={`text-xs font-semibold tracking-wider transition-colors ${scrolled ? 'text-[#800E13]' : 'text-[#FFD700]'}`}
                style={{ color: scrolled ? SECONDARY : PRIMARY }}>
                EXCELLENCE &amp; CHARACTER · SINCE 2016
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="/#home" className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
              scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'
            }`}>Home</a>
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'
                }`}>
                  {item.label}
                  <LuChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[150]"
                    >
                      {item.items.map((sub) => (
                        <a key={sub.label} href={sub.href} onClick={() => setOpenDropdown(null)}
                          className={`block px-5 py-2.5 text-sm font-medium transition-colors rounded-xl ${
                            sub.href === '/uneb-results'
                              ? 'bg-[#FFF6CC] text-[#800E13]'
                              : 'text-gray-700 hover:bg-[#FFF6CC] hover:text-[#800E13]'
                          }`}>
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen((p) => !p)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            {mobileOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className={`lg:hidden mt-3 overflow-hidden rounded-2xl border ${
                scrolled ? 'bg-white border-gray-100' : 'bg-[#800E13]/95 border-white/10'
              }`}
            >
              <div className="px-4 py-3 space-y-1">
                <a href="/#home" onClick={close}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                  }`}>Home</a>
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded((p) => (p === item.label ? null : item.label))}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <LuChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-3">
                          {item.items.map((sub) => (
                            <a key={sub.label} href={sub.href} onClick={close}
                              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                scrolled ? 'text-gray-600 hover:bg-[#FFF6CC] hover:text-[#800E13]' : 'text-white/80 hover:bg-white/10'
                              }`}>
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

/* ─────────────────────────────
   Section Label
   ───────────────────────────── */
const SectionLabel: React.FC<{ text: string; light?: boolean }> = ({ text, light }) => (
  <div className="flex items-center space-x-2 mb-4">
    <div className="h-1 w-12 bg-[#800E13]" />
    <span className="text-[#800E13] font-bold tracking-wider uppercase text-sm">{text}</span>
  </div>
);

/* ═══════════════════════════════
   MAIN PAGE
   ═══════════════════════════════ */
const UnebResults: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'UNEB Results Archives – St. Andrew Kaggwa Gombe HS';
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      {/* ── Hero banner ── */}
      <div className="relative pt-24 pb-16 bg-gradient-to-r from-[#800E13] to-[#5C0A0F] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FFD700 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 40%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-[#FFD700] text-sm font-medium mb-6 transition-colors">
              <LuArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#FFD700]" />
              <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm">Academic Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              UNEB Results <span className="text-[#FFD700]">Archives</span>
            </h1>
            <p className="text-white/70 text-lg">Celebrating our students' outstanding achievements in Uganda's national examinations.</p>
          </motion.div>
        </div>
      </div>

      {/* ── Results gallery ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'UCE 2024 Results', image: '/GOMBE HIGH SCHOOL - KAWAALA/Academics/UCE 2024.jpg' },
              { title: 'UCE 2025 Results', image: '/GOMBE HIGH SCHOOL - KAWAALA/Academics/UCE 2025.jpg' },
              { title: 'UACE 2025 Results', image: '/GOMBE HIGH SCHOOL - KAWAALA/Academics/UACE 2025.jpg' },
            ].map((result, index) => (
              <motion.div key={result.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={result.image} alt={result.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-gray-600 text-sm">Click to view full results</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          ADMISSIONS
         ══════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <SectionLabel text="Admissions" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Path to Enrolment</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to secure your place in the next intake and begin your journey to excellence.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Explore Programs', detail: 'Review our academic programs and choose the one that best fits your interests and goals.', icon: LuBookOpen },
              { title: 'Submit Application', detail: 'Complete the online application form with all required documents and personal information.', icon: LuMail },
              { title: 'Prepare Documents', detail: 'Gather your PLE results or O-level transcripts, national ID / birth certificate, and two passport photos for review.', icon: LuAward },
              { title: 'Submit & Interview', detail: 'Apply online or visit the campus admissions office, then complete a brief placement assessment or interview.', icon: LuCalendar },
            ].map((step, i) => (
              <motion.div key={step.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.08 }} viewport={{ once:true }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#FFD700] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF6CC] flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#800E13]" />
                  </div>
                  <span className="text-sm font-semibold text-[#800E13]">Step {i+1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Admission Requirements</h3>
            <p className="text-gray-600 mb-6">Download the complete list of requirements for the 2026 intake.</p>
            <a href="/GOMBE HIGH SCHOOL - KAWAALA/Admissions/Requirements List 2026.pdf" download
              className="inline-flex items-center gap-2 bg-[#800E13] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C0A0F] transition-colors">
              <LuBookOpen className="w-5 h-5" />
              Download Requirements PDF
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          FOOTER
         ══════════════════════ */}
      <footer className="bg-gray-900 text-white pt-16 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-20 w-auto mb-4 grayscale brightness-150" loading="lazy" />
              <h3 className="text-base font-bold text-white mb-2">St. Andrew Kaggwa Gombe High School</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Established in 2016, St. Andrew Kaggwa Gombe High School Kawaala is a mixed day and boarding
                secondary school committed to academic excellence, character formation, and holistic development,
                guided by the motto: "Light the Lamp of Wisdom."
              </p>
              <div className="flex items-center gap-3">
                {([FaFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaWhatsapp] as React.ElementType[]).map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-colors text-gray-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {[['Home','/'],['About Us','/#school-profile'],['Academic Programs','/#programs'],['Admissions','/#admissions'],['Student Life','/#gallery'],['Apply Now','/#apply-now']].map(([l,h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><LuMapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" /><span className="text-gray-400 text-sm">Kasubi, Kawaala, Hoima Road, Kampala</span></li>
                <li className="flex items-center gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700001" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">+256 708 700 001</a></li>
                <li className="flex items-center gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700006" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">+256 708 700 006/2</a></li>
                <li className="flex items-center gap-3"><LuMail className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="mailto:info@gombehighschool.ac.ug" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">info@gombehighschool.ac.ug</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-4 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} St. Andrew Kaggwa Gombe High School. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">Terms of Service</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Powered by</span>
                <img src="/images/Inzozi-grayscale.png" alt="Inzozi" className="h-8 w-auto brightness-0 invert opacity-60" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UnebResults;