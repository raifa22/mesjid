import React from 'react';
import { HADITH_DATA } from '../hadithData';
import type { Hadith } from '../types';

interface HadithTickerProps {
    tickerClass: string;
}

const NewsTicker: React.FC<HadithTickerProps> = ({ tickerClass }) => {
    if (HADITH_DATA.length === 0) {
        return (
            <div className="w-full text-center py-1 bg-black/95 backdrop-blur-sm border-t border-white/10">
                <span className="text-[10px] text-white/50">Memuat mutiara hadits...</span>
            </div>
        );
    }
    
    // Komponen untuk satu set daftar hadits agar bisa di-loop untuk animasi tanpa celah
    const HadithList = () => (
        <div className="flex items-center">
            {HADITH_DATA.map((hadith: Hadith, index: number) => (
                <div key={index} className="flex items-center shrink-0">
                    {/* Teks Arab: Ukuran diperkecil signifikan agar tingginya setara dengan teks Indonesia */}
                    <span 
                        dir="rtl" 
                        lang="ar" 
                        className="font-['Amiri'] text-xs sm:text-sm md:text-base text-emerald-300 ml-4 leading-none"
                    >
                        {hadith.arabic}
                    </span>
                    
                    {/* Pemisah halus antara Arab dan Terjemahan */}
                    <span className="text-white/20 mx-2 text-[10px] sm:text-xs">—</span>
                    
                    {/* Terjemahan: Disesuaikan agar terbaca jelas namun tetap ringkas */}
                    <span className="italic text-white font-medium text-[10px] sm:text-xs md:text-sm tracking-wide">
                        "{hadith.translation}"
                    </span>
                    
                    {/* Sumber Hadits: Ukuran mini */}
                    <span className="ml-2 bg-emerald-900/40 px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/20">
                        {hadith.source}
                    </span>
                    
                    {/* Pemisah antar hadits */}
                    <div className="mx-12 flex items-center gap-2 opacity-30">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <div className="w-8 h-[1px] bg-emerald-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full overflow-hidden relative flex items-center bg-black/95 backdrop-blur-xl border-t border-white/10 h-10 sm:h-12 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
            {/* Badge Info tetap di pojok kiri */}
            <div className="absolute left-0 inset-y-0 flex items-center pl-4 pr-6 bg-gradient-to-r from-black via-black to-transparent z-30 pointer-events-none">
                <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg border border-emerald-400/30 uppercase tracking-tighter">
                    Mutiara Hadits
                </span>
            </div>

            {/* Container Marquee */}
            <div className="flex animate-marquee whitespace-nowrap items-center h-full">
                <HadithList />
                <HadithList />
            </div>

            {/* Gradasi Kanan */}
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default NewsTicker;