import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuMail, LuPhone, LuMapPin } from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const PRIMARY = '#FFD700';
const SECONDARY = '#800E13';

interface Campus {
  name: string;
  path: string;
  contact: string;
  location: string;
}

const campusesData: Campus[] = [
  { name: 'Kawaala Campus', path: '/institutions/sakghs-kawaala', contact: '+256 700 000 000', location: 'Kawaala, Kampala' },
  { name: 'Bujuuko Campus', path: '/institutions/sakghs-bujuuko', contact: '+256 700 000 001', location: 'Bujuuko, Wakiso' },
];

const socialIcons = [
  { Icon: FaFacebook, href: '#', label: 'Facebook' },
  { Icon: FaTwitter, href: '#', label: 'Twitter' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
];

const SAKFooter: React.FC = React.memo(() => {
  const campuses = useMemo(() => campusesData, []);

  return (
    <footer className="text-white pt-10 pb-8" style={{ backgroundColor: '#2C2C2C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 flex items-center justify-center overflow-hidden rounded-full border border-white/20">
                <img
                  src="/images/Gombe High logo.png"
                  alt="St. Andrew Kaggwa Gombe HS"
                  className="h-full w-full object-contain grayscale"
                  loading="lazy"
                  width={80}
                  height={80}
                />
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold">St. Andrew Kaggwa</div>
                <div className="text-sm font-semibold">Gombe High School</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: PRIMARY }}>Excellence &amp; Character</div>
              </div>
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              Two campuses delivering exceptional secondary education with a balance of academics,
              character formation, and university readiness.
            </p>
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.18, color: PRIMARY }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/70 hover:text-[#FFD700] transition-colors duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Campuses column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: PRIMARY }}>Campuses</h3>
            <ul className="space-y-3">
              {campuses.map((campus) => (
                <li key={campus.path}>
                  <Link
                    to={campus.path}
                    className="text-white/90 hover:text-[#FFD700] transition-colors duration-200 text-sm font-semibold block"
                  >
                    {campus.name}
                  </Link>
                  <div className="text-xs text-white/50 mt-0.5">{campus.location}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: PRIMARY }}>Contact</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 text-sm text-white/80">
                <LuPhone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PRIMARY }} />
                <span>+256 700 000 000 / 001</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <LuMail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PRIMARY }} />
                <span>info@sakghs.ges.ac.ug</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <LuMapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PRIMARY }} />
                <span>Kawaala &amp; Bujuuko Campuses, Uganda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <span>© {new Date().getFullYear()} St. Andrew Kaggwa Gombe High School. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <Link to="/privacy" className="hover:text-[#FFD700] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#FFD700] transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-[#FFD700] transition-colors">Cookies</Link>
              <span className="flex items-center gap-1.5">
                Powered by
                <img
                  src="/images/Inzozi-grayscale.png"
                  alt="Inzozi"
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

SAKFooter.displayName = 'SAKFooter';

export default SAKFooter;
