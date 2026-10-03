"use client";

import { useState } from "react";
import Image from "next/image";

const cuisines = [
  { 
    id: 'slide_1', 
    name: 'CHINESE', 
    desc: 'The heat of the wok. Fiery, bold, and tossed to perfection with authentic street-style mastery.',
    fallback: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'slide_2', 
    name: 'KOREAN', 
    desc: 'Sweet, spicy, and fermented. From crispy glazes to deeply savory broths, the soul of Seoul.',
    fallback: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'slide_3', 
    name: 'JAPANESE', 
    desc: 'Umami and precision. Delicate, refined, and deeply comforting mastery of broth and noodle.',
    fallback: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'slide_4', 
    name: 'TIBETAN', 
    desc: 'Mountain comfort. Steaming momos and rich thukpa, bringing warmth crafted for the highest peaks.',
    fallback: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2000&auto=format&fit=crop'
  },
];

export default function Section02({ media }: { media?: Record<string, Record<string, string>> }) {
  // Default to the first one being active on mobile
  const [activeIndex, setActiveIndex] = useState(0);

  const getMediaUrl = (slot: string, device: 'desktop' | 'mobile', fallback: string) => {
    return media?.[slot]?.[device] || media?.[slot]?.['desktop'] || media?.[slot]?.['mobile'] || fallback;
  };

  return (
    <section id="philosophy" className="relative h-[120vh] md:h-screen w-full bg-[#0A0A0A] flex flex-col md:flex-row overflow-hidden">
      
      {/* Absolute Title overlay that stays in place on desktop */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-30 pointer-events-none drop-shadow-md">
        <p className="text-[10px] md:text-xs text-[#F5F0EB] tracking-[0.4em] font-light uppercase mix-blend-overlay opacity-80">
          02 / The Philosophy
        </p>
      </div>

      {cuisines.map((cuisine, index) => {
        const desktopImg = getMediaUrl(cuisine.id, 'desktop', cuisine.fallback);
        const mobileImg = getMediaUrl(cuisine.id, 'mobile', cuisine.fallback);
        const isActive = activeIndex === index;

        return (
          <div 
            key={cuisine.id}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={`
              relative flex flex-col justify-end overflow-hidden cursor-pointer
              transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-b md:border-b-0 md:border-r border-[#2A2520]
              ${isActive ? 'flex-[3] md:flex-[4]' : 'flex-1'}
            `}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={desktopImg} 
                alt={cuisine.name} 
                fill 
                className={`hidden md:block object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-105 opacity-80' : 'scale-100 opacity-40 grayscale-[30%]'}`} 
              />
              <Image 
                src={mobileImg} 
                alt={cuisine.name} 
                fill 
                className={`block md:hidden object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-105 opacity-80' : 'scale-100 opacity-40 grayscale-[30%]'}`} 
              />
              {/* Gradient overlays to ensure text is always readable */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'} bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent`} />
              <div className={`absolute inset-0 transition-opacity duration-700 ${!isActive ? 'opacity-100' : 'opacity-0'} bg-[#0A0A0A]/60`} />
            </div>

            {/* Content Area */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 md:p-12">
              
              <div className={`
                flex flex-col justify-end h-full
                transition-all duration-700 ease-out
                ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 md:translate-y-0 opacity-100 md:opacity-60'}
              `}>
                
                {/* Horizontal Title (Visible when active or on mobile) */}
                <h2 className={`
                  font-serif text-[#F5F0EB] transition-all duration-500
                  ${isActive ? 'text-4xl md:text-6xl mb-2 md:mb-4 drop-shadow-lg' : 'text-xl md:text-2xl mb-0 md:rotate-[-90deg] md:-translate-y-12 md:origin-bottom-left md:whitespace-nowrap'}
                `}>
                  {cuisine.name}
                </h2>

                {/* Divider Line */}
                <div className={`
                  bg-kcb-red transition-all duration-500
                  ${isActive ? 'w-12 md:w-16 h-[2px] mb-4 opacity-100' : 'w-0 h-[2px] mb-0 opacity-0'}
                `} />

                {/* Description Text */}
                <div className={`
                  overflow-hidden transition-all duration-700
                  ${isActive ? 'max-h-[200px] opacity-100 delay-100' : 'max-h-0 opacity-0'}
                `}>
                  <p className="text-kcb-gold text-xs md:text-sm tracking-wide leading-relaxed md:max-w-xs">
                    {cuisine.desc}
                  </p>
                </div>

              </div>
            </div>

            {/* Large background number for design flair */}
            <div className={`
              absolute top-8 right-8 z-10 font-serif text-[#F5F0EB] transition-all duration-700 pointer-events-none
              ${isActive ? 'text-6xl opacity-10' : 'text-3xl opacity-5'}
            `}>
              0{index + 1}
            </div>

          </div>
        );
      })}
    </section>
  );
}
