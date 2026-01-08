
import React, { useState, useEffect } from 'react';
import type { MosqueEvent } from '../types';

interface EventTickerProps {
  events: MosqueEvent[];
}

const EventTicker: React.FC<EventTickerProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 10000); // Ganti kegiatan diperlambat menjadi setiap 10 detik

    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];

  return (
    <div className="relative flex items-center h-8 min-w-[200px] overflow-hidden">
      <div 
        key={currentIndex} 
        className="flex items-center gap-2 animate-fade-in"
      >
        {/* Label dengan animasi kedip-kedip */}
        <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-tighter flex-shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.6)] animate-blink">
          KEGIATAN
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-none">
          <span className="text-white font-orbitron font-black text-[10px] sm:text-xs whitespace-nowrap uppercase tracking-tight">
            {currentEvent.title}
          </span>
          <span className="text-emerald-300 font-sans italic text-[8px] sm:text-[10px] whitespace-nowrap opacity-90">
            {currentEvent.date} {currentEvent.time && `• ${currentEvent.time}`}
          </span>
        </div>
      </div>
      
      {/* Indikator Titik jika kegiatan lebih dari satu */}
      {events.length > 1 && (
        <div className="hidden sm:flex ml-4 gap-1 opacity-30">
          {events.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-red-500 w-2' : 'bg-white'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventTicker;
