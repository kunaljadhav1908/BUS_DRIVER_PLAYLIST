import React from 'react';
import { PlayerState } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio, ListMusic } from 'lucide-react';

interface MusicPlayerProps {
  playerState: PlayerState;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onToggleMute: () => void;
  onOpenPlaylistModal: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  playerState,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onToggleMute,
  onOpenPlaylistModal
}) => {
  const formatTime = (seconds: number) => {
    const sec = Math.floor(seconds || 0);
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}:${String(rem).padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerState.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    onSeek(pct * playerState.duration);
  };

  const progressPct = playerState.duration > 0
    ? Math.min(100, Math.max(0, (playerState.currentTime / playerState.duration) * 100))
    : 0;

  return (
    <section className="fixed left-1/2 bottom-4.5 -translate-x-1/2 z-[300] w-[min(820px,calc(100%-30px))] p-3.5 sm:p-4 border border-white/15 rounded-2xl bg-gradient-to-br from-[rgba(17,27,27,0.92)] to-[rgba(18,26,35,0.85)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_rgba(255,255,255,0.1)] select-none">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Album Cover / Radio Badge */}
        <div
          onClick={onOpenPlaylistModal}
          className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 grid place-items-center rounded-xl bg-gradient-to-br from-[#e7b84c] to-[#b44b2e] shadow-[0_5px_20px_rgba(230,170,70,0.25)] text-xl cursor-pointer hover:scale-105 transition-transform"
          title="Change Playlist Station"
        >
          <span className={playerState.isPlaying ? 'animate-bounce' : ''}>🚍</span>
        </div>

        {/* Track Title & Status */}
        <div className="min-w-0 flex-1">
          <div className="text-[#cbbf9f] text-[8px] sm:text-[9px] tracking-[2px] uppercase font-mono mb-0.5 flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
            <span>Now Driving</span>
          </div>

          <div className="font-serif text-sm sm:text-base text-white truncate drop-shadow-sm font-semibold">
            {playerState.trackName || 'Loading playlist...'}
          </div>

          <div className="text-[#91ae94] font-mono text-[9px] sm:text-[10px] mt-0.5 truncate">
            {playerState.statusText}
          </div>
        </div>

        {/* Playlist Station Toggle Button */}
        <button
          onClick={onOpenPlaylistModal}
          className="p-2 border border-white/15 rounded-full bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/50 text-amber-200 text-xs transition-all flex items-center gap-1.5 font-mono cursor-pointer"
          title="Select Playlist Station"
        >
          <ListMusic className="w-4 h-4 text-amber-300" />
          <span className="hidden md:inline">Stations</span>
        </button>

        {/* Mute Toggle */}
        <button
          onClick={onToggleMute}
          className="p-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
          title={playerState.isMuted ? 'Unmute' : 'Mute'}
        >
          {playerState.isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onPrevious}
            className="w-8 sm:w-9 h-8 sm:h-9 grid place-items-center rounded-full bg-white/10 hover:bg-amber-400/20 text-white hover:-translate-y-0.5 transition-all cursor-pointer"
            title="Previous Track (P)"
          >
            <SkipBack className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={onPlayPause}
            className="w-10 sm:w-11 h-10 sm:h-11 grid place-items-center rounded-full bg-[#e6b64e] hover:bg-[#f5cc70] text-[#1b1b15] shadow-[0_0_20px_rgba(230,182,78,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
            title="Play / Pause (Space)"
          >
            {playerState.isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={onNext}
            className="w-8 sm:w-9 h-8 sm:h-9 grid place-items-center rounded-full bg-white/10 hover:bg-amber-400/20 text-white hover:-translate-y-0.5 transition-all cursor-pointer"
            title="Next Track (N)"
          >
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Progress Bar Row */}
      <div className="grid grid-cols-[40px_1fr_40px] items-center gap-2.5 mt-2.5">
        <span className="font-mono text-[9px] text-white/50 text-left">
          {formatTime(playerState.currentTime)}
        </span>

        <div
          onClick={handleProgressBarClick}
          className="relative w-full h-1.5 rounded-full bg-white/15 cursor-pointer overflow-hidden group"
          title="Click to seek"
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#4e8f72] to-[#e6b64e] transition-all duration-150"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <span className="font-mono text-[9px] text-white/50 text-right">
          {formatTime(playerState.duration)}
        </span>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-1.5 text-white/40 font-mono text-[8px] uppercase tracking-wider">
        <span>♪ MOUNTAIN ROAD SESSION</span>
        <span>Keyboard: Space (Play/Pause) • H (Honk) • N (Next) • P (Prev)</span>
      </div>
    </section>
  );
};
