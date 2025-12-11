import Image from "next/image";
import Home from "./client";
import { reasons } from "./reasons";

export default function ServerCompo() {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10 overflow-y-auto pr-2 bg-white">
      {reasons.map((reason, index) => (
        <div
          key={index}
          className="max-w-4xl group bg-white/80 backdrop-blur-xl border border-pink-200 rounded-3xl p-5 shadow-xl hover:shadow-pink-300/50 transition duration-500"
        >
          <p className="text-xs text-pink-500 font-semibold mb-3 text-center tracking-widest">
            📅 {reason.date}
          </p>

          {reason.content.map((block, i) => {
            switch (block.type) {
              case "image":
                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl mb-6 animate-fadeIn"
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      width={800}
                      height={600}
                      className="rounded-2xl object-cover hover:scale-110 transition duration-700"
                    />
                  </div>
                );

              case "text":
                return (
                  <p
                    key={i}
                    className="text-gray-700 font-semibold text-lg leading-relaxed mb-3 animate-typewriter"
                  >
                    {block.value}
                  </p>
                );

              case "memory":
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-pink-100 to-rose-200 border border-pink-300 p-5 rounded-2xl shadow-lg my-6 animate-fadeIn"
                  >
                    <h3 className="text-pink-700 font-bold text-lg mb-2 text-center">
                      {block.date}
                    </h3>
                    <p className="text-gray-700 text-center italic text-sm">
                      {block.love}
                    </p>
                  </div>
                );

              case "poem":
                return (
                  <div
                    key={i}
                    className="bg-pink-50 border-l-4 border-pink-400 p-4 my-6 rounded-xl shadow-inner italic space-y-2 animate-fadeIn"
                  >
                    {block.lines.map((line, idx) => (
                      <p key={idx} className="text-pink-700 text-center">
                        {line}
                      </p>
                    ))}
                  </div>
                );

              case "start":
                return (
                  <div
                    key={i}
                    className="relative bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 
                 border border-pink-300 rounded-3xl p-6 mb-8 shadow-2xl 
                 animate-fadeIn text-center overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-10 text-[120px] flex justify-center items-center select-none">
                      ❤️
                    </div>

                    <p className="relative text-sm text-pink-700 italic">
                      {block.begin}
                    </p>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      ))}

      <Home />
    </div>
  );
}
