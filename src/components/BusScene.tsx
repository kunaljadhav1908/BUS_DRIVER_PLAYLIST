import React from 'react';
import { TimeOfDay } from '../types';

interface BusSceneProps {
  timeOfDay: TimeOfDay;
  parallaxOffset: { x: number; y: number };
  isFlashActive: boolean;
}

export const BusScene: React.FC<BusSceneProps> = ({
  timeOfDay,
  parallaxOffset,
  isFlashActive
}) => {
  const getBgClass = () => {
    switch (timeOfDay) {
      case 'sunset':
        return 'scene-bg-sunset';
      case 'night':
        return 'scene-bg-night';
      case 'dawn':
      default:
        return 'scene-bg-dawn';
    }
  };

  return (
    <div className={`relative w-full h-screen min-h-[620px] overflow-hidden isolate ${getBgClass()} vignette-overlay grain-overlay select-none`}>
      {/* Sun / Moon Orb */}
      <div
        className={`absolute rounded-full filter blur-[1px] transition-all duration-700 ${
          timeOfDay === 'night'
            ? 'w-[120px] h-[120px] top-[10%] right-[15%] bg-[radial-gradient(circle,#ffffff_0%,#dbeafe_40%,rgba(147,197,253,0.3)_70%,transparent_85%)] shadow-[0_0_50px_rgba(219,234,254,0.5)]'
            : timeOfDay === 'sunset'
            ? 'w-[160px] h-[160px] top-[22%] right-[18%] bg-[radial-gradient(circle,#fff1b6_0%,#ff8c42_45%,rgba(217,101,43,0.4)_75%,transparent_85%)] shadow-[0_0_60px_rgba(255,140,66,0.5)]'
            : 'w-[155px] h-[155px] top-[11%] right-[14%] bg-[radial-gradient(circle,#fff1b6_0%,#ffc86b_36%,rgba(255,198,105,0.35)_65%,transparent_74%)] animate-[sunPulse_5s_ease-in-out_infinite]'
        }`}
      />

      {/* Clouds */}
      <div className="cloud-shape top-[14%] -left-[300px] animate-[cloudMove_40s_linear_infinite]" />
      <div className="cloud-shape top-[27%] -left-[350px] scale-75 animate-[cloudMove_55s_linear_infinite_8s]" />
      <div className="cloud-shape top-[8%] -left-[400px] scale-50 animate-[cloudMove_70s_linear_infinite_16s]" />

      {/* Distant Mountains with Mouse Parallax */}
      <div
        className="mountain-shape left-[-160px]"
        style={{
          transform: `translate(${parallaxOffset.x * 5}px, ${parallaxOffset.y * 5}px)`
        }}
      />
      <div
        className="mountain-shape left-[28%] scale-[1.2] opacity-50"
        style={{
          transform: `scale(1.2) translate(${parallaxOffset.x * 10}px, ${parallaxOffset.y * 10}px)`
        }}
      />
      <div
        className="mountain-shape right-[-190px] scale-90 opacity-60"
        style={{
          transform: `scale(0.9) translate(${parallaxOffset.x * 15}px, ${parallaxOffset.y * 15}px)`
        }}
      />

      {/* Back Hill */}
      <div className="absolute -left-[10%] w-[120%] h-[250px] bottom-[205px] rounded-t-[50%] bg-[radial-gradient(ellipse_at_50%_100%,#2e6348,#173d2f_60%,#0b241c)] z-[7] scale-110 opacity-75" />

      {/* River */}
      <div className="river-flow" />

      {/* Front Hill */}
      <div className="absolute -left-[10%] w-[120%] h-[190px] bottom-[165px] rounded-t-[50%] bg-[radial-gradient(ellipse_at_50%_100%,#28563f,#0c2b21_70%)] z-[10]" />

      {/* 3D Road */}
      <div className="road-perspective" />

      {/* Guard Rails */}
      <div className="absolute bottom-[154px] left-0 w-[42%] h-[5px] bg-[#d5d7ce] z-[18] shadow-[0_0_8px_rgba(255,255,255,0.22)] origin-left rotate-[5deg]" />
      <div className="absolute bottom-[154px] right-0 w-[42%] h-[5px] bg-[#d5d7ce] z-[18] shadow-[0_0_8px_rgba(255,255,255,0.22)] origin-right -rotate-[5deg]" />

      {/* Trees */}
      <div className="absolute left-0 right-0 bottom-[175px] h-[170px] z-[22] pointer-events-none">
        <div className="tree-shape left-[4%] scale-80" />
        <div className="tree-shape left-[13%] scale-125" />
        <div className="tree-shape left-[25%] scale-70" />
        <div className="tree-shape right-[10%] scale-110" />
        <div className="tree-shape right-[20%] scale-75" />
        <div className="tree-shape right-[4%] scale-125" />
      </div>

      {/* Mist */}
      <div className="absolute -left-[10%] bottom-[310px] w-[120%] h-[90px] bg-gradient-to-r from-transparent via-white/15 to-transparent filter blur-[18px] animate-[mistMove_14s_ease-in-out_infinite_alternate] z-[25]" />

      {/* Bus Track & Bus */}
      <div className="absolute left-1/2 bottom-[150px] -translate-x-1/2 w-full h-[270px] z-[45] pointer-events-none">
        <div className="absolute -left-[350px] bottom-[55px] w-[300px] h-[142px] rounded-t-[22px] rounded-b-[15px] bg-gradient-to-b from-[#f5c94e] via-[#d95d27] to-[#f0a83b] border-2 border-[rgba(70,30,10,0.7)] shadow-[0_20px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(246,180,64,0.15)] animate-[busDrive_19s_linear_infinite,busBounce_0.7s_ease-in-out_infinite] scale-80 sm:scale-100 origin-bottom">
          {/* Roof */}
          <div className="absolute left-[15px] right-[20px] -top-[9px] h-[12px] rounded-t-[15px] bg-[#d9a83d]" />

          {/* Destination Display */}
          <div className="absolute top-[7px] left-[75px] w-[150px] p-[4px] rounded bg-[#292116] text-[#ffd86c] font-mono text-[9px] text-center tracking-wider">
            MOUNTAIN ROUTE
          </div>

          {/* Bus Windows */}
          <div className="bus-window-glass left-[17px]" />
          <div className="bus-window-glass left-[79px]" />
          <div className="bus-window-glass left-[141px]" />
          <div className="bus-window-glass left-[203px]" />

          {/* Driver Window */}
          <div className="absolute right-[12px] top-[50px] w-[50px] h-[48px] border-[3px] border-[#392b22] rounded-[6px] bg-[#16272c]">
            <div className="absolute left-[16px] bottom-[5px] w-[18px] h-[28px] rounded-t-[50%] rounded-b-[30%] bg-[#111]" />
          </div>

          {/* Mirror */}
          <div className="absolute right-[-21px] top-[42px] w-[17px] h-[25px] border-[3px] border-[#151515] rounded-full bg-[#789099]" />

          {/* Headlight */}
          <div className="absolute right-[-9px] top-[94px] w-[12px] h-[18px] rounded bg-[#fff5b2] shadow-[0_0_12px_#ffe886,0_0_35px_rgba(255,224,111,0.7)]" />

          {/* Tail light */}
          <div className="absolute left-[-5px] top-[94px] w-[8px] h-[14px] rounded bg-[#d83b2e]" />

          {/* Bus Door */}
          <div className="absolute left-[248px] top-[53px] w-[35px] h-[63px] border-2 border-[#613522] bg-[rgba(65,43,28,0.5)]" />

          {/* Bus Text */}
          <div className="absolute left-[20px] bottom-[17px] font-serif text-[12px] font-bold text-[#51200f] tracking-wider">
            NEXT STOP → HOME
          </div>

          {/* Wheels */}
          <div className="wheel-style left-[30px]" />
          <div className="wheel-style right-[25px]" />
        </div>
      </div>

      {/* Flash Overlay for Honk */}
      <div
        className={`fixed inset-0 z-[250] pointer-events-none transition-colors duration-100 ${
          isFlashActive ? 'bg-[#ffeda1]/20' : 'bg-transparent'
        }`}
      />
    </div>
  );
};
