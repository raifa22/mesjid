import React from 'react';
import type { FinancialReport, SlideTitleSize, MosqueInfo } from '../types';

interface FinancialReportSlideProps {
  report: FinancialReport;
  panelClass: string;
  mosqueInfo: MosqueInfo;
  slideTitleSize: SlideTitleSize;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const FinancialReportSlide: React.FC<FinancialReportSlideProps> = ({ report, panelClass, mosqueInfo, slideTitleSize }) => {
  const titleSizeClasses: Record<SlideTitleSize, string> = {
    normal: 'text-lg sm:text-xl',
    large: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  const qrisImage = mosqueInfo.qrisImageUrl || "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/donate";

  return (
    <div className={`w-full max-w-5xl mx-auto rounded-2xl p-2 sm:p-3 text-center ${panelClass} [text-shadow:2px_2px_6px_rgba(0,0,0,0.7)]`}>
      <h2 className={`font-bold transition-all duration-300 ${titleSizeClasses[slideTitleSize]}`}>
        Laporan Keuangan '{mosqueInfo.name.replace('Masjid ', '')}'
      </h2>
      <p className="text-sm sm:text-base opacity-80 mb-1">{report.period}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-base sm:text-lg mb-2">
        <div className="flex flex-col p-2 bg-black/20 rounded-lg border border-white/5">
          <span className="font-orbitron text-xs sm:text-sm opacity-80 uppercase">Pemasukan</span>
          <span className="font-orbitron font-bold text-green-400 [text-shadow:0_0_8px_rgba(74,222,128,0.7)]">{formatCurrency(report.income)}</span>
        </div>
        <div className="flex flex-col p-2 bg-black/20 rounded-lg border border-white/5">
          <span className="font-orbitron text-xs sm:text-sm opacity-80 uppercase">Pengeluaran</span>
          <span className="font-orbitron font-bold text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,0.7)]">{formatCurrency(report.expenses)}</span>
        </div>
        <div className="flex flex-col p-2 bg-black/20 rounded-lg border border-white/5 md:col-span-2 lg:col-span-1">
          <span className="font-orbitron text-xs sm:text-sm opacity-80 uppercase">Saldo Akhir</span>
          <span className="font-orbitron font-bold text-red-500 [text-shadow:0_0_8px_rgba(239,68,68,0.7)]">{formatCurrency(report.balance)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-white/20 mt-1 pt-2">
        {/* Kolom Donatur Terakhir */}
        <div className="bg-black/30 rounded-xl p-3 border border-red-500/20">
          <h3 className="text-sm sm:text-base font-bold text-red-400 mb-2 uppercase tracking-widest">Donatur Terakhir</h3>
          <div className="space-y-1 max-h-[120px] overflow-hidden">
            {report.recentDonations && report.recentDonations.length > 0 ? (
              report.recentDonations.slice(0, 4).map((donation) => (
                <div key={donation.id} className="flex justify-between items-center text-sm py-1 border-b border-white/5 last:border-0 animate-fade-in">
                  <span className="font-medium text-gray-200">{donation.name}</span>
                  <span className="font-orbitron font-bold text-green-400">{formatCurrency(donation.amount)}</span>
                </div>
              ))
            ) : (
              <p className="text-xs italic opacity-50">Belum ada donasi tercatat minggu ini</p>
            )}
          </div>
        </div>

        {/* Kolom QRIS & Bank */}
        <div className="flex flex-col items-center justify-center bg-black/20 p-3 rounded-xl">
           <div className="flex items-center gap-4 mb-3">
             <div className="flex flex-col items-center">
                <img 
                  src={qrisImage}
                  alt="QRIS Donasi"
                  className="w-20 h-20 p-1 bg-white rounded-md shadow-lg object-contain"
                />
                <p className="text-[10px] font-bold mt-1 text-white bg-red-600 px-3 rounded-full">SCAN QRIS</p>
             </div>
             <div className="flex flex-col gap-2">
                {mosqueInfo.bankAccounts && mosqueInfo.bankAccounts.slice(0, 1).map((bank, index) => (
                  <div key={index} className="text-left">
                    <p className="text-[10px] opacity-70 uppercase tracking-tighter">Transfer {bank.name}</p>
                    <p className="font-orbitron text-base font-bold tracking-wider leading-none text-red-400">{bank.number}</p>
                    <p className="text-[10px] opacity-90 truncate max-w-[120px]">a.n. {bank.holder}</p>
                  </div>
                ))}
             </div>
           </div>
           <p className="text-[10px] sm:text-xs text-red-200/80 italic">"Sedekah tidaklah mengurangi harta." (HR. Muslim)</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportSlide;