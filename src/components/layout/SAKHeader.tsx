import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

const SECONDARY = '#800E13';
const PRIMARY = '#FFD700';

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  items: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: 'About Us',
    items: [
      { label: 'School Profile', href: '/school-profile' },
      { label: 'Mission and Vision', href: '#mission-vision' },
      { label: 'Core Values', href: '#core-values' },
      { label: 'Board of Governors', href: '#board-of-governors' },
      { label: "Principal's Message", href: '/principals-message' },
      { label: 'Administration and Management Team', href: '#administration' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Academic Program', href: '#academic-program' },
      { label: 'Curriculum Subjects', href: '#curriculum-subjects' },
      { label: 'Departments', href: '#departments' },
      { label: 'UNEB Results - Archives', href: '#uneb-results' },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Apply Now', href: '#apply-now' },
      { label: 'Resources - Fees', href: '#fees' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Documents', href: '#documents' },
      { label: 'Overview', href: '#admissions-overview' },
    ],
  },
  {
    label: 'Student Life',
    items: [
      { label: 'Articles', href: '#articles' },
      { label: 'Images', href: '#images' },
      { label: 'Student Clubs and Societies', href: '#clubs-societies' },
    ],
  },
];

const SAKHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, []);

  const bgStyle: React.CSSProperties = {
    backgroundColor: scrolled ? `${SECONDARY}F5` : `${SECONDARY}E8`,
    backdropFilter: scrolled ? 'blur(12px)' : 'blur(6px)',
    boxShadow: scrolled ? '0 4px 24px 0 rgba(0,0,0,0.25)' : 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  return (
    <header className="sticky top-0 z-[140]" style={bgStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenus}>
            <div className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center overflow-hidden rounded-full border-2 border-[#FFD700]/30 group-hover:border-[#FFD700] transition-colors duration-300">
              <img
                src="/images/Gombe High logo.png"
                alt="St. Andrew Kaggwa Gombe HS"
                className="h-full w-full object-contain grayscale brightness-110"
                loading="eager"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm lg:text-base font-bold text-white group-hover:text-[#FFD700] transition-colors duration-200">
                St. Andrew Kaggwa Gombe HS
              </div>
              <div className="text-[10px] lg:text-xs font-semibold tracking-widest uppercase" style={{ color: PRIMARY }}>
                Excellence &amp; Character
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
            <a
              href="#home"
              className="relative px-3 py-2 text-sm font-semibold text-white/90 hover:text-[#FFD700] transition-colors duration-200 group"
            >
              Home
              <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-[#FFD700] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
            </a>

            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center px-3 py-2 text-sm font-semibold text-white/90 hover:text-[#FFD700] transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <motion.span
                    animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-1 inline-flex"
                  >
                    <LuChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-gray-100 py-2 z-[200]"
                      role="menu"
                    >
                      {/* Dropdown arrow */}
                      <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                      {item.items.map((subitem, idx) => (
                        <motion.a
                          key={subitem.href}
                          href={subitem.href}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-gray-700 font-medium hover:bg-[#FFF6CC] hover:text-[#800E13] transition-colors duration-150 rounded-xl mx-1"
                          onClick={() => setOpenDropdown(null)}
                          role="menuitem"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />
                          {subitem.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <a
              href="#apply-now"
              className="ml-3 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              style={{ backgroundColor: PRIMARY, color: SECONDARY }}
            >
              Apply Now
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: '#fff' }}
          >
            <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">
              <a
                href="#home"
                onClick={closeMenus}
                className="block px-3 py-2.5 text-sm font-semibold text-gray-800 hover:text-[#800E13] rounded-xl hover:bg-[#FFF6CC] transition-colors"
              >
                Home
              </a>

              {navItems.map((item, itemIdx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIdx * 0.06 }}
                >
                  <button
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-gray-800 hover:text-[#800E13] rounded-xl hover:bg-[#FFF6CC] transition-colors"
                    onClick={() =>
                      setMobileExpanded((p) => (p === item.label ? null : item.label))
                    }
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: mobileExpanded === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LuChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 pl-3" style={{ borderColor: PRIMARY }}>
                          {item.items.map((subitem) => (
                            <a
                              key={subitem.href}
                              href={subitem.href}
                              onClick={closeMenus}
                              className="block py-2 text-sm text-gray-600 font-medium hover:text-[#800E13] transition-colors"
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <div className="pt-3 pb-1">
                <a
                  href="#apply-now"
                  onClick={closeMenus}
                  className="block text-center px-4 py-3 rounded-full text-sm font-bold text-white shadow-md"
                  style={{ backgroundColor: SECONDARY }}
                >
                  Apply Now
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SAKHeader;
