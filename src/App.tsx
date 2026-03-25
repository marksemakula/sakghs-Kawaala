import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const SAKGHSKawaala     = lazy(() => import('./pages/SAKGHSKawaala'));
const PrincipalsMessage = lazy(() => import('./pages/PrincipalsMessage'));

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
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/principals-message" element={<PrincipalsMessage />} />
          <Route path="/*" element={<SAKGHSKawaala />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
