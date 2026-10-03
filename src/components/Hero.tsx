"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ media }: { media?: Record<string, Record<string, string>> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extract all media slots to act as slides
  const defaultHero = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2800&auto=format&fit=crop";
  const slides = media && Object.keys(media).length > 0
    ? Object.values(media)
    : [{ desktop: defaultHero, mobile: defaultHero }];

  // Auto-slide every 6 seconds if there are multiple slides
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const isVideo = (url?: string) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg') || lower.includes('.mp4?') || lower.includes('.webm?');
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".hero-fade",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.8 }
      );

      gsap.fromTo(
        ".scroll-dot",
        { y: 0, opacity: 1, scale: 1 },
        { y: 80, opacity: 0, scale: 0.5, duration: 1.5, repeat: -1, ease: "power1.inOut" }
      );

      gsap.fromTo(
        ".scroll-chevron",
        { y: -6, opacity: 0.2 },
        { y: 2, opacity: 1, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );

      // Continuous gentle wind sway for the lantern
      gsap.fromTo(
        ".lantern-sway",
        { rotation: -2 },
        { rotation: 2, transformOrigin: "top center", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );

      // Subtle breathing effect for the SCROLL text
      gsap.fromTo(
        ".scroll-text",
        { opacity: 0.5 },
        { opacity: 1, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );

      // Scroll-linked Rope Animation
      gsap.fromTo(
        ".scroll-rope-line",
        { height: 0 },
        {
          height: "20vh", // Shorter drop into the next section
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        ".scroll-rope-dot",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-kcb-base z-50"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const desktop = slide.desktop || defaultHero;
          const mobile = slide.mobile || desktop;
          
          return (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {/* Desktop Media */}
              <div className="hidden md:block absolute inset-0">
                {isVideo(desktop) ? (
                  <video src={desktop} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
                ) : (
                  <Image src={desktop} alt="Hero Background" fill priority={isActive} className="object-cover opacity-60" />
                )}
              </div>
              {/* Mobile Media */}
              <div className="block md:hidden absolute inset-0">
                {isVideo(mobile) ? (
                  <video src={mobile} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
                ) : (
                  <Image src={mobile} alt="Hero Background" fill priority={isActive} className="object-cover opacity-60" />
                )}
              </div>
            </div>
          );
        })}
        
        {/* Deep, heavy gradient to ensure buttons pop clearly and background blends into dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#110F0D] via-[#110F0D]/50 to-[#110F0D]/70 z-20 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center w-full max-w-[95vw] md:max-w-[85vw] px-4">
        
        <div className="mb-14 md:mb-[5.5rem]">
          <h1 className="hero-title font-serif text-[11vw] md:text-[6vw] leading-normal text-kcb-gold whitespace-nowrap drop-shadow-lg pb-2">
            King Chinese Bowl
          </h1>
        </div>

        {/* Buttons Row - Premium thick strokes, larger substantial pills, Montserrat font */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6 mb-12 w-full max-w-[1200px] px-4">
          
          {/* CALL */}
          <a href="tel:+917508450221" className="hero-fade group flex items-center justify-center gap-2 md:gap-2.5 px-6 md:px-8 py-[14px] md:py-[16px] rounded-full border-[1.5px] border-kcb-gold/70 bg-[#0A0A0A]/40 text-kcb-gold hover:bg-kcb-gold hover:border-kcb-gold hover:text-[#110F0D] transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[12px] md:text-[14px] font-sans font-medium tracking-[0.2em] whitespace-nowrap leading-none mt-px">
              CALL
            </span>
          </a>

          {/* RESERVATION */}
          <a href="#reservation" className="hero-fade group flex items-center justify-center gap-2 md:gap-2.5 px-6 md:px-8 py-[14px] md:py-[16px] rounded-full border-[1.5px] border-kcb-gold/70 bg-[#0A0A0A]/40 text-kcb-gold hover:bg-kcb-gold hover:border-kcb-gold hover:text-[#110F0D] transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="7" y1="11" x2="17" y2="11" />
              <line x1="7" y1="7" x2="7" y2="20" />
              <line x1="17" y1="7" x2="17" y2="20" />
            </svg>
            <span className="text-[12px] md:text-[14px] font-sans font-medium tracking-[0.2em] whitespace-nowrap leading-none mt-px">
              RESERVATION
            </span>
          </a>

          {/* MENU */}
          <a href="#menu" className="hero-fade group flex items-center justify-center gap-2 md:gap-2.5 px-6 md:px-8 py-[14px] md:py-[16px] rounded-full border-[1.5px] border-kcb-gold/70 bg-[#0A0A0A]/40 text-kcb-gold hover:bg-kcb-gold hover:border-kcb-gold hover:text-[#110F0D] transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0">
              <polygon points="12 20 4 10 7 4 12 9 17 4 20 10 12 20" />
            </svg>
            <span className="text-[12px] md:text-[14px] font-sans font-medium tracking-[0.2em] whitespace-nowrap leading-none mt-px">
              MENU
            </span>
          </a>

          {/* VIEW ON MAPS */}
          <a href="#locations" className="hero-fade group flex items-center justify-center gap-2 md:gap-2.5 px-6 md:px-8 py-[14px] md:py-[16px] rounded-full border-[1.5px] border-kcb-gold/70 bg-[#0A0A0A]/40 text-kcb-gold hover:bg-kcb-gold hover:border-kcb-gold hover:text-[#110F0D] transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0">
              <line x1="6" y1="5" x2="18" y2="5" />
              <circle cx="12" cy="14" r="6" />
            </svg>
            <span className="text-[12px] md:text-[14px] font-sans font-medium tracking-[0.2em] whitespace-nowrap leading-none mt-px">
              VIEW ON MAPS
            </span>
          </a>

        </div>
      </div>

      {/* Bottom Scroll Indicator - Classic Round Paper Lantern */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pb-4 hero-fade pointer-events-auto">
        <span className="scroll-text text-[0.55rem] tracking-[0.4em] text-kcb-gold mb-3 uppercase drop-shadow-md">
          Scroll
        </span>
        
        {/* lantern-sway enables the continuous GSAP wind motion. Hover states provide an interactive 'pull' effect and massive glow. */}
        <div className="lantern-sway relative flex flex-col justify-start items-center cursor-pointer transition-all duration-500 ease-out hover:drop-shadow-[0_0_40px_rgba(217,196,158,1)] hover:scale-[1.03] hover:translate-y-1 origin-top">
          
          {/* Ambient Inner Glow - Invisible by default, glows brilliantly on hover */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-kcb-gold/60 blur-[12px] md:blur-lg rounded-full pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />

          {/* Unchanged Lantern Drawing */}
          <svg viewBox="0 0 60 82" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-[6.5rem] md:w-[5rem] md:h-[9rem] text-kcb-gold relative z-10">
            
            {/* Ceiling Wire */}
            <line x1="30" y1="0" x2="30" y2="12" />
            
            {/* Top Cap */}
            <path strokeLinecap="round" d="M 26 12 L 34 12" />
            <path strokeLinecap="round" d="M 24 15 L 36 15" />
            <path strokeLinecap="round" d="M 22 18 L 38 18" />
            
            {/* Lantern Body */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M 22 18 C 8 18, 2 30, 2 38 C 2 46, 8 58, 22 58 L 38 58 C 52 58, 58 46, 58 38 C 58 30, 52 18, 38 18 Z" />
            
            {/* Vertical Seams */}
            <path strokeLinecap="round" d="M 22 18 C 14 28, 14 48, 22 58" />
            <path strokeLinecap="round" d="M 30 18 L 30 58" />
            <path strokeLinecap="round" d="M 38 18 C 46 28, 46 48, 38 58" />
            
            {/* Horizontal Bamboo Ribs */}
            <path strokeLinecap="round" d="M 11 25 L 49 25" />
            <path strokeLinecap="round" d="M 5 31 L 55 31" />
            <path strokeLinecap="round" d="M 2 38 L 58 38" />
            <path strokeLinecap="round" d="M 5 45 L 55 45" />
            <path strokeLinecap="round" d="M 11 51 L 49 51" />
            
            {/* Bottom Cap */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M 22 58 L 38 58 L 38 61 L 22 61 Z" />
            
            {/* Dense Tassel Skirt / Fringe */}
            <path strokeLinecap="round" d="M 22 61 L 22 75" />
            <path strokeLinecap="round" d="M 24 61 L 24 78" />
            <path strokeLinecap="round" d="M 26 61 L 26 76" />
            <path strokeLinecap="round" d="M 28 61 L 28 80" />
            <path strokeLinecap="round" d="M 32 61 L 32 80" />
            <path strokeLinecap="round" d="M 34 61 L 34 76" />
            <path strokeLinecap="round" d="M 36 61 L 36 78" />
            <path strokeLinecap="round" d="M 38 61 L 38 75" />
          </svg>

          {/* The Scroll Rope with Hollow Dot (Draws downward on scroll, crossing into next section) */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-[1px] bg-kcb-gold scroll-rope-line origin-top" style={{ height: "0px" }} />
            <div className="w-2.5 h-2.5 border-[1px] border-kcb-gold rounded-full scroll-rope-dot opacity-0 -translate-y-[1px]" />
          </div>

        </div>
      </div>
    </section>
  );
}
