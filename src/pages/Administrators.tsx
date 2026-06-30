import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuChevronDown, LuMenu, LuX, LuArrowLeft,
  LuMapPin, LuPhone, LuMail, LuImage, LuX as LuClose,
} from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/* ── Brand ── */
const PRIMARY = '#FFD700';
const SECONDARY = '#800E13';

/* ── Nav ── */
const navItems = [
  {
    label: 'About Us',
    items: [
      { label: 'School Profile',                     href: '/school-profile' },
      { label: 'Mission and Vision',                 href: '/school-profile#mission-vision' },
      { label: 'Core Values',                        href: '/school-profile#core-values' },
      { label: 'Administrators',                     href: '/administrators' },
      { label: "Principal's Message",                href: '/principals-message' },
      { label: 'Administration and Management Team', href: '/#administration' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Academic Program',    href: '/#programs' },
      { label: 'Curriculum Subjects', href: '/#programs' },
      { label: 'Departments',         href: '/#programs' },
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
      { label: 'Images',                      href: '/gallery' },
      { label: 'Student Clubs and Societies', href: '/#clubs-societies' },
    ],
  },
];

const adminPhotos = [
  '/administrators/IMG_2059.JPG',
  '/administrators/IMG_2089.JPG',
  '/administrators/IMG_2150.JPG',
  '/administrators/IMG_2162.JPG',
  '/administrators/IMG_2165.JPG',
  '/administrators/IMG_2181.JPG',
  '/administrators/IMG_8914.JPG',
  '/administrators/IMG_8971.JPG',
  '/administrators/IMG_9608.JPG',
];

/* ── Header ── */
const PageHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => { setMobileOpen(false); setOpenDropdown(null); setMobileExpanded(null); };

  return (
    <motion.header
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'py-5'
      }`}
      style={!scrolled ? { background: `linear-gradient(to right, ${SECONDARY}, #5C0A0F)` } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
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

          <div className="hidden lg:flex items-center gap-1">
            <a href="/" className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
              scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'
            }`}>Home</a>
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'
                }`}>
                  {item.label}
                  <LuChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.14 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[150]">
                      {item.items.map((sub) => (
                        <a key={sub.label} href={sub.href} onClick={() => setOpenDropdown(null)}
                          className={`block px-5 py-2.5 text-sm font-medium transition-colors rounded-xl ${
                            sub.href === '/administrators' ? 'bg-[#FFF6CC] text-[#800E13]' : 'text-gray-700 hover:bg-[#FFF6CC] hover:text-[#800E13]'
                          }`}>{sub.label}</a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button onClick={() => setMobileOpen((p) => !p)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            {mobileOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}
              className={`lg:hidden mt-3 overflow-hidden rounded-2xl border ${
                scrolled ? 'bg-white border-gray-100' : 'bg-[#800E13]/95 border-white/10'
              }`}>
              <div className="px-4 py-3 space-y-1">
                <a href="/" onClick={close} className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                }`}>Home</a>
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button onClick={() => setMobileExpanded((p) => (p === item.label ? null : item.label))}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                      }`}>
                      <span>{item.label}</span>
                      <LuChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="pl-4 pr-2 py-1 space-y-1">
                          {item.items.map((sub) => (
                            <a key={sub.label} href={sub.href} onClick={close}
                              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                sub.href === '/administrators' ? 'bg-[#FFF6CC] text-[#800E13]' : 'text-gray-600 hover:bg-gray-50'
                              }`}>{sub.label}</a>
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

/* ── Main Component ── */
const Administrators: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + adminPhotos.length) % adminPhotos.length);
    }
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % adminPhotos.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      {/* Hero Banner */}
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
              <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm">Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              School <span className="text-[#FFD700]">Administrators</span>
            </h1>
            <p className="text-white/70 text-lg">St. Andrew Kaggwa Gombe High School, Kawaala</p>
          </motion.div>
        </div>
      </div>

      {/* Photo Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {adminPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-[#FFD700] transition-all duration-300 relative overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                  <img
                    src={src}
                    alt={`Administrator ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#800E13]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-[#800E13] shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <LuImage className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <LuClose className="w-6 h-6" />
            </button>

            <button
              onClick={prev}
              className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <span className="text-xl font-bold">&larr;</span>
            </button>

            <div className="max-w-4xl max-h-[80vh] flex items-center justify-center select-none" onClick={(e) => e.stopPropagation()}>
              <img
                src={adminPhotos[lightboxIndex]}
                alt={`Administrator ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
              />
            </div>

            <button
              onClick={next}
              className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <span className="text-xl font-bold">&rarr;</span>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
              Image {lightboxIndex + 1} of {adminPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
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
              <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2.5 text-gray-400 text-sm font-medium">
                <li><a href="/school-profile" className="hover:text-[#FFD700] transition-colors">School Profile</a></li>
                <li><a href="/school-profile#mission-vision" className="hover:text-[#FFD700] transition-colors">Mission &amp; Vision</a></li>
                <li><a href="/school-profile#core-values" className="hover:text-[#FFD700] transition-colors">Core Values</a></li>
                <li><a href="/administrators" className="hover:text-[#FFD700] transition-colors">Administrators</a></li>
                <li><a href="/principals-message" className="hover:text-[#FFD700] transition-colors">Principal's Message</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider">Contact Info</h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3"><LuMapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" /><span className="text-gray-400 text-sm">Kasubi, Kawaala, Hoima Road, Kampala</span></li>
                <li className="flex items-start gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" /><span className="text-gray-400 text-sm">0708 700 001<br />0708 700 002<br />0708 700 009</span></li>
                <li className="flex items-start gap-3"><LuMail className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" /><span className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors"><a href="mailto:info@gombehighschool.ac.ug">info@gombehighschool.ac.ug</a></span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} St. Andrew Kaggwa Gombe High School Kawaala. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Administrators;
