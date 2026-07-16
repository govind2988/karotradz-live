import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.07); // Reduced volume by 50% of current to 0.07
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // 1. Try to play immediately on mount
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log('Autoplay on mount blocked, waiting for interaction...', err);
      });

    // 2. Play automatically on first human interaction as a fallback
    const handleFirstInteraction = () => {
      if (audioRef.current && !audioRef.current.paused) {
        // Already playing
        return;
      }
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Autoplay on interaction failed:', err);
          });
      }
      // Remove listeners after first attempt
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch((err) => {
          console.error('Audio play failed:', err);
        });
    }
  };

  return (
    <div id="brand-music-controller" className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="hidden sm:flex items-center gap-2 bg-editorial-dark text-brand-beige px-3 py-1.5 text-xs font-sans tracking-wide uppercase border border-editorial-dark/10 shadow-lg"
          >
            <Music className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>Enable background music</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center">
        <button
          onClick={togglePlay}
          id="bg-music-toggle"
          className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 shadow-md flex items-center justify-center ${
            isPlaying 
              ? 'bg-brand-orange/15 border-brand-orange/30 text-brand-orange hover:bg-brand-orange/25' 
              : 'bg-white/40 border-gray-200/50 text-gray-600 hover:bg-white/60 hover:text-gray-800'
          }`}
          title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
