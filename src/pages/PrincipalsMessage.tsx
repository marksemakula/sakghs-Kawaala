import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuAward, LuChevronDown, LuMenu, LuX, LuArrowLeft,
} from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/* ─────────────────────────────
   Brand
   ───────────────────────────── */
const PRIMARY   = '#FFD700';
const SECONDARY = '#800E13';

/* ─────────────────────────────
   Nav — hrefs prefixed with '/'
   so they navigate back to home
   ───────────────────────────── */
const navItems = [
  {
    label: 'About Us',
    items: [
      { label: 'School Profile',                     href: '/#school-profile' },
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
      { label: 'UNEB Results - Archives', href: '/#uneb-results' },
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

          {/* Desktop */}
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
                            sub.href === '/principals-message'
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

/* ═══════════════════════════════
   MAIN PAGE
   ═══════════════════════════════ */
const PrincipalsMessage: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Principal's Message – St. Andrew Kaggwa Gombe HS";
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
              <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Message from the <span className="text-[#FFD700]">Principal</span>
            </h1>
            <p className="text-white/70 text-lg">St. Andrew Kaggwa Gombe High School, Kawaala</p>
          </motion.div>
        </div>
      </div>

      {/* ── Message content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#FFF6CC]/40 border border-[#FFD700]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative quote mark */}
          <div className="absolute top-4 left-8 text-[#FFD700]/20 text-[10rem] font-serif leading-none select-none pointer-events-none">
            &ldquo;
          </div>

          <div className="relative">
            <p className="text-lg text-gray-700 font-semibold mb-6">Dear Parents, Students and Visitors,</p>

            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                It is my honour and privilege to welcome you to St. Andrew Kaggwa Gombe High School Kawaala.
                Whether you are a prospective student, a caring parent, or a visitor to our school, I am
                delighted to share what makes our institution truly exceptional.
              </p>
              <p>
                At Gombe High School, we are passionately dedicated to offering both academic excellence and
                holistic education. We are fully aware that the times have changed, and that parents today
                want their children to become resourceful, industrious and adaptable to the demands of a
                rapidly evolving world. It is therefore our unwavering commitment to provide quality, holistic
                education and civilisation without any reservation.
              </p>
              <p>
                Everything we do is guided by our six core values:{' '}
                <span className="font-semibold text-[#800E13]">
                  God-fearing, Respect, Integrity, Teamwork, Excellence, and Time Management
                </span>
                . These values are not merely words on a wall — they are lived out daily by our students and
                staff, and they form the foundation of every decision we make as a school community.
              </p>
              <p>
                Our curriculum is learner-centred and practical. Subjects such as Fine Art, Entrepreneurship,
                Technical Drawing, Food and Nutrition, and Agriculture are taught through hands-on experience.
                Students start their own companies and clubs, earning as they learn. They produce arts and
                crafts which are exported to India and East Africa, thereby developing the life skills
                necessary for self-sustenance and enterprise.
              </p>
              <p>
                ICT is central to how we teach and learn. The school is equipped with smart boards,
                projectors, computers, full-time Wi-Fi, and an online library that enables effective research
                in line with the national curriculum. This integration of technology into teaching and
                learning, driven by our competent and passionate staff, is a key reason for our consistently
                strong academic results.
              </p>
              <p>
                Our science laboratories are unmatched, with a student-to-apparatus ratio of 1:1. Practical
                work begins from Senior One, ensuring that students are acquainted with the laboratory
                environment early in their academic journey.
              </p>
              <p>
                Beyond academics, the school offers a rich range of sports and co-curricular activities,
                including football, netball, basketball and Dance sport. Students are also trained in music,
                learning to play instruments such as brass band, saxophone, jazz, drums, piano, guitar and
                flute. We believe that a well-rounded education nurtures the whole person.
              </p>
              <p>
                We are a multi-religious school. We have dedicated places of worship on the school premises,
                and every religion is accorded due respect. We celebrate our diversity and regard it as a
                strength.
              </p>
              <p>
                The safety and wellbeing of our students is a matter we take very seriously. CCTV cameras
                are installed across the school premises to support discipline and security. We conduct
                termly fire drills and maintain fire extinguishers throughout the school. Our counselling
                and guidance department, supported by trained peer counsellors, ensures that every student
                has access to the support they need to thrive both academically and personally.
              </p>
              <p>
                Our students are housed in well-maintained and comfortable dormitories, and are treated to
                nutritious, well-balanced meals every day. We believe that a healthy, rested student is a
                learning student.
              </p>
              <p>
                I warmly invite you to join the Gombe High School family. Come and experience for yourself
                why St. Andrew Kaggwa Gombe High School is the place to be — a school that offers academic
                excellence, world-class facilities, and both local and international exposure. This is the
                school that puts your worries to rest and sets your child on the path to a truly excellent
                future.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#FFD700]/40 pt-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#800E13] to-[#5C0A0F] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                LN
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">Lillian Nanyonjo</p>
                <p className="text-[#800E13] font-semibold">Principal</p>
                <p className="text-gray-500 text-sm">St. Andrew Kaggwa Gombe High School, Kawaala</p>
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-3">
                <div className="h-px w-12 bg-[#FFD700]" />
                <LuAward className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="max-w-sm">
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-16 w-auto mb-3 grayscale brightness-150" loading="lazy" />
              <h3 className="text-base font-bold text-white mb-2">St. Andrew Kaggwa Gombe High School</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Established in 2016, St. Andrew Kaggwa Gombe High School Kawaala is a mixed day and boarding
                secondary school committed to academic excellence, character formation, and holistic
                development, guided by the motto: "Light the Lamp of Wisdom."
              </p>
              <div className="flex items-center gap-3 mt-4">
                {([FaFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaWhatsapp] as React.ElementType[]).map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-colors text-gray-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {[['Home', '/'], ['School Profile', '/#school-profile'], ['Programs', '/#programs'], ['Admissions', '/#admissions'], ["Principal's Message", '/principals-message']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} St. Andrew Kaggwa Gombe High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrincipalsMessage;
