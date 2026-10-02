"use client";

import { useState } from "react";
import Image from "next/image";

const LOCATIONS_DATA = [
  {
    id: "chandigarh",
    name: "CHANDIGARH",
    address: "Sector 15 & Sector 7A",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 73409 98337",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop",
    mapLink: "https://maps.google.com/?q=Sector+15+Chandigarh"
  },
  {
    id: "mohali",
    name: "MOHALI",
    address: "Sector 68, Near Coffee Club House, ALC Group",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 7508 4502 21",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop",
    mapLink: "https://maps.google.com/?q=Sector+68+Mohali"
  },
  {
    id: "zirakpur",
    name: "ZIRAKPUR",
    address: "VIP Road & Bir Chhat",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 7508 4502 21",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop",
    mapLink: "https://maps.google.com/?q=VIP+Road+Zirakpur"
  }
];

export default function Locations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLoc = LOCATIONS_DATA[activeIndex];

  return (
    <section className="w-full h-screen relative bg-[#0A0A0A] flex flex-col justify-center overflow-hidden border-t border-[#2A2520]">
      
      {/* ── CINEMATIC BACKGROUND IMAGES (Crossfade) ── */}
      {LOCATIONS_DATA.map((loc, idx) => (
        <div 
          key={loc.id} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'}`}
        >
          <Image src={loc.image} alt={loc.name} fill className="object-cover" />
          {/* Heavy gradients to ensure perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row max-w-[1600px] mx-auto px-[5vw] lg:px-[8vw] items-center">
        
        {/* LEFT SIDE: Information */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full pt-[10vh]">
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-12 h-[1px] bg-[#C41E2A]" />
            <h3 className="text-[#D4A853] tracking-[0.4em] uppercase text-xs font-light">Find Your KCB</h3>
          </div>

          <div key={activeLoc.id} className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <h2 className="text-[12vw] md:text-[6vw] font-serif text-[#F5F0EB] leading-none mb-12 tracking-wide drop-shadow-2xl">
              {activeLoc.name}
            </h2>
            
            <div className="space-y-8 border-l border-[#C41E2A]/30 pl-8 mb-16">
              <div>
                <span className="block text-[#C4A882] text-[10px] tracking-[0.3em] uppercase mb-2">Address</span>
                <p className="text-[#F5F0EB] font-light tracking-wider text-base md:text-lg">{activeLoc.address}</p>
              </div>
              <div>
                <span className="block text-[#C4A882] text-[10px] tracking-[0.3em] uppercase mb-2">Hours</span>
                <p className="text-[#F5F0EB] font-light tracking-wider text-base md:text-lg">{activeLoc.hours}</p>
              </div>
              <div>
                <span className="block text-[#C4A882] text-[10px] tracking-[0.3em] uppercase mb-2">Phone</span>
                <p className="text-[#F5F0EB] font-light tracking-wider text-base md:text-lg">{activeLoc.phone}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a 
                href={activeLoc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#D4A853]/50 text-[#D4A853] px-10 py-4 text-xs tracking-[0.2em] hover:bg-[#D4A853] hover:text-[#0A0A0A] transition-colors rounded-sm uppercase text-center"
              >
                Get Directions
              </a>
              <button className="inline-block bg-[#C41E2A] text-[#F5F0EB] px-10 py-4 text-xs tracking-[0.2em] hover:bg-[#8B1A1A] transition-colors rounded-sm uppercase text-center outline-none">
                Order Online
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Selector */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-end mt-16 md:mt-0 pb-[10vh]">
          <div className="text-[#C4A882]/50 text-[10px] tracking-[0.4em] uppercase mb-12 font-light">Select Location</div>
          
          <div className="flex flex-col items-end gap-10">
            {LOCATIONS_DATA.map((loc, idx) => (
              <button
                key={loc.id}
                onClick={() => setActiveIndex(idx)}
                className="group flex flex-col items-end text-right outline-none focus:outline-none"
              >
                <div className="flex items-center gap-8">
                  <span className={`text-sm tracking-[0.3em] transition-colors duration-500 ${idx === activeIndex ? 'text-[#C41E2A]' : 'text-[#C4A882]/40 group-hover:text-[#C4A882]'}`}>
                    0{idx + 1}
                  </span>
                  
                  <h3 className={`text-[3vw] md:text-[2.5vw] font-serif tracking-widest transition-all duration-500 ${idx === activeIndex ? 'text-[#F5F0EB] scale-110 origin-right drop-shadow-xl' : 'text-[#C4A882]/40 hover:text-[#F5F0EB]'}`}>
                    {loc.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
