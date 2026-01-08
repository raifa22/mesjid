import React, { useState, useEffect, useRef } from 'react';
import type { AppSettings, JumuahOfficial, FinancialReport, DkmOfficial, MosqueInfo, PrayerTime, SlideTitleSize, BankAccount, Donation, Quote, MosqueEvent } from '../types';
import { DEFAULT_PRAYER_TIMES } from '../constants';
import ToggleSwitch from './ToggleSwitch';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  jumuahSchedule: JumuahOfficial[];
  setJumuahSchedule: React.Dispatch<React.SetStateAction<JumuahOfficial[]>>;
  financialReport: FinancialReport;
  setFinancialReport: React.Dispatch<React.SetStateAction<FinancialReport>>;
  dkmStructure: DkmOfficial[];
  setDkmStructure: React.Dispatch<React.SetStateAction<DkmOfficial[]>>;
  mosqueInfo: MosqueInfo;
  setMosqueInfo: React.Dispatch<React.SetStateAction<MosqueInfo>>;
  prayerTimes: PrayerTime[];
  setPrayerTimes: React.Dispatch<React.SetStateAction<PrayerTime[]>>;
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  events: MosqueEvent[];
  setEvents: React.Dispatch<React.SetStateAction<MosqueEvent[]>>;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 9.414V13H5.5z" />
        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  isOpen, onClose, settings, setSettings, jumuahSchedule, setJumuahSchedule, financialReport, setFinancialReport, dkmStructure, setDkmStructure, mosqueInfo, setMosqueInfo, prayerTimes, setPrayerTimes, quotes, setQuotes, events, setEvents
}) => {
  const [localSchedule, setLocalSchedule] = useState<JumuahOfficial[]>(jumuahSchedule);
  const [localFinancialReport, setLocalFinancialReport] = useState<FinancialReport>(financialReport);
  const [localDkmStructure, setLocalDkmStructure] = useState<DkmOfficial[]>(dkmStructure);
  const [localMosqueInfo, setLocalMosqueInfo] = useState<MosqueInfo>(mosqueInfo);
  const [localPrayerTimes, setLocalPrayerTimes] = useState<PrayerTime[]>(prayerTimes);
  const [localQuotes, setLocalQuotes] = useState<Quote[]>(quotes);
  const [localEvents, setLocalEvents] = useState<MosqueEvent[]>(events);
  
  const [activeTab, setActiveTab] = useState<'umum' | 'ibadah' | 'konten' | 'finansial'>('umum');

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const qrisFileInputRef = useRef<HTMLInputElement>(null);
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const quoteImageInputRef = useRef<HTMLInputElement>(null);
  const [editingQuoteIndex, setEditingQuoteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLocalSchedule(jumuahSchedule);
      setLocalFinancialReport(financialReport);
      setLocalDkmStructure(dkmStructure);
      setLocalMosqueInfo(mosqueInfo);
      setLocalPrayerTimes(prayerTimes);
      setLocalQuotes(quotes);
      setLocalEvents(events);
    }
  }, [isOpen, jumuahSchedule, financialReport, dkmStructure, mosqueInfo, prayerTimes, quotes, events]);

  const handleSettingChange = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = () => {
    setJumuahSchedule(localSchedule);
    setFinancialReport(localFinancialReport);
    setDkmStructure(localDkmStructure);
    setMosqueInfo(localMosqueInfo);
    setPrayerTimes(localPrayerTimes);
    setQuotes(localQuotes);
    setEvents(localEvents);
    onClose();
  };

  const handleResetPrayerTimes = () => {
    if (window.confirm('Kembalikan semua waktu sholat ke setelan awal?')) {
        setLocalPrayerTimes(DEFAULT_PRAYER_TIMES.map(p => ({ ...p })));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, target: 'bg' | 'logo' | 'qris' | 'quote') => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'bg') handleSettingChange('customBackgroundUrl', result);
      else if (target === 'logo') setLocalMosqueInfo(prev => ({ ...prev, logoUrl: result }));
      else if (target === 'qris') setLocalMosqueInfo(prev => ({ ...prev, qrisImageUrl: result }));
      else if (target === 'quote' && editingQuoteIndex !== null) {
          const next = [...localQuotes];
          next[editingQuoteIndex].imageUrl = result;
          setLocalQuotes(next);
          setEditingQuoteIndex(null);
      }
    };
    reader.readAsDataURL(file);
    // Reset input value so same file can be selected again
    event.target.value = '';
  };

  const triggerQuoteImageUpload = (index: number) => {
    setEditingQuoteIndex(index);
    quoteImageInputRef.current?.click();
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-2xl bg-[#0a0a0a] text-gray-200 z-50 transform transition-transform duration-500 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center p-6 bg-[#111] border-b border-white/10">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter">PENGATURAN PANEL</h2>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Digital Mosque Information Board</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#111] px-6 gap-4 border-b border-white/5">
            {[
                { id: 'umum', label: 'Umum' },
                { id: 'ibadah', label: 'Ibadah' },
                { id: 'konten', label: 'Slide & Konten' },
                { id: 'finansial', label: 'Keuangan' }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === tab.id ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar pb-32">
          
          {activeTab === 'umum' && (
            <div className="space-y-6 animate-fade-in">
              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Identitas Masjid</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500">Nama Masjid</label>
                        <input type="text" value={localMosqueInfo.name} onChange={(e) => setLocalMosqueInfo({...localMosqueInfo, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500">Alamat Lengkap</label>
                        <textarea value={localMosqueInfo.address} onChange={(e) => setLocalMosqueInfo({...localMosqueInfo, address: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none h-20" />
                    </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Visual & Background</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => logoFileInputRef.current?.click()} className="flex flex-col items-center justify-center p-4 bg-white/5 border border-dashed border-white/20 rounded-xl hover:bg-white/10 transition-all">
                        <UploadIcon />
                        <span className="text-[10px] mt-2 font-bold uppercase">Update Logo</span>
                        <input type="file" ref={logoFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'logo')} />
                    </button>
                    <button onClick={() => bgFileInputRef.current?.click()} className="flex flex-col items-center justify-center p-4 bg-white/5 border border-dashed border-white/20 rounded-xl hover:bg-white/10 transition-all">
                        <UploadIcon />
                        <span className="text-[10px] mt-2 font-bold uppercase">Ganti Background</span>
                        <input type="file" ref={bgFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'bg')} />
                    </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'ibadah' && (
            <div className="space-y-8 animate-fade-in">
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Koreksi Waktu Sholat</h3>
                    <button 
                        onClick={handleResetPrayerTimes}
                        className="flex items-center gap-1.5 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/30 rounded-full hover:bg-emerald-500/10 transition-colors"
                    >
                        <ResetIcon /> Reset Default
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {localPrayerTimes.map((p, i) => (
                        <div key={p.name} className="bg-white/5 p-2 rounded-lg border border-white/5">
                            <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">{p.name}</label>
                            <input type="time" value={p.time} onChange={(e) => {
                                const newTimes = [...localPrayerTimes];
                                newTimes[i].time = e.target.value;
                                setLocalPrayerTimes(newTimes);
                            }} className="bg-transparent w-full text-sm font-orbitron outline-none text-emerald-400" />
                        </div>
                    ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Pengingat Hari Besar Islam</h3>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-white">Countdown Isra Mi'raj</p>
                            <p className="text-[10px] text-gray-500">Tampilkan hitung mundur Isra Mi'raj di footer</p>
                        </div>
                        <ToggleSwitch 
                            enabled={settings.showIsraMirajCountdown} 
                            setEnabled={(val) => handleSettingChange('showIsraMirajCountdown', val)} 
                        />
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-white">Countdown Ramadan</p>
                                <p className="text-[10px] text-gray-500">Tampilkan hitung mundur Ramadan di footer</p>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.showRamadanCountdown} 
                                setEnabled={(val) => handleSettingChange('showRamadanCountdown', val)} 
                            />
                        </div>
                        
                        {settings.showRamadanCountdown && (
                            <div className="grid grid-cols-2 gap-4 animate-fade-in">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold text-emerald-500">Tanggal Ramadan</label>
                                    <input 
                                        type="date" 
                                        value={settings.ramadanTargetDate} 
                                        onChange={(e) => handleSettingChange('ramadanTargetDate', e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 p-2 rounded text-xs text-white" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold text-emerald-500">Test Mode (Hari)</label>
                                    <input 
                                        type="number" 
                                        value={settings.ramadanCountdownTestDays} 
                                        onChange={(e) => handleSettingChange('ramadanCountdownTestDays', parseInt(e.target.value))}
                                        className="w-full bg-black/40 border border-white/5 p-2 rounded text-xs text-white" 
                                        placeholder="0 = normal"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Petugas Jum'at (Mingguan)</h3>
                <div className="space-y-4">
                    {localSchedule.map((week, idx) => (
                        <div key={week.id} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Minggu Ke-{week.id}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" value={week.imam} placeholder="Imam" onChange={(e) => {
                                    const next = [...localSchedule];
                                    next[idx].imam = e.target.value;
                                    setLocalSchedule(next);
                                }} className="bg-black/40 border border-white/5 p-2 rounded text-xs" />
                                <input type="text" value={week.khatib} placeholder="Khatib" onChange={(e) => {
                                    const next = [...localSchedule];
                                    next[idx].khatib = e.target.value;
                                    setLocalSchedule(next);
                                }} className="bg-black/40 border border-white/5 p-2 rounded text-xs" />
                                <input type="text" value={week.muadzin} placeholder="Muadzin" onChange={(e) => {
                                    const next = [...localSchedule];
                                    next[idx].muadzin = e.target.value;
                                    setLocalSchedule(next);
                                }} className="bg-black/40 border border-white/5 p-2 rounded text-xs" />
                                <input type="text" value={week.mc} placeholder="MC" onChange={(e) => {
                                    const next = [...localSchedule];
                                    next[idx].mc = e.target.value;
                                    setLocalSchedule(next);
                                }} className="bg-black/40 border border-white/5 p-2 rounded text-xs" />
                            </div>
                        </div>
                    ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'konten' && (
            <div className="space-y-8 animate-fade-in">
              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Pengaturan Hadits</h3>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-white">Hadits Harian (Slide)</p>
                            <p className="text-[10px] text-gray-500">Tampilkan hadits bergantian di panel kanan</p>
                        </div>
                        <ToggleSwitch 
                            enabled={settings.showHadith} 
                            setEnabled={(val) => handleSettingChange('showHadith', val)} 
                        />
                    </div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div>
                            <p className="text-xs font-bold text-white">Running Ticker Hadits</p>
                            <p className="text-[10px] text-gray-500">Teks hadits berjalan di bagian bawah layar</p>
                        </div>
                        <ToggleSwitch 
                            enabled={settings.showHadithTicker} 
                            setEnabled={(val) => handleSettingChange('showHadithTicker', val)} 
                        />
                    </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Manajemen Kutipan (Quotes)</h3>
                    <div className="flex items-center gap-3">
                        <ToggleSwitch enabled={settings.showQuotes} setEnabled={(val) => handleSettingChange('showQuotes', val)} />
                        <button onClick={() => setLocalQuotes([...localQuotes, { quote: '', author: '', imageUrl: 'https://picsum.photos/seed/quote/200' }])} className="text-[10px] bg-emerald-600 px-3 py-1 rounded-full font-bold flex items-center gap-1"><PlusIcon /> Tambah</button>
                    </div>
                </div>
                {settings.showQuotes && (
                    <div className="space-y-4 animate-fade-in">
                        {/* Hidden input for quote images */}
                        <input 
                            type="file" 
                            ref={quoteImageInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => handleFileSelect(e, 'quote')} 
                        />
                        {localQuotes.map((q, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 relative group">
                                <button onClick={() => setLocalQuotes(localQuotes.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-500/10 rounded"><TrashIcon /></button>
                                
                                <div className="flex gap-4 items-start">
                                    <div className="relative shrink-0">
                                        <img src={q.imageUrl} alt={q.author} className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                                        <button 
                                            onClick={() => triggerQuoteImageUpload(i)}
                                            className="absolute -bottom-1 -right-1 bg-emerald-600 p-1 rounded-full shadow-lg border border-white/20 hover:scale-110 transition-transform"
                                            title="Unggah Foto Tokoh"
                                        >
                                            <UploadIcon />
                                        </button>
                                    </div>
                                    <div className="flex-grow space-y-1">
                                        <label className="text-[9px] uppercase font-bold text-gray-500">Teks Kutipan</label>
                                        <textarea value={q.quote} onChange={(e) => {
                                            const next = [...localQuotes];
                                            next[i].quote = e.target.value;
                                            setLocalQuotes(next);
                                        }} className="w-full bg-black/40 border border-white/5 p-2 rounded text-xs text-white h-16" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase font-bold text-gray-500">Penulis/Tokoh</label>
                                        <input type="text" value={q.author} onChange={(e) => {
                                            const next = [...localQuotes];
                                            next[i].author = e.target.value;
                                            setLocalQuotes(next);
                                        }} className="w-full bg-black/40 border border-white/5 p-2 rounded text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase font-bold text-gray-500">URL Foto (Otomatis terisi jika unggah)</label>
                                        <input type="text" value={q.imageUrl} onChange={(e) => {
                                            const next = [...localQuotes];
                                            next[i].imageUrl = e.target.value;
                                            setLocalQuotes(next);
                                        }} className="w-full bg-black/40 border border-white/5 p-2 rounded text-[9px] text-gray-400 overflow-hidden text-ellipsis" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </section>

              <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Struktur Pengurus DKM</h3>
                    <button onClick={() => setLocalDkmStructure([...localDkmStructure, { role: 'Jabatan Baru', name: '' }])} className="text-[10px] bg-emerald-600 px-3 py-1 rounded-full font-bold flex items-center gap-1"><PlusIcon /> Tambah</button>
                </div>
                <div className="space-y-2">
                    {localDkmStructure.map((member, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input type="text" value={member.role} placeholder="Jabatan" onChange={(e) => {
                                const next = [...localDkmStructure];
                                next[i].role = e.target.value;
                                setLocalDkmStructure(next);
                            }} className="flex-1 bg-white/5 border border-white/5 p-2 rounded text-xs" />
                            <input type="text" value={member.name} placeholder="Nama Lengkap" onChange={(e) => {
                                const next = [...localDkmStructure];
                                next[i].name = e.target.value;
                                setLocalDkmStructure(next);
                            }} className="flex-[2] bg-white/5 border border-white/5 p-2 rounded text-xs" />
                            <button onClick={() => setLocalDkmStructure(localDkmStructure.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><TrashIcon /></button>
                        </div>
                    ))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Agenda & Kegiatan</h3>
                    <button onClick={() => setLocalEvents([...localEvents, { id: Date.now().toString(), title: '', date: '', time: '' }])} className="text-[10px] bg-emerald-600 px-3 py-1 rounded-full font-bold flex items-center gap-1"><PlusIcon /> Tambah</button>
                </div>
                <div className="space-y-3">
                    {localEvents.map((event, i) => (
                        <div key={event.id} className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-2">
                            <input type="text" value={event.title} placeholder="Nama Kegiatan" onChange={(e) => {
                                const next = [...localEvents];
                                next[i].title = e.target.value;
                                setLocalEvents(next);
                            }} className="w-full bg-black/40 p-2 rounded text-xs" />
                            <div className="flex gap-2">
                                <input type="text" value={event.date} placeholder="Hari/Tgl" onChange={(e) => {
                                    const next = [...localEvents];
                                    next[i].date = e.target.value;
                                    setLocalEvents(next);
                                }} className="flex-1 bg-black/40 p-2 rounded text-xs" />
                                <button onClick={() => setLocalEvents(localEvents.filter(e => e.id !== event.id))} className="bg-red-500/10 text-red-500 px-3 rounded-lg"><TrashIcon /></button>
                            </div>
                        </div>
                    ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'finansial' && (
            <div className="space-y-8 animate-fade-in">
              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Rekapitulasi Saldo</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Total Pemasukan</label>
                        <input type="number" value={localFinancialReport.income} onChange={(e) => setLocalFinancialReport({...localFinancialReport, income: parseFloat(e.target.value)})} className="bg-transparent w-full text-sm font-orbitron outline-none text-green-400" />
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Total Pengeluaran</label>
                        <input type="number" value={localFinancialReport.expenses} onChange={(e) => setLocalFinancialReport({...localFinancialReport, expenses: parseFloat(e.target.value)})} className="bg-transparent w-full text-sm font-orbitron outline-none text-red-400" />
                    </div>
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                        <label className="text-[9px] uppercase font-bold text-emerald-500 block mb-1">Saldo Kas Saat Ini</label>
                        <input type="number" value={localFinancialReport.balance} onChange={(e) => setLocalFinancialReport({...localFinancialReport, balance: parseFloat(e.target.value)})} className="bg-transparent w-full text-sm font-orbitron outline-none text-emerald-400" />
                    </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Rekening Donasi</h3>
                    <button onClick={() => setLocalMosqueInfo({...localMosqueInfo, bankAccounts: [...(localMosqueInfo.bankAccounts || []), { name: '', number: '', holder: '' }]})} className="text-[10px] bg-emerald-600 px-3 py-1 rounded-full font-bold flex items-center gap-1"><PlusIcon /> Tambah Bank</button>
                </div>
                <div className="space-y-3">
                    {localMosqueInfo.bankAccounts?.map((bank, i) => (
                        <div key={i} className="flex gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                            <input type="text" value={bank.name} placeholder="Nama Bank" onChange={(e) => {
                                const next = [...localMosqueInfo.bankAccounts];
                                next[i].name = e.target.value;
                                setLocalMosqueInfo({...localMosqueInfo, bankAccounts: next});
                            }} className="w-20 bg-black/40 p-2 rounded text-xs" />
                            <input type="text" value={bank.number} placeholder="Nomor Rekening" onChange={(e) => {
                                const next = [...localMosqueInfo.bankAccounts];
                                next[i].number = e.target.value;
                                setLocalMosqueInfo({...localMosqueInfo, bankAccounts: next});
                            }} className="flex-1 bg-black/40 p-2 rounded text-xs font-orbitron" />
                            <button onClick={() => setLocalMosqueInfo({...localMosqueInfo, bankAccounts: localMosqueInfo.bankAccounts.filter((_, idx) => idx !== i)})} className="text-red-500 p-2"><TrashIcon /></button>
                        </div>
                    ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">Update QRIS Donasi</h3>
                <button onClick={() => qrisFileInputRef.current?.click()} className="w-full flex items-center justify-center gap-3 p-4 bg-white/5 border border-dashed border-white/20 rounded-xl hover:bg-white/10 transition-all">
                    <UploadIcon />
                    <span className="text-[10px] font-bold uppercase">Upload Gambar QRIS</span>
                    <input type="file" ref={qrisFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'qris')} />
                </button>
              </section>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-[#111] border-t border-white/10 shadow-2xl flex gap-4">
          <button onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all uppercase text-xs tracking-widest border border-white/10">Batal</button>
          <button onClick={handleSaveChanges} className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl transition-all shadow-lg active:scale-95 uppercase text-xs tracking-[0.2em]">Simpan Perubahan</button>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;