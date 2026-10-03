"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { 
    id: "chinese",
    name: "CHINESE", 
    subtitle: "The Mastery of the Wok", 
    history: "Rooted in millennia of culinary tradition, our Chinese offerings celebrate the intense heat of 'Wok Hei' (breath of the wok). From the fiery depths of Sichuan peppercorns to the delicate balance of Cantonese aromatics, every dish tells a story of dynasties, street vendors, and the relentless pursuit of flavor.",
    images: {
      main: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1600&auto=format&fit=crop",
      sub1: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
      sub2: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop",
      sub3: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop"
    }
  },
  { 
    id: "japanese",
    name: "JAPANESE", 
    subtitle: "Precision & Elegance", 
    history: "Japanese cuisine is a philosophy of subtraction, where the purity of ingredients speaks louder than complex spices. Our menu honors the meticulous art of sushi-grade slicing and the slow-simmered perfection of umami-rich broths, bringing Tokyo's refined minimalism to your table.",
    images: {
      main: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1600&auto=format&fit=crop",
      sub1: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",
      sub2: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
      sub3: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=800&auto=format&fit=crop"
    }
  },
  { 
    id: "korean",
    name: "KOREAN", 
    subtitle: "Fire & Fermentation", 
    history: "Bold, aggressive, and undeniably soulful. Korean cuisine is built on the pillars of fermentation and fire. We bring the bustling energy of Seoul's night markets to life through sizzling marinades, pungent gochujang, and the deep, complex flavors of aged kimchi.",
    images: {
      main: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=1600&auto=format&fit=crop",
      sub1: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?q=80&w=800&auto=format&fit=crop",
      sub2: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=800&auto=format&fit=crop",
      sub3: "https://images.unsplash.com/photo-1635502156821-26c361405e3c?q=80&w=800&auto=format&fit=crop"
    }
  },
  { 
    id: "tibetan",
    name: "TIBETAN", 
    subtitle: "Himalayan Soul Food", 
    history: "Forged in the highest mountains on Earth, Tibetan food is the ultimate comfort cuisine. Our handcrafted momos and steaming bowls of Thukpa carry the warmth of Himalayan hearths, combining rustic, hearty ingredients with subtle, warming spices that comfort the soul.",
    images: {
      main: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1600&auto=format&fit=crop",
      sub1: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=800&auto=format&fit=crop",
      sub2: "https://images.unsplash.com/photo-1541528646199-54dff9801db9?q=80&w=800&auto=format&fit=crop",
      sub3: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=800&auto=format&fit=crop"
    }
  }
];

export default function Section03({ media }: { media?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const dynamicCategories = CATEGORIES.map((cat) => {
    const id = cat.id;
    return {
      ...cat,
      images: {
        main: {
          desktop: media?.[`${id}_main`]?.desktop || media?.[id]?.desktop || cat.images.main,
          mobile: media?.[`${id}_main`]?.mobile || media?.[`${id}_main`]?.desktop || media?.[id]?.mobile || media?.[id]?.desktop || cat.images.main
        },
        sub1: {
          desktop: media?.[`${id}_1`]?.desktop || cat.images.sub1,
          mobile: media?.[`${id}_1`]?.mobile || media?.[`${id}_1`]?.desktop || cat.images.sub1
        },
        sub2: {
          desktop: media?.[`${id}_2`]?.desktop || cat.images.sub2,
          mobile: media?.[`${id}_2`]?.mobile || media?.[`${id}_2`]?.desktop || cat.images.sub2
        },
        sub3: {
          desktop: media?.[`${id}_3`]?.desktop || cat.images.sub3,
          mobile: media?.[`${id}_3`]?.mobile || media?.[`${id}_3`]?.desktop || cat.images.sub3
        }
      }
    };
  });
  
  const plateDesktop = media?.plate?.desktop || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop";
  const plateMobile = media?.plate?.mobile || plateDesktop;

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
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // Continuous ultra-slow rotation for the plate
    const spinner = gsap.to(plateRef.current, { 
      rotation: 360, 
      duration: 120, 
      repeat: -1, 
      ease: "none" 
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: window.innerWidth < 768 ? "+=150%" : "+=400%", 
          scrub: 1, 
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // ══════════════════════════════════════════════════
      // SCENE 1 & 2: FIRE VIDEO + TEXT OVERLAY
      // ══════════════════════════════════════════════════
      tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 3, ease: "power2.out" }, 0);
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 4, ease: "power2.out" }, 0);
      tl.fromTo(charRef.current, { opacity: 0, scale: 1.8, filter: "blur(12px)", letterSpacing: "0.3em" }, { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.08em", duration: 5, ease: "power3.out" }, 0);
      
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 3, ease: "power2.inOut" }, 2);
      tl.fromTo(engRef.current, { opacity: 0, y: 30, letterSpacing: "0.8em" }, { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 4, ease: "power3.out" }, 3);
      tl.fromTo(subRef.current, { opacity: 0, y: 15 }, { opacity: 0.4, y: 0, duration: 3, ease: "power2.out" }, 5);

      tl.to(textRef.current, { opacity: 0, scale: 0.95, duration: 4, ease: "power2.in" }, 10);
      tl.to(videoRef.current, { opacity: 0, duration: 4, ease: "power2.in" }, 14);

      // ══════════════════════════════════════════════════
      // SCENE 3: THE KING'S TABLE 
      // ══════════════════════════════════════════════════
      tl.fromTo(handoffSceneRef.current, { opacity: 0 }, { opacity: 1, duration: 5 }, 16);
      tl.fromTo(plateRef.current, { scale: 1.3, filter: "brightness(2) blur(10px)" }, { scale: 1, filter: "brightness(1) blur(0px)", duration: 10, ease: "power3.out" }, 16);

      if (rightTextRef.current) {
        tl.fromTo(rightTextRef.current.children, { opacity: 0, x: 40, filter: "blur(4px)" }, { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.2, duration: 6, ease: "power2.out" }, 18);
      }

      // Add a cinematic zoom-in to the plate as we transition to the horizontal scroll
      tl.to(plateRef.current, { scale: 1.15, duration: 15, ease: "none" }, 16);

      // ══════════════════════════════════════════════════
      // SCENE 4: HORIZONTAL EDITORIAL LOOKBOOK
      // ══════════════════════════════════════════════════
      const containerWidth = CATEGORIES.length * 100; // 400vw
      tl.to(horizontalContainerRef.current, {
        x: `-${containerWidth - 100}vw`,
        ease: "none",
        duration: 40 
      }, 26); 

    }, sectionRef);

    return () => {
      spinner.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="kitchen" className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]" style={{ zIndex: 50 }}>

      {/* Cinematic Film Grain Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* ── SCENE 1 & 2: FIRE VIDEO BACKGROUND ── */}
      <div ref={videoRef} className="absolute inset-0 opacity-0 bg-[#0A0A0A] overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 pointer-events-none">
          <source src="/videos/kitchenfire.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* ── SCENE 1 & 2: TEXT OVERLAY ── */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
        <div ref={glowRef} className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-0" style={{ background: "radial-gradient(circle, rgba(196,30,42,0.08) 0%, transparent 60%)" }} />
        
        {/* Pulsing glow for the Chinese characters */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#C41E2A] blur-3xl opacity-20 animate-pulse" />
          <div ref={charRef} className="relative text-[20vw] md:text-[9vw] font-serif leading-none text-[#F5F0EB] drop-shadow-[0_0_60px_rgba(196,30,42,0.3)]">从火开始</div>
        </div>

        <div ref={lineRef} className="w-[16vw] md:w-[8vw] h-[2px] bg-[#C41E2A] my-[3vh] origin-center" />
        <div ref={engRef} className="text-[5vw] md:text-[2vw] font-light text-[#C4A882] uppercase tracking-[0.4em]">It Begins With Fire</div>
        <div ref={subRef} className="text-[12px] md:text-[1vw] tracking-[0.2em] md:tracking-[1em] font-light text-[#F5F0EB]/0 mt-[2.5vh] uppercase text-center">Enter The Kitchen</div>
      </div>

      {/* ── SCENE 3: EDITORIAL OVERLAP HANDOFF ── */}
      <div ref={handoffSceneRef} className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-end px-[5vw] md:px-[8vw] opacity-0 bg-[#0A0A0A] overflow-hidden" style={{ zIndex: 30 }}>
        
        {/* Spinning Plate */}
        <div className="absolute left-[-50vw] md:left-[-15vw] top-1/4 md:top-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] rounded-full overflow-hidden shadow-[0_0_150px_rgba(196,30,42,0.15)] pointer-events-none">
          <div ref={plateRef} className="w-full h-full relative origin-center">
            <div className="hidden md:block absolute inset-0">
              <Image src={plateDesktop} alt="Premium plated dish" fill className="object-cover" />
            </div>
            <div className="block md:hidden absolute inset-0">
              <Image src={plateMobile} alt="Premium plated dish" fill className="object-cover" />
            </div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(10,10,10,1)] pointer-events-none" />
          </div>
        </div>

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

      {/* ── SCENE 4: HORIZONTAL EDITORIAL LOOKBOOK ── */}
      <div 
        ref={horizontalContainerRef}
        className="absolute top-0 left-[100vw] flex h-screen shadow-[-30px_0_60px_rgba(0,0,0,0.9)] bg-[#0A0A0A]"
        style={{ width: `${CATEGORIES.length * 100}vw`, zIndex: 40 }}
      >
        {dynamicCategories.map((cat, idx) => (
          <div key={cat.name} className="flex h-screen items-center justify-center shrink-0 w-screen relative bg-gradient-to-r from-[#050505] to-[#0A0A0A]">
            
            {/* ── DESKTOP: HIGH-END COLLAGE LAYOUT ── */}
            <div className="hidden md:block w-full h-full relative max-w-[1600px] mx-auto px-4">
              
              {/* Text Block */}
              <div className="absolute left-[8vw] top-[25vh] z-30 max-w-[32vw] pointer-events-none">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[1px] bg-[#D4A853]" />
                  <span className="text-[#D4A853] tracking-[0.4em] text-xs uppercase font-light">Origin</span>
                </div>
                <h2 className="font-serif text-[7vw] tracking-tighter text-[#F5F0EB] leading-[0.85] uppercase drop-shadow-2xl">
                  {cat.name}
                </h2>
                <h3 className="text-[#C41E2A] tracking-[0.3em] text-sm uppercase mt-4 mb-8 font-medium">
                  {cat.subtitle}
                </h3>
                <div className="bg-black/40 p-6 backdrop-blur-md rounded-lg border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
                  <p className="text-[#E5E0D8] text-sm font-light leading-relaxed relative z-10">
                    {cat.history}
                  </p>
                </div>
              </div>

              {/* Main Image (Center-Right) */}
              <div className="absolute right-[8vw] top-[12vh] w-[45vw] h-[76vh] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 group">
                <Image src={cat.images.main.desktop} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" alt={`${cat.name} main`} priority={idx === 0} />
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
              </div>

              {/* Sub Image 1 (Top Left, tucked behind text) */}
              <div className="absolute left-[5vw] top-[8vh] w-[20vw] h-[25vh] rounded-lg overflow-hidden shadow-2xl z-0 opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 hover:z-40 transition-all duration-700">
                <Image src={cat.images.sub1.desktop} fill className="object-cover" alt={`${cat.name} detail 1`} />
              </div>

              {/* Sub Image 2 (Bottom Right, overlapping main) */}
              <div className="absolute right-[4vw] bottom-[8vh] w-[22vw] h-[35vh] rounded-lg overflow-hidden shadow-2xl z-40 border-8 border-[#0A0A0A] group hover:-translate-y-4 transition-transform duration-700">
                <Image src={cat.images.sub2.desktop} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" alt={`${cat.name} detail 2`} />
              </div>

              {/* Sub Image 3 (Bottom Left, near text) */}
              <div className="absolute left-[28vw] bottom-[10vh] w-[18vw] h-[18vw] max-h-[30vh] rounded-full overflow-hidden shadow-[0_10px_40px_rgba(212,168,83,0.15)] z-20 border border-[#D4A853]/40 group hover:border-[#D4A853] transition-colors duration-500">
                <Image src={cat.images.sub3.desktop} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" alt={`${cat.name} detail 3`} />
              </div>

            </div>

            {/* ── MOBILE: EDITORIAL STACK LAYOUT ── */}
            <div className="flex md:hidden flex-col w-full h-full pt-[12vh] pb-[6vh] justify-between px-6 relative z-10">
              
              {/* Text Area */}
              <div className="flex-shrink-0 z-30 relative mb-4">
                <h2 className="font-serif text-[16vw] text-[#F5F0EB] leading-[0.8] uppercase drop-shadow-2xl">{cat.name}</h2>
                <h3 className="text-[#C41E2A] tracking-[0.2em] text-[10px] uppercase mt-3 mb-4">{cat.subtitle}</h3>
                <div className="bg-black/60 p-4 rounded-lg backdrop-blur-md border border-white/10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
                  <p className="text-[#E5E0D8] text-[11px] leading-relaxed relative z-10">{cat.history}</p>
                </div>
              </div>
              
              {/* Images Area */}
              <div className="relative w-full flex-grow flex items-end">
                {/* Main image */}
                <div className="absolute inset-x-0 bottom-0 top-0 rounded-xl overflow-hidden shadow-2xl">
                  <Image src={cat.images.main.mobile} fill className="object-cover opacity-80" alt={`${cat.name} main`} priority={idx === 0} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                </div>
                
                {/* Sub floating images */}
                <div className="absolute -top-4 right-0 w-[25vw] h-[35vw] rounded-lg border-2 border-[#050505] overflow-hidden shadow-xl z-10">
                  <Image src={cat.images.sub1.mobile} fill className="object-cover" alt={`${cat.name} detail 1`} />
                </div>
                
                <div className="absolute bottom-6 right-4 w-[30vw] h-[45vw] rounded-lg border-[3px] border-[#050505] overflow-hidden shadow-2xl z-20">
                  <Image src={cat.images.sub2.mobile} fill className="object-cover" alt={`${cat.name} detail 2`} />
                </div>
                
                <div className="absolute bottom-12 left-4 w-[20vw] h-[20vw] rounded-full border-2 border-[#D4A853]/50 overflow-hidden shadow-xl z-10">
                  <Image src={cat.images.sub3.mobile} fill className="object-cover" alt={`${cat.name} detail 3`} />
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
