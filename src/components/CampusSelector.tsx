import React, { useEffect, useState } from 'react';

const CAMPUS_URLS = {
  kawaala: 'https://kawaala.gombehighschool.ac.ug/',
  bujuuko: 'https://bujuuko.gombehighschool.ac.ug/',
} as const;

/** Only prompt visitors arriving on the shared school domain
 *  (add ?campus-selector to any URL to preview the popup) */
const shouldShow = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (window.location.search.includes('campus-selector')) return true;
  return window.location.hostname.replace(/^www\./, '') === 'gombehighschool.ac.ug';
};

const CampusSelector: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldShow()) {
      setOpen(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!open) return null;

  const choose = (campus: 'kawaala' | 'bujuuko') => {
    const target = new URL(CAMPUS_URLS[campus]);
    if (window.location.hostname === target.hostname) {
      // Already on this campus's site (e.g. previewing) — just close
      document.body.style.overflow = '';
      setOpen(false);
    } else {
      window.location.href = target.href;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-selector-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        <div className="bg-[#800E13] px-6 py-6 flex flex-col items-center gap-3">
          <img
            src="/images/Gombe High logo.png"
            alt="St. Andrew Kaggwa Gombe High School"
            className="h-20 w-20 object-contain"
          />
          <h2 id="campus-selector-title" className="text-white text-lg font-bold text-center leading-snug">
            St. Andrew Kaggwa Gombe High School
          </h2>
          <p className="text-[#FFD700] text-sm font-medium">Please select your campus</p>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={() => choose('kawaala')}
            className="w-full rounded-xl border-2 border-[#800E13] px-5 py-4 text-left font-semibold text-[#800E13] hover:bg-[#800E13] hover:text-white active:scale-[0.98] transition-all duration-200"
          >
            St. Andrew Kaggwa Gombe High School
            <span className="block text-sm font-normal opacity-80">Kawaala Campus</span>
          </button>
          <button
            onClick={() => choose('bujuuko')}
            className="w-full rounded-xl border-2 border-[#800E13] px-5 py-4 text-left font-semibold text-[#800E13] hover:bg-[#800E13] hover:text-white active:scale-[0.98] transition-all duration-200"
          >
            St. Andrew Kaggwa Gombe High School
            <span className="block text-sm font-normal opacity-80">Bujuuko Campus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusSelector;
