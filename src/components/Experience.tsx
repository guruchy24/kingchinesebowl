"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import customLoader from "@/lib/cloudflare-image-loader";

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ media }: { media?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 2, // Smooth follow
          start: "top top",
          end: "+=100%", // Exactly one screen height
        },
      });

      tl.to(mediaRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "none",
        duration: 1,
      }).to(
        overlayRef.current,
        {
          opacity: 1,
          ease: "none",
          duration: 0.5,
        },
        ">-0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center bg-[#0A0A0A]"
    >
      <div
        ref={mediaRef}
        className="relative w-[80vw] h-[60vw] md:w-[40vw] md:h-[15vw] overflow-hidden rounded-sm"
      >
        <img
          src={customLoader({ src: media?.experience?.main?.desktop || "https://images.unsplash.com/photo-1585032226651-759b368d7246", width: 1920, quality: 80 })}
          alt="King Chinese Bowl experience"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <span
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-[16px] md:text-[3vw] font-light tracking-[0.2em] md:tracking-[1vw] text-[#F5F0EB] opacity-0 text-center px-4 md:px-0"
        >
          STEP INTO THE EXPERIENCE
        </span>
      </div>
    </section>
  );
}
