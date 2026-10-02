"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop",
    alt: "Asian cuisine dish",
    rowSpan: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    alt: "Noodle bowl",
    rowSpan: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    alt: "Chinese food platter",
    rowSpan: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
    alt: "Stir fry dish",
    rowSpan: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    alt: "Dim sum selection",
    rowSpan: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=800&auto=format&fit=crop",
    alt: "Asian appetizer",
    rowSpan: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=800&auto=format&fit=crop",
    alt: "Chopstick dining",
    rowSpan: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop",
    alt: "Traditional cuisine",
    rowSpan: 2,
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#141414] py-[15vh] px-[5vw]"
    >
      <h2 className="text-[2vw] tracking-[10px] text-[#C41E2A] text-center mb-[8vh] font-light">
        GALLERY
      </h2>

      <div className="grid grid-cols-4 auto-rows-[200px] gap-3">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className={`overflow-hidden rounded-sm relative group ${
              img.rowSpan === 2 ? "row-span-2" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="25vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay that fades on hover */}
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
