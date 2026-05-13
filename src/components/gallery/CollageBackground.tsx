import React, { useState, useEffect } from 'react';
import './CollageBackground.css';

const images: string[] = [
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/CLASSES/IMG_2101.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/CO-CIRRICULAR ACTIVITIES/IMG_2451.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/DANCESPORT/_MG_6845.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/RELIGION/_MG_5502.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/TOURS/_MG_7489.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/UNIFORMS/WhatsApp Image 2026-04-17 at 7.21.17 PM.jpeg',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/CLASSES/IMG_9828.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/DANCESPORT/IMG_6935.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/CLASSES/IMG_9807.JPG',
  '/GOMBE HIGH SCHOOL - KAWAALA/Students life/Gallery/CLASSES/IMG_2096.JPG',
];

const FOREGROUND_COUNT = 3;

const CollageBackground: React.FC = () => {
  const [foregroundIndexes, setForegroundIndexes] = useState<number[]>([]);
  const [colorIndexes, setColorIndexes] = useState<number[]>([]);

  useEffect(() => {
    setForegroundIndexes(Array.from({ length: FOREGROUND_COUNT }, (_, i) => i));
    setColorIndexes([]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setForegroundIndexes(() => {
        const newIndexes: number[] = [];
        while (newIndexes.length < FOREGROUND_COUNT) {
          const idx = Math.floor(Math.random() * images.length);
          if (!newIndexes.includes(idx)) newIndexes.push(idx);
        }
        return newIndexes;
      });
      setColorIndexes(() => {
        if (foregroundIndexes.length > 0) {
          const idx = foregroundIndexes[Math.floor(Math.random() * foregroundIndexes.length)];
          return [idx];
        }
        return [];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [foregroundIndexes]);

  return (
    <div className="collage-bg">
      {images.map((src, i) => {
        const isForeground = foregroundIndexes.includes(i);
        const isColor = colorIndexes.includes(i);
        return (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className={`collage-img${isForeground ? ' collage-img-foreground' : ' collage-img-background'}${
              isColor ? ' collage-img-color' : ''
            }`}
            style={{
              zIndex: isForeground ? 2 : 1,
              filter: isColor ? 'none' : 'grayscale(1) contrast(1.1) brightness(0.95)',
              opacity: isForeground ? (isColor ? 1 : 0.95) : 0.5,
              transition: 'all 2s cubic-bezier(.77,0,.18,1)',
              transform: isForeground ? 'scale(1.1) translateY(-10px)' : 'scale(1) translateY(0)',
            }}
            loading="lazy"
          />
        );
      })}
    </div>
  );
};

export default CollageBackground;
