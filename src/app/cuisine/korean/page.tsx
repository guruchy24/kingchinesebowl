'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KoreanCuisine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );

      // Parallax for Section 1 background
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section 2: Polaroids fanning out
      const polaroids = gsap.utils.toArray('.polaroid');
      
      gsap.set(polaroids, {
        opacity: 0,
        y: 100,
        rotation: 0,
        scale: 0.8
      });

      ScrollTrigger.create({
        trigger: '#section-2',
        start: 'top 60%',
        animation: gsap.to(polaroids, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: (i) => [-15, 0, 15][i % 3], // Fan out effect
          stagger: 0.2,
          duration: 1,
          ease: 'back.out(1.7)'
        }),
        toggleActions: 'play reverse play reverse',
      });

      // Section 3: Gallery fade up
      const galleryItems = gsap.utils.toArray('.gallery-item');
      gsap.fromTo(galleryItems, 
        { opacity: 0, y: 50, filter: 'contrast(1) brightness(0.5)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'contrast(1.5) brightness(1)',
          stagger: 0.1, 
          duration: 1, 
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 70%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .neon-text {
          color: #fff;
          text-shadow:
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 20px #8B3A62,
            0 0 40px #8B3A62,
            0 0 80px #8B3A62,
            0 0 90px #8B3A62,
            0 0 100px #8B3A62,
            0 0 150px #8B3A62;
          animation: flicker 1.5s infinite alternate;
        }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.5;
          }
        }

        .glitch-effect {
          position: relative;
        }
        .glitch-effect::before,
        .glitch-effect::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .glitch-effect::before {
          left: 2px;
          text-shadow: -2px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .glitch-effect::after {
          left: -2px;
          text-shadow: -2px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(27px, 9999px, 86px, 0); }
          20% { clip: rect(65px, 9999px, 16px, 0); }
          40% { clip: rect(111px, 9999px, 83px, 0); }
          60% { clip: rect(32px, 9999px, 91px, 0); }
          80% { clip: rect(82px, 9999px, 17px, 0); }
          100% { clip: rect(24px, 9999px, 5px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(104px, 9999px, 26px, 0); }
          20% { clip: rect(15px, 9999px, 16px, 0); }
          40% { clip: rect(96px, 9999px, 49px, 0); }
          60% { clip: rect(48px, 9999px, 95px, 0); }
          80% { clip: rect(79px, 9999px, 15px, 0); }
          100% { clip: rect(5px, 9999px, 117px, 0); }
        }
      `}} />

      {/* Return Button */}
      <Link href="/" className="fixed top-8 left-8 z-50 text-white hover:text-[#8B3A62] transition-colors duration-300 font-bold tracking-widest text-sm mix-blend-difference">
        ← RETURN
      </Link>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <div 
          className="hero-bg absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546702657-610115049a42?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0"></div>
        
        <div className="z-10 text-center flex flex-col items-center">
          <div className="text-[10rem] md:text-[15rem] leading-none text-[#8B3A62]/20 font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none select-none glitch-effect" data-text="발효">
            발효
          </div>
          <h1 ref={titleRef} className="text-6xl md:text-9xl font-black tracking-tighter neon-text uppercase z-10 text-center">
            Fire &
            <br /> Fermentation
          </h1>
          <p className="mt-8 text-lg md:text-xl tracking-[0.3em] text-gray-400 uppercase glitch-effect" data-text="The neon pulse of Seoul">The neon pulse of Seoul</p>
        </div>
      </section>

      {/* Section 2: The Soul of Seoul */}
      <section id="section-2" className="relative min-h-[120vh] py-32 flex flex-col items-center justify-center bg-black/95">
        <div className="max-w-6xl w-full px-8 relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold mb-32 text-center neon-text text-[#8B3A62]">The Soul of Seoul</h2>
          
          <div className="relative h-[600px] flex justify-center items-center perspective-[1000px]">
            {/* Polaroid 1 */}
            <div className="polaroid absolute bg-zinc-900 p-4 pb-16 shadow-2xl origin-bottom transition-shadow hover:shadow-[0_0_40px_#8B3A62] z-10 transform-gpu border border-zinc-800">
              <div className="w-[260px] h-[320px] md:w-[300px] md:h-[350px] overflow-hidden bg-black">
                <img src="https://images.unsplash.com/photo-1632207191674-8df991a0c441?auto=format&fit=crop&q=80" alt="Kimchi" className="w-full h-full object-cover filter contrast-125 saturate-150" />
              </div>
              <p className="text-white font-bold text-center mt-4 text-xl tracking-widest uppercase">Kimchi</p>
            </div>
            
            {/* Polaroid 2 */}
            <div className="polaroid absolute bg-zinc-900 p-4 pb-16 shadow-2xl origin-bottom transition-shadow hover:shadow-[0_0_40px_#8B3A62] z-20 transform-gpu border border-zinc-800">
              <div className="w-[260px] h-[320px] md:w-[300px] md:h-[350px] overflow-hidden bg-black">
                <img src="https://images.unsplash.com/photo-1549488344-c6c745811776?auto=format&fit=crop&q=80" alt="K-BBQ" className="w-full h-full object-cover filter contrast-125 saturate-150" />
              </div>
              <p className="text-white font-bold text-center mt-4 text-xl tracking-widest uppercase">K-BBQ</p>
            </div>
            
            {/* Polaroid 3 */}
            <div className="polaroid absolute bg-zinc-900 p-4 pb-16 shadow-2xl origin-bottom transition-shadow hover:shadow-[0_0_40px_#8B3A62] z-30 transform-gpu border border-zinc-800">
              <div className="w-[260px] h-[320px] md:w-[300px] md:h-[350px] overflow-hidden bg-black">
                <img src="https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&q=80" alt="Bibimbap" className="w-full h-full object-cover filter contrast-125 saturate-150" />
              </div>
              <p className="text-white font-bold text-center mt-4 text-xl tracking-widest uppercase">Bibimbap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Night Market */}
      <section ref={galleryRef} className="relative min-h-[100vh] py-32 bg-black flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B3A62]/10 via-black to-black"></div>
        <div className="max-w-7xl w-full mx-auto px-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-16 uppercase tracking-wider border-l-4 border-[#8B3A62] pl-6 glitch-effect" data-text="The Night Market">The Night Market</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="gallery-item group relative h-[500px] md:h-[600px] overflow-hidden border border-zinc-900">
              <img src="https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&q=80" alt="Tteokbokki" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tighter">STREET FIRE</h3>
                <p className="text-[#8B3A62] uppercase tracking-[0.2em] text-sm font-bold">Tteokbokki</p>
              </div>
            </div>
            
            <div className="gallery-item group relative h-[500px] md:h-[600px] overflow-hidden md:mt-32 border border-zinc-900">
              <img src="https://images.unsplash.com/photo-1550130635-f481c154cb5d?auto=format&fit=crop&q=80" alt="Gochujang" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tighter">RED HEAT</h3>
                <p className="text-[#8B3A62] uppercase tracking-[0.2em] text-sm font-bold">Gochujang Spices</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
