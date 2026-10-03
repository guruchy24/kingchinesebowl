"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: "CHINESE", subtitle: "Wok-Tossed Perfection", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1600&auto=format&fit=crop" },
  { name: "JAPANESE", subtitle: "Precision & Elegance", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1600&auto=format&fit=crop" },
  { name: "KOREAN", subtitle: "Fire & Fermentation", image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=1600&auto=format&fit=crop" },
  { name: "TIBETAN", subtitle: "Himalayan Soul Food", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1600&auto=format&fit=crop" }
];

export default function Section03() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Scene 1 & 2 refs
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Scene 3 refs
  const handoffSceneRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  // Scene 4 (Horizontal Showcase) refs
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force recalculation of layouts after mounting
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Reduced from 500% so it requires much less scrolling
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // ══════════════════════════════════════════════════
      // SCENE 1 & 2: FIRE VIDEO + TEXT OVERLAY (Sped up)
      // ══════════════════════════════════════════════════
      tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 3, ease: "power2.out" }, 0);
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 4, ease: "power2.out" }, 0);
      tl.fromTo(charRef.current, { opacity: 0, scale: 1.8, filter: "blur(12px)", letterSpacing: "0.3em" }, { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.08em", duration: 5, ease: "power3.out" }, 0);
      
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 3, ease: "power2.inOut" }, 2);
      tl.fromTo(engRef.current, { opacity: 0, y: 30, letterSpacing: "0.8em" }, { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 4, ease: "power3.out" }, 3);
      tl.fromTo(subRef.current, { opacity: 0, y: 15 }, { opacity: 0.4, y: 0, duration: 3, ease: "power2.out" }, 5);

      // Text fades out faster
      tl.to(textRef.current, { opacity: 0, scale: 0.95, duration: 4, ease: "power2.in" }, 10);
      // Video fades out right after
      tl.to(videoRef.current, { opacity: 0, duration: 4, ease: "power2.in" }, 14);

      // ══════════════════════════════════════════════════
      // SCENE 3: THE KING'S TABLE 
      // ══════════════════════════════════════════════════
      // Starts much earlier now!
      tl.fromTo(handoffSceneRef.current, { opacity: 0 }, { opacity: 1, duration: 5 }, 16);
      tl.fromTo(plateRef.current, { scale: 1.3, rotation: -15, filter: "brightness(2) blur(10px)" }, { scale: 1, rotation: 0, filter: "brightness(1) blur(0px)", duration: 10, ease: "power3.out" }, 16);

      if (rightTextRef.current) {
        tl.fromTo(rightTextRef.current.children, { opacity: 0, x: 40, filter: "blur(4px)" }, { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.2, duration: 6, ease: "power2.out" }, 18);
      }

      // Plate slowly zooms while user reads, starts immediately
      tl.to(plateRef.current, { scale: 1.05, rotation: 2, duration: 15, ease: "none" }, 16);

      // ══════════════════════════════════════════════════
      // SCENE 4: HORIZONTAL MENU SLIDE (Wipe from right!)
      // ══════════════════════════════════════════════════
      const containerWidth = CATEGORIES.length * 100; // 400vw
      tl.to(horizontalContainerRef.current, {
        x: `-${containerWidth - 100}vw`,
        ease: "none",
        duration: 40 
      }, 26); // Starts EXACTLY at 26, right after The King's Table finishes settling!

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="kitchen" className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]" style={{ zIndex: 50 }}>

      {/* ── SCENE 1 & 2: FIRE VIDEO BACKGROUND ── */}
      <div ref={videoRef} className="absolute inset-0 opacity-0 bg-[#0A0A0A] overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 pointer-events-none">
          <source src="/videos/kitchenfire.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* ── SCENE 1 & 2: TEXT OVERLAY ── */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
        <div ref={glowRef} className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-0" style={{ background: "radial-gradient(circle, rgba(196,30,42,0.06) 0%, transparent 70%)" }} />
        <div ref={charRef} className="text-[20vw] md:text-[9vw] font-serif leading-none text-[#F5F0EB] drop-shadow-[0_0_60px_rgba(196,30,42,0.15)]">从火开始</div>
        <div ref={lineRef} className="w-[16vw] md:w-[8vw] h-[2px] bg-[#C41E2A] my-[3vh] origin-center" />
        <div ref={engRef} className="text-[5vw] md:text-[2vw] font-light text-[#C4A882] uppercase">It Begins With Fire</div>
        <div ref={subRef} className="text-[12px] md:text-[1vw] tracking-[0.2em] md:tracking-[1em] font-light text-[#F5F0EB]/0 mt-[2.5vh] uppercase text-center">Enter The Kitchen</div>
      </div>

      {/* ── SCENE 3: EDITORIAL OVERLAP HANDOFF ── */}
      <div ref={handoffSceneRef} className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-end px-[5vw] md:px-[8vw] opacity-0 bg-[#0A0A0A] overflow-hidden" style={{ zIndex: 30 }}>
        {/* Plate Image */}
        <div className="absolute left-[-50vw] md:left-[-15vw] top-1/4 md:top-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] rounded-full overflow-hidden shadow-[0_0_150px_rgba(196,30,42,0.15)] pointer-events-none">
          <div ref={plateRef} className="w-full h-full relative">
            <Image src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop" alt="Premium plated dish" fill className="object-cover" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(10,10,10,1)] pointer-events-none" />
          </div>
        </div>
        {/* Text Details */}
        <div ref={rightTextRef} className="flex flex-col items-start w-full md:w-[45vw] z-40 pointer-events-auto mt-[40vh] md:mt-0 px-[5vw] md:px-0">
          <div className="flex items-center gap-4 md:gap-6 mb-[3vh] md:mb-[4vh]">
            <div className="w-[8vw] md:w-[4vw] h-[1px] bg-[#C41E2A]" />
            <div className="text-[12px] md:text-[0.85vw] tracking-[0.3em] md:tracking-[0.8em] text-[#C41E2A] uppercase font-light whitespace-nowrap">Chapter III</div>
          </div>
          <h2 className="text-[18vw] md:text-[8.5vw] font-serif tracking-tighter text-[#F5F0EB] leading-[0.9] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            The <span className="italic text-[#D4A853] pr-2 md:pr-4">King's</span><br />Table
          </h2>
          <div className="mt-[4vh] md:mt-[5vh] flex items-center gap-4 md:gap-6 group cursor-pointer">
            <p className="text-[12px] md:text-[1vw] text-[#C4A882] font-light tracking-[0.2em] md:tracking-[0.4em] uppercase group-hover:text-[#F5F0EB] transition-colors duration-500">Explore the Menu</p>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 md:w-12 h-[1px] bg-[#D4A853]/50 transition-all duration-700 ease-out group-hover:w-16 md:group-hover:w-24 group-hover:bg-[#D4A853]" />
              <div className="text-[#D4A853] transition-transform duration-500 ease-out group-hover:translate-x-3 font-light text-lg md:text-xl">→</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCENE 4: HORIZONTAL SHOWCASE (Wipes from right) ── */}
      <div 
        ref={horizontalContainerRef}
        className="absolute top-0 left-[100vw] flex h-screen shadow-[-30px_0_60px_rgba(0,0,0,0.9)] bg-[#0A0A0A]"
        style={{ width: `${CATEGORIES.length * 100}vw`, zIndex: 60 }}
      >
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.name} className="flex h-screen items-center justify-center shrink-0 w-screen relative bg-[#0A0A0A]">
            <Image src={cat.image} alt={cat.name} fill className="object-cover opacity-50" sizes="100vw" quality={90} priority={idx === 0} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-[1px] bg-[#D4A853]" />
                <span className="text-[#D4A853] tracking-[0.4em] text-xs md:text-sm uppercase">Chapter IV</span>
                <div className="w-8 md:w-12 h-[1px] bg-[#D4A853]" />
              </div>
              <h2 className="font-serif text-[18vw] md:text-[12vw] tracking-tighter text-[#F5F0EB] leading-none drop-shadow-2xl uppercase">{cat.name}</h2>
              <p className="text-[12px] md:text-[1.5vw] tracking-[0.4em] md:tracking-[0.6em] text-[#C4A882] font-light uppercase mt-4 md:mt-6 text-center max-w-[80vw]">{cat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
