// reasons.ts

// 1️⃣ Define the block types
export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

export type TextBlock = {
  type: "text";
  value: string;
};

export type MemoryBlock = {
  type: "memory";
  date: string;
  love: string;
};

export type PoemBlock = {
  type: "poem";
  lines: string[];
};

export type StartBlock = {
  type: "start";
  begin: string;
};

export type AudioBlock = {
  type: "audio";
  src: string;           // /audio/song.mp3
  filetype?: string;     // optional
  cover? : string
};


// 2️⃣ Union type for all blocks
export type ContentBlock =
  | ImageBlock
  | TextBlock
  | MemoryBlock
  | PoemBlock
  | StartBlock
  | AudioBlock

// 3️⃣ Reason type
export type Reason = {
  date: string;
  content: ContentBlock[];
};

// 4️⃣ Your data, now typed
export const reasons: Reason[] = [
  {
    date: "2024-12-07",
    content: [
      { type: "image", src: "/rv1.jpeg", alt: "Us" },
      {
        type: "start",
        begin: "I never told you na how much I love RVs… well, I don’t even know myself.",
      },
      {
        type: "memory",
        date: "17 June 2025",
        love: "Remember what u told me once , it still stands . Forever.",
      },
      {
        type: "poem",
        lines: ["There you shine", "Here I light", "Not you then who?"],
      },
    ],
  },
  {
    date: "2024-12-08",
    content: [
      { type: "image", src: "/rv2.jpeg", alt: "You" },
      { type: "start", begin: "LIKE I [SAID U OR NONE]" },
      { type: "image", src: "/image.png", alt: "Memory" },
    ],
  },
  {
    date: "2024-12-10",
    content: [
      { type: "text", value: "Feels Good Today !" },
      { type: "image", src: "/akash.png", alt: "You" },
      {
        type: "poem",
        lines: [
          "oh i love u being precious",
          "i love to earn you.",
          "This is what its i guess.",
        ],
      },
    ],
  },
  {
    date: "2024-12-11",
    content: [
      { type: "text", value: "N then there is this one photo of yours." },
      { type: "image", src: "/things.png", alt: "You" },
      {
        type: "poem",
        lines: [
          "U r 24 hours with me but at 4am im also with u. "
        ]
      },
    ],
  },
  {
    date: "2024-12-12",
    content: [
      { type: "image", src: "/hand.png", alt: "You" },
      {
        type : "poem" ,
        lines : [
          "Akha kara band",
          "Te sundi awaz" ,
          "Gal meri man thorha kar le lihaz",
          "Je Aan kite cherhe mere dil vale saaz"
        ]
      },
      { type: "image", src: "/hkirat.jpeg", alt: "You" },
      {
        type: "audio",
        src: "/audio/kirat.mp3",
        cover : "akash.png"
      },
    ],
  },
  
];
