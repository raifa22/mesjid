
import React from 'react';
import type { DkmOfficial, SlideTitleSize } from '../types';

interface DkmStructureSlideProps {
  structure: DkmOfficial[];
  panelClass: string;
  slideTitleSize: SlideTitleSize;
}

const DkmStructureSlide: React.FC<DkmStructureSlideProps> = ({ structure, panelClass, slideTitleSize }) => {
  const titleSizeClasses: Record<SlideTitleSize, string> = {
    normal: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
  };

  const count = structure.length;

  // Ukuran teks yang lebih compact untuk menghemat ruang
  const getNameSize = () => {
    if (count <= 2) return 'text-lg sm:text-2xl';
    if (count <= 4) return 'text-base sm:text-xl';
    if (count <= 8) return 'text-sm sm:text-lg';
    return 'text-xs sm:text-sm';
  };

  const getLabelSize = () => {
    if (count <= 4) return 'text-[9px] sm:text-[10px]';
    return 'text-[8px] sm:text-[9px]';
  };

  const getPadding = () => {
    if (count <= 4) return 'p-3 sm:p-4';
    if (count <= 8) return 'p-2 sm:p-3';
    return 'p-1.5 sm:p-2';
  };

  const getMinColWidth = () => {
    if (count <= 2) return 'minmax(200px, 1fr)';
    if (count <= 4) return 'minmax(160px, 1fr)';
    return 'minmax(140px, 1fr)';
  };

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-[2rem] p-4 sm:p-6 text-center ${panelClass} shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col justify-center animate-fade-in max-h-[58vh]`}>
      
      {/* HEADER SLIDE - Dibuat lebih kecil */}
      <div className="mb-4 flex-shrink-0">
        <h2 className={`font-black transition-all duration-300 text-white [text-shadow:1px_1px_8px_rgba(0,0,0,0.8)] uppercase tracking-[0.3em] ${titleSizeClasses[slideTitleSize]}`}>
          Struktur Pengurus DKM
        </h2>
        <div className="inline-block mt-2 px-4 py-1 bg-emerald-600/30 rounded-full border border-emerald-400/20 backdrop-blur-md">
          <span className="text-[8px] sm:text-[10px] font-black text-emerald-100 uppercase tracking-[0.15em]">
            Dewan Kemakmuran Masjid
          </span>
        </div>
      </div>
      
      {/* GRID AREA - Lebih rapat */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-1 py-1">
        <div 
          className="grid gap-3 sm:gap-4 justify-center items-stretch"
          style={{ 
            gridTemplateColumns: `repeat(auto-fit, ${getMinColWidth()})`,
            maxWidth: count <= 2 ? '500px' : 'none',
            margin: '0 auto'
          }}
        >
          {structure.map((official, index) => (
            <div 
              key={index} 
              className={`
                bg-white/95 ${getPadding()} rounded-xl border-b-2 border-emerald-500 shadow-lg 
                flex flex-col items-center justify-center transform transition-all duration-300 
                hover:translate-y-[-2px] hover:bg-white group
              `}
            >
              <span className={`
                font-sans ${getLabelSize()} uppercase tracking-[0.2em] text-emerald-600 font-black mb-1 
                group-hover:text-emerald-500 transition-colors leading-none
              `}>
                {official.role}
              </span>
              <span className={`
                font-sans font-bold ${getNameSize()} text-zinc-900 leading-tight block w-full 
                truncate px-1 [text-shadow:none]
              `}>
                {official.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DECORATIVE FOOTER - Minimalis */}
      <div className="mt-4 flex-shrink-0 flex justify-center items-center gap-4 opacity-25">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-400"></div>
        <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        </div>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-400"></div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DkmStructureSlide;
