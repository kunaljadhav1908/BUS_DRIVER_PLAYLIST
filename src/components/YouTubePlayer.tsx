import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface YouTubePlayerProps {
  playlistId: string;
  onReady: (player: any) => void;
  onStateChange: (event: any) => void;
  onError: (event: any) => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  playlistId,
  onReady,
  onStateChange,
  onError
}) => {
  const playerRef = useRef<any>(null);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('Destroying previous player:', e);
        }
      }

      playerRef.current = new window.YT.Player('youtube-player-element', {
        width: '200',
        height: '200',
        playerVars: {
          origin: window.location.origin,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          rel: 0,
          listType: 'playlist',
          list: playlistId,
          loop: 1
        },
        events: {
          onReady: (event: any) => {
            if (isMountedRef.current) {
              onReady(event.target);
            }
          },
          onStateChange: (event: any) => {
            if (isMountedRef.current) {
              onStateChange(event);
            }
          },
          onError: (event: any) => {
            if (isMountedRef.current) {
              onError(event);
            }
          }
        }
      });
    };

    // Load YouTube IFrame API if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [playlistId]);

  return (
    <div className="fixed -left-[250px] -top-[250px] w-[200px] h-[200px] opacity-[0.01] pointer-events-none overflow-hidden z-[-1]">
      <div id="youtube-player-element" />
    </div>
  );
};
