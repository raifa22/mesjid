
import React, { useState, useEffect } from 'react';

// Perkiraan Isra Mi'raj 27 Rajab 1447 H adalah sekitar 16 Januari 2026.
const ISRA_MIRAJ_START_DATE_1447 = new Date('2026-01-16T00:00:00');

interface IsraMirajCountdownProps {}

const IsraMirajCountdown: React.FC<IsraMirajCountdownProps> = () => {
  const [daysUntilIsraMiraj, setDaysUntilIsraMiraj] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (today > new Date(ISRA_MIRAJ_START_DATE_1447.getTime() + 24 * 60 * 60 * 1000)) {
          setDaysUntilIsraMiraj(null);
      } else {
          const diffTime = ISRA_MIRAJ_START_DATE_1447.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysUntilIsraMiraj(diffDays);
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60 * 24); // Hitung ulang sekali sehari
    return () => clearInterval(interval);
  }, []);

  let content = null;
  // Background Hijau Mint (Emerald 400), Text Hitam/Gelap agar terbaca di warna cerah
  const bgColor = 'bg-emerald-400 backdrop-blur-sm border border-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]';

  if (daysUntilIsraMiraj !== null) {
    if (daysUntilIsraMiraj > 0) {
      content = (
        <p className="font-sans font-bold text-[10px] sm:text-xs tracking-wider px-3 py-1 uppercase text-emerald-950">
          <span className="text-sm sm:text-base">{daysUntilIsraMiraj}</span> HARI MENUJU ISRA MI'RAJ 1447 H
        </p>
      );
    } else if (daysUntilIsraMiraj === 0) {
      content = (
        <p className="font-sans font-bold text-xs sm:text-sm tracking-wide px-3 py-1 uppercase text-emerald-950">
          SELAMAT ISRA MI'RAJ 1447 H
        </p>
      );
    }
  }
  
  if (!content) return null;

  return (
    <div 
      className={`rounded-md ${bgColor} text-center animate-fade-in`}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {content}
    </div>
  );
};

export default IsraMirajCountdown;
