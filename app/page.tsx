import Image from "next/image";
import { reasons } from "./reasons";
import AudioPlayer from "./AudioPlayer";
import Home from "./client";

export default function ServerCompo() {
  return (
    <div
      className="
        relative 
        flex flex-col items-center 
        w-full space-y-16 
        py-20 
        bg-gradient-to-br from-pink-50 via-rose-100 to-rose-200
        animate-fadeUpMagic
        overflow-x-hidden
      "
    >
      {/* Background Twinkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${8 + Math.random() * 10}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ✦
        </div>
      ))}

      {/* Vignette overlay */}
      <div className="vignette"></div>

      {reasons.map((reason, index) => (
        <div
          key={index}
          className="
            max-w-4xl w-full 
            relative
            bg-white/70 backdrop-blur-xl
            border border-pink-200 
            rounded-3xl 
            p-10 
            shadow-xl 
            hover:shadow-rose-300/60
            transition-all duration-500
            hover:-translate-y-1
            animate-fadeUpMagic
          "
        >
          {/* Decorative floating hearts per card */}
          {Array.from({ length: 4 }).map((_, h) => (
            <div
              key={h}
              className="floating-heart opacity-70"
              style={{
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random()}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              💕
            </div>
          ))}

          {/* Date */}
          <p className="text-xs text-pink-600 font-bold mb-6 text-center tracking-[0.3em] uppercase">
            📅 {reason.date}
          </p>

          {/* Content Blocks */}
          {reason.content.map((block, i) => {
            switch (block.type) {
              case "image":
                return (
                  <div
                    key={i}
                    className="
                      overflow-hidden rounded-3xl 
                      shadow-xl border border-rose-200 
                      mb-10 animate-fadeUpMagic
                    "
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      width={900}
                      height={700}
                      className="rounded-3xl object-cover image-hover"
                    />
                  </div>
                );

              case "text":
                return (
                  <p
                    key={i}
                    className="
                      text-gray-700 font-semibold text-lg leading-relaxed 
                      mb-4 px-3 animate-fadeUpMagic
                    "
                  >
                    {block.value}
                  </p>
                );

              case "memory":
                return (
                  <div
                    key={i}
                    className="
                      bg-gradient-to-br from-pink-100 to-rose-200 
                      border border-pink-300 
                      p-6 rounded-3xl shadow-xl 
                      text-center my-8 animate-fadeUpMagic
                    "
                  >
                    <h3 className="text-pink-700 font-bold text-xl mb-2">
                      {block.date}
                    </h3>
                    <p className="text-gray-700 italic text-md">
                      {block.love}
                    </p>
                  </div>
                );

              case "poem":
                return (
                  <div
                    key={i}
                    className="
                      bg-white/60 border border-pink-300 
                      p-6 rounded-2xl shadow-inner 
                      italic animate-fadeUpMagic
                      my-8 space-y-1
                    "
                  >
                    {block.lines.map((line, idx) => (
                      <p
                        key={idx}
                        className="
                          poem-shimmer text-center 
                          font-medium tracking-wide 
                        "
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );

              case "start":
                return (
                  <div
                    key={i}
                    className="
                      relative 
                      bg-gradient-to-br from-pink-200 via-rose-200 to-red-200
                      border border-pink-300 
                      rounded-3xl 
                      p-7 shadow-xl 
                      text-center animate-fadeUpMagic 
                      overflow-hidden mb-10
                    "
                  >
                    <div className="absolute inset-0 opacity-10 text-[140px] flex justify-center items-center">
                      ❤️
                    </div>

                    <p className="relative text-pink-800 font-semibold italic">
                      {block.begin}
                    </p>
                  </div>
                );

              case "audio":
                return (
                  <div key={i} className="my-12 animate-fadeUpMagic">
                    <AudioPlayer src={block.src} cover={block.cover} />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      ))}

      <Home></Home>
    </div>
  );
}
