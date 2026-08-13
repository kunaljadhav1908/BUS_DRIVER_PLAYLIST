import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimeOfDay, RouteDetails, PlayerState } from './types';
import { PRESET_PLAYLISTS } from './data/playlists';
import { BusScene } from './components/BusScene';
import { Header } from './components/Header';
import { RoutePanel } from './components/RoutePanel';
import { DashboardPanel } from './components/DashboardPanel';
import { QuoteBox } from './components/QuoteBox';
import { HonkButton } from './components/HonkButton';
import { MusicPlayer } from './components/MusicPlayer';
import { PlaylistModal } from './components/PlaylistModal';
import { YouTubePlayer } from './components/YouTubePlayer';

export default function App() {
  // Atmosphere state
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('dawn');

  // Parallax offset
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Honk flash state
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);

  // Playlist Modal State
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState<boolean>(false);

  // Player state
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isReady: false,
    trackName: 'Loading playlist...',
    statusText: 'Connecting to YouTube...',
    currentTime: 0,
    duration: 0,
    volume: 100,
    isMuted: false,
    currentPlaylistId: PRESET_PLAYLISTS[0].playlistId
  });

  // Reference to YT.Player instance
  const ytPlayerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Route Details
  const [routeInfo] = useState<RouteDetails>({
    number: '07',
    destination: 'MOUNTAIN',
    trip: 'MORNING',
    status: 'ON ROAD',
    passengers: 32,
    distanceKm: 148
  });

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 800) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update track title from YT player
  const updateTrackInfo = useCallback(() => {
    if (!ytPlayerRef.current) return;
    try {
      const data = ytPlayerRef.current.getVideoData?.();
      if (data && data.title) {
        setPlayerState((prev) => ({ ...prev, trackName: data.title }));
      }
    } catch (e) {
      console.warn('Could not read track info', e);
    }
  }, []);

  // Update progress timer
  useEffect(() => {
    if (playerState.isPlaying && playerState.isReady) {
      timerRef.current = setInterval(() => {
        if (!ytPlayerRef.current) return;
        try {
          const cur = ytPlayerRef.current.getCurrentTime?.() || 0;
          const dur = ytPlayerRef.current.getDuration?.() || 0;
          setPlayerState((prev) => ({
            ...prev,
            currentTime: cur,
            duration: dur
          }));
        } catch (e) {
          // ignore transient seek errors
        }
      }, 500);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [playerState.isPlaying, playerState.isReady]);

  // Player Callbacks
  const handlePlayerReady = useCallback((player: any) => {
    ytPlayerRef.current = player;
    setPlayerState((prev) => ({
      ...prev,
      isReady: true,
      statusText: 'READY • PLAYLIST CONNECTED'
    }));
    updateTrackInfo();
  }, [updateTrackInfo]);

  const handlePlayerStateChange = useCallback((event: any) => {
    if (!window.YT) return;
    const state = event.data;

    if (state === window.YT.PlayerState.PLAYING) {
      setPlayerState((prev) => ({
        ...prev,
        isPlaying: true,
        statusText: 'PLAYING • ON THE ROAD'
      }));
      updateTrackInfo();
    } else if (state === window.YT.PlayerState.PAUSED) {
      setPlayerState((prev) => ({
        ...prev,
        isPlaying: false,
        statusText: 'PAUSED • ROAD STOP'
      }));
    } else if (state === window.YT.PlayerState.BUFFERING) {
      setPlayerState((prev) => ({
        ...prev,
        statusText: 'BUFFERING • MOUNTAIN ROAD'
      }));
    } else if (state === window.YT.PlayerState.CUED) {
      updateTrackInfo();
      setPlayerState((prev) => ({
        ...prev,
        statusText: 'READY • PRESS PLAY'
      }));
    } else if (state === window.YT.PlayerState.ENDED) {
      setPlayerState((prev) => ({
        ...prev,
        isPlaying: false,
        statusText: 'TRACK ENDED'
      }));
      setTimeout(updateTrackInfo, 700);
    }
  }, [updateTrackInfo]);

  const handlePlayerError = useCallback((event: any) => {
    let msg = 'YOUTUBE PLAYBACK ERROR';
    if (event.data === 101 || event.data === 150) {
      msg = 'VIDEO EMBEDDING RESTRICTED';
    } else if (event.data === 100) {
      msg = 'VIDEO NOT FOUND';
    }
    setPlayerState((prev) => ({ ...prev, statusText: msg }));
  }, []);

  // Controls
  const togglePlayPause = useCallback(() => {
    if (!ytPlayerRef.current || !playerState.isReady) {
      setPlayerState((prev) => ({ ...prev, statusText: 'YOUTUBE STILL LOADING...' }));
      return;
    }

    try {
      const state = ytPlayerRef.current.getPlayerState?.();
      if (state === window.YT.PlayerState.PLAYING) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    } catch (e) {
      console.error('Play/Pause error:', e);
    }
  }, [playerState.isReady]);

  const handlePrevious = useCallback(() => {
    if (!ytPlayerRef.current || !playerState.isReady) return;
    try {
      ytPlayerRef.current.previousVideo();
      setPlayerState((prev) => ({ ...prev, statusText: 'PREVIOUS TRACK' }));
      setTimeout(updateTrackInfo, 700);
    } catch (e) {
      console.error(e);
    }
  }, [playerState.isReady, updateTrackInfo]);

  const handleNext = useCallback(() => {
    if (!ytPlayerRef.current || !playerState.isReady) return;
    try {
      ytPlayerRef.current.nextVideo();
      setPlayerState((prev) => ({ ...prev, statusText: 'NEXT TRACK' }));
      setTimeout(updateTrackInfo, 700);
    } catch (e) {
      console.error(e);
    }
  }, [playerState.isReady, updateTrackInfo]);

  const handleSeek = (seconds: number) => {
    if (!ytPlayerRef.current || !playerState.isReady) return;
    try {
      ytPlayerRef.current.seekTo(seconds, true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleMute = () => {
    if (!ytPlayerRef.current || !playerState.isReady) return;
    try {
      if (playerState.isMuted) {
        ytPlayerRef.current.unMute();
        setPlayerState((prev) => ({ ...prev, isMuted: false }));
      } else {
        ytPlayerRef.current.mute();
        setPlayerState((prev) => ({ ...prev, isMuted: true }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectPlaylist = (newPlaylistId: string) => {
    setPlayerState((prev) => ({
      ...prev,
      currentPlaylistId: newPlaylistId,
      trackName: 'Loading new playlist...',
      statusText: 'CONNECTING TO STATION...'
    }));
  };

  const handleTriggerFlash = useCallback(() => {
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 650);
  }, []);

  // Global Keybindings (Space for Play/Pause, N for Next, P for Prev, M for Mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key.toLowerCase() === 'n') {
        handleNext();
      } else if (e.key.toLowerCase() === 'p') {
        handlePrevious();
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, handleNext, handlePrevious]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#07100e] text-white">
      {/* Background Animated Scene */}
      <BusScene
        timeOfDay={timeOfDay}
        parallaxOffset={parallaxOffset}
        isFlashActive={isFlashActive}
      />

      {/* Header & Creator */}
      <Header
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        isMusicPlaying={playerState.isPlaying}
      />

      {/* Route Information Card */}
      <RoutePanel route={routeInfo} />

      {/* Driver Dashboard */}
      <DashboardPanel
        musicStatus={playerState.isPlaying ? 'PLAYING' : playerState.statusText}
        isEngineRunning={true}
        speed={playerState.isPlaying ? 65 : 0}
      />

      {/* Quote Box */}
      <QuoteBox />

      {/* Honk Button */}
      <HonkButton onTriggerFlash={handleTriggerFlash} />

      {/* Bottom Music Player */}
      <MusicPlayer
        playerState={playerState}
        onPlayPause={togglePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSeek={handleSeek}
        onToggleMute={handleToggleMute}
        onOpenPlaylistModal={() => setIsPlaylistModalOpen(true)}
      />

      {/* Playlist Selector Modal */}
      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        currentPlaylistId={playerState.currentPlaylistId}
        onSelectPlaylist={handleSelectPlaylist}
      />

      {/* Hidden YouTube IFrame API Player */}
      <YouTubePlayer
        playlistId={playerState.currentPlaylistId}
        onReady={handlePlayerReady}
        onStateChange={handlePlayerStateChange}
        onError={handlePlayerError}
      />
    </main>
  );
}
