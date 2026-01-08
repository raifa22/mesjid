
import type { PrayerTime, Theme, AppSettings, JumuahOfficial, Quote, FinancialReport, DkmOfficial, MosqueInfo, MosqueEvent } from './types';

export const DEFAULT_MOSQUE_INFO: MosqueInfo = {
  name: "Masjid Jami Nurul Iman",
  address: "Jl. Cimande Kp. Nanggeleng Rt.01 Rw. 05 Caringin Bogor, Indonesia",
  logoUrl: "https://picsum.photos/seed/masjid-logo/200",
  bankAccounts: [
    {
      name: "BCA",
      number: "7361530369",
      holder: "Masjid Jami Nurul Iman",
      iconUrl: ""
    }
  ]
};

export const DEFAULT_PRAYER_TIMES: PrayerTime[] = [
  { name: 'Imsak', time: '04:28' },
  { name: 'Subuh', time: '04:38' },
  { name: 'Syuruk', time: '05:54' },
  { name: 'Zuhur', time: '12:06' },
  { name: 'Asar', time: '15:28' },
  { name: 'Magrib', time: '18:07' },
  { name: 'Isya', time: '19:18' }
];

export const JUMUAH_SCHEDULE: JumuahOfficial[] = [
  { id: 1, imam: 'Hj. Ading', khatib: 'Hj. Ading', muadzin: 'Ust Najmudin', bilal: 'Bpk. Ahmad', mc: 'Ust. Jaelani' },
  { id: 2, imam: 'Hj. Kamal', khatib: 'Hj. Kamal', muadzin: 'Apud', bilal: 'Bpk. Iwan', mc: 'Ust. Dayat' },
  { id: 3, imam: 'Ust. Hakim', khatib: 'Ust. Hakim', muadzin: 'Agus', bilal: 'Bpk. Mamat', mc: 'Ust. Najmudin' },
  { id: 4, imam: 'Hj. Suhaemi', khatib: 'Hj. Suhaemi', muadzin: 'Bpk. Muslihat', bilal: 'Bpk. Yusuf', mc: 'Ust. Jaelani' },
  { id: 5, imam: 'Petugas Cadangan', khatib: 'Petugas Cadangan', muadzin: 'Muadzin 5', bilal: 'Bilal 5', mc: 'MC 5' },
];

export const DKM_STRUCTURE: DkmOfficial[] = [
    { role: 'Ketua DKM', name: 'H. Suhaemi' },
    { role: 'Wakil Ketua', name: 'Ust. Dayat' },
    { role: 'Sekretaris', name: 'Jaelani' },
    { role: 'Bendahara', name: 'Bpk. Muslihat' },
    { role: 'Bidang Keagamaan', name: 'Ust. Najmudin' },
    { role: 'Penasehat', name: 'Habib Ali' },
];

export const DEFAULT_EVENTS: MosqueEvent[] = [
  { id: '1', title: 'Pengajian Rutin Bapak-Bapak', date: 'Setiap Sabtu', time: '20:00 WIB' },
  { id: '2', title: 'Santunan Anak Yatim', date: '10 Muharram', time: '09:00 WIB' },
  { id: '3', title: 'Kuliah Subuh Ahad', date: 'Minggu Pagi', time: '05:30 WIB' }
];

export const QUOTE_DATA: Quote[] = [
    {
        quote: "Jika engkau ingin memperbaiki hidupmu, maka perbaikilah sholatmu. Karena hal pertama yang akan dihisab darimu di hari kiamat kelak adalah sholatmu.",
        author: "Ustadz Adi Hidayat",
        imageUrl: "https://picsum.photos/seed/ustadz-adi-hidayat/200"
    },
    {
        quote: "Jangan tinggalkan shalat, karena banyak jutaan manusia di alam kubur yang ingin dihidupkan kembali hanya untuk bersujud kepada Allah.",
        author: "Ustadz Abdul Somad",
        imageUrl: "https://picsum.photos/seed/ustadz-abdul-somad/200"
    },
    {
        quote: "Hijrah itu bukan tentang menjadi lebih baik dari orang lain, tapi tentang menjadi lebih baik dari diri kita yang dulu.",
        author: "Ustadz Hanan Attaki",
        imageUrl: "https://picsum.photos/seed/ustadz-hanan-attaki/200"
    }
];

export const FINANCIAL_REPORT_DATA: FinancialReport = {
  period: "Jum'at, 14 Juni 2024",
  income: 5250000,
  expenses: 1750000,
  balance: 35500000,
  recentDonations: []
};

const MINT_HIGHLIGHT = 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]';
const GLOBAL_HIGHLIGHT = 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]';

export const THEMES: Theme[] = [
  {
    id: 'mint-green-mosque',
    name: 'Hijau Mint Klasik',
    style: {
      backgroundImage: `url('https://images.unsplash.com/photo-1590076215667-873d1661ab1d?q=80&w=1920&auto=format&fit=crop')`,
    },
    textColor: 'text-white',
    panelClass: 'bg-emerald-950/40 backdrop-blur-md border border-emerald-400/20',
    highlightClass: MINT_HIGHLIGHT,
    prayerBarClass: 'bg-emerald-950/60 backdrop-blur-xl border-t border-emerald-800/40',
    isDark: true,
  },
  {
    id: 'nabawi-morning',
    name: 'Pagi di Nabawi',
    style: {
      backgroundImage: `url('https://picsum.photos/seed/nabawi-morning/1920/1080')`,
    },
    textColor: 'text-white',
    panelClass: 'bg-black/30 backdrop-blur-sm',
    highlightClass: GLOBAL_HIGHLIGHT,
    prayerBarClass: 'bg-black/40 backdrop-blur-md',
    isDark: true,
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalis',
    style: {
      backgroundColor: '#1a1a1a',
    },
    textColor: 'text-cyan-400 [text-shadow:0_0_10px_rgba(34,211,238,0.5)]',
    panelClass: 'border border-cyan-700/50 bg-cyan-950/20',
    highlightClass: GLOBAL_HIGHLIGHT,
    prayerBarClass: 'bg-black/60 border-t border-cyan-800/50',
    isDark: true,
  },
  {
    id: 'led-minimalist',
    name: 'LED Merah',
    style: {
      backgroundColor: '#0a0a0a',
    },
    textColor: 'text-red-500 [text-shadow:0_0_8px_rgba(239,68,68,0.6)]',
    panelClass: 'border border-red-700/50 bg-red-950/20',
    highlightClass: GLOBAL_HIGHLIGHT,
    prayerBarClass: 'bg-black/50 border-t border-red-800/50',
    isDark: true,
  },
];

export const BACKGROUND_THEMES = THEMES.filter(t => t.style.backgroundImage);

export const DEFAULT_SETTINGS: AppSettings = {
  showAddress: true,
  showIsraMirajCountdown: true,
  showRamadanCountdown: true,
  ramadanTargetDate: '2026-02-18',
  hijriAdjustment: 0,
  notifications: {
    enabledPrayers: {},
    minutesBefore: 10,
  },
  autoTheme: false,
  autoBackgroundChange: false, 
  ramadanCountdownTestDays: 0,
  slideTitleSize: 'normal',
  customBackgroundUrl: '',
  showJumuahSlide: true,
  showFinancialSlide: true,
  showDkmSlide: true,
  showQuotes: true,
  showHadith: true,
  showHadithTicker: true,
  slideDuration: 25, 
  duaReminderDuration: 10,
  autoFetchDonations: false,
  donationApiUrl: '',
};
