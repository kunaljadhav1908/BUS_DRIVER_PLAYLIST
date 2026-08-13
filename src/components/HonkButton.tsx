import React, { useState, useEffect, useCallback } from 'react';
import { playBusHorn } from '../utils/audio';
import { Volume2 } from 'lucide-react';

interface HonkButtonProps {
  onTriggerFlash: () => void;
}

export const HonkButton: React.FC<HonkButtonProps> = ({ onTriggerFlash }) => {
  const [showHonkMessage, setShowHonkMessage] = useState<boolean>(false);

  const handleHonk = useCallback(() => {
    setShowHonkMessage(true);
    onTriggerFlash();
    playBusHorn();

    setTimeout(() => {
      setShowHonkMessage(false);
    }, 650);
  }, [onTriggerFlash]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h' && !e.repeat && document.activeElement?.tagName !== 'INPUT') {
        handleHonk();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleHonk]);

  return (
    <section className="absolute right-6 md:right-10 bottom-[160px] md:bottom-[175px] z-[105] text-right select-none">
      <div
        className={`h-[25px] mb-1.5 text-[#ffe59a] font-mono text-[11px] font-semibold transition-all duration-250 ${
          showHonkMessage ? 'opacity-100 translate-y-0 scale-105' : 'opacity-0 translate-y-1 scale-95'
        }`}
      >
        🚍 HONK HONK!
      </div>

      <button
        type="button"
        onClick={handleHonk}
        className="flex items-center gap-2 px-4 py-2.5 border border-amber-300/30 rounded-full text-[#ffe3a1] bg-black/35 backdrop-blur-md hover:bg-amber-500/20 hover:border-amber-300/60 hover:-translate-y-0.5 shadow-lg active:scale-95 transition-all text-[12px] font-mono cursor-pointer"
        title="Press H or click to honk"
      >
        <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>HONK • H</span>
      </button>
    </section>
  );
};
