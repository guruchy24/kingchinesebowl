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
    titleArt: "中国の",
    subtitle: "The Mastery of the Wok", 
    history: "Rooted in millennia of culinary tradition, our Chinese offerings celebrate the intense heat of 'Wok Hei' (breath of the wok). From the fiery depths of Sichuan peppercorns to the delicate balance of Cantonese aromatics, every dish tells a story of dynasties, street vendors, and the relentless pursuit of flavor.",
    theme: { bg: "from-[#1a0505] to-[#0a0000]", accent: "#C41E2A", text: "#F5F0EB", art: "火" },
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
    titleArt: "日本の",
    subtitle: "Precision & Elegance", 
    history: "Japanese cuisine is a philosophy of subtraction, where the purity of ingredients speaks louder than complex spices. Our menu honors the meticulous art of sushi-grade slicing and the slow-simmered perfection of umami-rich broths, bringing Tokyo's refined minimalism to your table.",
    theme: { bg: "from-[#050505] to-[#0a0a0a]", accent: "#E5E0D8", text: "#FFFFFF", art: "水" },
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
    titleArt: "한국의",
    subtitle: "Fire & Fermentation", 
    history: "Bold, aggressive, and undeniably soulful. Korean cuisine is built on the pillars of fermentation and fire. We bring the bustling energy of Seoul's night markets to life through sizzling marinades, pungent gochujang, and the deep, complex flavors of aged kimchi.",
    theme: { bg: "from-[#0a0210] to-[#050005]", accent: "#8B3A62", text: "#F5F0EB", art: "발효" },
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
    titleArt: "བོད་ཀྱི་",
    subtitle: "Himalayan Soul Food", 
    history: "Forged in the highest mountains on Earth, Tibetan food is the ultimate comfort cuisine. Our handcrafted momos and steaming bowls of Thukpa carry the warmth of Himalayan hearths, combining rustic, hearty ingredients with subtle, warming spices that comfort the soul.",
    theme: { bg: "from-[#150d05] to-[#0a0500]", accent: "#D4A853", text: "#F5F0EB", art: "རི་" },
    images: {
      main: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1600&auto=format&fit=crop",
      sub1: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=800&auto=format&fit=crop",
      sub2: "https://images.unsplash.com/photo-1541528646199-54dff9801db9?q=80&w=800&auto=format&fit=crop",
      sub3: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=800&auto=format&fit=crop"
    }
  }
];

export default function Section03({ media }: { media?: any }) {
  const introRef = useRef<HTMLElement>(null);
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

  // Intro refs
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const handoffSceneRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  // Parallax setup for the artistic sections
  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const spinner = gsap.to(plateRef.current, { rotation: 360, duration: 120, repeat: -1, ease: "none" });

    const ctx = gsap.context(() => {
      // Intro Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=200%", 
          scrub: 1, 
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 3, ease: "power2.out" }, 0);
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 4, ease: "power2.out" }, 0);
      tl.fromTo(charRef.current, { opacity: 0, scale: 1.8, filter: "blur(12px)", letterSpacing: "0.3em" }, { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.08em", duration: 5, ease: "power3.out" }, 0);
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 3, ease: "power2.inOut" }, 2);
      tl.fromTo(engRef.current, { opacity: 0, y: 30, letterSpacing: "0.8em" }, { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 4, ease: "power3.out" }, 3);
      tl.fromTo(subRef.current, { opacity: 0, y: 15 }, { opacity: 0.4, y: 0, duration: 3, ease: "power2.out" }, 5);
      tl.to(textRef.current, { opacity: 0, scale: 0.95, duration: 4, ease: "power2.in" }, 10);
      tl.to(videoRef.current, { opacity: 0, duration: 4, ease: "power2.in" }, 14);

      tl.fromTo(handoffSceneRef.current, { opacity: 0 }, { opacity: 1, duration: 5 }, 16);
      tl.fromTo(plateRef.current, { scale: 1.3, filter: "brightness(2) blur(10px)" }, { scale: 1, filter: "brightness(1) blur(0px)", duration: 10, ease: "power3.out" }, 16);

      if (rightTextRef.current) {
        tl.fromTo(rightTextRef.current.children, { opacity: 0, x: 40, filter: "blur(4px)" }, { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.2, duration: 6, ease: "power2.out" }, 18);
      }
      tl.to(plateRef.current, { scale: 1.15, duration: 15, ease: "none" }, 16);

      // Artistic Parallax for each Cuisine Section
      const sections = gsap.utils.toArray(".cuisine-art-section");
      sections.forEach((sec: any) => {
        const mainImg = sec.querySelector(".art-main-img");
        const sub1 = sec.querySelector(".art-sub1");
        const sub2 = sec.querySelector(".art-sub2");
        const sub3 = sec.querySelector(".art-sub3");
        const artText = sec.querySelector(".art-bg-text");

        if(mainImg) {
          gsap.fromTo(mainImg, { y: -50 }, { y: 50, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
        }
        if(sub1) {
          gsap.fromTo(sub1, { y: 100 }, { y: -100, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
        }
        if(sub2) {
          gsap.fromTo(sub2, { y: 150 }, { y: -150, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
        }
        if(sub3) {
          gsap.fromTo(sub3, { y: -80 }, { y: 80, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
        }
        if(artText) {
          gsap.fromTo(artText, { y: -100, opacity: 0 }, { y: 100, opacity: 0.03, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
        }
      });

    });

    return () => {
      spinner.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div id="kitchen" className="relative w-full bg-[#0A0A0A]">

      {/* Cinematic Film Grain Overlay */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* ── INTRO SECTION (Pinned) ── */}
      <section ref={introRef} className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]" style={{ zIndex: 10 }}>
        
        <div ref={videoRef} className="absolute inset-0 opacity-0 bg-[#0A0A0A] overflow-hidden pointer-events-none">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 pointer-events-none">
            <source src="/videos/kitchenfire.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 pointer-events-none" />
        </div>

        <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div ref={glowRef} className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-0" style={{ background: "radial-gradient(circle, rgba(196,30,42,0.08) 0%, transparent 60%)" }} />
          <div className="relative">
            <div className="absolute inset-0 bg-[#C41E2A] blur-3xl opacity-20 animate-pulse" />
            <div ref={charRef} className="relative text-[20vw] md:text-[9vw] font-serif leading-none text-[#F5F0EB] drop-shadow-[0_0_60px_rgba(196,30,42,0.3)]">从火开始</div>
          </div>
          <div ref={lineRef} className="w-[16vw] md:w-[8vw] h-[2px] bg-[#C41E2A] my-[3vh] origin-center" />
          <div ref={engRef} className="text-[5vw] md:text-[2vw] font-light text-[#C4A882] uppercase tracking-[0.4em]">It Begins With Fire</div>
          <div ref={subRef} className="text-[12px] md:text-[1vw] tracking-[0.2em] md:tracking-[1em] font-light text-[#F5F0EB]/0 mt-[2.5vh] uppercase text-center">Enter The Kitchen</div>
        </div>

        <div ref={handoffSceneRef} className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-end px-[5vw] md:px-[8vw] opacity-0 bg-[#0A0A0A] overflow-hidden z-30">
          <div className="absolute left-[-50vw] md:left-[-15vw] top-1/4 md:top-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] rounded-full overflow-hidden shadow-[0_0_150px_rgba(196,30,42,0.15)] pointer-events-none">
            <div ref={plateRef} className="w-full h-full relative origin-center">
              <div className="hidden md:block absolute inset-0"><Image src={plateDesktop} alt="Premium plated dish" fill className="object-cover" /></div>
              <div className="block md:hidden absolute inset-0"><Image src={plateMobile} alt="Premium plated dish" fill className="object-cover" /></div>
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
              <p className="text-[12px] md:text-[1vw] text-[#C4A882] font-light tracking-[0.2em] md:tracking-[0.4em] uppercase group-hover:text-[#F5F0EB] transition-colors duration-500">Scroll to Experience</p>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-8 md:w-12 h-[1px] bg-[#D4A853]/50 transition-all duration-700 ease-out group-hover:w-16 md:group-hover:w-24 group-hover:bg-[#D4A853]" />
                <div className="text-[#D4A853] transition-transform duration-500 ease-out group-hover:translate-y-3 font-light text-lg md:text-xl">↓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTISTIC VERTICAL SECTIONS ── */}
      {dynamicCategories.map((cat, idx) => {
        // Alternate layout direction for rhythm
        const isEven = idx % 2 === 0;

        return (
          <section key={cat.name} className={`cuisine-art-section relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-[15vh] bg-gradient-to-b ${cat.theme.bg}`}>
            
            {/* Background Massive Art Typography */}
            <div className="art-bg-text absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 select-none overflow-hidden">
              <h1 className="text-[80vw] md:text-[50vw] font-serif leading-none tracking-tighter text-[#FFFFFF] whitespace-nowrap" style={{ WebkitTextStroke: `2px ${cat.theme.accent}`, color: 'transparent' }}>
                {cat.theme.art}
              </h1>
            </div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] h-full flex flex-col md:flex-row items-center">
              
              {/* Text Content */}
              <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:pr-[10vw]' : 'md:pl-[10vw] md:order-2'} relative z-30 mt-[10vh] md:mt-0`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px]" style={{ backgroundColor: cat.theme.accent }} />
                  <span className="tracking-[0.4em] text-xs uppercase font-light" style={{ color: cat.theme.accent }}>Art of {cat.name}</span>
                </div>
                
                <h2 className="font-serif text-[18vw] md:text-[8vw] tracking-tighter leading-[0.8] uppercase mb-2 drop-shadow-2xl" style={{ color: cat.theme.text }}>
                  {cat.name}
                </h2>
                <h3 className="tracking-[0.3em] text-[12px] md:text-sm uppercase mt-4 mb-10 font-medium" style={{ color: cat.theme.accent }}>
                  {cat.subtitle}
                </h3>
                
                <p className="text-[14px] md:text-[16px] font-light leading-loose opacity-90 drop-shadow-xl max-w-lg border-l-2 pl-6" style={{ color: '#D5D0C8', borderColor: cat.theme.accent }}>
                  {cat.history}
                </p>

                {/* Sub Image 3: Small floating accent near text */}
                <div className={`art-sub3 absolute ${isEven ? '-right-10' : '-left-10'} -bottom-[10vh] w-[40vw] md:w-[15vw] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/10 hidden md:block`}>
                  <Image src={cat.images.sub3.desktop} fill className="object-cover" alt="Detail 3" />
                </div>
              </div>

              {/* Artistic Collage Area */}
              <div className={`w-full md:w-1/2 h-[70vh] md:h-[90vh] relative ${isEven ? '' : 'md:order-1'} mt-[10vh] md:mt-0`}>
                
                {/* Main Image */}
                <div className={`art-main-img absolute top-[10%] ${isEven ? 'right-0' : 'left-0'} w-[80vw] md:w-[35vw] h-[50vh] md:h-[70vh] rounded-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10`}>
                  <Image src={cat.images.main.desktop} fill className="object-cover" alt="Main Art" />
                  <div className="absolute inset-0 border border-white/10 pointer-events-none mix-blend-overlay" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply`} />
                </div>

                {/* Sub Image 1: Floating high */}
                <div className={`art-sub1 absolute -top-[5%] ${isEven ? 'left-[10%]' : 'right-[10%]'} w-[35vw] md:w-[18vw] h-[45vw] md:h-[25vw] rounded-sm overflow-hidden shadow-2xl z-20`}>
                  <Image src={cat.images.sub1.desktop} fill className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700" alt="Detail 1" />
                  <div className="absolute inset-0 border-4 mix-blend-overlay" style={{ borderColor: cat.theme.accent }} />
                </div>

                {/* Sub Image 2: Deep overlap */}
                <div className={`art-sub2 absolute bottom-[15%] ${isEven ? 'left-[20%]' : 'right-[20%]'} w-[45vw] md:w-[22vw] h-[60vw] md:h-[30vw] rounded-sm overflow-hidden shadow-2xl z-30`}>
                  <Image src={cat.images.sub2.desktop} fill className="object-cover" alt="Detail 2" />
                  <div className="absolute inset-0 ring-1 ring-white/20 ring-inset pointer-events-none" />
                </div>

              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
}
