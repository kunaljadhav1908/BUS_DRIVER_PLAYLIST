export interface PlaylistPreset {
  id: string;
  title: string;
  subtitle: string;
  playlistId: string;
  icon: string;
  description: string;
}

export type TimeOfDay = 'dawn' | 'sunset' | 'night';

export interface RouteDetails {
  number: string;
  destination: string;
  trip: string;
  status: string;
  passengers: number;
  distanceKm: number;
}

export interface PlayerState {
  isPlaying: boolean;
  isReady: boolean;
  trackName: string;
  statusText: string;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  currentPlaylistId: string;
}
