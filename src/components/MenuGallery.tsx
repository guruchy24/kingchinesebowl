"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

export default function MenuGallery({ items }: { items: MenuItem[] }) {
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

  // First slide is text, plus one slide for each item
  const totalSlides = 1 + items.length;
  const containerWidth = `${totalSlides * 85}vw`;

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]"
    >
      <div
        ref={containerRef}
        className="flex h-full"
        style={{ width: containerWidth }}
      >
        {/* Intro Slide */}
        <div
          className="flex h-screen items-center justify-center shrink-0"
          style={{ width: "85vw" }}
        >
          <div className="flex flex-col items-start gap-6 px-[10vw]">
            <h2 className="font-serif text-[6vw] tracking-[0.2em] text-[#F5F0EB]">
              PAN-ASIAN <br /> <span className="text-[#C41E2A]">CRAFT</span>
            </h2>
            <p className="text-base tracking-[0.2em] text-[#C4A882] font-light max-w-md uppercase">
              Authentic flavors. Generous portions. Affordable luxury.
            </p>
          </div>
        </div>

        {/* Dynamic DB Items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex h-screen items-center justify-center shrink-0 px-[4vw]"
            style={{ width: "85vw" }}
          >
            <div className="relative h-[70vh] w-full rounded-sm overflow-hidden group">
              {item.image_url && (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  sizes="80vw"
                  quality={90}
                />
              )}
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent"></div>
              
              {/* Text Info */}
              <div className="absolute bottom-0 left-0 p-[4vw] flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <h3 className="font-serif text-[3vw] text-[#F5F0EB] tracking-wider leading-none">
                    {item.name}
                  </h3>
                  <span className="text-[1.5vw] text-[#D4A853] font-light tracking-widest border border-[#D4A853]/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    ₹{(item.price / 100).toFixed(0)}
                  </span>
                </div>
                <p className="text-[#F5F0EB]/70 text-lg font-light tracking-wide max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
