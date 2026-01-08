
import React from 'react';

interface MosqueInfoProps {
  name: string;
  address: string;
  logoUrl: string;
}

const MosqueInfo: React.FC<MosqueInfoProps> = ({ name, address, logoUrl }) => {
  return (
    <div className="flex items-center gap-5 py-1 animate-fade-in">
      {/* Logo Container with Elevation */}
      <div className="flex-shrink-0 relative">
        <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full scale-125"></div>
        <img 
          src={logoUrl} 
          alt="Logo Masjid" 
          className="relative h-16 w-16 sm:h-20 sm:w-20 object-contain filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform" 
        />
      </div>
      
      {/* Teks Identitas */}
      <div className="flex flex-col">
        {/* Nama Masjid: Teks Putih dengan glow halus karena background gelap */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white [text-shadow:0_2px_10px_rgba(255,255,255,0.2)]">
          {name}
        </h2>
        {/* Alamat: Emerald terang agar senada dengan nuansa hijau */}
        <p className="text-[11px] sm:text-[13px] font-bold text-emerald-200/90 max-w-[200px] sm:max-w-md leading-tight mt-1.5 uppercase tracking-wide">
          {address}
        </p>
      </div>
    </div>
  );
};

export default MosqueInfo;
