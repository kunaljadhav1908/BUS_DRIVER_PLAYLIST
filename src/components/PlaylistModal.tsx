import React, { useState } from 'react';
import { PRESET_PLAYLISTS } from '../data/playlists';
import { PlaylistPreset } from '../types';
import { Music2, Check, X, Link as LinkIcon, Sparkles } from 'lucide-react';

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlaylistId: string;
  onSelectPlaylist: (playlistId: string) => void;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({
  isOpen,
  onClose,
  currentPlaylistId,
  onSelectPlaylist
}) => {
  const [customInput, setCustomInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    let extractedId = customInput.trim();

    // Check if user pasted a full YouTube URL
    if (extractedId.includes('list=')) {
      const match = extractedId.match(/list=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        extractedId = match[1];
      }
    }

    if (extractedId.length < 5) {
      setErrorMsg('Invalid YouTube Playlist ID or URL');
      return;
    }

    setErrorMsg('');
    onSelectPlaylist(extractedId);
    setCustomInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0f1a1d] border border-white/20 rounded-2xl p-6 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2 text-amber-300 font-mono text-sm uppercase tracking-wider">
          <Music2 className="w-5 h-5" />
          <span>Bus Driver Radio Stations</span>
        </div>
        <p className="text-white/70 text-xs mb-6">
          Select a mountain highway station or enter a custom YouTube playlist.
        </p>

        {/* Preset Playlists */}
        <div className="space-y-3 mb-6">
          {PRESET_PLAYLISTS.map((p: PlaylistPreset) => {
            const isSelected = p.playlistId === currentPlaylistId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  onSelectPlaylist(p.playlistId);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="font-serif text-base font-semibold text-white flex items-center gap-2">
                      {p.title}
                      {isSelected && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-black font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/60 font-sans mt-0.5">{p.subtitle}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-amber-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom Playlist Form */}
        <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-white/10">
          <label className="block text-xs font-mono text-amber-200/90 mb-2 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Load Custom YouTube Playlist</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Paste Playlist URL or ID (e.g., PLMRKdK...)"
              className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl transition-all font-mono cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load</span>
            </button>
          </div>
          {errorMsg && <p className="text-red-400 text-[11px] mt-1.5 font-mono">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};
