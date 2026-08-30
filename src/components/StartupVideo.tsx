import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Play, Pause } from 'lucide-react';

interface StartupVideoProps {
  onComplete: () => void;
}

export const StartupVideo: React.FC<StartupVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioBlocked(false);
          })
          .catch((err) => {
            console.warn("Unmuted autoplay restricted by browser, playing muted:", err);
            video.muted = true;
            setIsMuted(true);
            setAudioBlocked(true);
            video.play().catch(console.error);
          });
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 1.0;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        setAudioBlocked(false);
      }
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

  const handleScreenClick = () => {
    if (videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      setIsMuted(false);
      setAudioBlocked(false);
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div 
      onClick={handleScreenClick}
      className="fixed inset-0 z-50 bg-black w-screen h-screen overflow-hidden select-none cursor-pointer"
    >
      {/* 100% True Fullscreen Video */}
      <video
        ref={videoRef}
        src="/su.mp4"
        autoPlay
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover fixed inset-0 z-0"
      />

      {/* Subtle Audio Alert if Autoplay Unmute was Blocked */}
      {audioBlocked && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500/90 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-lg animate-bounce flex items-center gap-2">
          <VolumeX className="h-4 w-4 shrink-0" />
          <span>Click anywhere to enable full sound!</span>
        </div>
      )}

      {/* Controls Overlay at Bottom Center */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6 py-3.5 flex items-center justify-between gap-4 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-full shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
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
            type="button"
            onClick={handlePlayPause}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-slate-300" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-400" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-lg hover:shadow-brand-500/30"
        >
          <span>Skip Intro</span>
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
