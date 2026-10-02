"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { type: "text" as const },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1600&auto=format&fit=crop",
    alt: "Pan-Asian dish 1",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop",
    alt: "Pan-Asian dish 2",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1600&auto=format&fit=crop",
    alt: "Pan-Asian dish 3",
  },
];

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current!;

      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => "+=" + (container.scrollWidth - window.innerWidth),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#141414]"
    >
      <div
        ref={containerRef}
        className="flex h-full"
        style={{ width: "340vw" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex h-screen items-center justify-center"
            style={{ width: "85vw" }}
          >
            {slide.type === "text" ? (
              <div className="flex flex-col items-start gap-6 px-[10vw]">
                <h2 className="text-[4vw] font-bold tracking-[5px] text-[#C41E2A]">
                  PAN-ASIAN CRAFT
                </h2>
                <p className="text-base tracking-wider text-[#C4A882]">
                  Authentic flavors. Generous portions. Affordable luxury.
                </p>
              </div>
            ) : (
              <div className="px-[4vw]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-[65vh] w-full rounded-sm object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
