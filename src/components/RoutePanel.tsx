import React from 'react';
import { RouteDetails } from '../types';
import { MapPin, Navigation } from 'lucide-react';

interface RoutePanelProps {
  route: RouteDetails;
}

export const RoutePanel: React.FC<RoutePanelProps> = ({ route }) => {
  return (
    <section className="hidden lg:block absolute top-[280px] left-11 z-[100] w-[230px] p-4 border border-white/15 rounded-2xl bg-[rgba(9,18,20,0.65)] backdrop-blur-md shadow-xl select-none">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[#ebc875] text-[9px] tracking-[2px] uppercase font-mono flex items-center gap-1.5">
          <Navigation className="w-3 h-3 text-[#ebc875]" />
          <span>Route Information</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between py-1.5 border-b border-white/10 font-mono text-[9px]">
          <span className="text-white/60">ROUTE</span>
          <span className="text-[#b9d6ae] font-semibold">{route.number}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-white/10 font-mono text-[9px]">
          <span className="text-white/60">DESTINATION</span>
          <span className="text-[#b9d6ae] font-semibold flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-amber-400 inline" />
            {route.destination}
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-white/10 font-mono text-[9px]">
          <span className="text-white/60">TRIP</span>
          <span className="text-[#b9d6ae] font-semibold">{route.trip}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-white/10 font-mono text-[9px]">
          <span className="text-white/60">STATUS</span>
          <span className="text-[#b9d6ae] font-semibold">{route.status}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-white/10 font-mono text-[9px]">
          <span className="text-white/60">PASSENGERS</span>
          <span className="text-[#b9d6ae] font-semibold">{route.passengers}</span>
        </div>

        <div className="flex justify-between pt-1.5 font-mono text-[9px]">
          <span className="text-white/60">DISTANCE</span>
          <span className="text-amber-300 font-semibold">{route.distanceKm} km</span>
        </div>
      </div>
    </section>
  );
};
