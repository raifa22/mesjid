import React, { useState, useEffect } from 'react';
import type { Hadith } from '../types';

const MOSQUE_PRAYER_HADITHS: Hadith[] = [
  {
    arabic: "بُنِيَ الْمَسْجِدُ عَلَى التَّقْوَى",
    translation: "Masjid itu dibangun di atas ketaqwaan.",
    source: "Hadits Riwayat Muslim"
  },
  {
    arabic: "مَنْ بَنَى مَسْجِدًا لِلَّهِ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ",
    translation: "Barangsiapa membangun masjid karena Allah, Allah akan membangunkan baginya rumah di surga.",
    source: "HR. Bukhari & Muslim"
  },
  {
    arabic: "الصَّلَاةُ نُورٌ",
    translation: "Shalat adalah cahaya.",
    source: "HR. Muslim"
  },
  {
    arabic: "أَحَبُّ الْبِلَادِ إِلَى اللَّهِ مَسَاجِدُهَا",
    translation: "Tempat yang paling dicintai Allah di suatu negeri adalah masjid-masjidnya.",
    source: "HR. Muslim"
  },
  {
    arabic: "مِفْتَاحُ الْجَنَّةِ الصَّلَاةُ",
    translation: "Kunci surga adalah shalat.",
    source: "HR. Ahmad"
  },
  {
    arabic: "صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً",
    translation: "Shalat berjamaah lebih utama daripada shalat sendirian sebanyak 27 derajat.",
    source: "HR. Bukhari & Muslim"
  }
];

interface HadithDailyProps {
  panelClass: string;
}

const HadithDaily: React.FC<HadithDailyProps> = ({ panelClass }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOSQUE_PRAYER_HADITHS.length);
    }, 25000);
    return () => clearInterval(timer);
  }, []);

  const currentHadith = MOSQUE_PRAYER_HADITHS[index];

  return (
    <div className={`rounded-xl p-3 sm:p-4 transition-all duration-700 ${panelClass} border border-white/5 shadow-xl animate-fade-in overflow-hidden`}>
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">Hadits Harian</h3>
      </div>
      
      <div className="flex flex-col gap-2 min-h-[90px] sm:min-h-[110px] justify-start pt-1 text-center">
        <p dir="rtl" className="text-lg sm:text-xl font-serif text-white leading-relaxed [text-shadow:0_2px_6px_rgba(0,0,0,0.9)]">
          {currentHadith.arabic}
        </p>
        <div className="space-y-0.5">
          <p className="text-[11px] sm:text-xs italic font-medium opacity-100 leading-tight text-slate-100 [text-shadow:1px_1px_4px_rgba(0,0,0,1)]">
            "{currentHadith.translation}"
          </p>
          <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-tighter [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
            — {currentHadith.source}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HadithDaily;