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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
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
          w-full max-w-md 
          p-4 
          flex flex-col space-y-4
          bg-neutral-900 
          rounded-xl
          text-neutral-300
        "
      >
        <div className="flex items-center space-x-4">
          {/* Cover circle (minimal, grayscale) */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800">
            {cover && (
              <img
                src={cover}
                className="w-full h-full object-cover grayscale"
              />
            )}
          </div>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="
              w-12 h-12 
              rounded-full 
              bg-neutral-700 
              flex items-center justify-center
              text-white
            "
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="h-1 w-full bg-neutral-700 rounded-full">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-3">
          <Volume2 className="text-neutral-400" size={18} />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="
              w-full
              cursor-pointer 
              accent-white
            "
          />
        </div>

        <audio ref={audioRef} src={src} preload="metadata" />
      </div>
    </div>
  );
}
