"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Helper for React-safe text splitting
const SplitText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block", opacity: 0 }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};

export default function Section02() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Layer 01 & 02: Atmosphere & Orbs
  const bgTextureRef = useRef<HTMLDivElement>(null);
  const orbRedRef = useRef<HTMLDivElement>(null);
  const orbGoldRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  
  // Layer 03: Food Image Sequence & Container
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
  const img4Ref = useRef<HTMLImageElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const brushStrokeRef = useRef<HTMLDivElement>(null);
  
  // Layer 04: Typography
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textMoreRef = useRef<HTMLDivElement>(null);
  const textThanRef = useRef<HTMLDivElement>(null);
  const textABowlRef = useRef<HTMLDivElement>(null);
  
  // Layer 05: Cuisines Parallax
  const cuisinesContainerRef = useRef<HTMLDivElement>(null);
  const cuisineChinese = useRef<HTMLSpanElement>(null);
  const cuisineKorean = useRef<HTMLSpanElement>(null);
  const cuisineJapanese = useRef<HTMLSpanElement>(null);
  const cuisineTibetan = useRef<HTMLSpanElement>(null);
  
  // Micro Typography
  const chapterMarkerRef = useRef<HTMLDivElement>(null);
  const vertTextRef = useRef<HTMLDivElement>(null);
  const bodyCopyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Safely grab the span children created by React
      const lettersMore = textMoreRef.current ? gsap.utils.toArray(textMoreRef.current.children) : [];
      const lettersThan = textThanRef.current ? gsap.utils.toArray(textThanRef.current.children) : [];
      const lettersABowl = textABowlRef.current ? gsap.utils.toArray(textABowlRef.current.children) : [];
      const allLetters = [...lettersMore, ...lettersThan, ...lettersABowl];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%", // Reduced from 350% so the user doesn't have to scroll as much
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0-100: CONTINUOUS ATMOSPHERE
      tl.fromTo(orbRedRef.current, { x: "-5vw", y: "0vh" }, { x: "10vw", y: "10vh", duration: 100, ease: "none" }, 0);
      tl.fromTo(orbGoldRef.current, { x: "5vw", y: "15vh" }, { x: "-10vw", y: "5vh", duration: 100, ease: "none" }, 0);
      tl.fromTo(steamRef.current, { y: 20, scale: 0.95, opacity: 0.015 }, { y: -100, scale: 1.05, opacity: 0.04, duration: 100, ease: "none" }, 0);
      tl.fromTo(vertTextRef.current, { y: 0 }, { y: -80, duration: 100, ease: "none" }, 0);
      tl.fromTo(chapterMarkerRef.current, { y: 0 }, { y: -40, duration: 100, ease: "none" }, 0);

      // 0-5: THE DISSOLVE
      tl.fromTo(bgTextureRef.current, { opacity: 0 }, { opacity: 1, duration: 5, ease: "power1.inOut" }, 0);

      // 5-25: THE GIANT EDITORIAL REVEAL
      lettersMore.forEach((letter: any, i) => {
        tl.fromTo(letter, { y: 60 + (i * 15), opacity: 0, rotation: -2 + i }, { y: 0, opacity: 1, rotation: 0, duration: 10, ease: "power3.out" }, 5 + (i * 1.5));
      });
      lettersThan.forEach((letter: any, i) => {
        tl.fromTo(letter, { x: -40 + (i * 10), opacity: 0 }, { x: 0, opacity: 1, duration: 10, ease: "power3.out" }, 9 + (i * 1.5));
      });
      lettersABowl.forEach((letter: any, i) => {
        tl.fromTo(letter, { y: -50, opacity: 0, rotation: 2 - (i * 0.5) }, { y: 0, opacity: 1, rotation: 0, duration: 10, ease: "power4.out" }, 12 + (i * 1.5));
      });

      // 30-45: LAYERED EXPANSION (Image Emerges)
      tl.fromTo(imageWrapperRef.current, { clipPath: "inset(35vh 30vw)", opacity: 0 }, { opacity: 1, duration: 5, ease: "power2.inOut" }, 30);
      tl.to(imageWrapperRef.current, { clipPath: "inset(22vh 20vw)", duration: 15, ease: "power1.inOut" }, 35);

      // Camera push
      tl.fromTo(cameraRef.current, { scale: 0.85, x: "-2%", y: "2%", filter: "brightness(0.75)" }, { scale: 1.02, x: "1%", y: "-1%", filter: "brightness(1)", duration: 50, ease: "none" }, 30);

      // 45-55: TYPOGRAPHY + IMAGE INTERACTION
      tl.to(lettersMore, { x: (i) => (i - 1) * 8, duration: 15, ease: "power2.inOut" }, 45);
      tl.to(lettersThan, { x: (i) => (i - 2) * 5, duration: 15, ease: "power2.inOut" }, 45);
      tl.to(lettersABowl, { x: (i) => (i - 3) * 6, duration: 15, ease: "power2.inOut" }, 45);

      // Asian brush stroke sweeps across
      tl.fromTo(brushStrokeRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 0.5, duration: 10, ease: "power3.inOut" }, 45);

      // 50-85: THE PARALLAX CUISINE TRACKER
      tl.fromTo(cuisinesContainerRef.current, { opacity: 0, x: "80vw" }, { opacity: 1, x: "-120vw", duration: 35, ease: "none" }, 50);
      tl.fromTo(cuisineChinese.current, { x: 0 }, { x: -80, duration: 35, ease: "none" }, 50);
      tl.fromTo(cuisineKorean.current, { x: 0 }, { x: 30, duration: 35, ease: "none" }, 50);
      tl.fromTo(cuisineJapanese.current, { x: 0 }, { x: -40, duration: 35, ease: "none" }, 50);
      tl.fromTo(cuisineTibetan.current, { x: 0 }, { x: 50, duration: 35, ease: "none" }, 50);

      // Cinematic Focus: Crossfades and Scale mapped precisely to cuisines
      // Highlight Chinese
      tl.to(cuisineChinese.current, { color: "#C41E2A", opacity: 1, scale: 1.05, duration: 3 }, 55); 
      
      // Swap to Korean
      tl.to(img1Ref.current, { opacity: 0, duration: 3 }, 60);
      tl.to(img2Ref.current, { opacity: 1, duration: 3 }, 60);
      tl.to(cuisineChinese.current, { color: "#9E9589", opacity: 0.4, scale: 1, duration: 3 }, 60); // Fade out Chinese
      tl.to(cuisineKorean.current, { color: "#8B1A1A", opacity: 1, scale: 1.05, duration: 3 }, 60);
      tl.to(orbRedRef.current, { backgroundColor: "#8B1A1A", duration: 3 }, 60);

      // Swap to Japanese
      tl.to(img2Ref.current, { opacity: 0, duration: 3 }, 70);
      tl.to(img3Ref.current, { opacity: 1, duration: 3 }, 70);
      tl.to(cuisineKorean.current, { color: "#9E9589", opacity: 0.4, scale: 1, duration: 3 }, 70); // Fade out Korean
      tl.to(cuisineJapanese.current, { color: "#F5F0EB", opacity: 1, scale: 1.05, duration: 3 }, 70);
      tl.to(orbRedRef.current, { backgroundColor: "#F5F0EB", duration: 3 }, 70);

      // Swap to Tibetan
      tl.to(img3Ref.current, { opacity: 0, duration: 3 }, 80);
      tl.to(img4Ref.current, { opacity: 1, duration: 3 }, 80);
      tl.to(cuisineJapanese.current, { color: "#9E9589", opacity: 0.4, scale: 1, duration: 3 }, 80); // Fade out Japanese
      tl.to(cuisineTibetan.current, { color: "#D4A853", opacity: 1, scale: 1.05, duration: 3 }, 80);
      tl.to(orbRedRef.current, { backgroundColor: "#D4A853", duration: 3 }, 80);

      tl.fromTo(bodyCopyRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 5, ease: "power2.out" }, 65);

      // 85-100: THE PUSH-IN EXIT
      tl.to(allLetters, { opacity: 0, duration: 5, ease: "power2.inOut" }, 85);
      tl.to(cuisinesContainerRef.current, { opacity: 0, duration: 5, ease: "power2.out" }, 85);
      tl.to(bodyCopyRef.current, { opacity: 0, duration: 5, ease: "power2.out" }, 85);
      tl.to(brushStrokeRef.current, { opacity: 0, duration: 5, ease: "power2.out" }, 85);

      tl.to(imageWrapperRef.current, { clipPath: "inset(0vh 0vw)", borderRadius: "0px", duration: 10, ease: "power2.inOut" }, 85);

      tl.to(cameraRef.current, { scale: 1.15, filter: "brightness(0.5)", duration: 10, ease: "power2.in" }, 90);
      tl.to(imageOverlayRef.current, { backgroundColor: "rgba(10,10,10,0.6)", duration: 10, ease: "none" }, 90);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative h-screen w-full bg-[#0A0A0A] overflow-hidden">
      
      {/* LAYER 01 & 02 */}
      <div ref={bgTextureRef} className="absolute inset-0 z-0 opacity-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#141414] to-[#0A0A0A]" />
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} 
        />
        <div ref={orbRedRef} className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,#C41E2A,transparent_60%)] opacity-[0.05] blur-3xl mix-blend-screen" />
        <div ref={orbGoldRef} className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,#D4A853,transparent_60%)] opacity-[0.04] blur-3xl mix-blend-screen" />
        <div ref={steamRef} className="absolute inset-0 flex justify-center items-center opacity-[0.02] blur-2xl mix-blend-screen">
          <div className="w-[40vw] h-[50vw] rounded-full bg-[#F5F0EB] absolute bottom-[-10%] left-[20%]" />
          <div className="w-[50vw] h-[40vw] rounded-full bg-[#C4A882] absolute top-[20%] right-[10%]" />
        </div>
      </div>

      {/* LAYER 03 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div ref={imageWrapperRef} className="relative w-full h-full overflow-hidden opacity-0 rounded-[8px]" style={{ clipPath: "inset(35vh 30vw)" }}>
          <div ref={cameraRef} className="relative w-full h-full scale-[0.86]">
            {/* Valid high-res Unsplash links */}
            <Image ref={img1Ref} src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop" alt="Chinese Wok" fill className="object-cover" priority />
            <Image ref={img2Ref} src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=2000&auto=format&fit=crop" alt="Korean BBQ" fill className="object-cover opacity-0" priority />
            <Image ref={img3Ref} src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2000&auto=format&fit=crop" alt="Japanese Ramen" fill className="object-cover opacity-0" priority />
            <Image ref={img4Ref} src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2000&auto=format&fit=crop" alt="Tibetan Momos" fill className="object-cover opacity-0" priority />
            <div ref={imageOverlayRef} className="absolute inset-0 bg-transparent" />
          </div>
        </div>
      </div>

      {/* LAYER 04 */}
      <div ref={textWrapperRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-[#F5F0EB] font-serif uppercase select-none mix-blend-overlay">
        <div className="w-full px-[5vw] flex flex-col leading-[0.80] tracking-tight opacity-90">
          <div ref={textMoreRef} className="text-[16vw] md:text-[14vw] self-start ml-[5vw]">
            <SplitText text="MORE" />
          </div>
          <div ref={textThanRef} className="text-[16vw] md:text-[14vw] self-center">
            <SplitText text="THAN" />
          </div>
          <div ref={textABowlRef} className="text-[16vw] md:text-[14vw] self-end mr-[5vw]">
            <SplitText text="A BOWL." />
          </div>
        </div>
      </div>

      {/* Brush Stroke */}
      <div className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none opacity-60">
        <div ref={brushStrokeRef} className="w-[60vw] h-[3px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 transform -rotate-3" />
      </div>

      {/* LAYER 05: Cinematic Cuisine Tracker */}
      <div className="absolute bottom-[10vh] left-0 w-full overflow-hidden z-30 pointer-events-none h-16 md:h-24 flex items-center">
        <div ref={cuisinesContainerRef} className="relative flex items-center justify-start gap-[12vw] w-max text-[4.5vw] md:text-[3vw] tracking-[0.6em] font-medium opacity-0 whitespace-nowrap text-[#9E9589] drop-shadow-xl pl-[5vw]">
          <span ref={cuisineChinese} className="inline-block opacity-40 transform origin-center">CHINESE</span>
          <span ref={cuisineKorean} className="inline-block opacity-40 transform origin-center">KOREAN</span>
          <span ref={cuisineJapanese} className="inline-block opacity-40 transform origin-center">JAPANESE</span>
          <span ref={cuisineTibetan} className="inline-block opacity-40 transform origin-center">TIBETAN</span>
        </div>
      </div>

      {/* Micro-typography */}
      <div className="absolute inset-0 z-40 pointer-events-none p-[5vw] flex justify-between items-start">
        <div ref={chapterMarkerRef}>
          <p className="text-[12px] md:text-[11px] text-[#C4A882] tracking-[0.3em] md:tracking-[0.4em] font-light uppercase">
            02 / THE PHILOSOPHY
          </p>
        </div>
        <div ref={vertTextRef} className="text-[12px] md:text-[11px] text-[#C4A882] tracking-[0.5em] md:tracking-[1em] font-light uppercase opacity-50 h-[30vh]" style={{ writingMode: 'vertical-rl' }}>
          ASIAN CUISINE
        </div>
      </div>

      {/* Editorial Copy */}
      <div className="absolute bottom-[5vw] right-[5vw] z-40 pointer-events-none">
        <div ref={bodyCopyRef} className="text-right max-w-[80vw] md:max-w-sm opacity-0">
          <p className="text-[#F5F0EB] font-sans font-light text-[14px] md:text-sm leading-relaxed tracking-wide opacity-90 drop-shadow-md">
            A celebration of Asian flavours,<br />crafted for memorable moments.
          </p>
          <p className="text-[#D4A853] text-[12px] md:text-[10px] tracking-widest mt-4 uppercase opacity-80">
            — King Chinese Bowl
          </p>
        </div>
      </div>
    </section>
  );
}
