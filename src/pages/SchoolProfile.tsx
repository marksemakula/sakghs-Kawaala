import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuChevronDown, LuMenu, LuX, LuArrowLeft,
  LuMapPin, LuPhone, LuMail, LuGlobe,
  LuBookOpen, LuMicroscope, LuUsers, LuAward,
  LuTarget, LuHeart, LuShield, LuMusic,
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
                            sub.href === '/school-profile'
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
   Data
   ───────────────────────────── */
const coreValues = [
  { icon: LuHeart,    label: 'God-Fearing',    desc: 'Grounded in faith and spiritual values that guide our community.' },
  { icon: LuUsers,    label: 'Respect',         desc: 'Honouring every individual — students, staff, and families alike.' },
  { icon: LuShield,   label: 'Integrity',       desc: 'Acting with honesty and transparency in all we do.' },
  { icon: LuTarget,   label: 'Team Work',        desc: 'Achieving more together through collaboration and shared purpose.' },
  { icon: LuAward,    label: 'Excellence',       desc: 'Pursuing the highest standards in academics and character.' },
  { icon: LuBookOpen, label: 'Time Management', desc: 'Respecting and making the most of every learning opportunity.' },
];

const highlights = [
  { icon: LuMicroscope, title: 'Science Excellence',    desc: 'Unmatched labs with a 1:1 student-to-apparatus ratio. Practical work begins from Senior One.' },
  { icon: LuBookOpen,   title: 'Balanced Curriculum',   desc: 'Sciences, humanities, languages, mathematics, arts, and vocational skills for well-rounded graduates.' },
  { icon: LuMusic,      title: 'Rich Co-Curricular',    desc: 'Sports, music (brass band, saxophone, jazz, drums, piano, guitar, flute), drama, debate, and clubs.' },
  { icon: LuUsers,      title: 'Boarding & Day',        desc: 'Well-maintained dormitories, nutritious balanced meals, and a structured day section for the community.' },
  { icon: LuShield,     title: 'Safe Environment',      desc: 'CCTV, fire drills, counselling, peer counsellors, and multi-religious worship spaces on campus.' },
  { icon: LuGlobe,      title: 'Global Exposure',       desc: 'Students produce crafts exported to India and East Africa. International outlook embedded in learning.' },
];

/* ═══════════════════════════════
   MAIN PAGE
   ═══════════════════════════════ */
const SchoolProfile: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'School Profile – St. Andrew Kaggwa Gombe HS';
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
              School <span className="text-[#FFD700]">Profile</span>
            </h1>
            <p className="text-white/70 text-lg">St. Andrew Kaggwa Gombe High School, Kawaala · Established June 2016</p>
          </motion.div>
        </div>
      </div>

      {/* ── Quick facts bar ── */}
      <div className="bg-[#FFD700]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#800E13]/20">
            {[
              { label: 'Founded',    value: 'June 2016' },
              { label: 'Reg. No.',   value: 'Pss/s/141' },
              { label: 'Type',       value: 'Day & Boarding' },
              { label: 'Motto',      value: '"Light the Lamp of Wisdom"' },
            ].map(({ label, value }) => (
              <div key={label} className="py-4 px-6 text-center">
                <div className="text-[#800E13] font-bold text-sm uppercase tracking-wide">{label}</div>
                <div className="text-[#800E13] text-sm font-semibold mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Overview ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#FFF6CC]/40 border border-[#FFD700]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-4 left-8 text-[#FFD700]/20 text-[10rem] font-serif leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="relative space-y-5 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Established in June 2016, <strong>St. Andrew Kaggwa Gombe High School Kawaala</strong> (Reg.&nbsp;No.&nbsp;Pss/s/141)
                has steadily grown into a vibrant centre of learning committed to academic excellence, character formation,
                and innovation. The school is a mixed day and boarding secondary school that provides a supportive and inclusive
                environment where learners are empowered to discover their potential and pursue their aspirations.
              </p>
              <p>
                From its inception, the school has been guided by a strong commitment to holistic education, nurturing not
                only intellectual growth but also moral values, leadership skills, creativity, and social responsibility.
                The institution serves students from diverse backgrounds and equips them with the knowledge, skills, and
                attitudes necessary to thrive in an ever-changing global society.
              </p>
              <p>
                All this is effected through the six core values: <span className="font-semibold text-[#800E13]">God-Fearing,
                Respect, Integrity, Team Work, Excellence, and Time Management.</span>
              </p>
              <p>
                The school places special emphasis on science education, positioning itself as a centre of scientific
                excellence and innovation. Through well-equipped laboratories, skilled educators, and inquiry-based learning
                approaches, students are encouraged to explore scientific concepts, develop critical thinking skills, and
                engage in problem-solving that addresses real-world challenges.
              </p>
              <p>
                The science programmes aim to inspire learners to pursue careers in fields such as medicine, engineering,
                technology, environmental science, and research, preparing them to make meaningful contributions both
                locally and globally.
              </p>
              <p>
                In addition to sciences, the school offers a balanced curriculum that includes humanities, languages,
                mathematics, arts, and vocational skills to ensure the development of well-rounded individuals.
              </p>
              <p>
                At St. Andrew Kaggwa Gombe High School Kawaala, education goes beyond the classroom. The school promotes
                holistic development through co-curricular activities including sports, music, drama, debate, and clubs;
                leadership and mentorship programmes; community engagement and service learning; spiritual and moral
                guidance; and life skills and career guidance programmes. These opportunities help learners build confidence,
                teamwork, discipline, and resilience.
              </p>
              <p>
                The school provides a conducive learning environment for both day and boarding students. Boarding facilities
                promote discipline, independence, and structured academic engagement, while the day section ensures
                accessibility for students within the surrounding communities. Students are treated to a well-balanced
                diet with nutritious meals every day.
              </p>
              <p>
                With nine years of dedicated service, St. Andrew Kaggwa Gombe High School Kawaala continues to grow as a
                centre of excellence committed to nurturing enlightened minds in line with its motto:{' '}
                <em className="font-semibold text-[#800E13]">"Light the Lamp of Wisdom."</em>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#800E13]" />
              <span className="text-[#800E13] font-bold tracking-wider uppercase text-sm">Our Foundation</span>
              <div className="h-1 w-12 bg-[#800E13]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values are not merely words on a wall — they are lived out daily by our students and staff,
              forming the foundation of every decision we make as a school community.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#FFD700] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF6CC] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#800E13]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#800E13]" />
              <span className="text-[#800E13] font-bold tracking-wider uppercase text-sm">What Sets Us Apart</span>
              <div className="h-1 w-12 bg-[#800E13]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">School Highlights</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#FFD700] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFF6CC] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#800E13]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact & Location ── */}
      <section className="py-16 bg-gradient-to-r from-[#800E13] to-[#5C0A0F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Find Us</h2>
            <p className="text-white/70">We'd love to welcome you to our campus</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: LuMapPin, label: 'Address',  value: 'Kasubi, Kawaala, Hoima Road, Kampala' },
              { icon: LuPhone,  label: 'Phone',    value: '+256 708 700 001\n+256 708 700 006/2' },
              { icon: LuMail,   label: 'Email',    value: 'info@gombehighschool.ac.ug' },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div className="text-white/60 text-xs uppercase tracking-widest mb-1">{label}</div>
                <div className="text-white font-semibold text-sm whitespace-pre-line">{value}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/#apply-now"
              className="inline-block bg-[#FFD700] text-[#800E13] px-10 py-4 rounded-full font-bold text-base hover:bg-yellow-300 transition shadow-2xl">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="max-w-sm">
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-16 w-auto mb-3 grayscale brightness-150" loading="lazy" />
              <h3 className="text-base font-bold text-white mb-2">St. Andrew Kaggwa Gombe High School</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Established in June 2016, St. Andrew Kaggwa Gombe High School Kawaala is a mixed day and boarding
                secondary school committed to academic excellence, character formation, and holistic development,
                guided by the motto: "Light the Lamp of Wisdom."
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
                {[['Home', '/'], ['School Profile', '/school-profile'], ['Programs', '/#programs'], ['Admissions', '/#admissions'], ["Principal's Message", '/principals-message']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-400 text-sm"><LuMapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />Kasubi, Kawaala, Hoima Road, Kampala</li>
                <li className="flex items-center gap-2 text-gray-400 text-sm"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700001" className="hover:text-[#FFD700] transition-colors">+256 708 700 001</a></li>
                <li className="flex items-center gap-2 text-gray-400 text-sm"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="tel:+256708700006" className="hover:text-[#FFD700] transition-colors">+256 708 700 006/2</a></li>
                <li className="flex items-center gap-2 text-gray-400 text-sm"><LuMail className="w-4 h-4 text-[#FFD700] shrink-0" /><a href="mailto:info@gombehighschool.ac.ug" className="hover:text-[#FFD700] transition-colors">info@gombehighschool.ac.ug</a></li>
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

export default SchoolProfile;
