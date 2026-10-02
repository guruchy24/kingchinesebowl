"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitLeft() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade text up
      gsap.fromTo(
        ".split-left-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Subtle parallax on the tall image
      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col md:flex-row bg-kcb-base border-t border-kcb-border/30">
      
      {/* Left side: Text Panel */}
      <div className="w-full md:w-[50%] flex flex-col justify-center px-[8vw] py-[15vh] z-10 relative">
        <h2 className="split-left-fade font-serif text-[4vw] leading-none text-kcb-gold mb-8">
          The Origin
        </h2>

        <p className="split-left-fade text-kcb-muted text-sm leading-relaxed mb-6">
          Our founders had the opportunity to taste the flavors of many Far Eastern restaurants during their travels. These experiences turned into a passion for Far Eastern cuisine. Upon returning, they set out with the desire to enrich the culinary scene locally.
        </p>

        <p className="split-left-fade text-kcb-muted text-sm leading-relaxed">
          Stepping into the culinary world with a fresh concept, they seized the opportunity to establish King Chinese Bowl. Today, we continue to offer guests the opportunity to discover new flavors, while skillfully blending Asian cuisine with modern touches across our locations.
        </p>
      </div>

      {/* Right side: Tall image on grid background (Screenshot 3 style) */}
      <div className="w-full md:w-[50%] relative min-h-[70vh] md:min-h-full bg-kcb-base flex items-center justify-center p-[5vw] grid-bg">
        <div ref={imageRef} className="relative w-full max-w-md aspect-[2/3] shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop"
            alt="Artistic culinary depiction"
            fill
            className="object-cover rounded-sm border border-kcb-gold/10"
          />
        </div>
      </div>

    </section>
  );
}
