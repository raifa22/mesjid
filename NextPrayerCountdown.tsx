
import React from 'react';
import type { PrayerTime } from '../types';

interface NextPrayerCountdownProps {
  prayerTimes: PrayerTime[];
  currentTime: Date;
}

const getNextPrayerInfo = (prayerTimes: PrayerTime[], currentTime: Date): { nextPrayer: PrayerTime | null; nextPrayerTime: Date | null } => {
    const now = currentTime;
    let nextPrayerIndex = -1;
    let nextPrayerTime: Date | null = null;

    for (let i = 0; i < prayerTimes.length; i++) {
        const [hour, minute] = prayerTimes[i].time.split(':').map(Number);
        const prayerDate = new Date(now);
        prayerDate.setHours(hour, minute, 0, 0);

        if (prayerDate > now) {
            nextPrayerIndex = i;
            nextPrayerTime = prayerDate;
            break;
        }
    }

    if (nextPrayerIndex === -1) {
        nextPrayerIndex = 0;
        const [hour, minute] = prayerTimes[0].time.split(':').map(Number);
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(hour, minute, 0, 0);
        nextPrayerTime = tomorrow;
    }

    return { nextPrayer: prayerTimes[nextPrayerIndex] || null, nextPrayerTime };
};


const NextPrayerCountdown: React.FC<NextPrayerCountdownProps> = ({ prayerTimes, currentTime }) => {
  const { nextPrayer, nextPrayerTime } = getNextPrayerInfo(prayerTimes, currentTime);

  let countdownString = '00:00';
  const diff = nextPrayerTime ? nextPrayerTime.getTime() - currentTime.getTime() : -1;

  if (diff > 0) {
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        countdownString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
        countdownString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }

  return (
    <div className="flex items-center gap-2.5 text-right">
      <div className="flex flex-col items-end leading-none">
         <span className="font-sans text-[8px] sm:text-[9px] opacity-60 uppercase tracking-widest mb-0.5">Menuju</span>
         <span className="font-sans font-black text-[10px] sm:text-xs uppercase text-red-500 [text-shadow:0_0_10px_rgba(239,68,68,0.4)]">
           {nextPrayer?.name || '...'}
         </span>
      </div>
      <div className="font-orbitron text-base sm:text-lg md:text-xl font-black text-white [text-shadow:0_0_15px_rgba(255,255,255,0.3)] animate-pulse">
        -{countdownString}
      </div>
    </div>
  );
};

export default NextPrayerCountdown;
