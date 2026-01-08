
export type PrayerName = 'Imsak' | 'Subuh' | 'Syuruk' | 'Zuhur' | 'Asar' | 'Magrib' | 'Isya';

export interface PrayerTime {
  name: PrayerName;
  time: string; // HH:MM format
}

export interface DkmOfficial {
  role: string;
  name: string;
}

export interface JumuahOfficial {
  id: number;
  imam: string;
  khatib: string;
  muadzin: string;
  bilal: string;
  mc: string;
}

export interface Hadith {
  arabic: string;
  translation: string;
  source: string;
}

export interface Quote {
  quote: string;
  author: string;
  imageUrl: string;
}

export interface MosqueEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  timestamp: number;
}

export interface FinancialReport {
  period: string;
  income: number;
  expenses: number;
  balance: number;
  recentDonations?: Donation[];
}

export interface BankAccount {
  name: string;
  number: string;
  holder: string;
  iconUrl?: string;
}

export interface MosqueInfo {
  name: string;
  address: string;
  logoUrl: string;
  qrisImageUrl?: string;
  bankAccounts: BankAccount[];
}

export interface Theme {
  id: string;
  name: string;
  style: {
    backgroundImage?: string;
    backgroundColor?: string;
  };
  textColor: string;
  panelClass: string;
  highlightClass: string;
  prayerBarClass: string;
  isDark: boolean;
}

export interface NotificationPrefs {
  enabledPrayers: Partial<Record<PrayerName, boolean>>;
  minutesBefore: number;
}

export type SlideTitleSize = 'normal' | 'large' | 'xl';

export interface AppSettings {
  showAddress: boolean;
  showIsraMirajCountdown: boolean;
  showRamadanCountdown: boolean;
  ramadanTargetDate: string;
  hijriAdjustment: number;
  notifications: NotificationPrefs;
  autoTheme: boolean;
  autoBackgroundChange: boolean;
  ramadanCountdownTestDays: number;
  slideTitleSize: SlideTitleSize;
  customBackgroundUrl: string;
  showJumuahSlide: boolean;
  showFinancialSlide: boolean;
  showDkmSlide: boolean;
  showQuotes: boolean;
  showHadith: boolean;
  showHadithTicker: boolean;
  slideDuration: number;
  duaReminderDuration: number; 
  autoFetchDonations: boolean; // Fitur baru
  donationApiUrl: string;      // Fitur baru
}
