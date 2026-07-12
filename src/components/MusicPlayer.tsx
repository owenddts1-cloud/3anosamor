import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MusicPlayerProps {
  trackUrl: string;
}

export default function MusicPlayer({ trackUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lazy initialisation of the audio object to avoid server-side crashes or load delays
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Handle standard browser blockages of autoplay
    const autoPlayAttempt = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          console.log("Autoplay blocked. Waiting for user interaction.");
        });
    };

    // Attempt auto-play on first scroll or click
    window.addEventListener('click', autoPlayAttempt, { once: true });
    window.addEventListener('scroll', autoPlayAttempt, { once: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener('click', autoPlayAttempt);
      window.removeEventListener('scroll', autoPlayAttempt);
    };
  }, [trackUrl]);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.log("Audio play error", e));
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audioRef.current.muted = newMuteState;
  };

  // Handle volume change
  const handleVolumeChange = (newVol: number) => {
    if (!audioRef.current) return;
    setVolume(newVol);
    audioRef.current.volume = newVol;
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  return (
    <div
      id="music-player-capsule"
      className="fixed bottom-6 left-6 z-[90]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex items-center gap-3 backdrop-blur-xl bg-white/95 border border-stone-200 px-4 py-3 rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {/* Play/Pause Main Trigger */}
        <button
          onClick={togglePlay}
          id="music-play-btn"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#C49A6C] hover:bg-[#B3895B] text-white transition-all cursor-pointer shadow-md active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 translate-x-[1px] fill-current" />}
        </button>

        {/* Visualizer bars */}
        <div className="flex items-end gap-[3px] h-4 w-6 px-1">
          {[1, 2, 3, 4].map((bar) => (
            <motion.div
              key={bar}
              className="w-[3px] bg-[#C49A6C] rounded-full"
              initial={{ height: 4 }}
              animate={
                isPlaying
                  ? {
                      height: [4, bar * 4, 3, bar * 3, 4],
                    }
                  : { height: 4 }
              }
              transition={{
                duration: 1 + bar * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Mute toggle button */}
        <button
          onClick={toggleMute}
          id="music-mute-btn"
          className="text-stone-400 hover:text-[#C49A6C] transition-colors cursor-pointer"
        >
          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Hover/active volume slider slider bar */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="flex items-center w-16"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#C49A6C]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Track tag */}
        <div className="hidden sm:flex flex-col text-[10px] select-none text-stone-400 pr-1 leading-none font-mono">
          <span className="text-[#C49A6C] font-semibold">TRILHA AMBIENTE</span>
          <span className="mt-[2px] opacity-70 truncate max-w-[120px]">Iris - Goo Goo Dolls</span>
        </div>
      </motion.div>
    </div>
  );
}
