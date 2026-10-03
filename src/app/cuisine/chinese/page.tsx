"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ChineseExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const circleMaskRef = useRef<HTMLDivElement>(null);
  
  const chaptersContainerRef = useRef<HTMLElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll to top on mount
    window.scrollTo(0, 0);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      // 1. Entrance Curtain Wipe
      gsap.fromTo(
        ".entrance-overlay",
        { y: "0%" },
        { y: "-100%", duration: 1.5, ease: "power4.inOut", delay: 0.8 }
      );
      
      // Hero character reveal
      gsap.fromTo(
        ".entrance-char",
        { opacity: 0, scale: 0.8, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out", delay: 1.2 }
      );

      // 2. Hero Background Expansion (Circle to Full Screen)
      if (heroSectionRef.current && circleMaskRef.current) {
        gsap.to(circleMaskRef.current, {
          clipPath: "circle(150% at 50% 50%)",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1,
            pin: true,
            anticipatePin: 1
          },
        });

        // Parallax the massive background text
        gsap.to(".hero-outline-text", {
          x: "-30%",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1,
          },
        });
      }

      // 3. Chapters Pinned Section
      if (chaptersContainerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chaptersContainerRef.current,
            start: "top top",
            end: "+=400%", // Scroll distance for 3 chapters
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });

        // -- Chapter 1 (Wok Hei) is already visible. Animate its text.
        tl.fromTo(".ch1-text-group > *", 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
        );
        tl.to(".ch1-text-group", { y: -100, opacity: 0, duration: 1 }, "+=0.5");

        // -- Wipe to Chapter 2 (The Fold - Dim Sum)
        tl.fromTo(ch2Ref.current, 
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, 
          { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.5, ease: "power2.inOut" },
          "-=0.2"
        );
        tl.fromTo(".ch2-img", { scale: 1.15 }, { scale: 1, duration: 1.5, ease: "power2.out" }, "<");
        
        tl.fromTo(".ch2-text-group > *", 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
        );
        tl.to(".ch2-text-group", { y: -100, opacity: 0, duration: 1 }, "+=0.5");

        // -- Wipe to Chapter 3 (The Thread - Noodles)
        tl.fromTo(ch3Ref.current, 
          { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }, 
          { clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.5, ease: "power2.inOut" },
          "-=0.2"
        );
        tl.fromTo(".ch3-img", { scale: 1.15 }, { scale: 1, duration: 1.5, ease: "power2.out" }, "<");
        
        tl.fromTo(".ch3-text-group > *", 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
        );
      }

      // Parallax footer image
      gsap.fromTo(".footer-img", 
        { y: -100 }, 
        { y: 100, scrollTrigger: { trigger: ".cuisine-footer", start: "top bottom", end: "bottom top", scrub: true } }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050000] text-white min-h-screen relative overflow-hidden font-sans selection:bg-[#C41E2A] selection:text-white">
      
      {/* ── RETURN PORTAL ── */}
      <Link href="/#kitchen" className="fixed top-8 left-8 z-[100] text-[#D4A853] tracking-[0.3em] text-[10px] md:text-xs hover:text-[#C41E2A] transition-colors uppercase font-medium mix-blend-difference drop-shadow-[0_0_10px_rgba(212,168,83,0.5)] flex items-center gap-4 group">
        <div className="w-8 h-[1px] bg-[#D4A853] group-hover:w-4 group-hover:bg-[#C41E2A] transition-all duration-300" />
        Return to Portals
      </Link>

      {/* ── ENTRANCE CURTAIN ── */}
      <div className="entrance-overlay fixed inset-0 bg-[#0A0505] z-[90] flex items-center justify-center border-b border-[#C41E2A]/20">
        <div className="relative">
          <div className="absolute inset-0 bg-[#C41E2A] blur-[100px] opacity-30 animate-pulse" />
          <h1 className="text-[#C41E2A] font-serif text-[30vw] md:text-[15vw] leading-none drop-shadow-[0_0_40px_rgba(196,30,42,0.8)] opacity-80 mix-blend-screen">火</h1>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section ref={heroSectionRef} className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0505]">
        
        {/* Massive scrolling outline text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[10vw] whitespace-nowrap z-0 pointer-events-none opacity-20">
          <h2 className="hero-outline-text text-[35vw] font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #C41E2A" }}>
            CHINESE CHINESE
          </h2>
        </div>

        {/* Central Masked Image (Starts as a circle, expands to full screen) */}
        <div ref={circleMaskRef} className="absolute inset-0 z-10 flex items-center justify-center" style={{ clipPath: "circle(15vw at 50% 50%)" }}>
          <Image 
            src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=2000&auto=format&fit=crop" 
            alt="Wok Fire" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#1A0505]/40 to-black/90 mix-blend-multiply" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
            <h1 className="entrance-char text-[25vw] md:text-[12vw] font-serif text-[#C41E2A] leading-[0.8] mix-blend-screen drop-shadow-[0_0_80px_rgba(196,30,42,1)]">
              火
            </h1>
            <p className="mt-8 text-[#D4A853] tracking-[0.5em] text-xs md:text-sm uppercase font-light drop-shadow-lg">The Breath of the Wok</p>
          </div>
        </div>

      </section>

      {/* ── CINEMATIC CHAPTERS (Pinned Container) ── */}
      <section ref={chaptersContainerRef} className="relative h-screen w-full bg-[#050000] overflow-hidden">
        
        {/* CHAPTER 1: THE FLAME */}
        <div className="absolute inset-0 z-10">
          <Image src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop" alt="Wok Hei" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          
          <div className="absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-xl ch1-text-group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#C41E2A] font-serif text-2xl italic">I.</span>
              <div className="w-16 h-[1px] bg-[#C41E2A]" />
              <span className="text-[#D4A853] tracking-[0.4em] text-xs uppercase">Wok Hei</span>
            </div>
            <h2 className="text-[#F5F0EB] text-[10vw] md:text-[6vw] font-serif leading-[0.85] uppercase mb-8 drop-shadow-2xl">The<br/>Flame</h2>
            <p className="text-[#C4A882] text-sm md:text-base font-light leading-relaxed max-w-md bg-black/40 p-6 backdrop-blur-sm border-l border-[#C41E2A]">
              It requires an inferno. The wok must breathe, scorching the ingredients for a fleeting second to lock in an irreplaceable smoky depth. It is a dance with the dragon itself.
            </p>
          </div>
          <div className="hidden md:block absolute right-[8vw] top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[#C41E2A]/20 font-serif text-[12vw] leading-none select-none">
            炒
          </div>
        </div>

        {/* CHAPTER 2: THE FOLD */}
        <div ref={ch2Ref} className="absolute inset-0 z-20 bg-[#0A0505]" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}>
          <Image src="https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=2000&auto=format&fit=crop" alt="Dim Sum" fill className="ch2-img object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent" />
          
          <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 max-w-xl text-right flex flex-col items-end ch2-text-group">
            <div className="flex items-center gap-4 mb-6 justify-end w-full">
              <span className="text-[#D4A853] tracking-[0.4em] text-xs uppercase">Dim Sum</span>
              <div className="w-16 h-[1px] bg-[#D4A853]" />
              <span className="text-[#D4A853] font-serif text-2xl italic">II.</span>
            </div>
            <h2 className="text-[#F5F0EB] text-[10vw] md:text-[6vw] font-serif leading-[0.85] uppercase mb-8 drop-shadow-2xl">The<br/>Fold</h2>
            <p className="text-[#E5E0D8] text-sm md:text-base font-light leading-relaxed max-w-md bg-black/60 p-6 backdrop-blur-md border-r border-[#D4A853] text-right">
              Precision in every pinch. A thousand years of patience wrapped in translucent skin. The steam carries the aromas of bamboo and ginger, revealing masterpieces meant to touch the heart.
            </p>
          </div>
          <div className="hidden md:block absolute left-[8vw] top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[#D4A853]/10 font-serif text-[12vw] leading-none select-none">
            點心
          </div>
        </div>

        {/* CHAPTER 3: THE THREAD */}
        <div ref={ch3Ref} className="absolute inset-0 z-30 bg-[#100505]" style={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}>
          <Image src="https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2000&auto=format&fit=crop" alt="Noodles" fill className="ch3-img object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute left-[50%] -translate-x-1/2 bottom-[10vh] max-w-2xl text-center flex flex-col items-center ch3-text-group w-[90vw]">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-8 md:w-16 h-[1px] bg-white/40" />
              <span className="text-white/80 tracking-[0.4em] text-xs uppercase">Longevity</span>
              <div className="w-8 md:w-16 h-[1px] bg-white/40" />
            </div>
            <h2 className="text-[#C41E2A] text-[12vw] md:text-[8vw] font-serif leading-[0.85] uppercase mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">The Thread</h2>
            <p className="text-white text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto bg-[#C41E2A]/10 p-6 backdrop-blur-md rounded-xl border border-[#C41E2A]/30">
              Pulled by hand, stretching the boundaries of physics and tradition. An unbroken thread representing a long, prosperous life, bathed in rich broths and fiery chili oils.
            </p>
          </div>
        </div>

      </section>

      {/* ── FOOTER GALLERY (Natural Scroll) ── */}
      <section className="cuisine-footer relative min-h-[80vh] bg-black py-32 px-[5vw] flex flex-col items-center justify-center overflow-hidden z-40 shadow-[0_-50px_100px_#000]">
        
        <div className="text-center mb-20 z-10 relative">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C41E2A] mx-auto mb-8" />
          <h3 className="text-3xl md:text-5xl text-[#F5F0EB] font-serif uppercase tracking-widest drop-shadow-2xl">Taste the Legacy</h3>
        </div>

        <div className="relative w-full max-w-5xl h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(196,30,42,0.15)] group">
          <Image src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2000&auto=format&fit=crop" alt="Chinese Feast" fill className="footer-img object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#C41E2A]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
          
          <Link href="/#menu" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C41E2A]/90 text-[#F5F0EB] px-8 py-4 text-xs md:text-sm tracking-[0.3em] uppercase backdrop-blur-md hover:bg-[#D4A853] hover:text-black transition-all duration-500 rounded-sm">
            View Full Menu
          </Link>
        </div>

      </section>
      
    </div>
  );
}
