
import React, { useState, useEffect } from 'react';

interface RamadanCountdownProps {
  testDays: number;
  targetDate: string;
}

const RamadanCountdown: React.FC<RamadanCountdownProps> = ({ testDays = 0, targetDate }) => {
  const [daysUntilRamadan, setDaysUntilRamadan] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const ramadanTarget = new Date(targetDate);
      ramadanTarget.setHours(0, 0, 0, 0);

      // Ramadan calculation
      if (testDays > 0) {
        setDaysUntilRamadan(testDays);
      } else {
        // If it's more than 30 days past the start date, hide it
        if (today > new Date(ramadanTarget.getTime() + 30 * 24 * 60 * 60 * 1000)) {
          setDaysUntilRamadan(null);
        } else {
          const diffTime = ramadanTarget.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysUntilRamadan(diffDays);
        }
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60 * 1); // Recalculate every hour
    return () => clearInterval(interval);
  }, [testDays, targetDate]);

  let content = null;
  // Background Merah Cerah (Red 500)
  let bgColor = 'bg-red-500 backdrop-blur-sm border border-white/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]';

  if (daysUntilRamadan !== null) {
    if (daysUntilRamadan <= 0 && daysUntilRamadan >= -29) {
      bgColor = 'bg-red-600 backdrop-blur-sm border border-white/20 shadow-inner';
      content = (
        <p className="font-sans font-bold text-xs sm:text-sm tracking-wide px-3 py-1 uppercase text-white">
          Selamat Berpuasa Ramadan 1447 H
        </p>
      );
    } else if (daysUntilRamadan > 0) {
      content = (
        <p className="font-sans font-bold text-[10px] sm:text-xs tracking-wider px-3 py-1 uppercase text-white">
          <span className="text-sm sm:text-base text-red-100">{daysUntilRamadan}</span> HARI MENUJU RAMADAN 1447 H
        </p>
      );
    }
  }
  
  if (!content) return null;

  return (
    <div 
      className={`text-white rounded-md ${bgColor} [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] text-center animate-fade-in`}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {content}
    </div>
  );
};

export default RamadanCountdown;
