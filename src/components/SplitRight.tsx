"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitRight() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Word reveal for heading when scrolling into view
      gsap.to(".split-word-inner", {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Fade up content
      gsap.fromTo(
        ".split-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headingText = "The symbol of authentic taste. Protector of culinary heritage and modern fusion.".split(" ");

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col md:flex-row bg-kcb-base">
      {/* Left side: Full bleed image */}
      <div className="w-full md:w-[55%] relative min-h-[50vh] md:min-h-full">
        <Image
          src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1600&auto=format&fit=crop"
          alt="Restaurant Interior"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side: Overlapping Panel (Screenshot 2 style) */}
      <div className="w-full md:w-[50%] md:-ml-[5%] relative z-10 bg-[#1A1714]/95 backdrop-blur-sm flex flex-col justify-center px-[8vw] py-[15vh]">
        
        <h2 className="font-serif text-[3.5vw] leading-[1.1] text-kcb-gold mb-8 flex flex-wrap gap-x-[1vw]">
          {headingText.map((word, i) => (
            <div key={i} className="word-line">
              <span className="split-word-inner block">{word}</span>
            </div>
          ))}
        </h2>

        <div className="split-fade">
          <p className="text-kcb-muted text-sm md:text-base font-light leading-relaxed mb-10">
            King Chinese Bowl redefines Far Eastern cuisine in Tricity by blending authentic Asian Experience with a unique local touch. With a commitment to sustainability, exceptional quality, and creative fusion, we position ourselves as a distinctive destination for refined palates seeking a memorable culinary journey.
          </p>

          <a
            href="#about"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-kcb-gold/40 text-kcb-gold text-xs tracking-[0.2em] hover:border-kcb-gold transition-colors duration-500"
          >
            {/* Minimalist icon matching Inari's button style */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            ABOUT US
          </a>
        </div>
      </div>
    </section>
  );
}
