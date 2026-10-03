"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text: string) => {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block char transform-gpu">{char === " " ? "\u00A0" : char}</span>
  ));
};

export default function ChineseMasterpiece() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      
      // 01 — THE RED SEAL OPENING
      const tl01 = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-01",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      tl01.to(".red-seal-top", { yPercent: -100, duration: 1 }, 0)
          .to(".red-seal-bottom", { yPercent: 100, duration: 1 }, 0)
          .fromTo(".ink-bg", { opacity: 0, scale: 0.8 }, { opacity: 0.3, scale: 1.2, duration: 2 }, 0.5)
          .fromTo(".chinese-title .char", 
            { opacity: 0, x: (i) => (i - 3) * 50 }, 
            { opacity: 1, x: 0, duration: 2, stagger: 0.1, ease: "power3.out" }, 1)
          .to(".chinese-title-mask", { clipPath: "inset(0% 0% 0% 0%)", duration: 2 }, 2)
          .fromTo(".tiny-copy-01", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 3);

      // 02 — THE PAPER THEATRE
      const tl02 = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-02",
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      tl02.fromTo(".paper-strip", { width: "0vw" }, { width: "100vw", duration: 2, ease: "power2.inOut" }, 0)
          .fromTo(".fold-1", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1 }, 1)
          .fromTo(".fold-2", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1 }, 2)
          .fromTo(".fold-3", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1 }, 3)
          .to(".paper-texture", { opacity: 0, duration: 1 }, 4);

      // 03 — THE WOK IS THE HEART
      const tl03 = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-03",
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
        }
      });

      tl03.fromTo(".wok-giant", { y: "50%", scale: 1.5, opacity: 0 }, { y: "0%", scale: 1, opacity: 1, duration: 2 }, 0)
          .fromTo(".word-heat", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 1)
          .to(".wok-giant", { filter: "brightness(1.5)", duration: 1 }, 1)
          
          .fromTo(".word-move", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 2)
          .to(".wok-giant", { x: -20, duration: 1 }, 2)
          
          .fromTo(".word-toss", { rotation: -45, opacity: 0 }, { rotation: 0, opacity: 1, duration: 1 }, 3)
          .to(".wok-giant", { rotation: 5, duration: 1 }, 3)
          
          .fromTo(".word-breathe", { filter: "blur(10px)", opacity: 0 }, { filter: "blur(0px)", opacity: 1, duration: 1 }, 4)
          .to(".wok-giant", { filter: "blur(4px)", duration: 1 }, 4)
          
          .fromTo(".word-serve", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 5)
          .to(".wok-giant", { filter: "blur(0px) brightness(1)", duration: 1 }, 5);

      // 04 — INGREDIENT ORBIT / SPECIMEN
      const tl04 = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-04",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      tl04.fromTo(".specimen-item", { scale: 0, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, stagger: 0.2, duration: 2 }, 0)
          .to(".specimen-item", { x: 0, y: 0, scale: 0, opacity: 0, duration: 2, ease: "power2.in" }, 3)
          .fromTo(".flame-eruption", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 4)
          .to(".flame-eruption", { opacity: 0, duration: 1 }, 5)
          .fromTo(".finished-dish", { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 2 }, 5);

      // 05 — THE RED THREAD / CHINESE TABLE
      const tl05 = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-05",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      tl05.fromTo(".red-thread-svg path", { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 3 }, 0)
          .fromTo(".quiet-table", { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 2 }, 1)
          .fromTo(".table-text-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 2)
          .fromTo(".table-text-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 3);

      // 06 — KCB CONNECTION & FINAL RED ROOM
      const tl06 = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-06",
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      tl06.fromTo(".final-red-bg", { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
          .fromTo(".gold-particles", { y: 100, opacity: 0 }, { y: -100, opacity: 1, duration: 3 }, 0)
          .fromTo(".final-char", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 0.2, duration: 2 }, 1)
          .fromTo(".final-title-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 2)
          .fromTo(".final-title-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 3)
          .fromTo(".final-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 4);

      // TIMELINE TRACKER
      const chapters = ["#ch-01", "#ch-02", "#ch-03", "#ch-04", "#ch-05", "#ch-06"];
      chapters.forEach((ch, idx) => {
        ScrollTrigger.create({
          trigger: ch,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              document.querySelectorAll(".timeline-dot").forEach((dot, i) => {
                dot.classList.toggle("bg-[#C41E2A]", i === idx);
                dot.classList.toggle("bg-white/20", i !== idx);
              });
              document.querySelectorAll(".timeline-label").forEach((label, i) => {
                label.classList.toggle("text-[#D4A853]", i === idx);
                label.classList.toggle("text-white/20", i !== idx);
              });
            }
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] text-[#F5F0EB] min-h-screen relative overflow-hidden font-sans selection:bg-[#C41E2A] selection:text-white">
      
      {/* PERSISTENT TIMELINE */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-6 mix-blend-difference">
        {["ORIGIN", "PAPER", "WOK", "INGREDIENT", "TABLE", "KCB"].map((label, i) => (
          <div key={label} className="flex items-center gap-4 justify-end group cursor-default">
            <span className={`timeline-label text-[10px] tracking-[0.2em] transition-colors duration-500 ${i === 0 ? "text-[#D4A853]" : "text-white/20"}`}>
              0{i + 1} &nbsp; {label}
            </span>
            <div className={`timeline-dot w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i === 0 ? "bg-[#C41E2A]" : "bg-white/20"}`} />
          </div>
        ))}
      </div>

      <Link href="/#kitchen" className="fixed top-8 left-8 z-[100] text-[#D4A853] tracking-[0.3em] text-[10px] hover:text-[#C41E2A] transition-colors uppercase mix-blend-difference flex items-center gap-4">
        <div className="w-8 h-[1px] bg-[#D4A853]" /> Return
      </Link>

      {/* 01 — THE RED SEAL OPENING */}
      <section id="ch-01" className="h-screen w-full relative bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
        {/* Ink Background */}
        <div className="ink-bg absolute inset-0 opacity-0 pointer-events-none mix-blend-screen">
          <Image src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2000&auto=format&fit=crop" fill className="object-cover grayscale contrast-200" alt="Ink" />
        </div>
        
        {/* The Red Seal */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-16 h-16 relative overflow-hidden flex flex-col">
            <div className="red-seal-top w-full h-1/2 bg-[#C41E2A] border-b border-[#0A0A0A]" />
            <div className="red-seal-bottom w-full h-1/2 bg-[#C41E2A]" />
            <div className="absolute inset-0 flex items-center justify-center text-[#0A0A0A] font-serif text-2xl font-bold">印</div>
          </div>
        </div>

        {/* Title & Mask */}
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="chinese-title text-[15vw] md:text-[8vw] font-serif tracking-widest text-[#F5F0EB] uppercase relative">
            {splitText("CHINESE")}
            
            {/* Image masked inside text */}
            <div className="chinese-title-mask absolute inset-0 pointer-events-none" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              <h1 className="text-[15vw] md:text-[8vw] font-serif tracking-widest uppercase text-transparent bg-clip-text bg-[url('https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
                {splitText("CHINESE")}
              </h1>
            </div>
          </h1>
          
          <div className="tiny-copy-01 mt-8 opacity-0 text-center">
            <h2 className="text-[#C41E2A] tracking-[0.4em] text-xs md:text-sm uppercase mb-4">The Art of the Wok</h2>
            <p className="text-[#C4A882] text-xs max-w-sm mx-auto font-light leading-relaxed">
              Chinese cooking is not simply assembled. It is shaped by heat, movement, balance and time.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — THE PAPER THEATRE */}
      <section id="ch-02" className="h-screen w-full relative bg-[#0A0A0A] overflow-hidden flex">
        <div className="paper-strip h-full bg-[#F5E6D3] relative flex items-center overflow-hidden shadow-[30px_0_60px_rgba(0,0,0,0.8)] z-10">
          
          <div className="absolute left-10 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[#0A0A0A] font-serif text-3xl md:text-5xl tracking-[0.5em] z-50">
            THE STORY OF FIRE
          </div>

          <div className="flex h-full w-[200vw] ml-[15vw]">
            <div className="fold-1 h-full w-[35vw] relative border-l border-[#0A0A0A]/20">
              <Image src="https://images.unsplash.com/photo-1596624068305-654dbbd20320?q=80&w=800&auto=format&fit=crop" fill className="object-cover" alt="Ingredients" />
            </div>
            <div className="fold-2 h-full w-[35vw] relative border-l border-[#0A0A0A]/20">
              <Image src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=800&auto=format&fit=crop" fill className="object-cover" alt="Chef Hands" />
            </div>
            <div className="fold-3 h-full w-[35vw] relative border-l border-[#0A0A0A]/20">
              <Image src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop" fill className="object-cover" alt="Wok Fire" />
            </div>
          </div>
          
          {/* Paper Texture Overlay */}
          <div className="paper-texture absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-50 pointer-events-none mix-blend-multiply" />
        </div>
      </section>

      {/* 03 — THE WOK IS THE HEART */}
      <section id="ch-03" className="h-screen w-full relative bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
        <div className="wok-giant absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full overflow-hidden z-0">
          <Image src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1600&auto=format&fit=crop" fill className="object-cover" alt="Wok Edge" />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_150px_#0A0A0A]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center gap-12 text-center mix-blend-difference text-white w-full h-full">
          <div className="word-heat absolute top-[20%] left-[20%] text-[8vw] md:text-[5vw] font-serif uppercase tracking-widest drop-shadow-2xl">Heat</div>
          <div className="word-move absolute top-[40%] right-[20%] text-[8vw] md:text-[5vw] font-serif uppercase tracking-widest drop-shadow-2xl">Move</div>
          <div className="word-toss absolute bottom-[40%] left-[30%] text-[8vw] md:text-[5vw] font-serif uppercase tracking-widest drop-shadow-2xl">Toss</div>
          <div className="word-breathe absolute bottom-[20%] right-[30%] text-[8vw] md:text-[5vw] font-serif uppercase tracking-widest drop-shadow-2xl text-[#C41E2A]">Breathe</div>
          <div className="word-serve absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[10vw] font-serif uppercase tracking-widest text-[#D4A853]">Serve</div>
        </div>
      </section>

      {/* 04 — ANATOMY / SPECIMEN ROOM */}
      <section id="ch-04" className="h-screen w-full relative bg-[#050505] overflow-hidden flex items-center justify-center">
        {/* Botanical grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(#D4A853 1px, transparent 1px), linear-gradient(90deg, #D4A853 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
        
        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
          
          <div className="specimen-item absolute top-[20%] left-[15%] w-40 md:w-64">
            <div className="relative aspect-square rounded-full overflow-hidden border border-[#D4A853]/50 mb-4 p-2">
              <div className="w-full h-full relative rounded-full overflow-hidden"><Image src="https://images.unsplash.com/photo-1596624068305-654dbbd20320?q=80&w=400&auto=format&fit=crop" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Sichuan Pepper" /></div>
            </div>
            <h4 className="text-[#F5F0EB] text-xs tracking-[0.2em] uppercase border-b border-[#D4A853]/30 pb-2 mb-2">Sichuan Pepper</h4>
            <p className="text-[#C4A882] text-[10px] font-light">Aroma. Numbing heat. Essential texture.</p>
          </div>

          <div className="specimen-item absolute bottom-[20%] right-[15%] w-40 md:w-64">
            <div className="relative aspect-square rounded-full overflow-hidden border border-[#D4A853]/50 mb-4 p-2">
              <div className="w-full h-full relative rounded-full overflow-hidden"><Image src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=400&auto=format&fit=crop" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Star Anise" /></div>
            </div>
            <h4 className="text-[#F5F0EB] text-xs tracking-[0.2em] uppercase border-b border-[#D4A853]/30 pb-2 mb-2">Star Anise</h4>
            <p className="text-[#C4A882] text-[10px] font-light">Warm spice. Deep architectural aroma.</p>
          </div>

          {/* Center Eruption */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flame-eruption absolute w-[60vw] h-[60vw] bg-[#C41E2A] rounded-full blur-[100px] mix-blend-screen opacity-0" />
            <div className="finished-dish absolute w-[80vw] md:w-[40vw] aspect-square rounded-full overflow-hidden opacity-0 shadow-[0_0_100px_rgba(196,30,42,0.3)] border border-[#C41E2A]/30">
              <Image src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1200&auto=format&fit=crop" fill className="object-cover" alt="Finished Dish" />
            </div>
          </div>
        </div>
      </section>

      {/* 05 — THE RED THREAD / QUIET TABLE */}
      <section id="ch-05" className="h-screen w-full relative bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
        {/* Red Thread SVG */}
        <svg className="red-thread-svg absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[50vh] z-0" viewBox="0 0 10 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 0 L5 500" stroke="#C41E2A" strokeWidth="2" />
        </svg>

        <div className="quiet-table relative w-[90vw] md:w-[60vw] h-[60vh] mt-[10vh] overflow-hidden rounded-sm shadow-2xl">
          <Image src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1600&auto=format&fit=crop" fill className="object-cover opacity-60" alt="Quiet Table" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
            <h2 className="table-text-1 text-[#F5F0EB] font-serif text-[6vw] md:text-[3vw] uppercase tracking-widest drop-shadow-lg mb-6">
              Food is meant<br/>to be shared.
            </h2>
            <p className="table-text-2 text-[#C4A882] text-xs md:text-sm max-w-md font-light leading-relaxed">
              Around the table, dishes become conversation, celebration and memory. This quiet moment makes the fire worthwhile.
            </p>
          </div>
        </div>
      </section>

      {/* 06 — KCB CONNECTION & FINAL RED ROOM */}
      <section id="ch-06" className="h-screen w-full relative bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
        <div className="final-red-bg absolute inset-0 bg-[#8B1A1A] opacity-0" />
        
        {/* Particles */}
        <div className="gold-particles absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.15)_0%,_transparent_70%)] mix-blend-screen" />
        
        <div className="final-char absolute text-[100vw] font-black text-black opacity-10 select-none pointer-events-none mix-blend-overlay">
          味
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="final-title-1 text-[8vw] md:text-[5vw] font-serif text-[#F5F0EB] tracking-widest uppercase mb-2">Chinese Cuisine</h2>
          <h3 className="final-title-2 text-[#D4A853] text-[4vw] md:text-[2vw] tracking-[0.4em] uppercase font-light mb-12">At King Chinese Bowl</h3>
          
          <div className="final-buttons flex flex-col md:flex-row gap-6">
            <Link href="/#menu" className="px-8 py-4 bg-[#0A0A0A] border border-[#D4A853]/30 text-[#F5F0EB] text-xs tracking-[0.2em] uppercase hover:bg-[#D4A853] hover:text-black transition-all duration-300">
              Explore Menu
            </Link>
            <Link href="/#locations" className="px-8 py-4 bg-transparent border border-[#F5F0EB]/30 text-[#F5F0EB] text-xs tracking-[0.2em] uppercase hover:bg-[#F5F0EB] hover:text-[#0A0A0A] transition-all duration-300">
              Visit KCB
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
