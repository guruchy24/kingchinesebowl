'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JapaneseCuisinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade ins
      gsap.fromTo('.kanji-bg', 
        { opacity: 0, scale: 0.9 },
        { opacity: 0.05, scale: 1, duration: 4, ease: 'power2.out' }
      );
      
      gsap.fromTo('.intro-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, delay: 0.5, ease: 'expo.out' }
      );
      
      gsap.fromTo('.intro-image',
        { opacity: 0, scale: 1.1, clipPath: 'inset(10% 10% 10% 10%)' },
        { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 2.5, delay: 1, ease: 'power3.out' }
      );

      // Section 2 scroll reveals
      gsap.utils.toArray('.reveal-mask').forEach((el: any) => {
        gsap.fromTo(el, 
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { 
            clipPath: 'inset(0% 0% 0% 0%)', 
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1
            }
          }
        );
      });

      // Grid lines
      gsap.fromTo('.grid-line',
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: 'none',
          scrollTrigger: {
            trigger: '.section-2',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* Return Button */}
      <Link href="/" className="fixed top-8 left-8 z-50 text-xs tracking-[0.3em] hover:text-[#a3b18a] transition-colors duration-300 mix-blend-difference">
        ← RETURN
      </Link>

      {/* Subtle Falling Snow / Ink Drop effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
         <div className="absolute top-[-10%] left-[20%] w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-[pulse_3s_infinite]"></div>
         <div className="absolute top-[-10%] left-[50%] w-[1px] h-[120%] bg-gradient-to-b from-transparent via-[#a3b18a] to-transparent opacity-20 animate-[pulse_4s_infinite_1s]"></div>
         <div className="absolute top-[-10%] left-[80%] w-[1px] h-[120%] bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-[pulse_2.5s_infinite_2s]"></div>
      </div>

      {/* SECTION 1: Extreme Minimalism */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center z-10">
        <div className="kanji-bg absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[50vw] text-white opacity-0 select-none leading-none font-serif">水</span>
        </div>
        
        <div className="relative w-64 h-96 md:w-[28rem] md:h-[40rem] mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop" 
            alt="Sushi Minimal"
            className="intro-image object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        
        <div className="intro-title text-center z-10 mix-blend-difference">
          <h1 className="text-xl md:text-3xl tracking-[0.5em] font-light mb-4 text-white/90">PRECISION & ELEGANCE</h1>
          <p className="text-xs tracking-[0.4em] text-white/50">THE ESSENCE OF STILLNESS</p>
        </div>
      </section>

      {/* SECTION 2: The Art of Subtraction */}
      <section className="section-2 relative min-h-[200vh] w-full pt-32 pb-64 z-10">
        
        {/* Strict vertical grid lines */}
        <div className="absolute inset-0 flex justify-evenly pointer-events-none z-0">
          <div className="grid-line w-[1px] h-full bg-[#ffffff08] origin-top"></div>
          <div className="grid-line w-[1px] h-full bg-[#ffffff08] origin-top"></div>
          <div className="grid-line w-[1px] h-full bg-[#ffffff08] origin-top"></div>
          <div className="grid-line w-[1px] h-full bg-[#ffffff08] origin-top"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          
          <div className="text-center mb-48">
            <h2 className="text-2xl md:text-4xl tracking-[0.5em] font-extralight opacity-80">THE ART OF SUBTRACTION</h2>
          </div>

          <div className="flex flex-col gap-64">
            
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
              <div className="reveal-mask w-full md:w-5/12 aspect-[4/5] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=2031&auto=format&fit=crop"
                  alt="Ramen"
                  className="w-full h-full object-cover filter contrast-125 saturate-50"
                />
              </div>
              <div className="w-full md:w-4/12 space-y-8">
                <h3 className="text-2xl tracking-[0.4em] font-light text-[#a3b18a]">BOWL OF DEPTH</h3>
                <p className="text-white/50 leading-[2.5] text-sm font-light tracking-widest">
                  Hours of simmering. Decades of refinement. The bowl holds more than broth; it holds time itself, captured in perfect clarity.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-16 md:gap-32">
              <div className="reveal-mask w-full md:w-5/12 aspect-[4/5] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=2070&auto=format&fit=crop"
                  alt="Matcha"
                  className="w-full h-full object-cover filter contrast-125 saturate-[0.7] mix-blend-lighten"
                />
              </div>
              <div className="w-full md:w-4/12 space-y-8 md:text-right">
                <h3 className="text-2xl tracking-[0.4em] font-light text-[#a3b18a]">BITTER CLARITY</h3>
                <p className="text-white/50 leading-[2.5] text-sm font-light tracking-widest">
                  The whisk dances. The foam rises. A moment of pure, undistracted awareness in every sip of ceremonial green.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
              <div className="reveal-mask w-full md:w-6/12 aspect-[16/9] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop"
                  alt="Sashimi"
                  className="w-full h-full object-cover filter contrast-150 saturate-50 grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="w-full md:w-4/12 space-y-8">
                <h3 className="text-2xl tracking-[0.4em] font-light text-[#a3b18a]">THE CUT</h3>
                <p className="text-white/50 leading-[2.5] text-sm font-light tracking-widest">
                  Nothing added. Nothing hidden. The blade reveals truth in its most elemental, breathtaking form.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
