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
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default to first open on mobile

  return (
    <section id="locations" className="w-full relative bg-[#110F0D]">
      
      {/* ── HEADING OVERLAY ── */}
      <div className="text-center py-12 md:py-16 absolute top-0 left-0 w-full z-20 pointer-events-none mix-blend-difference text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <h2 className="text-[7vw] md:text-[3vw] font-serif tracking-wider uppercase leading-tight">Find Your<br/><span className="text-[#D4A853] italic">KCB Experience.</span></h2>
      </div>
      
      {/* ── INTERACTIVE PANELS ── */}
      <div className="flex flex-col md:flex-row h-[130vh] md:h-screen w-full">
        {LOCATIONS_DATA.map((loc, idx) => {
          const isActiveOnMobile = activeIndex === idx;

          return (
            <div 
              key={loc.id}
              onClick={() => setActiveIndex(idx)}
              className={`
                group relative transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] 
                border-b md:border-b-0 md:border-r border-[#2A2520] cursor-pointer overflow-hidden
                ${isActiveOnMobile ? "flex-[2.5]" : "flex-1"} 
                md:flex-1 md:hover:flex-[2.5]
              `}
            >
              {/* Background Image */}
              <Image 
                src={loc.image} 
                alt={loc.name} 
                fill 
                className="object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-700 md:group-hover:scale-105 transform"
                style={isActiveOnMobile ? { opacity: 1 } : {}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 opacity-90 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Content Box */}
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex flex-col items-start right-6 md:right-12">
                
                {/* Number & Title */}
                <span className="text-[#C41E2A] text-xs md:text-sm tracking-[0.3em] font-light mb-2">0{idx + 1}</span>
                <h3 className="text-2xl md:text-[3vw] font-serif text-[#F5F0EB] tracking-wide group-hover:text-[#D4A853] transition-colors duration-500 whitespace-nowrap">
                  {loc.name}
                </h3>
                
                {/* Expanding Details Block */}
                <div 
                  className={`
                    w-full overflow-hidden transition-all duration-700 ease-in-out
                    ${isActiveOnMobile ? "max-h-[300px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}
                    md:max-h-0 md:opacity-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-6
                  `}
                >
                  
                  <div className="flex flex-col space-y-4 md:space-y-5 border-l border-[#C41E2A]/40 pl-4 md:pl-6">
                    <div>
                      <span className="block text-[#C4A882] text-[10px] tracking-[0.2em] uppercase mb-1">Address</span>
                      <p className="text-[#F5F0EB] font-light text-[13px] md:text-sm">{loc.address}</p>
                    </div>
                    <div>
                      <span className="block text-[#C4A882] text-[10px] tracking-[0.2em] uppercase mb-1">Hours</span>
                      <p className="text-[#F5F0EB] font-light text-[13px] md:text-sm">{loc.hours}</p>
                    </div>
                    <div>
                      <span className="block text-[#C4A882] text-[10px] tracking-[0.2em] uppercase mb-1">Phone</span>
                      <p className="text-[#F5F0EB] font-light text-[13px] md:text-sm">{loc.phone}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <a 
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#D4A853]/50 text-[#D4A853] px-6 py-3 text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#D4A853] hover:text-[#0A0A0A] transition-colors rounded-sm uppercase text-center"
                    >
                      Get Directions
                    </a>
                    <button className="bg-[#C41E2A] text-[#F5F0EB] px-6 py-3 text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#8B1A1A] transition-colors rounded-sm uppercase text-center">
                      Order Online
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
