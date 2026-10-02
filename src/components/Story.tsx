"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const floatingImages = [
  {
    src: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=600&auto=format&fit=crop",
    alt: "Asian cuisine detail 1",
    className: "top-[15%] left-[8%] w-[18vw] h-[25vw]",
    y: -300,
    scale: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=600&auto=format&fit=crop",
    alt: "Asian cuisine detail 2",
    className: "top-[45%] right-[10%] w-[12vw] h-[18vw]",
    y: -500,
    scale: 1.2,
  },
  {
    src: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop",
    alt: "Asian cuisine detail 3",
    className: "bottom-[15%] left-[15%] w-[22vw] h-[14vw]",
    y: -200,
    scale: 1,
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      floatingImages.forEach((img, i) => {
        const el = imageRefs.current[i];
        if (!el) return;

        const tweenVars: gsap.TweenVars = {
          y: img.y,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        };

        if (img.scale !== 1) {
          tweenVars.scale = img.scale;
        }

        gsap.to(el, tweenVars);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-[200vh] w-full overflow-hidden bg-[#0A0A0A]"
    >
      {/* Sticky centered text */}
      <div className="sticky top-1/2 z-10 mx-auto -translate-y-1/2 text-center">
        <h2 className="text-[3vw] font-light tracking-[8px] text-[#D4A853]">
          OUR STORY
        </h2>
        <p className="mx-auto mt-8 max-w-[50vw] text-[1.2vw] leading-relaxed text-[#C4A882]">
          Born from a passion for authentic Asian street food, King Chinese Bowl
          brings the heat, the flavor, and the soul of Pan-Asian cuisine to the
          heart of Tricity. From steaming bowls of Thukpa to crispy Afghani
          Momos — every dish is a journey.
        </p>
      </div>

      {/* Floating parallax images */}
      {floatingImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            imageRefs.current[i] = el;
          }}
          className={`absolute overflow-hidden rounded-sm opacity-80 ${img.className}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </section>
  );
}
