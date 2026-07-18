import { motion } from 'framer-motion';
import { Music, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Paste the YouTube video ID of your background song here.
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ the ID is "dQw4w9WgXcQ"
const YOUTUBE_VIDEO_ID = '-z3YH-R-QiM';
const START_VOLUME = 40; // 0–100

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (v: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        el: HTMLElement | string,
        options: Record<string, unknown>
      ) => YTPlayer;
      PlayerState: { ENDED: number };
    };
  }
}

let apiLoading: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoading) return apiLoading;

  apiLoading = new Promise<void>((resolve) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    document.head.appendChild(tag);
  });

  return apiLoading;
}

export function MusicToggle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      playerRef.current?.pauseVideo?.();
    };
  }, []);

  const toggle = async () => {
    if (!YOUTUBE_VIDEO_ID) return;

    if (playerRef.current) {
      if (playing) {
        playerRef.current.pauseVideo();
        setPlaying(false);
      } else {
        playerRef.current.playVideo();
        setPlaying(true);
      }
      return;
    }

    setLoading(true);
    await loadYouTubeApi();

    if (!containerRef.current || !window.YT) {
      setLoading(false);
      return;
    }

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: (event: { target: YTPlayer }) => {
          event.target.setVolume(START_VOLUME);
          event.target.playVideo();
          setPlaying(true);
          setLoading(false);
        },
        onStateChange: (event: { data: number; target: YTPlayer }) => {
          if (event.data === window.YT?.PlayerState.ENDED) {
            event.target.seekTo(0, true);
            event.target.playVideo();
          }
        },
      },
    });
  };

  if (!YOUTUBE_VIDEO_ID) return null;

  return (
    <>
      <div className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
        <div ref={containerRef} />
      </div>

      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        data-cursor
        className="fixed bottom-5 left-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/60 text-[#d4af37] backdrop-blur-xl transition-colors hover:border-[#d4af37]/60 sm:bottom-7 sm:left-7"
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : playing ? (
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((bar) => (
              <motion.span
                key={bar}
                className="w-[3px] rounded-full bg-[#d4af37]"
                animate={{ height: [4, 16, 7, 14, 5] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: bar * 0.12,
                }}
              />
            ))}
          </span>
        ) : (
          <Music size={20} />
        )}
        <span className="sr-only">{playing ? 'Pause' : 'Play'} music</span>
      </motion.button>
    </>
  );
}
