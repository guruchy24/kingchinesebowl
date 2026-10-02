"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled down slightly
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-[4vw] transition-all duration-700 ${
        scrolled ? "bg-[#110F0D]/95 backdrop-blur-md border-b border-kcb-border py-3" : "bg-transparent py-6"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* Left: Hamburger Menu (Inari style) */}
      <div className="w-1/3 flex items-center">
        <button className="group flex flex-col gap-[6px] p-2 hover:opacity-70 transition-opacity">
          <div className="w-8 h-[1px] bg-kcb-gold transition-all duration-300 group-hover:w-6"></div>
          <div className="w-8 h-[1px] bg-kcb-gold"></div>
          <div className="w-8 h-[1px] bg-kcb-gold transition-all duration-300 group-hover:w-10"></div>
        </button>
      </div>

      {/* Center: Logo */}
      <div className="w-1/3 flex justify-center py-2">
        <Link href="/" className="flex items-center justify-center transition-transform hover:scale-105">
          <img
            src="/logo.png"
            alt="King Chinese Bowl"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Right: Reservation/Order */}
      <div className="w-1/3 flex justify-end items-center gap-6">
        <span className="hidden md:block text-xs tracking-widest text-kcb-gold cursor-pointer hover:text-kcb-red transition-colors">
          EN
        </span>
        <Link
          href="#order"
          className="group relative px-8 py-3 overflow-hidden rounded-full border border-kcb-gold/50 flex items-center gap-3 transition-all duration-500 hover:border-kcb-gold"
        >
          <div className="absolute inset-0 bg-kcb-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <span className="relative z-10 text-xs tracking-[0.2em] text-kcb-gold group-hover:text-[#110F0D] transition-colors duration-500">
            ORDER ONLINE
          </span>
        </Link>
      </div>
    </nav>
  );
}
