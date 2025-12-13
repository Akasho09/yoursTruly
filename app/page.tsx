import Image from "next/image";
import { reasons } from "./reasons";
import AudioPlayer from "./AudioPlayer";
import Home from "./client";

export default function ServerCompo() {
  return (
    <div className="w-full flex flex-col items-center pb-16 bg-black text-neutral-200">
      
      {reasons.map((reason, index) => (
        <div
          key={index}
          className="
            w-full max-w-3xl 
            flex flex-col 
            space-y-6 
            px-4 py-8 
            border-b border-neutral-800
          "
        >
          {/* Date */}
          <p className="text-xs font-bold hover:font-extrabold uppercase tracking-widest text-neutral-500 hover:text-white text-center">
            <span className="border px-6 p-2 rounded-xl">{reason.date}</span>
          </p>

          {/* Content Blocks */}
          {reason.content.map((block, i) => {
            switch (block.type) {

              /* IMAGE - clean, grayscale, no effects */
              case "image":
                return (
                  <Image
                    key={i}
                    src={block.src}
                    alt={block.alt}
                    width={900}
                    height={700}
                    className="w-full rounded-lg grayscale hover:grayscale-0 object-cover"
                  />
                );

              /* TEXT - quiet, neutral */
              case "text":
                return (
                  <p
                    key={i}
                    className=" font-bold text-neutral-300 text-base leading-relaxed"
                  >
                    {block.value}
                  </p>
                );

              /* MEMORY BLOCK - minimal box */
              case "memory":
                return (
                  <div
                    key={i}
                    className="p-4 bg-neutral-900/40 rounded-lg border"
                  >
                    <h3 className="text-neutral-300 text-sm font-semibold mb-1">
                      {block.date}
                    </h3>
                    <p className="text-neutral-500 italic text-sm">
                      {block.love}
                    </p>
                  </div>
                );

              /* POEM BLOCK - pure center aligned text */
              case "poem":
                return (
                  <div key={i} className="space-y-1 text-center border-l text-neutral-400 hover:text-pink-400 ">
                    {block.lines.map((line, idx) => (
                      <p
                        key={idx}
                        className="text-sm"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );

              /* START BLOCK - simplest possible */
              case "start":
                return (
                  <p
                    key={i}
                    className="text-neutral-400 text-center italic text-sm border-x"
                  >
                    {block.begin}
                  </p>
                );

              /* AUDIO */
              case "audio":
                return (
                  <div key={i} className="pt-2">
                    <AudioPlayer src={block.src} cover={block.cover}/>
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
