"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PORTALS = [
  { id: "chinese", name: "CHINESE", subtitle: "The Mastery of the Wok", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1600&auto=format&fit=crop" },
  { id: "japanese", name: "JAPANESE", subtitle: "Precision & Elegance", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1600&auto=format&fit=crop" },
  { id: "korean", name: "KOREAN", subtitle: "Fire & Fermentation", image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=1600&auto=format&fit=crop" },
  { id: "tibetan", name: "TIBETAN", subtitle: "Himalayan Soul Food", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1600&auto=format&fit=crop" }
];

export default function Section03({ media }: { media?: any }) {
  const introRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  
  const handoffSceneRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  
  const portalsContainerRef = useRef<HTMLDivElement>(null);

  const plateDesktop = media?.plate?.desktop || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop";
  const plateMobile = media?.plate?.mobile || plateDesktop;

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const spinner = gsap.to(plateRef.current, { rotation: 360, duration: 120, repeat: -1, ease: "none" });

    const ctx = gsap.context(() => {
      // Intro Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=150%", 
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
      
      // Portals reveal
      if (portalsContainerRef.current) {
        gsap.fromTo(portalsContainerRef.current, { opacity: 0, y: 100 }, {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: portalsContainerRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true
          }
        });
      }

    });

    return () => {
      spinner.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div id="kitchen" className="relative w-full bg-[#0A0A0A]">
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
              <p className="text-[12px] md:text-[1vw] text-[#C4A882] font-light tracking-[0.2em] md:tracking-[0.4em] uppercase group-hover:text-[#F5F0EB] transition-colors duration-500">Choose your journey</p>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-8 md:w-12 h-[1px] bg-[#D4A853]/50 transition-all duration-700 ease-out group-hover:w-16 md:group-hover:w-24 group-hover:bg-[#D4A853]" />
                <div className="text-[#D4A853] transition-transform duration-500 ease-out group-hover:translate-y-3 font-light text-lg md:text-xl">↓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTALS EXPLORER (The Concisely Elegant Hub) ── */}
      <section ref={portalsContainerRef} className="relative w-full h-[80vh] md:h-screen flex flex-col md:flex-row overflow-hidden bg-[#0A0A0A]">
        {PORTALS.map((portal) => (
          <Link 
            key={portal.id} 
            href={`/cuisine/${portal.id}`}
            className="group relative flex-1 h-[25%] md:h-full overflow-hidden flex items-center justify-center transition-all duration-[800ms] hover:flex-[2] md:hover:flex-[1.5] border-b md:border-b-0 md:border-r border-white/5 cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src={media?.[`${portal.id}_main`]?.desktop || media?.[portal.id]?.desktop || portal.image} 
                alt={portal.name} 
                fill 
                className="object-cover opacity-30 md:opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-transparent transition-colors duration-700" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center flex flex-col items-center">
              <h3 className="font-serif text-3xl md:text-[4vw] tracking-wider text-[#F5F0EB] uppercase drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                {portal.name}
              </h3>
              <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden mt-2 md:mt-4">
                <span className="text-[#D4A853] tracking-[0.3em] text-[10px] md:text-xs uppercase whitespace-nowrap">
                  Explore Experience →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
