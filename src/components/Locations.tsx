"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "MOHALI",
    address: "Sector 68, Near Coffee Club House, ALC Group, Plot No. 15",
  },
  {
    name: "CHANDIGARH",
    address: "Sector 15 & Sector 7A",
  },
  {
    name: "ZIRAKPUR",
    address: "VIP Road & Bir Chhat",
  },
];

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
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
      id="locations"
      ref={sectionRef}
      className="py-[15vh] px-[5vw] bg-[#0A0A0A]"
    >
      <h2 className="text-[2vw] tracking-[10px] text-[#C41E2A] text-center mb-[8vh] font-light">
        LOCATIONS
      </h2>

      <div className="flex justify-between gap-[4vw]">
        {locations.map((loc, i) => (
          <div
            key={loc.name}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="flex-1 bg-transparent border-t border-[#2A2520] pt-12 transition-all duration-500 hover:border-t-[#D4A853] hover:-translate-y-1"
          >
            <h3 className="text-xl tracking-[4px] text-[#F5F0EB] mb-4 font-light">
              {loc.name}
            </h3>
            <p className="text-[#C4A882]/60 text-sm tracking-wide">
              {loc.address}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
