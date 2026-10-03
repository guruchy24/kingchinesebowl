'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TibetanCuisinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(mountainRef.current, {
        y: '20%',
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        y: '-30%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(scriptRef.current, {
        y: '-50%',
        rotation: 10,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section 2 Parallax & Reveal
      const cards = gsap.utils.toArray('.food-card');
      cards.forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Slow drifting image parallax
        gsap.to(card.querySelector('.card-img'), {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // Floating dust / wind effects
      const dustMotes = gsap.utils.toArray('.dust-mote');
      dustMotes.forEach((mote: any) => {
        gsap.to(mote, {
          x: '100vw',
          y: () => `+=${Math.random() * 200 - 100}`,
          rotation: () => Math.random() * 360,
          opacity: 0,
          duration: () => 10 + Math.random() * 20,
          repeat: -1,
          ease: 'none',
          delay: () => Math.random() * -20,
        });
      });

      // Section 3 Reveal
      gsap.fromTo('.hearth-content',
        { scale: 0.9, opacity: 0, filter: 'blur(10px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 60%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-[#110C0B] text-[#D8C3A5] overflow-x-hidden font-serif selection:bg-[#7D2E24] selection:text-white">
      
      {/* Fixed Back Button */}
      <Link href="/" className="fixed top-8 left-8 z-50 mix-blend-difference text-white tracking-widest text-sm hover:text-[#D4AF37] transition-colors uppercase">
        &larr; Return
      </Link>

      {/* Floating Dust / Wind Layer */}
      <div ref={dustRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-50">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="dust-mote absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `-10vw`,
              opacity: Math.random() * 0.5 + 0.1,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* SECTION 1: Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          ref={mountainRef}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1544261775-b9f1d052697b?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center"
          style={{ height: '120%' }}
        >
          {/* Overlay for depth and dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#110C0B]/60 via-[#110C0B]/80 to-[#110C0B]" />
        </div>

        {/* Faint Tibetan Script */}
        <div ref={scriptRef} className="absolute z-0 text-[30vw] font-bold text-[#7D2E24] opacity-5 select-none pointer-events-none tracking-tighter" style={{ fontFamily: 'serif' }}>
          རི་
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold tracking-tight text-[#EAE2D3] drop-shadow-2xl uppercase mix-blend-overlay">
            Himalayan<br/>
            <span className="text-[#D4AF37] italic font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Soul Food</span>
          </h1>
          <div className="mt-8 w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50" />
        </div>
      </section>

      {/* SECTION 2: Warmth in the Cold */}
      <section ref={section2Ref} className="relative min-h-screen py-32 px-4 md:px-16 lg:px-32 z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-24 text-center tracking-widest text-[#EAE2D3]">
            WARMTH <span className="text-[#7D2E24]">IN THE</span> COLD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            {/* Card 1: Momos */}
            <div className="food-card relative group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-[#D4AF37]/20 shadow-2xl">
                <div className="card-img absolute inset-0 -top-[20%] h-[140%] w-full bg-[url('https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center sepia-[0.3] brightness-110 contrast-125" />
                <div className="absolute inset-0 bg-[#7D2E24]/10 mix-blend-color transition-opacity group-hover:opacity-0" />
              </div>
              <div className="absolute -bottom-8 -right-8 md:-right-16 bg-[#1A1311] p-8 ring-1 ring-[#7D2E24]/30 w-[80%] max-w-sm backdrop-blur-sm shadow-xl">
                <h3 className="text-2xl text-[#D4AF37] mb-2 tracking-wider">MOMOS</h3>
                <p className="text-sm leading-relaxed text-[#A69B8D]">
                  Hand-pleated parcels of comfort, steaming with earthy spices and tender fillings, born in the high altitudes.
                </p>
              </div>
            </div>

            {/* Card 2: Thukpa */}
            <div className="food-card relative group mt-32 md:mt-64">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-[#D4AF37]/20 shadow-2xl">
                <div className="card-img absolute inset-0 -top-[20%] h-[140%] w-full bg-[url('https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center sepia-[0.4] brightness-105 contrast-120" />
                <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-color transition-opacity group-hover:opacity-0" />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-16 bg-[#1A1311] p-8 ring-1 ring-[#7D2E24]/30 w-[80%] max-w-sm backdrop-blur-sm shadow-xl">
                <h3 className="text-2xl text-[#D4AF37] mb-2 tracking-wider">THUKPA</h3>
                <p className="text-sm leading-relaxed text-[#A69B8D]">
                  A soul-warming noodle broth deeply steeped in mountain herbs, delivering resilience in every spoonful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Hearth */}
      <section ref={section3Ref} className="relative min-h-screen flex items-center justify-center p-4 py-32 z-20 overflow-hidden">
        {/* Deep rustic wood texture background */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="hearth-content relative w-full max-w-4xl bg-[#150F0D]/90 p-12 md:p-24 shadow-[0_0_50px_rgba(212,175,55,0.1)] ring-1 ring-[#D4AF37]/40 backdrop-blur-md">
          {/* Glowing borders */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          
          <div className="text-center space-y-8">
            <span className="text-[#7D2E24] tracking-[0.5em] text-sm font-bold block">THE HEARTH</span>
            <h2 className="text-4xl md:text-6xl text-[#EAE2D3] font-light">
              Gather Around the Fire
            </h2>
            <p className="text-lg md:text-xl text-[#A69B8D] max-w-2xl mx-auto leading-loose italic">
              "In the shadow of the mountains, the hearth is the heart. Here, food is not merely sustenance, but a ritual of warmth, shared among souls."
            </p>
            
            <button className="mt-12 px-12 py-4 border border-[#7D2E24] text-[#D8C3A5] hover:bg-[#7D2E24] hover:text-[#EAE2D3] transition-all duration-500 tracking-widest text-sm bg-transparent group overflow-hidden relative">
              <span className="relative z-10">RESERVE A SEAT</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 mix-blend-overlay" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
