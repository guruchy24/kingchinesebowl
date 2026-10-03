"use client";

import React, { useState } from "react";
import Image from "next/image";

const LOCATIONS = [
  { name: "CHANDIGARH", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" },
  { name: "MOHALI", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop" },
  { name: "ZIRAKPUR", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop" }
];

const GRID_IMAGES = [
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
];

export default function Gallery({ media }: { media?: Record<string, Record<string, string>> }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Desktop-only upload = shows on both. Mobile-only upload = only shows on mobile.
  const uploadedImages = Object.values(media || {}).filter(item => item.desktop).map((item) => ({
    desktop: item.desktop,
    mobile: item.mobile || item.desktop,
  }));
  const mobileOnlyImages = Object.values(media || {}).filter(item => item.mobile && !item.desktop).map((item) => ({
    desktop: GRID_IMAGES[0],
    mobile: item.mobile,
  }));

  const allUploaded = [...uploadedImages, ...mobileOnlyImages];
  const dynamicGridImages = [
    ...allUploaded,
    ...GRID_IMAGES.slice(allUploaded.length).map(url => ({ desktop: url, mobile: url }))
  ];

  // Full-Screen Viewer Logic
  const currentIndex = dynamicGridImages.findIndex(img => img.desktop === selectedImage || img.mobile === selectedImage);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < dynamicGridImages.length - 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPrev) setSelectedImage(GRID_IMAGES[currentIndex - 1]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) setSelectedImage(GRID_IMAGES[currentIndex + 1]);
  };

  return (
    <div className="bg-[#0A0A0A] w-full relative">
      
      {/* ── 01. ASIAN TYPOGRAPHIC MOMENT (CHAPTER V) ── */}
      <section className="py-[15vh] md:py-[25vh] relative flex justify-center items-center overflow-hidden">
        {/* Massive washed out character behind */}
        <div className="absolute text-[80vw] md:text-[50vw] font-serif text-[#C41E2A]/5 leading-none select-none pointer-events-none">味</div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-[1px] h-16 md:h-24 bg-[#D4A853]/30 mb-8" />
          <h3 className="text-xs md:text-[1vw] tracking-[0.6em] text-[#C41E2A] uppercase mb-4">Chapter V</h3>
          <h2 className="text-[12vw] md:text-[5vw] font-serif text-[#F5F0EB] tracking-wide uppercase drop-shadow-2xl">Flavour</h2>
          <div className="w-[1px] h-16 md:h-24 bg-[#D4A853]/30 mt-8" />
        </div>
      </section>

      {/* ── 03. THE THREE-BRANCH INTRODUCTION ── */}
      <section className="w-full relative bg-[#110F0D]">
        <div className="text-center py-12 md:py-16 absolute top-0 left-0 w-full z-20 pointer-events-none mix-blend-difference text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          <h2 className="text-[7vw] md:text-[3vw] font-serif tracking-wider uppercase leading-tight">Three Places.<br/><span className="text-[#D4A853] italic">One Experience.</span></h2>
        </div>
        
        {/* Interactive Flex Panels */}
        <div className="flex flex-col md:flex-row h-[120vh] md:h-[80vh] w-full">
          {LOCATIONS.map((loc, idx) => (
            <div 
              key={loc.name}
              className="group relative flex-1 hover:flex-[2.5] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] border-b md:border-b-0 md:border-r border-[#2A2520] cursor-pointer overflow-hidden"
            >
              <Image 
                src={loc.image} 
                alt={loc.name} 
                fill 
                className="object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex flex-col items-start">
                <span className="text-[#C41E2A] text-xs md:text-sm tracking-[0.3em] font-light mb-2">0{idx + 1}</span>
                <h3 className="text-2xl md:text-[2vw] font-serif text-[#F5F0EB] tracking-wide group-hover:text-[#D4A853] transition-colors duration-500">{loc.name}</h3>
                
                {/* Reveal on hover on Desktop, permanently visible on Mobile */}
                <div className="overflow-hidden h-8 md:h-0 md:group-hover:h-8 transition-all duration-700 ease-out mt-2">
                  <p className="text-[#C4A882] text-[11px] md:text-sm tracking-widest uppercase font-light translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    <span className="md:hidden">Click to explore location →</span>
                    <span className="hidden md:inline">Explore Location →</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04. EDITORIAL GALLERY (Curated Composition) ── */}
      <section className="py-[10vh] md:py-[15vh] px-[5vw] w-full bg-[#0A0A0A]">
        <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
          <div className="w-12 md:w-16 h-[1px] bg-[#C41E2A]" />
          <h3 className="text-[#D4A853] tracking-[0.3em] md:tracking-[0.4em] uppercase text-xs md:text-sm font-light">The Details</h3>
        </div>

        {/* Editorial CSS Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
          
          {dynamicGridImages.map((src, idx) => {
            // Determine span based on index to create an editorial layout
            let colSpan = "col-span-1 md:col-span-1";
            let rowSpan = "row-span-1 md:row-span-1";
            if (idx === 0) { colSpan = "col-span-2 md:col-span-2"; rowSpan = "row-span-2 md:row-span-2"; }
            if (idx === 3) { colSpan = "col-span-2 md:col-span-2"; rowSpan = "row-span-1 md:row-span-1"; }
            if (idx === 4) { colSpan = "col-span-1 md:col-span-1"; rowSpan = "row-span-2 md:row-span-2"; }
            if (idx === 6) { colSpan = "col-span-2 md:col-span-2"; rowSpan = "row-span-1 md:row-span-1"; }

            return (
              <div 
                key={idx}
                className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-sm cursor-pointer`}
                onClick={() => setSelectedImage(src.desktop)} // Use desktop for fullscreen modal
              >
                <div className="hidden md:block absolute inset-0">
                  <Image src={src.desktop} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery Detail" />
                </div>
                <div className="block md:hidden absolute inset-0">
                  <Image src={src.mobile} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery Detail" />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            );
          })}

        </div>
      </section>

      {/* ── 05. FULL-SCREEN VIEWER ── */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Top Bar */}
          <div className="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-50">
            <div className="text-[#C4A882] tracking-[0.4em] uppercase text-xs font-light">King Chinese Bowl</div>
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="text-[#F5F0EB] text-5xl font-light hover:text-[#C41E2A] transition-colors leading-none"
            >
              ×
            </button>
          </div>
          
          {/* Image */}
          <div className="relative w-full h-full max-w-[85vw] max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Full screen view" 
              fill 
              className="object-contain animate-in zoom-in-95 duration-300 ease-out" 
            />
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 w-full px-12 py-8 flex justify-between items-center z-50" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handlePrev}
              className={`text-[#C4A882] tracking-[0.2em] uppercase text-xs transition-colors p-4 -ml-4 ${hasPrev ? 'hover:text-[#F5F0EB]' : 'opacity-30 cursor-not-allowed'}`}
            >
              ← Previous
            </button>
            
            <div className="text-[#F5F0EB] font-serif tracking-[0.2em]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(dynamicGridImages.length).padStart(2, '0')}
            </div>
            
            <button 
              onClick={handleNext}
              className={`text-[#C4A882] tracking-[0.2em] uppercase text-xs transition-colors p-4 -mr-4 ${hasNext ? 'hover:text-[#F5F0EB]' : 'opacity-30 cursor-not-allowed'}`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
