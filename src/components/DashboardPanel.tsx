import React, { useState, useEffect } from 'react';
import { Gauge, Radio, Clock } from 'lucide-react';

interface DashboardPanelProps {
  musicStatus: string;
  isEngineRunning: boolean;
  speed: number;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({
  musicStatus,
  isEngineRunning,
  speed
}) => {
  const [timeString, setTimeString] = useState<string>('06:45:00 AM');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTimeString(`${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hidden sm:block absolute top-[140px] md:top-[170px] right-6 md:right-10 z-[100] w-[215px] p-4 border border-white/15 rounded-2xl bg-[rgba(9,18,20,0.65)] backdrop-blur-md shadow-xl select-none">
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-[#ebc875] text-[9px] tracking-[2px] uppercase font-mono flex items-center gap-1.5">
          <Gauge className="w-3 h-3 text-amber-400" />
          <span>Driver Dashboard</span>
        </div>
      </div>

      {/* Clock */}
      <div className="flex items-center gap-2 mb-3 text-[#f4dfae] font-mono text-2xl font-semibold tracking-wider">
        <Clock className="w-4 h-4 text-amber-300 opacity-80" />
        <span>{timeString}</span>
      </div>

      <div className="space-y-1.5 font-mono text-[9px]">
        <div className="flex justify-between py-1 text-white/60">
          <span>ENGINE</span>
          <span className={isEngineRunning ? 'text-[#9dcc91] font-semibold' : 'text-red-400 font-semibold'}>
            {isEngineRunning ? 'READY' : 'OFF'}
          </span>
        </div>

        <div className="flex justify-between py-1 text-white/60">
          <span>SPEED</span>
          <span className="text-amber-300 font-semibold flex items-center gap-1">
            {speed} km/h
          </span>
        </div>

        <div className="flex justify-between py-1 text-white/60">
          <span>MUSIC</span>
          <span className="text-[#9dcc91] font-semibold truncate max-w-[100px] text-right">
            {musicStatus}
          </span>
        </div>

        <div className="flex justify-between py-1 text-white/60">
          <span>ROUTE</span>
          <span className="text-[#9dcc91] font-semibold">MOUNTAIN</span>
        </div>

        <div className="flex justify-between py-1 text-white/60">
          <span>ROAD</span>
          <span className="text-[#9dcc91] font-semibold">OPEN</span>
        </div>
      </div>
    </section>
  );
};
