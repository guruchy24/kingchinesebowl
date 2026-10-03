"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const storyData = [
  {
    chapter: "01",
    title: "THE ORIGIN",
    text: "What started as a singular vision in the Tricity area quickly evolved into a culinary landmark. We united the rich traditions of Chinese, Tibetan, and Japanese street food under one roof, driven by a simple belief: Pan-Asian cuisine deserves to be experienced in its most authentic, fiery, and uncompromised form.",
  },
  {
    chapter: "02",
    title: "THE CRAFT",
    text: "Our journey is defined by the relentless pursuit of perfection. From the explosive heat of our woks to the delicate folds of our handcrafted dim sum, every element is meticulously curated. We honor age-old techniques passed down through generations of master chefs.",
  },
  {
    chapter: "03",
    title: "THE ALCHEMY",
    text: "We source only the finest regional spices, meats, and produce. By infusing modern gastronomy with traditional recipes, we elevate street food into an unforgettable dining experience, perfectly balancing sweet, sour, salty, and umami in every single bowl.",
  },
  {
    chapter: "04",
    title: "THE LEGACY",
    text: "Today, across Chandigarh, Mohali, and Zirakpur, King Chinese Bowl stands as a celebration of Asian culinary heritage. We believe that food is not merely sustenance, but a powerful medium of culture, connection, and craft.",
  },
];

const storyImages = [
  "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1600&auto=format&fit=crop", // Noodles
  "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=1600&auto=format&fit=crop", // Dumplings
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1600&auto=format&fit=crop", // Ingredients
  "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1600&auto=format&fit=crop", // Fire
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1600&auto=format&fit=crop", // Dark plating
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop", // Cinematic food
];

const IMAGE_DURATION = 6; // Image changes every 6 seconds

export default function Story({ media }: { media?: Record<string, Record<string, string>> }) {
  const [tick, setTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Extract all user-uploaded slots dynamically
  const mediaSlots = Object.values(media || {});
  
  // Extract lists of all uploaded desktop and mobile images, ignoring slot names
  const desktopUploads = mediaSlots.map(s => s.desktop).filter(Boolean) as string[];
  const mobileUploads = mediaSlots.map(s => s.mobile).filter(Boolean) as string[];
  
  const numUploaded = Math.max(desktopUploads.length, mobileUploads.length);
  
  const allUploaded = [];
  for (let i = 0; i < numUploaded; i++) {
    allUploaded.push({
      desktop: desktopUploads[i] || desktopUploads[0] || storyImages[0],
      mobile: mobileUploads[i] || desktopUploads[i] || desktopUploads[0] || storyImages[0],
    });
  }

  const dynamicStoryImages = [
    ...allUploaded,
    ...storyImages.slice(allUploaded.length).map(url => ({ desktop: url, mobile: url }))
  ];

  // Derive indices from the master tick to guarantee perfect sync
  const currentImgIdx = tick % dynamicStoryImages.length;
  const currentTextIdx = Math.floor(tick / 2) % storyData.length;

  // Master Clock
  useEffect(() => {
    if (isPaused) {
      tweenRef.current?.pause();
      return;
    }
    
    tweenRef.current?.play();

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, IMAGE_DURATION * 1000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Image Progress Bar animation
  useEffect(() => {
    if (progressRef.current) {
      tweenRef.current = gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: IMAGE_DURATION, ease: "none" }
      );
      
      if (isPaused) tweenRef.current.pause();
    }
    return () => {
      tweenRef.current?.kill();
    };
  }, [currentImgIdx, isPaused]);

  return (
    <section
      id="story"
      className="relative flex flex-col md:flex-row h-screen w-full bg-[#050403] overflow-hidden"
    >
      {/* ── LEFT COLUMN: STATIC HEADING + DYNAMIC CHAPTERS ── */}
      <div 
        className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-[5vw] md:px-[8vw] z-10 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* ── STATIC HEADING: OUR STORY ── */}
        <div className="mb-[4vh] md:mb-[6vh] z-20">
          <div className="flex items-center gap-4 md:gap-5 mb-2 md:mb-5 mt-[10vh] md:mt-0">
            <div className="w-[8vw] md:w-[4vw] h-[1px] bg-[#C41E2A]" />
            <span className="text-[10px] md:text-[1vw] tracking-[0.3em] md:tracking-[0.6em] text-[#C41E2A] uppercase font-light">The Heritage</span>
          </div>
          <h2 className="text-[12vw] md:text-[6.5vw] font-serif text-[#F5F0EB] leading-[0.9] tracking-tight drop-shadow-2xl">
            Our Story
          </h2>
        </div>

        {/* ── MASSIVE ANIMATED BACKGROUND CHAPTER NUMBER ── */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start overflow-hidden pointer-events-none z-0">
          {storyData.map((data, i) => (
            <div
              key={`bg-${data.chapter}`}
              className={`absolute font-serif text-[40vw] md:text-[35vw] leading-none select-none transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                i === currentTextIdx 
                  ? "opacity-[0.05] translate-y-0 scale-100" 
                  : i < currentTextIdx 
                    ? "opacity-0 -translate-y-20 scale-95" 
                    : "opacity-0 translate-y-20 scale-105"
              }`}
              style={{ color: "#E5E0D8", left: "5vw", top: "25vh" }}
            >
              {data.chapter}
            </div>
          ))}
        </div>

        {/* ── FOREGROUND TEXT CONTAINER ── */}
        <div className="relative z-10 min-h-[30vh] md:min-h-[35vh]">
          {storyData.map((data, i) => (
            <div
              key={`text-${data.chapter}`}
              className={`absolute inset-x-0 top-0 transition-all duration-[1000ms] ease-in-out ${
                i === currentTextIdx ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 mb-[2vh] md:mb-[4vh]">
                <div className="text-[12px] md:text-[1.2vw] font-serif text-[#C41E2A] italic">
                  Chapter {data.chapter}
                </div>
                <div className="hidden md:block w-[3vw] h-[1px] bg-[#C41E2A]/50" />
                <h3 className="text-[10px] md:text-[1.2vw] tracking-[0.3em] md:tracking-[0.4em] text-[#C4A882] uppercase font-light">
                  {data.title}
                </h3>
              </div>
              
              <p className="text-xs md:text-[1.3vw] leading-[1.8] md:leading-[2] text-[#E5E0D8] font-light text-left md:text-justify drop-shadow-2xl md:pr-[2vw]">
                {data.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── CHAPTER DOTS (Clickable) ── */}
        <div className="absolute bottom-[2vh] md:bottom-[8vh] left-[5vw] md:left-[8vw] flex items-center gap-3 md:gap-5 z-20">
          {storyData.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setTick(i * 2);
                setIsPaused(false);
              }}
              className="py-4 cursor-pointer group flex items-center"
            >
              <div
                className={`h-[1.5px] transition-all duration-700 ${
                  i === currentTextIdx 
                    ? "w-[8vw] md:w-[4vw] bg-[#C41E2A]" 
                    : "w-[4vw] md:w-[1.5vw] bg-white/40 md:bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </div>
          ))}
          
          <div className={`ml-4 text-[10px] md:text-[0.75vw] tracking-[0.1em] md:tracking-widest uppercase transition-opacity duration-500 ${isPaused ? "opacity-60 md:opacity-40 text-[#C4A882]" : "opacity-0"}`}>
            Paused
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: FULL-BLEED GALLERY ── */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative z-0 overflow-hidden">
        
        <div className="w-full h-full relative">
          {dynamicStoryImages.map((src, i) => (
            <div
              key={src.desktop + i} // Use index too just in case of duplicate URLs
              className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
                i === currentImgIdx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
              }`}
            >
              <div className="hidden md:block absolute inset-0">
                <Image
                  src={src.desktop}
                  alt={`Story visual ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              <div className="block md:hidden absolute inset-0">
                <Image
                  src={src.mobile}
                  alt={`Story visual ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              {/* Very light shadow only on mobile so text on top (if it overlaps) is somewhat readable, but totally clean on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden pointer-events-none" />
            </div>
          ))}
        </div>

        {/* ── ART GALLERY PROGRESS BAR ── */}
        <div className="absolute bottom-[2vh] md:bottom-[8vh] right-[5vw] z-40 flex items-center gap-4 md:gap-6">
          <div className="hidden md:block w-[12vw] h-[1px] bg-white/30 relative overflow-hidden">
            <div ref={progressRef} className="absolute inset-y-0 left-0 bg-[#F5F0EB] origin-left" />
          </div>
          <div className="text-[#F5F0EB] font-serif text-sm md:text-[1vw] tracking-widest drop-shadow-lg">
            0{currentImgIdx + 1} <span className="opacity-50">/ 0{dynamicStoryImages.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
