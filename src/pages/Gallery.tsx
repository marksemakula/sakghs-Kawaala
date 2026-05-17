import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuChevronDown, LuMenu, LuX, LuArrowLeft,
  LuMapPin, LuPhone, LuMail, LuPlay, LuImage, LuX as LuClose,
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
      { label: 'School Profile', href: '/school-profile' },
      { label: 'Mission and Vision', href: '/#mission-vision' },
      { label: 'Core Values', href: '/#core-values' },
      { label: 'Board of Governors', href: '/#board-of-governors' },
      { label: "Principal's Message", href: '/principals-message' },
      { label: 'Administration and Management Team', href: '/#administration' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Academic Program', href: '/#programs' },
      { label: 'Curriculum Subjects', href: '/#programs' },
      { label: 'Departments', href: '/#programs' },
      { label: 'UNEB Results - Archives', href: '/uneb-results' },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Apply Now', href: '/#apply-now' },
      { label: 'Resources - Fees', href: '/#fees' },
      { label: 'FAQs', href: '/#faqs' },
      { label: 'Documents', href: '/#documents' },
      { label: 'Overview', href: '/#admissions' },
    ],
  },
  {
    label: 'Student Life',
    items: [
      { label: 'Articles', href: '/#articles' },
      { label: 'Images', href: '/gallery' },
      { label: 'Student Clubs and Societies', href: '/#clubs-societies' },
    ],
  },
];

/* ── Media types ── */
interface MediaItem {
  src: string;
  category: string;
  type: 'image' | 'video';
}

const BASE = '/GOMBE HIGH SCHOOL - KAWAALA';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'classes', label: 'Classes' },
  { id: 'dancesport', label: 'Dancesport' },
  { id: 'co-curricular', label: 'Co-Curricular' },
  { id: 'tours', label: 'Tours' },
  { id: 'religion', label: 'Religion' },
  { id: 'uniforms', label: 'Uniforms' },
  { id: 'administrators', label: 'Administrators' },
  { id: 'campus', label: 'Campus' },
  { id: 'videos', label: 'Videos' },
];

const mediaItems: MediaItem[] = [
  /* Videos */
  { src: `${BASE}/Home page/GHS-KAWAALA Virtual tour.mp4`, category: 'videos', type: 'video' },
  /* Campus */
  { src: `${BASE}/Home page/GOMBE HIGH SCHOOL.jpg`, category: 'campus', type: 'image' },
  /* Administrators */
  ...['IMG_2054','IMG_2055','IMG_2059','IMG_2062','IMG_2066','IMG_2068','IMG_2089','IMG_2150','IMG_2162','IMG_2165','IMG_2181']
    .map(f => ({ src: `${BASE}/Home page/ADMINISTRATORS/${f}.JPG`, category: 'administrators', type: 'image' as const })),
  /* Classes */
  ...['IMG_1952','IMG_2096','IMG_2101','IMG_2113','IMG_2146','IMG_9712','IMG_9718','IMG_9777','IMG_9794','IMG_9807','IMG_9828','IMG_9876','IMG_9893','IMG_9899']
    .map(f => ({ src: `${BASE}/Students life/Gallery/CLASSES/${f}.JPG`, category: 'classes', type: 'image' as const })),
  /* Co-Curricular */
  ...['IMG_2410','IMG_2439','IMG_2451','IMG_2455','IMG_2474','IMG_3496','IMG_3528']
    .map(f => ({ src: `${BASE}/Students life/Gallery/CO-CIRRICULAR ACTIVITIES/${f}.JPG`, category: 'co-curricular', type: 'image' as const })),
  /* Dancesport */
  ...['IMG_6935','_MG_6778','_MG_6831','_MG_6845','_MG_6876','_MG_6888','_MG_6907','_MG_6923','_MG_6924']
    .map(f => ({ src: `${BASE}/Students life/Gallery/DANCESPORT/${f}.JPG`, category: 'dancesport', type: 'image' as const })),
  /* Religion */
  ...['IMG_1944','_MG_5492','_MG_5502','_MG_5514']
    .map(f => ({ src: `${BASE}/Students life/Gallery/RELIGION/${f}.JPG`, category: 'religion', type: 'image' as const })),
  /* Tours */
  ...['_MG_7409','_MG_7424','_MG_7433','_MG_7446','_MG_7450','_MG_7455','_MG_7457','_MG_7472','_MG_7479','_MG_7486','_MG_7489','_MG_7493']
    .map(f => ({ src: `${BASE}/Students life/Gallery/TOURS/${f}.JPG`, category: 'tours', type: 'image' as const })),
  /* Uniforms */
  ...['WhatsApp Image 2026-04-17 at 7.21.17 PM','WhatsApp Image 2026-04-17 at 7.21.18 PM (1)','WhatsApp Image 2026-04-17 at 7.21.20 PM (1)','WhatsApp Image 2026-04-17 at 7.21.20 PM','WhatsApp Image 2026-04-17 at 7.21.21 PM','WhatsApp Image 2026-04-17 at 7.21.22 PM']
    .map(f => ({ src: `${BASE}/Students life/Gallery/UNIFORMS/${f}.jpeg`, category: 'uniforms', type: 'image' as const })),
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
                            sub.href === '/gallery' ? 'bg-[#FFF6CC] text-[#800E13]' : 'text-gray-700 hover:bg-[#FFF6CC] hover:text-[#800E13]'
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

/* ═══════════════════════════════
   GALLERY PAGE
   ═══════════════════════════════ */
const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Gallery – St. Andrew Kaggwa Gombe HS';
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, []);

  const filtered = activeCategory === 'all'
    ? mediaItems
    : activeCategory === 'videos'
    ? mediaItems.filter((m) => m.type === 'video')
    : mediaItems.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      {/* ── Hero banner ── */}
      <div className="relative pt-24 pb-16 bg-gradient-to-r from-[#800E13] to-[#5C0A0F] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FFD700 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 40%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-[#FFD700] text-sm font-medium mb-6 transition-colors">
              <LuArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#FFD700]" />
              <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm">Student Life</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Photo &amp; Video <span className="text-[#FFD700]">Gallery</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Explore moments that define the SAKGHS Kawaala experience — from classroom excellence to vibrant co-curricular life.
            </p>
            <div className="flex items-center gap-6 mt-6 text-white/60 text-sm">
              <span className="flex items-center gap-2"><LuImage className="w-4 h-4 text-[#FFD700]" />{mediaItems.filter(m => m.type === 'image').length} Photos</span>
              <span className="flex items-center gap-2"><LuPlay className="w-4 h-4 text-[#FFD700]" />{mediaItems.filter(m => m.type === 'video').length} Video{mediaItems.filter(m => m.type === 'video').length !== 1 ? 's' : ''}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#800E13] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery grid ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                  className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setLightbox(item)}
                >
                  {item.type === 'video' ? (
                    <div className="relative">
                      <video src={item.src} className="w-full h-auto object-cover" preload="metadata" muted />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <LuPlay className="w-7 h-7 text-[#800E13] ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden">
                      <img src={item.src} alt={item.category} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#800E13] capitalize">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <LuImage className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No media found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            >
              <button onClick={() => setLightbox(null)}
                className="absolute -top-2 -right-2 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition text-xl">
                ×
              </button>
              {lightbox.type === 'video' ? (
                <video src={lightbox.src} controls autoPlay className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl" />
              ) : (
                <img src={lightbox.src} alt="" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
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
                {[['Home','/'],['About Us','/#school-profile'],['Academic Programs','/#programs'],['Admissions','/#admissions'],['Gallery','/gallery'],['Apply Now','/#apply-now']].map(([l,h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><LuMapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" /><span className="text-gray-400 text-sm">Kasubi, Kawaala, Hoima Road, Kampala</span></li>
                <li className="flex items-center gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700001" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">0708 700 001</a></li>
                <li className="flex items-center gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700002" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">0708 700 002</a></li>
                <li className="flex items-center gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700009" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">0708 700 009</a></li>
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

export default Gallery;
