"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export default function AudioPlayer({
  src,
  cover,
}: {
  src: string;
  cover?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.9);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    let current = 0;

    const i = setInterval(() => {
      current += 0.05;
      if (current >= volume) {
        audio.volume = volume;
        clearInterval(i);
      } else audio.volume = current;
    }, 80);
  };

  const fadeOut = (cb: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    let current = audio.volume;

    const i = setInterval(() => {
      current -= 0.05;
      if (current <= 0) {
        audio.volume = 0;
        clearInterval(i);
        cb();
      } else audio.volume = current;
    }, 80);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeOut(() => {
        audio.pause();
        setIsPlaying(false);
      });
    } else {
      audio.play();
      setIsPlaying(true);
      fadeIn();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div className="w-full flex justify-center mt-6">
      <div
        className="
          w-full max-w-md p-5 rounded-3xl border border-pink-300 
          bg-white/50 backdrop-blur-2xl shadow-2xl 
          flex flex-col space-y-4
        "
      >
        <div className="flex items-center space-x-4">
          <div
            className={`
              w-20 h-20 rounded-full overflow-hidden 
              border-4 border-pink-300 shadow-lg
              ${isPlaying ? "animate-spin-slow" : ""}
            `}
          >
            <img src={cover} className="w-full h-full object-cover" />
          </div>

          <button
            onClick={togglePlay}
            className={`
              w-14 h-14 flex items-center justify-center rounded-full
              shadow-lg transition duration-300
              bg-gradient-to-br from-pink-300 to-rose-400
              hover:scale-110 active:scale-95
              ${isPlaying ? "animate-pulse-glow" : ""}
            `}
          >
            {isPlaying ? (
              <Pause className="text-white" size={30} />
            ) : (
              <Play className="text-white" size={30} />
            )}
          </button>
        </div>

        <div className="w-full">
          <div className="h-2 w-full bg-pink-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="
                h-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400
                transition-all duration-150
              "
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className="text-pink-600" size={22} />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-pink-400 cursor-pointer"
          />
        </div>

        <audio ref={audioRef} src={src} preload="metadata" />
      </div>
    </div>
  );
}
