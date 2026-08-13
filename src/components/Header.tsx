import React from 'react';
import { TimeOfDay } from '../types';
import { Sun, Sunset, Moon, Music } from 'lucide-react';

interface HeaderProps {
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  isMusicPlaying: boolean;
}

export const Header: React.FC<HeaderProps> = ({ timeOfDay, setTimeOfDay, isMusicPlaying }) => {
  return (
    <>
      <header className="absolute top-8 left-6 md:left-11 z-[100] max-w-[90vw]">
        {/* Eyebrow Status */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 mb-3.5 border border-white/15 rounded-full bg-black/25 backdrop-blur-md text-[#f5d27c] text-[10px] tracking-[2px] uppercase select-none">
          <span className={`w-1.5 h-1.5 rounded-full ${isMusicPlaying ? 'bg-[#7ed16c] shadow-[0_0_10px_#7ed16c] animate-pulse' : 'bg-amber-400'}`} />
          <span>Mountain Route • {isMusicPlaying ? 'Music Playing' : 'Music Ready'}</span>
        </div>

        {/* Title */}
        <h1 className="max-w-[700px] font-serif text-[42px] sm:text-[56px] md:text-[80px] leading-[0.9] tracking-[-2px] sm:tracking-[-3px] text-white drop-shadow-[0_5px_20px_rgba(0,0,0,0.55)] select-none">
          BUS DRIVER
          <br />
          PLAYLIST
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-[11px] sm:text-[13px] tracking-[2px] sm:tracking-[3px] uppercase text-white/75 select-none">
          Drive. Listen. Travel. Repeat.
        </p>

        {/* Atmosphere/Time Selector Pills */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setTimeOfDay('dawn')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
              timeOfDay === 'dawn'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-black/30 text-white/60 hover:text-white border border-white/10'
            }`}
            title="Dawn Drive"
          >
            <Sun className="w-3 h-3" />
            <span>Dawn</span>
          </button>
          <button
            onClick={() => setTimeOfDay('sunset')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
              timeOfDay === 'sunset'
                ? 'bg-rose-500/30 text-rose-200 border border-rose-400/50 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                : 'bg-black/30 text-white/60 hover:text-white border border-white/10'
            }`}
            title="Sunset Drive"
          >
            <Sunset className="w-3 h-3" />
            <span>Sunset</span>
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
              timeOfDay === 'night'
                ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/50 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                : 'bg-black/30 text-white/60 hover:text-white border border-white/10'
            }`}
            title="Night Drive"
          >
            <Moon className="w-3 h-3" />
            <span>Night</span>
          </button>
        </div>
      </header>

      {/* Creator Tag */}
      <div className="absolute top-8 right-6 md:right-10 z-[105] px-3 py-2 border border-white/15 rounded-full bg-black/25 backdrop-blur-md text-white/65 hover:text-white font-mono text-[11px] transition-all duration-300 hover:border-amber-300/50 hover:shadow-[0_0_25px_rgba(255,190,90,0.2)] hover:-translate-y-0.5 select-none">
        &lt; / &gt; Created by Kunal Jadhav
      </div>
    </>
  );
};
