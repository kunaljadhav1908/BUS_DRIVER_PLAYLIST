import React, { useState, useEffect } from 'react';
import { DRIVER_QUOTES } from '../data/quotes';
import { Sparkles } from 'lucide-react';

export const QuoteBox: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const nextQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % DRIVER_QUOTES.length);
      setIsFading(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(nextQuote, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="absolute left-6 md:left-11 bottom-[160px] md:bottom-[155px] z-[100] max-w-[min(470px,calc(100%-90px))] select-none">
      <div className="flex items-center gap-1.5 mb-2 text-[#ebc875] font-mono text-[9px] tracking-[2px] uppercase">
        <Sparkles className="w-3 h-3 text-amber-300" />
        <span>Driver's Thought</span>
      </div>

      <div
        onClick={nextQuote}
        title="Click for next thought"
        className={`min-h-[55px] font-serif text-[16px] sm:text-[20px] md:text-[24px] leading-snug text-white/90 drop-shadow-[0_3px_15px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-400 ${
          isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        "{DRIVER_QUOTES[index]}"
      </div>
    </section>
  );
};
