import React from 'react';

interface FooterDateProps {
  date: Date;
  hijriAdjustment: number;
}

const HIJRI_MONTHS_ID = [
  'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 
  'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban', 
  'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
];

const FooterDate: React.FC<FooterDateProps> = ({ date, hijriAdjustment }) => {
  const adjustedHijriDate = new Date(date);
  adjustedHijriDate.setDate(adjustedHijriDate.getDate() + hijriAdjustment);

  const gregorianFull = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  
  const hijriDay = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { day: 'numeric' }).format(adjustedHijriDate);
  const hijriMonthIndex = parseInt(new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { month: 'numeric' }).format(adjustedHijriDate), 10) - 1;
  const hijriYear = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { year: 'numeric' }).format(adjustedHijriDate).split(' ')[0];
  const hijriDateString = `${hijriDay} ${HIJRI_MONTHS_ID[hijriMonthIndex] || ''} ${hijriYear} H`;

  return (
    <p className="font-orbitron font-medium text-[10px] sm:text-xs md:text-sm tracking-wider text-white opacity-90">
      {gregorianFull} / {hijriDateString}
    </p>
  );
};

export default FooterDate;