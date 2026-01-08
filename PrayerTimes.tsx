
import React from 'react';
import type { PrayerTime, PrayerName } from '../types';

interface PrayerTimesProps {
  prayerTimes: PrayerTime[];
  currentTime: Date;
  highlightClass: string;
}

const PRAYER_ICONS: Record<PrayerName, React.ReactNode> = {
  'Imsak': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  ),
  'Subuh': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 10-2 0h-1a1 1 0 100 2h1a1 1 0 102 0zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 00-1-1H3a1 1 0 100 2h1a1 1 0 001-1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
    </svg>
  ),
  'Syuruk': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm2.121-7.071a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4.243 15.657a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM8 17a1 1 0 100-2H7a1 1 0 100 2h1z" clipRule="evenodd" />
    </svg>
  ),
  'Zuhur': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  ),
  'Asar': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  ),
  'Magrib': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ),
  'Isya': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
};

const PRAYER_NAMES_ARABIC: Record<PrayerName, string> = {
  'Imsak': 'الإمساك',
  'Subuh': 'الفجر',
  'Syuruk': 'الشروق',
  'Zuhur': 'الظهر',
  'Asar': 'العصر',
  'Magrib': 'المغرب',
  'Isya': 'العشاء'
};

const PRAYER_THEMES: Record<PrayerName, { header: string; jamArea: string; activeJamArea: string; clockBox: string }> = {
  'Imsak': { 
    header: 'from-indigo-900 to-indigo-700', 
    jamArea: 'bg-indigo-950', 
    activeJamArea: 'bg-indigo-800',
    clockBox: 'bg-indigo-700'
  },
  'Subuh': { 
    header: 'from-yellow-500 to-yellow-400', 
    jamArea: 'bg-yellow-900', 
    activeJamArea: 'bg-yellow-700',
    clockBox: 'bg-yellow-600'
  },
  'Syuruk': { 
    header: 'from-red-600 to-red-500', 
    jamArea: 'bg-red-950', 
    activeJamArea: 'bg-red-800',
    clockBox: 'bg-red-700'
  },
  'Zuhur': { 
    header: 'from-emerald-400 to-teal-400', 
    jamArea: 'bg-emerald-950', 
    activeJamArea: 'bg-emerald-800',
    clockBox: 'bg-emerald-600'
  },
  'Asar': { 
    header: 'from-emerald-400 to-teal-400', 
    jamArea: 'bg-emerald-950', 
    activeJamArea: 'bg-emerald-800',
    clockBox: 'bg-emerald-600'
  },
  'Magrib': { 
    header: 'from-purple-800 to-purple-600', 
    jamArea: 'bg-purple-950', 
    activeJamArea: 'bg-purple-800',
    clockBox: 'bg-purple-700'
  },
  'Isya': { 
    header: 'from-gray-700 to-gray-600', 
    jamArea: 'bg-gray-950', 
    activeJamArea: 'bg-gray-800',
    clockBox: 'bg-gray-700'
  }
};

const getCurrentPrayerIndex = (prayerTimes: PrayerTime[], currentTime: Date): number => {
  const nowStr = currentTime.toTimeString().substring(0, 5); 
  let currentIndex = -1;

  for (let i = 0; i < prayerTimes.length; i++) {
    if (prayerTimes[i].time <= nowStr) {
      currentIndex = i;
    }
  }

  if (currentIndex === -1) {
    return prayerTimes.length - 1;
  }
  
  return currentIndex;
};

const getCountdownString = (prayerTimeStr: string, currentTime: Date): string => {
  const [hour, minute] = prayerTimeStr.split(':').map(Number);
  const prayerDate = new Date(currentTime);
  prayerDate.setHours(hour, minute, 0, 0);

  if (prayerDate < currentTime) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }

  const diff = prayerDate.getTime() - currentTime.getTime();
  const totalSeconds = Math.floor(diff / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const PrayerTimes: React.FC<PrayerTimesProps> = ({ prayerTimes, currentTime, highlightClass }) => {
  const currentPrayerIndex = getCurrentPrayerIndex(prayerTimes, currentTime);
  const nextPrayerIndex = (currentPrayerIndex + 1) % prayerTimes.length;

  return (
    <div className="grid grid-cols-7 border-t border-white/10">
      {prayerTimes.map((prayer, index) => {
        const isCurrent = index === currentPrayerIndex;
        const isNext = index === nextPrayerIndex;
        const prayerKey = prayer.name as PrayerName;
        const theme = PRAYER_THEMES[prayerKey] || PRAYER_THEMES['Imsak'];
        const arabicName = PRAYER_NAMES_ARABIC[prayerKey] || prayer.name;
        const [hours, minutes] = prayer.time.split(':');
        const countdown = isNext ? getCountdownString(prayer.time, currentTime) : null;
        
        return (
          <div
            key={prayer.name}
            className={`
              flex flex-col transition-all duration-500 ease-out border-r border-white/10 last:border-r-0 relative overflow-hidden
              ${isCurrent 
                  ? `${highlightClass} z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] scale-100` 
                  : 'bg-black/60'
              }
            `}
          >
            {/* 1. BAGIAN NAMA (HEADER) */}
            <div className={`
              w-full py-1 sm:py-2 px-1 text-center bg-gradient-to-b ${theme.header} relative flex flex-col items-center justify-center
              ${isCurrent ? 'brightness-125' : 'opacity-90'}
            `}>
               {isCurrent && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]" />
              )}
              
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`${isCurrent ? 'text-white' : 'text-white/60'}`}>
                    {PRAYER_ICONS[prayerKey]}
                </span>
                <span 
                    dir="rtl"
                    className={`
                    font-serif text-base sm:text-lg md:text-2xl font-normal
                    transition-all duration-300 relative z-10 leading-none
                    ${isCurrent ? 'text-white' : 'text-white/95'}
                    [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]
                    `}
                >
                    {arabicName}
                </span>
              </div>

              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] opacity-80 text-white">
                {prayer.name}
              </span>
            </div>

            {/* 2. BAGIAN JAM & COUNTDOWN */}
            <div className={`
              flex-grow flex flex-col items-center justify-center p-1.5 sm:p-2.5 transition-colors duration-500
              ${isCurrent ? theme.activeJamArea : theme.jamArea}
            `}>
              <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                
                {/* Sisa Waktu (Khusus untuk jadwal berikutnya) */}
                {isNext && (
                   <div className="hidden lg:flex flex-col items-end leading-none mr-1">
                      <span className="text-[7px] text-red-400 font-black uppercase tracking-tighter">Next In</span>
                      <span className="font-orbitron text-xs font-black text-red-500 animate-pulse">{countdown}</span>
                   </div>
                )}

                <div className="flex items-center gap-1 sm:gap-1.5">
                    {/* Kotak Jam (HH) */}
                    <div className={`
                    font-orbitron text-lg sm:text-2xl md:text-3xl font-extrabold
                    text-white p-0.5 sm:p-1 px-1.5 sm:px-2 border-2 rounded-md 
                    ${theme.clockBox} flex items-center justify-center transition-all duration-300
                    ${isCurrent 
                        ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse-subtle' 
                        : 'border-white/10 shadow-inner'
                    }
                    `}>
                    {hours}
                    </div>
                    
                    <span className={`
                    font-orbitron text-base sm:text-xl font-bold text-white/40
                    ${isCurrent ? 'animate-pulse text-white' : ''}
                    `}>:</span>
                    
                    {/* Kotak Menit (MM) */}
                    <div className={`
                    font-orbitron text-lg sm:text-2xl md:text-3xl font-extrabold
                    text-white p-0.5 sm:p-1 px-1.5 sm:px-2 border-2 rounded-md 
                    ${theme.clockBox} flex items-center justify-center transition-all duration-300
                    ${isCurrent 
                        ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse-subtle' 
                        : 'border-white/10 shadow-inner'
                    }
                    `}>
                    {minutes}
                    </div>
                </div>

              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          </div>
        )
      })}
    </div>
  );
};

export default PrayerTimes;
