import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Play } from 'lucide-react';

interface StartupVideoProps {
  onComplete: () => void;
}

export const StartupVideo: React.FC<StartupVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks unmuted autoplay, play muted automatically
          video.muted = true;
          setIsMuted(true);
          video.play().catch(console.error);
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center px-4">
        <video
          ref={videoRef}
          src="/su.mp4"
          autoPlay
          playsInline
          onEnded={onComplete}
          className="w-full h-full object-contain rounded-xl shadow-2xl"
        />
      </div>

      {/* Control Bar Below Video */}
      <div className="w-full max-w-xl px-6 py-4 flex items-center justify-between gap-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-full mb-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-4 w-4 text-amber-400" />
                <span>Unmute Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 text-emerald-400" />
                <span>Mute Audio</span>
              </>
            )}
          </button>

          <button
            onClick={handlePlayPause}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-brand-500/20"
        >
          <span>Skip Intro</span>
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
