import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CampusSelector from './components/CampusSelector';
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';

const SAKGHSKawaala     = lazy(() => import('./pages/SAKGHSKawaala'));
const PrincipalsMessage = lazy(() => import('./pages/PrincipalsMessage'));
const SchoolProfile     = lazy(() => import('./pages/SchoolProfile'));
const UnebResults       = lazy(() => import('./pages/UnebResults'));
const Gallery           = lazy(() => import('./pages/Gallery'));
const Administrators    = lazy(() => import('./pages/Administrators'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#800E13]">
    <div className="flex flex-col items-center gap-4">
      <img src="/images/Gombe High logo.png" alt="Loading" className="h-24 w-24 object-contain animate-pulse" />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[#FFD700] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <CampusSelector />
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/principals-message" element={<PrincipalsMessage />} />
          <Route path="/school-profile"     element={<SchoolProfile />} />
          <Route path="/uneb-results"       element={<UnebResults />} />
          <Route path="/gallery"            element={<Gallery />} />
          <Route path="/administrators"     element={<Administrators />} />
          <Route path="/*"                  element={<SAKGHSKawaala />} />
        </Routes>
      </Suspense>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/256708700002"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20BA56] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </BrowserRouter>
  );
}

export default App;
