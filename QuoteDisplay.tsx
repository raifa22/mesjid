import React from 'react';
import type { Quote } from '../types';

interface QuoteDisplayProps {
  quote: Quote;
  panelClass: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, panelClass }) => {
  if (!quote) return null;

  return (
    <div className={`rounded-2xl p-2 sm:p-3 text-center transition-colors duration-500 ${panelClass} shadow-2xl`}>
      <div className="flex flex-col items-center">
        <img 
            src={quote.imageUrl} 
            alt={`Foto ${quote.author}`} 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/20 shadow-lg mb-2"
        />
        <blockquote className="text-xs sm:text-sm md:text-base font-medium italic text-slate-50 [text-shadow:2px_2px_8px_rgba(0,0,0,1)]">
          " {quote.quote} "
        </blockquote>
        <cite className="mt-2 text-sm sm:text-base md:text-lg font-bold not-italic text-white [text-shadow:2px_2px_8px_rgba(0,0,0,1)]">
          - {quote.author}
        </cite>
      </div>
    </div>
  );
};

export default QuoteDisplay;