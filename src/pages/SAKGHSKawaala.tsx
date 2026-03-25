import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import {
  LuArrowRight, LuGraduationCap, LuUsers, LuAward, LuBookOpen, LuTarget,
  LuCalendar, LuMapPin, LuPhone, LuMail, LuMenu, LuX, LuChevronDown,
  LuPlay, LuMicroscope, LuPalette, LuCpu, LuBriefcase,
} from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/* ─────────────────────────────
   Brand
   ───────────────────────────── */
const PRIMARY   = '#FFD700';
const SECONDARY = '#800E13';

/* ─────────────────────────────
   Types
   ───────────────────────────── */
interface NavSubItem { label: string; href: string }
interface NavItem    { label: string; items: NavSubItem[] }
interface Stat       { icon: React.ElementType; label: string; sublabel: string; numeric: number; suffix: string }
interface Program    { id: string; category: string; title: string; icon: React.ElementType; description: string; subjects: string[]; images: string[]; color: string }
interface AdmissionStep { title: string; detail: string; icon: React.ElementType }
interface Partner    { name: string; logo: string }

/* ─────────────────────────────
   Nav
   ───────────────────────────── */
const navItems: NavItem[] = [
  {
    label: 'About Us',
    items: [
      { label: 'School Profile',                    href: '#school-profile' },
      { label: 'Mission and Vision',                href: '#mission-vision' },
      { label: 'Core Values',                       href: '#core-values' },
      { label: 'Board of Governors',                href: '#board-of-governors' },
      { label: "Principal's Message",               href: '#principals-message' },
      { label: 'Administration and Management Team',href: '#administration' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Academic Program',        href: '#programs' },
      { label: 'Curriculum Subjects',     href: '#programs' },
      { label: 'Departments',             href: '#programs' },
      { label: 'UNEB Results - Archives', href: '#uneb-results' },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Apply Now',        href: '#apply-now' },
      { label: 'Resources - Fees', href: '#fees' },
      { label: 'FAQs',             href: '#faqs' },
      { label: 'Documents',        href: '#documents' },
      { label: 'Overview',         href: '#admissions' },
    ],
  },
  {
    label: 'Student Life',
    items: [
      { label: 'Articles',                    href: '#articles' },
      { label: 'Images',                      href: '#gallery' },
      { label: 'Student Clubs and Societies', href: '#clubs-societies' },
    ],
  },
];

/* ─────────────────────────────
   Stats
   ───────────────────────────── */
const stats: Stat[] = [
  { icon: LuUsers,    label: 'Students Enrolled',    sublabel: 'Active Learners',     numeric: 550, suffix: '+' },
  { icon: LuAward,    label: 'UACE Pass Rate',        sublabel: 'National Excellence', numeric: 97,  suffix: '%' },
  { icon: LuBookOpen, label: 'Subjects Offered',      sublabel: 'Broad Curriculum',    numeric: 20,  suffix: '+' },
  { icon: LuTarget,   label: 'University Admissions', sublabel: 'Class of 2024',       numeric: 94,  suffix: '%' },
];

/* ─────────────────────────────
   Programs
   ───────────────────────────── */
const programs: Program[] = [
  {
    id: 'sciences', category: 'sciences',
    title: 'Sciences Program', icon: LuMicroscope,
    description: 'Rigorous science curriculum covering Physics, Chemistry, Biology, and Mathematics — preparing students for medicine, engineering and technology.',
    subjects: ['Physics','Chemistry','Biology','Mathematics','ICT','Sub-Maths'],
    images: ['/images/science.avif','/GHS_school/emmanuel-ikwuegbu-MUyq5MiVE2w-unsplash.jpg','/GHS_school/rohan-reddy-MhQxeXhE-GI-unsplash.jpg'],
    color: 'from-[#800E13] to-[#5C0A0F]',
  },
  {
    id: 'arts', category: 'arts',
    title: 'Arts Program', icon: LuPalette,
    description: 'Broad liberal arts education in languages, humanities and social sciences — building critical thinking, communication and cultural literacy.',
    subjects: ['Literature in English','History','Geography','Economics','Languages','Divinity'],
    images: ['/images/uni2.avif','/GHS_school/trnava-university-SwCMZwrhQm8-unsplash.jpg','/GHS_school/juma-mndeme-SQde0xURhG8-unsplash.jpg'],
    color: 'from-amber-700 to-yellow-700',
  },
  {
    id: 'technical', category: 'technical',
    title: 'Technical Program', icon: LuCpu,
    description: 'Hands-on development in technical and vocational subjects, equipping students with practical competencies for industry and enterprise.',
    subjects: ['Technical Drawing','Computer Science','Agriculture','Business Studies','Entrepreneurship'],
    images: ['/images/TD.avif','/ICT/premium_photo-1683134015825-74717a7b344b.avif','/GHS_school/marco-fileccia-HE7_hMkqn9A-unsplash.jpg'],
    color: 'from-slate-700 to-gray-800',
  },
  {
    id: 'business', category: 'business',
    title: 'Business Studies', icon: LuBriefcase,
    description: 'Develop entrepreneurial thinking and business acumen through practical economics, accounting and commerce — the foundation for tomorrow\'s leaders.',
    subjects: ['Economics','Accounting','Commerce','Entrepreneurship','Business Management'],
    images: ['/images/premium_photo-1713890429200-e725c894ab95.avif','/GHS_school/oscar-omondi-u9BPnG0ADsU-unsplash.jpg','/images/uni2.avif'],
    color: 'from-emerald-700 to-teal-700',
  },
];

/* ─────────────────────────────
   Admissions steps
   ───────────────────────────── */
const admissionSteps: AdmissionStep[] = [
  { title: 'Choose Your Program',  icon: LuGraduationCap, detail: 'Review our Sciences, Arts, Technical, and Business pathways and choose the one that matches your strengths and career goals.' },
  { title: 'Prepare Documents',    icon: LuAward,         detail: 'Gather your PLE results or O-level transcripts, national ID / birth certificate, and two passport photos for review.' },
  { title: 'Submit & Interview',   icon: LuCalendar,      detail: 'Apply online or visit the campus admissions office, then complete a brief placement assessment or interview.' },
  { title: 'Enroll & Begin',       icon: LuArrowRight,    detail: 'Finalise fee arrangements, collect your requirements list, attend orientation, and begin your journey to excellence.' },
];

/* ─────────────────────────────
   Partners
   ───────────────────────────── */
const rawPartners: Partner[] = [
  { name: 'Gombe Education Service', logo: '/images/GES.png' },
  { name: 'Ministry of Education',   logo: '/images/MoES.png' },
  { name: 'Buganda Kingdom',         logo: '/images/Flag_of_Buganda.svg' },
  { name: 'Uganda Tourism Board',    logo: '/images/UTB.png' },
  { name: 'Java House',              logo: '/images/java-house.avif' },
];
const partners: Partner[] = [...rawPartners, ...rawPartners];

/* ─────────────────────────────
   Animated counter
   ───────────────────────────── */
const Counter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const ref      = useRef<HTMLSpanElement>(null);
  const inView   = useInView(ref, { once: true, margin: '-60px' });
  const motionVal = useMotionValue(0);
  const spring   = useSpring(motionVal, { damping: 40, stiffness: 200 });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, target, { duration: 1.8, ease: 'easeOut' });
    return () => ctrl.stop();
  }, [inView, motionVal, target]);

  useEffect(() => spring.on('change', (v) => {
    if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
  }), [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ─────────────────────────────
   Section label
   ───────────────────────────── */
const SectionLabel: React.FC<{ text: string; light?: boolean }> = ({ text, light }) => (
  <div className="flex items-center justify-center space-x-2 mb-4">
    <div className={`h-1 w-12 ${light ? 'bg-[#FFD700]' : 'bg-[#800E13]'}`} />
    <span className={`font-bold tracking-wider uppercase text-sm ${light ? 'text-[#FFD700]' : 'text-[#800E13]'}`}>{text}</span>
    <div className={`h-1 w-12 ${light ? 'bg-[#FFD700]' : 'bg-[#800E13]'}`} />
  </div>
);

/* ═══════════════════════════════════════════
   JSBI-style inline header (school-branded)
   ═══════════════════════════════════════════ */
const InlineHeader: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => { setMobileOpen(false); setOpenDropdown(null); setMobileExpanded(null); };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-gradient-to-r from-[#800E13] to-[#5C0A0F] py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <a href="#home" onClick={close} className="flex items-center gap-3 group">
            <div className={`h-11 w-11 flex items-center justify-center overflow-hidden rounded-full border-2 transition-colors ${
              scrolled ? 'border-[#800E13]/30 group-hover:border-[#800E13]' : 'border-[#FFD700]/30 group-hover:border-[#FFD700]'
            }`}>
              <img src="/images/Gombe High logo.png" alt="SAKGHS" className="h-full w-full object-contain" loading="eager" />
            </div>
            <div className="leading-tight">
              <div className={`text-sm lg:text-base font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                St. Andrew Kaggwa Gombe HS
              </div>
              <div className={`text-xs font-semibold tracking-wider transition-colors ${scrolled ? 'text-[#800E13]' : 'text-[#FFD700]'}`}>
                EXCELLENCE &amp; CHARACTER · SINCE 1995
              </div>
            </div>
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="#home" className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'}`}>Home</a>
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${scrolled ? 'text-gray-700 hover:text-[#800E13] hover:bg-gray-50' : 'text-white hover:text-[#FFD700]'}`}>
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
                          className="block px-5 py-2.5 text-sm text-gray-700 font-medium hover:bg-[#FFF6CC] hover:text-[#800E13] transition-colors rounded-xl">
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <button onClick={onApply}
              className="ml-2 bg-[#800E13] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#5C0A0F] transition shadow-lg hover:shadow-xl">
              Apply Now
            </button>
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
                <a href="#home" onClick={close}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white hover:bg-white/10'}`}>
                  Home
                </a>
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded((p) => p === item.label ? null : item.label)}
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
                <div className="pt-2">
                  <button onClick={() => { onApply(); close(); }}
                    className="w-full bg-[#FFD700] text-[#800E13] py-2.5 rounded-full text-sm font-bold hover:bg-yellow-400 transition">
                    Apply Now
                  </button>
                </div>
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
const SAKGHSKawaala: React.FC = () => {
  const [activeTab,        setActiveTab]        = useState<string>('all');
  const [isApplyOpen,      setIsApplyOpen]      = useState(false);
  const [programImages,    setProgramImages]    = useState<Record<number,number>>(() =>
    Object.fromEntries(programs.map((_, i) => [i, 0]))
  );
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', program: '', documents: null as File | null,
  });

  /* Cycle program card images */
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[]  = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    programs.forEach((prog, i) => {
      const t = setTimeout(() => {
        const id = setInterval(() => {
          setProgramImages((prev) => ({ ...prev, [i]: ((prev[i] ?? 0) + 1) % prog.images.length }));
        }, 8000);
        intervals.push(id);
      }, i * 1200);
      timeouts.push(t);
    });
    return () => { timeouts.forEach(clearTimeout); intervals.forEach(clearInterval); };
  }, []);

  /* Title & favicon */
  useEffect(() => {
    const prev = document.title;
    document.title = 'St. Andrew Kaggwa Gombe HS \u2013 Kawaala';
    return () => { document.title = prev; };
  }, []);

  const filtered = activeTab === 'all' ? programs : programs.filter((p) => p.category === activeTab);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'documents') {
      const f = (e.target as HTMLInputElement).files;
      setFormData((p) => ({ ...p, documents: f?.[0] ?? null }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application received!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProgram: ${formData.program}\n\nWe will contact you within 2 working days.`);
    setFormData({ name: '', phone: '', email: '', program: '', documents: null });
    setIsApplyOpen(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ viewTransitionName: 'institution-sakghs-kawaala' }}>
      {/* ── JSBI-style header ── */}
      <InlineHeader onApply={() => setIsApplyOpen(true)} />

      {/* ══════════════════════
          HERO
         ══════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/emmanuel-ikwuegbu-MUyq5MiVE2w-unsplash.jpg" alt="Campus" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#800E13]/95 via-[#5C0A0F]/90 to-[#800E13]/80" />
        </div>
        {/* Diagonal accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-[#800E13] to-[#FFD700]/10 transform skew-x-12 origin-top-right opacity-20 pointer-events-none" />
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Light the Lamp
                <span className="block text-[#FFD700]">of Wisdom.</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                St. Andrew Kaggwa Gombe High School – Kawaala Campus provides world-class secondary
                education that shapes character, cultivates intellect, and opens doors to Uganda's top universities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsApplyOpen(true)}
                  className="group bg-[#FFD700] text-[#800E13] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-2xl hover:shadow-[#FFD700]/40 flex items-center justify-center space-x-2"
                >
                  <span>Apply Now</span>
                  <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#programs"
                  className="group bg-white/10 border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center space-x-2">
                  <LuPlay className="w-5 h-5" />
                  <span>Our Programs</span>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:flex flex-col items-center justify-center gap-6">
              <img src="/images/Gombe High logo.png" alt="SAKGHS Logo" className="h-56 md:h-72 w-auto drop-shadow-2xl" />
              <div className="flex items-center space-x-2">
                <LuGraduationCap className="w-7 h-7 text-[#FFD700]" />
                <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm">Excellence &amp; Character · Since 1995</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          STATS
         ══════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-2">
                  <Counter target={stat.numeric} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          PROGRAMS
         ══════════════════════ */}
      <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <SectionLabel text="Our Programs" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Chart Your Academic<span className="text-[#800E13]"> Pathway</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A balanced, university-preparatory curriculum built for the ambitions of every student.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[{ id:'all',label:'All Programs'},{id:'sciences',label:'Sciences'},{id:'arts',label:'Arts'},{id:'technical',label:'Technical'},{id:'business',label:'Business'}].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all text-sm ${
                  activeTab === t.id ? 'bg-[#800E13] text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((prog, index) => {
                const pi  = programs.findIndex((p) => p.id === prog.id);
                const img = prog.images[(programImages[pi] ?? 0) % prog.images.length];
                return (
                  <motion.div key={prog.id} layout initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ delay: index * 0.07 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <img src={img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center shadow-lg">
                        <prog.icon className="w-6 h-6 text-[#800E13]" />
                      </div>
                    </div>
                    <div className={`h-1 bg-gradient-to-r ${prog.color}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#800E13] transition-colors">{prog.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{prog.description}</p>
                      <ul className="mt-auto space-y-1.5">
                        {prog.subjects.slice(0,4).map((s) => (
                          <li key={s} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />{s}
                          </li>
                        ))}
                        {prog.subjects.length > 4 && (
                          <li className="text-xs text-[#800E13] font-semibold">+{prog.subjects.length - 4} more subjects</li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          ABOUT
         ══════════════════════ */}
      <section id="school-profile" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-1 w-12 bg-[#800E13]" />
                <span className="text-[#800E13] font-bold tracking-wider uppercase text-sm">About the School</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Shaping Lives,<span className="text-[#800E13]"> Building Leaders</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded in 1995 under the Gombe Education Service umbrella, St. Andrew Kaggwa Gombe High School –
                Kawaala has grown into one of Kampala's leading Advanced Level institutions. We combine academic
                rigour with character formation, preparing every student not just for university but for a life
                of purpose and impact.
              </p>
              <div className="space-y-6">
                {[
                  { icon: LuUsers,    title: 'Personalised Attention',  desc: 'Small class sizes and dedicated teachers ensure every student gets the individual support they need to excel.' },
                  { icon: LuAward,    title: 'National Recognition',     desc: 'Consistently ranked among top UACE performers in Kampala; 97 % pass rate in the latest national examinations.' },
                  { icon: LuBookOpen, title: 'Holistic Development',     desc: 'Beyond academics — arts, sports, clubs, community service, and leadership programmes shape the whole student.' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={title} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} transition={{ delay: i*0.1 }} viewport={{ once:true }} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFF6CC] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#800E13]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="relative">
              <div className="relative">
                <img src="/images/emmanuel-ikwuegbu-MUyq5MiVE2w-unsplash.jpg" alt="Students studying"
                  className="rounded-2xl shadow-2xl w-full object-cover" style={{ maxHeight: 460 }} loading="lazy" />
                <div className="absolute -bottom-6 -left-6 bg-[#800E13] text-white p-8 rounded-2xl shadow-2xl">
                  <div className="text-5xl font-bold mb-1" style={{ color: PRIMARY }}>30+</div>
                  <div className="text-base font-semibold">Years of Excellence</div>
                  <div className="text-sm text-white/70">Established 1995</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          PARTNERS CAROUSEL
         ══════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-14">
            <SectionLabel text="Partners & Affiliates" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proudly Associated With</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Working with government, industry and community to deliver the best for our students.
            </p>
          </motion.div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            <div className="flex overflow-hidden">
              <motion.div className="flex gap-16 items-center"
                animate={{ x: [0, -1100] }}
                transition={{ x: { repeat: Infinity, repeatType:'loop', duration:22, ease:'linear' } }}
              >
                {partners.map((p, i) => (
                  <div key={i} className="flex-shrink-0 w-36 h-20 flex items-center justify-center">
                    <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain px-2 grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          ADMISSIONS
         ══════════════════════ */}
      <section id="admissions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <SectionLabel text="Admissions" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Path to Enrolment</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to secure your place in the next intake and begin your journey to excellence.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((step, i) => (
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
        </div>
      </section>

      {/* ══════════════════════
          CTA
         ══════════════════════ */}
      <section id="apply-now" className="py-20 bg-gradient-to-r from-[#800E13] to-[#5C0A0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">
              Join hundreds of graduates who have gone on to Uganda's top universities and careers around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 mb-10">
              <div className="flex items-center gap-2"><LuMapPin className="w-4 h-4 text-[#FFD700]" /><span>Kawaala, Kampala, Uganda</span></div>
              <div className="flex items-center gap-2"><LuPhone className="w-4 h-4 text-[#FFD700]" /><span>+256 700 000 000</span></div>
              <div className="flex items-center gap-2"><LuMail className="w-4 h-4 text-[#FFD700]" /><span>info@sakghs-kawaala.ges.ac.ug</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsApplyOpen(true)}
                className="bg-[#FFD700] text-[#800E13] px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-2xl">
                Apply Now
              </button>
              <a href="#admissions"
                className="bg-transparent border-2 border-white/60 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition">
                Learn More
              </a>
            </div>
          </motion.div>
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
                Providing quality advanced-level education since 1995. Two campuses — Kawaala and Bujuuko —
                united by a commitment to excellence, character, and university readiness.
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
                {[['Home','#home'],['About Us','#school-profile'],['Academic Programs','#programs'],['Admissions','#admissions'],['Student Life','#gallery'],['Apply Now','#apply-now']].map(([l,h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><LuMapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" /><span className="text-gray-400 text-sm">Kawaala, Kampala, Uganda</span></li>
                <li className="flex items-center gap-3"><LuPhone className="w-4 h-4 text-[#FFD700] shrink-0" /><span className="text-gray-400 text-sm">+256 700 000 000</span></li>
                <li className="flex items-center gap-3"><LuMail className="w-4 h-4 text-[#FFD700] shrink-0" /><span className="text-gray-400 text-sm">info@sakghs-kawaala.ges.ac.ug</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
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

      {/* ══════════════════════
          APPLY MODAL
         ══════════════════════ */}
      <AnimatePresence>
        {isApplyOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsApplyOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Apply Now</h2>
                  <p className="text-sm text-gray-500 mt-1">St. Andrew Kaggwa Gombe HS – Kawaala</p>
                </div>
                <button onClick={() => setIsApplyOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl font-light leading-none">×</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#800E13] focus:border-transparent outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+256 7XX XXX XXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#800E13] focus:border-transparent outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@email.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#800E13] focus:border-transparent outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program of Interest</label>
                  <select name="program" value={formData.program} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#800E13] focus:border-transparent outline-none transition text-sm bg-white">
                    <option value="">Select a program</option>
                    {programs.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Documents</label>
                  <input type="file" name="documents" onChange={handleChange} accept=".pdf,.doc,.docx,.jpg,.png"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none transition text-sm" />
                  <p className="text-xs text-gray-400 mt-1">PLE / UCE results slip (PDF or image, max 4 MB)</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-[#800E13] text-white py-3 rounded-xl font-semibold hover:bg-[#5C0A0F] transition text-sm">Submit Application</button>
                  <button type="button" onClick={() => setIsApplyOpen(false)} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-sm">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SAKGHSKawaala;
