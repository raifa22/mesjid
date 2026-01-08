
import React from 'react';
import type { JumuahOfficial, SlideTitleSize } from '../types';

interface JumuahScheduleProps {
  schedule: JumuahOfficial;
  panelClass: string;
  slideTitleSize: SlideTitleSize;
}

const JumuahSchedule: React.FC<JumuahScheduleProps> = ({ schedule, panelClass, slideTitleSize }) => {
  const titleSizeClasses: Record<SlideTitleSize, string> = {
    normal: 'text-base sm:text-lg',
    large: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
  };

  // Label Style: Hijau Zamrud (Emerald 600)
  const labelClass = "font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-emerald-600 font-extrabold mb-1";
  
  // Name Style: Abu-abu Gelap (Zinc 800)
  const nameFontBase = "font-sans font-bold text-zinc-800 leading-tight block w-full truncate";

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-[2rem] p-5 sm:p-8 text-center ${panelClass} shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col justify-center animate-fade-in`}>
      {/* HEADER SLIDE - Diperkecil */}
      <div className="mb-5 flex-shrink-0">
        <h2 className={`font-bold transition-all duration-300 text-white [text-shadow:2px_2px_6px_rgba(0,0,0,0.8)] uppercase tracking-[0.25em] ${titleSizeClasses[slideTitleSize]}`}>
          Petugas Sholat Jum'at
        </h2>
        <div className="inline-block mt-2 px-4 py-0.5 bg-emerald-600/30 rounded-full border border-emerald-400/20 backdrop-blur-md">
          <span className="text-[9px] sm:text-[10px] font-black text-emerald-100 uppercase tracking-[0.1em]">
            Jadwal Minggu ke-{schedule.id}
          </span>
        </div>
      </div>
      
      {/* MAIN LAYOUT: COMPACT DASHBOARD */}
      <div className="flex flex-col gap-3">
        
        {/* ROW 1: IMAM & KHATIB (Utama) - Ukuran Diperkecil */}
        <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border-b-2 border-emerald-500 shadow-md flex flex-col items-center justify-center relative overflow-hidden group">
          <span className={labelClass}>Imam & Khatib</span>
          <span className={`${nameFontBase} text-xl sm:text-2xl md:text-3xl text-zinc-900`}>
            {schedule.imam === schedule.khatib ? schedule.imam : `${schedule.imam} / ${schedule.khatib}`}
          </span>
        </div>
        
        {/* ROW 2: PETUGAS LAINNYA (Grid Rapat) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* MUADZIN */}
          <div className="bg-white/90 p-3 sm:p-4 rounded-2xl border-b-2 border-emerald-400/50 shadow-sm flex flex-col items-center justify-center">
            <span className={labelClass}>Muadzin</span>
            <span className={`${nameFontBase} text-base sm:text-lg`}>
              {schedule.muadzin}
            </span>
          </div>
          
          {/* BILAL */}
          <div className="bg-white/90 p-3 sm:p-4 rounded-2xl border-b-2 border-emerald-400/50 shadow-sm flex flex-col items-center justify-center">
            <span className={labelClass}>Bilal</span>
            <span className={`${nameFontBase} text-base sm:text-lg`}>
              {schedule.bilal}
            </span>
          </div>
          
          {/* MC MAKLUMAT */}
          <div className="bg-white/90 p-3 sm:p-4 rounded-2xl border-b-2 border-emerald-400/50 shadow-sm flex flex-col items-center justify-center">
            <span className={labelClass}>MC Maklumat</span>
            <span className={`${nameFontBase} text-base sm:text-lg`}>
              {schedule.mc}
            </span>
          </div>

        </div>
      </div>

      {/* FOOTER DECORATION - Lebih halus */}
      <div className="mt-6 flex justify-center items-center gap-4 opacity-30">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-400"></div>
        <div className="w-1.5 h-1.5 rounded-full border border-emerald-400"></div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-400"></div>
      </div>
    </div>
  );
};

export default JumuahSchedule;
