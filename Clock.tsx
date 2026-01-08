import React from 'react';

interface ClockProps {
  date: Date;
}

const Clock: React.FC<ClockProps> = ({ date }) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Skema ukuran yang sama untuk semua elemen angka
  const timeTextClass = "text-4xl sm:text-5xl md:text-6xl font-black text-white tabular-nums tracking-tighter [text-shadow:0_0_20px_rgba(255,255,255,0.4)]";
  const separatorClass = "text-3xl sm:text-4xl md:text-5xl font-bold mx-1 text-white/40";

  return (
    <div className="flex items-center scale-90 sm:scale-100">
      <div className="flex items-center bg-black/70 backdrop-blur-3xl px-8 py-4 rounded-[2.5rem] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.7),inset_0_0_40px_rgba(255,255,255,0.05)]">
        
        <div className="flex items-baseline font-orbitron">
          
          {/* JAM */}
          <span className={timeTextClass}>
            {hours}
          </span>

          {/* PEMISAH 1 (Berkedip) */}
          <span className={`${separatorClass} animate-pulse`}>
            :
          </span>

          {/* MENIT */}
          <span className={timeTextClass}>
            {minutes}
          </span>

          {/* PEMISAH 2 (Tetap) */}
          <span className={separatorClass}>
            :
          </span>

          {/* DETIK */}
          <span className={timeTextClass}>
            {seconds}
          </span>
          
        </div>

      </div>
    </div>
  );
};

export default Clock;