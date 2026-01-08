
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Clock from './components/Clock';
import MosqueInfo from './components/MosqueInfo';
import PrayerTimes from './components/PrayerTimes';
import SettingsPanel from './components/SettingsPanel';
import JumuahSchedule from './components/JumuahSchedule';
import QuoteDisplay from './components/QuoteDisplay';
import HadithDaily from './components/HadithDaily';
import FinancialReportSlide from './components/FinancialReportSlide';
import DkmStructureSlide from './components/DkmStructureSlide';
import NewsTicker from './components/NewsTicker';
import FooterDate from './components/FooterDate';
import NextPrayerCountdown from './components/NextPrayerCountdown';
import IsraMirajCountdown from './components/IsraMirajCountdown';
import RamadanCountdown from './components/RamadanCountdown';
import EventTicker from './components/EventTicker';
import { THEMES, DEFAULT_MOSQUE_INFO, DEFAULT_PRAYER_TIMES, DEFAULT_SETTINGS, JUMUAH_SCHEDULE, QUOTE_DATA, FINANCIAL_REPORT_DATA, DKM_STRUCTURE, BACKGROUND_THEMES, DEFAULT_EVENTS } from './constants';
import type { AppSettings, Theme, JumuahOfficial, FinancialReport, DkmOfficial, MosqueInfo as MosqueInfoType, PrayerTime, Donation, Quote, MosqueEvent } from './types';
import useLocalStorage from './hooks/useLocalStorage';

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [currentTheme, setCurrentTheme] = useLocalStorage<Theme>('mosqueAppTheme', THEMES.find(t => t.id === 'mint-green-mosque') || THEMES[0]);
  const [settings, setSettings] = useLocalStorage<AppSettings>('mosqueAppSettings', DEFAULT_SETTINGS);
  const [jumuahSchedule, setJumuahSchedule] = useLocalStorage<JumuahOfficial[]>('mosqueJumuahSchedule', JUMUAH_SCHEDULE);
  const [lastJumuahUpdate, setLastJumuahUpdate] = useLocalStorage<string>('lastJumuahUpdate', '');
  const [financialReport, setFinancialReport] = useLocalStorage<FinancialReport>('mosqueFinancialReport', FINANCIAL_REPORT_DATA);
  const [dkmStructure, setDkmStructure] = useLocalStorage<DkmOfficial[]>('mosqueDkmStructure', DKM_STRUCTURE);
  const [mosqueInfo, setMosqueInfo] = useLocalStorage<MosqueInfoType>('mosqueInfo', DEFAULT_MOSQUE_INFO);
  const [prayerTimes, setPrayerTimes] = useLocalStorage<PrayerTime[]>('prayerTimes', DEFAULT_PRAYER_TIMES);
  const [quotes, setQuotes] = useLocalStorage<Quote[]>('mosqueQuotes', QUOTE_DATA);
  const [mosqueEvents, setMosqueEvents] = useLocalStorage<MosqueEvent[]>('mosqueEvents', DEFAULT_EVENTS);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  
  const SLIDE_DURATION = (settings.slideDuration || 12) * 1000; 

  // Timer Utama Jam
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Monitor status online
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const activeSlideIndices = useMemo(() => {
    const active = [];
    if (settings.showJumuahSlide) active.push(0);
    if (settings.showFinancialSlide) active.push(1);
    if (settings.showDkmSlide) active.push(2);
    return active;
  }, [settings.showJumuahSlide, settings.showFinancialSlide, settings.showDkmSlide]);

  const [lastShowedDonationId, setLastShowedDonationId] = useLocalStorage<string>('lastShowedDonationId', '');
  const [activeDonationToast, setActiveDonationToast] = useState<Donation | null>(null);
  const [activeDuaReminder, setActiveDuaReminder] = useState<{ prayerName: string } | null>(null);

  const triggerDonationToast = useCallback((donation: Donation) => {
    setActiveDonationToast(donation);
    setTimeout(() => {
        setActiveDonationToast(null);
    }, 8000);
  }, []);

  // AUTO-FETCH DONASI
  useEffect(() => {
    if (!settings.autoFetchDonations || !settings.donationApiUrl || !isOnline) return;

    const fetchDonations = async () => {
      try {
        const response = await fetch(settings.donationApiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const newestFromApi = data[0];
          
          setFinancialReport(prev => {
            const currentDonations = prev.recentDonations || [];
            const alreadyExists = currentDonations.some(d => d.id === newestFromApi.id);
            
            if (!alreadyExists) {
              const updatedDonations = [newestFromApi, ...currentDonations].slice(0, 10);
              const newIncome = prev.income + newestFromApi.amount;
              const newBalance = prev.balance + newestFromApi.amount;
              
              return {
                ...prev,
                recentDonations: updatedDonations,
                income: newIncome,
                balance: newBalance
              };
            }
            return prev;
          });
        }
      } catch (error) {
        console.error('Gagal mengambil data donasi otomatis:', error);
      }
    };

    fetchDonations();
    const interval = setInterval(fetchDonations, 60000);
    return () => clearInterval(interval);
  }, [settings.autoFetchDonations, settings.donationApiUrl, isOnline, setFinancialReport]);

  useEffect(() => {
    if (financialReport.recentDonations && financialReport.recentDonations.length > 0) {
        const newestDonation = financialReport.recentDonations[0];
        if (newestDonation.id !== lastShowedDonationId) {
            triggerDonationToast(newestDonation);
            setLastShowedDonationId(newestDonation.id);
        }
    }
  }, [financialReport.recentDonations, lastShowedDonationId, setLastShowedDonationId, triggerDonationToast]);

  useEffect(() => {
    const slideInterval = 100;
    const progressTimer = setInterval(() => {
        if (activeSlideIndices.length === 0) {
            setSlideProgress(0);
            return;
        }

        setSlideProgress(prev => {
            if (prev >= 100) {
                setCurrentSlideIndex(idx => {
                  if (activeSlideIndices.length === 0) return 0;
                  const currentPos = activeSlideIndices.indexOf(idx);
                  const nextPos = (currentPos + 1) % activeSlideIndices.length;
                  return activeSlideIndices[nextPos];
                });
                return 0;
            }
            if (activeSlideIndices.length <= 1) return 0;
            return prev + (100 / (SLIDE_DURATION / slideInterval));
        });
    }, slideInterval);

     const quoteTimer = setInterval(() => {
        setQuotes(currentQuotes => {
          if (currentQuotes.length === 0) return currentQuotes;
          setCurrentQuoteIndex(prev => (prev + 1) % currentQuotes.length);
          return currentQuotes;
        });
    }, 20000); 

    return () => {
        clearInterval(progressTimer);
        clearInterval(quoteTimer);
    };
  }, [activeSlideIndices, SLIDE_DURATION, setQuotes]);

  useEffect(() => {
    if (activeSlideIndices.length > 0 && !activeSlideIndices.includes(currentSlideIndex)) {
      setCurrentSlideIndex(activeSlideIndices[0]);
    }
  }, [activeSlideIndices, currentSlideIndex]);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    if (today.getDay() === 5 && todayStr !== lastJumuahUpdate) {
      setJumuahSchedule(prevSchedule => {
        if (prevSchedule.length > 1) {
          const rotated = [...prevSchedule.slice(1), prevSchedule[0]];
          return rotated;
        }
        return prevSchedule;
      });
      setLastJumuahUpdate(todayStr);
    }
  }, [currentTime, jumuahSchedule, setJumuahSchedule, lastJumuahUpdate, setLastJumuahUpdate]);
  
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }
    const sentNotifications = new Set<string>();
    const checkNotifications = () => {
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        if (!sentNotifications.has(todayKey)) {
          sentNotifications.clear();
          sentNotifications.add(todayKey);
        }
        prayerTimes.forEach(prayer => {
            if (!settings.notifications.enabledPrayers[prayer.name]) return;
            const notificationId = `${todayKey}-${prayer.name}`;
            if (sentNotifications.has(notificationId)) return;
            const [hour, minute] = prayerTimes.find(p => p.name === prayer.name)?.time.split(':').map(Number) || [0, 0];
            const prayerTimeInMinutes = hour * 60 + minute;
            const notificationTime = prayerTimeInMinutes - settings.notifications.minutesBefore;
            if (nowMinutes === notificationTime) {
                new Notification(`Pengingat Waktu Sholat`, {
                    body: `Waktu sholat ${prayer.name} akan tiba dalam ${settings.notifications.minutesBefore} menit.`,
                    icon: 'https://picsum.photos/seed/masjid-icon/192'
                });
                sentNotifications.add(notificationId);
            }
        });
    };
    const intervalId = setInterval(checkNotifications, 60000);
    return () => clearInterval(intervalId);
  }, [settings.notifications, prayerTimes]);

  useEffect(() => {
    const checkDuaReminder = () => {
      const now = new Date();
      const nowStr = now.toTimeString().substring(0, 5);
      
      prayerTimes.forEach(prayer => {
        if (['Subuh', 'Zuhur', 'Asar', 'Magrib', 'Isya'].includes(prayer.name)) {
          if (prayer.time === nowStr) {
            setActiveDuaReminder({ prayerName: prayer.name });
            setTimeout(() => {
              setActiveDuaReminder(null);
            }, settings.duaReminderDuration * 60 * 1000);
          }
        }
      });
    };
    
    const intervalId = setInterval(checkDuaReminder, 60000);
    return () => clearInterval(intervalId);
  }, [prayerTimes, settings.duaReminderDuration]);

  useEffect(() => {
    if (!settings.autoBackgroundChange || BACKGROUND_THEMES.length === 0) return;
    const bgTimer = setInterval(() => {
        setCurrentBgIndex(prev => (prev + 1) % BACKGROUND_THEMES.length);
    }, 15000);
    return () => clearInterval(bgTimer);
  }, [settings.autoBackgroundChange]);
  
  useEffect(() => {
      if(settings.autoBackgroundChange) {
          if(settings.customBackgroundUrl) return;
          setCurrentTheme(BACKGROUND_THEMES[currentBgIndex]);
      }
  }, [currentBgIndex, settings.autoBackgroundChange, settings.customBackgroundUrl, setCurrentTheme]);

  useEffect(() => {
    if (!settings.autoTheme || settings.autoBackgroundChange) return;
    const hour = currentTime.getHours();
    const isNight = hour >= 19 || hour < 6;
    const targetThemeId = 'mint-green-mosque';
    if (currentTheme.id !== targetThemeId) {
      const newTheme = THEMES.find(t => t.id === targetThemeId);
      if (newTheme) setCurrentTheme(newTheme);
    }
  }, [currentTime, settings.autoTheme, settings.autoBackgroundChange, currentTheme.id, setCurrentTheme]);

  const backgroundStyle = settings.customBackgroundUrl
    ? { backgroundImage: `url('${settings.customBackgroundUrl}')` }
    : currentTheme.style.backgroundImage
      ? { backgroundImage: currentTheme.style.backgroundImage }
      : { backgroundColor: currentTheme.style.backgroundColor };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div
        style={backgroundStyle}
        className={`relative h-screen w-screen bg-cover bg-center flex flex-col font-sans transition-all duration-1000 overflow-hidden ${currentTheme.textColor}`}
      >
        {!isOnline && (
          <div className="absolute top-0 right-0 m-4 px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-full shadow-lg z-[100] animate-blink flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
            Mode Offline
          </div>
        )}

        {activeDonationToast && (
            <div className="fixed inset-x-0 top-32 flex justify-center z-[100] animate-fade-in">
                <div className="bg-red-600 text-white px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.5)] border-4 border-white flex flex-col items-center gap-1 scale-110">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-2xl font-extrabold uppercase tracking-widest font-orbitron">TERIMA KASIH</h3>
                    </div>
                    <p className="text-xl font-bold">{activeDonationToast.name}</p>
                    <p className="text-3xl font-orbitron font-extrabold text-white mt-1">{formatCurrency(activeDonationToast.amount)}</p>
                    <p className="text-xs italic opacity-90 mt-1">"Semoga menjadi amal jariyah yang terus mengalir. Aamiin."</p>
                </div>
            </div>
        )}

        {activeDuaReminder && (
            <div className="fixed inset-x-0 bottom-40 flex justify-center z-[100] animate-fade-in">
                <div className="bg-emerald-600/90 backdrop-blur-xl text-white px-10 py-5 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.4)] border-2 border-emerald-400/50 flex flex-col items-center gap-2 max-w-xl">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-200 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h3 className="text-xl font-black uppercase tracking-widest text-emerald-100">WAKTU BERDOA</h3>
                    </div>
                    <p className="text-sm font-medium text-center opacity-90">
                        Selepas shalat {activeDuaReminder.prayerName}, mari sempatkan waktu sejenak untuk berdzikir dan memanjatkan doa terbaik kepada Allah SWT.
                    </p>
                    <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-emerald-300 animate-[marquee_20s_linear_infinite]" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        )}

        {/* HEADER AREA - GRADIENT: #076653, #0C342C, #06231D */}
        <header className="relative w-full px-4 sm:px-8 py-3 flex justify-between items-center z-20 bg-gradient-to-r from-[#076653] via-[#0C342C] to-[#06231D] border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Subtle noise/texture overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className={`relative z-10 transition-opacity duration-500 ${settings.showAddress ? 'opacity-100' : 'opacity-0'}`}>
            <MosqueInfo name={mosqueInfo.name} address={mosqueInfo.address} logoUrl={mosqueInfo.logoUrl} />
          </div>

          <div className="relative z-10 flex items-center gap-6">
             <Clock date={currentTime} />
             <div className="h-14 w-px bg-white/10 mx-1"></div>
             <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-3 rounded-2xl bg-white/5 text-white/80 hover:bg-white/15 transition-all duration-300 active:scale-90 border border-white/10 shadow-lg"
                    aria-label="Buka pengaturan"
                    title="Pengaturan"
                >
                    <SettingsIcon />
                </button>
            </div>
          </div>
        </header>

        <main className="relative flex-grow flex flex-col lg:flex-row items-start justify-between gap-4 p-4 sm:p-5 pt-6 overflow-hidden">
          <div className="relative w-full lg:w-5/12 h-full flex flex-col animate-fade-in order-2 lg:order-1">
            {activeSlideIndices.length > 1 && (
              <div className="w-full h-1 bg-white/10 rounded-full mb-3 overflow-hidden backdrop-blur-sm">
                  <div 
                      className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-100 ease-linear"
                      style={{ width: `${slideProgress}%` }}
                  />
              </div>
            )}

            <div className="relative flex-grow">
                <div className={`absolute inset-0 flex items-start justify-center transform transition-all duration-1000 ease-in-out ${settings.showJumuahSlide && currentSlideIndex === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {jumuahSchedule.length > 0 && <JumuahSchedule schedule={jumuahSchedule[0]} panelClass={currentTheme.panelClass} slideTitleSize={settings.slideTitleSize} />}
                </div>
                <div className={`absolute inset-0 flex items-start justify-center transform transition-all duration-1000 ease-in-out ${settings.showFinancialSlide && currentSlideIndex === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <FinancialReportSlide report={financialReport} panelClass={currentTheme.panelClass} mosqueInfo={mosqueInfo} slideTitleSize={settings.slideTitleSize} />
                </div>
                <div className={`absolute inset-0 flex items-start justify-center transform transition-all duration-1000 ease-in-out ${settings.showDkmSlide && currentSlideIndex === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
                      <DkmStructureSlide structure={dkmStructure} panelClass={currentTheme.panelClass} slideTitleSize={settings.slideTitleSize} />
                    </div>
                </div>
            </div>
          </div>

          <div className="hidden lg:block lg:flex-grow"></div>

          <div className="w-full lg:w-4/12 flex flex-col gap-3 animate-fade-in order-1 lg:order-2">
            {settings.showQuotes && (
              <div className="w-full">
                <QuoteDisplay quote={quotes[currentQuoteIndex]} panelClass={currentTheme.panelClass} />
              </div>
            )}
            {settings.showHadith && (
              <div className="w-full">
                <HadithDaily panelClass={currentTheme.panelClass} />
              </div>
            )}
          </div>
        </main>
        
        <footer className="w-full z-10 flex-shrink-0 mt-auto">
          <div className={`transition-colors duration-500 ${currentTheme.prayerBarClass}`}>
            <div className="flex flex-nowrap justify-start items-center py-2 px-4 border-b border-white/20 [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)] gap-4 overflow-x-hidden animate-fade-in">
                <FooterDate date={currentTime} hijriAdjustment={settings.hijriAdjustment} />
                <div className="h-5 w-px bg-white/30"></div>
                <EventTicker events={mosqueEvents} />
                <div className="h-5 w-px bg-white/30"></div>
                {settings.showIsraMirajCountdown && (
                    <>
                        <IsraMirajCountdown />
                        <div className="h-5 w-px bg-white/30"></div>
                    </>
                )}
                {settings.showRamadanCountdown && (
                    <>
                        <RamadanCountdown testDays={settings.ramadanCountdownTestDays} targetDate={settings.ramadanTargetDate} />
                        <div className="h-5 w-px bg-white/30"></div>
                    </>
                )}
                <NextPrayerCountdown prayerTimes={prayerTimes} currentTime={currentTime} />
            </div>
            <PrayerTimes prayerTimes={prayerTimes} currentTime={currentTime} highlightClass={currentTheme.highlightClass} />
          </div>
          {settings.showHadithTicker && <NewsTicker tickerClass={currentTheme.prayerBarClass} />}
        </footer>
      </div>
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
        jumuahSchedule={jumuahSchedule}
        setJumuahSchedule={setJumuahSchedule}
        financialReport={financialReport}
        setFinancialReport={setFinancialReport}
        dkmStructure={dkmStructure}
        setDkmStructure={setDkmStructure}
        mosqueInfo={mosqueInfo}
        setMosqueInfo={setMosqueInfo}
        prayerTimes={prayerTimes}
        setPrayerTimes={setPrayerTimes}
        quotes={quotes}
        setQuotes={setQuotes}
        events={mosqueEvents}
        setEvents={setMosqueEvents}
      />
    </>
  );
}

export default App;
