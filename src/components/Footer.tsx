import Image from "next/image";

const QUICK_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "The Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Locations", href: "#locations" },
  { label: "Gallery", href: "#gallery" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] w-full pt-32 pb-8 px-[5vw] lg:px-[8vw] border-t border-[#2A2520] relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Texture / Accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#C41E2A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 text-[#C41E2A]/5 text-[40vw] font-serif leading-none pointer-events-none select-none -translate-x-1/4 translate-y-1/4">
        味
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between gap-16 mb-32">
        
        {/* BRAND & STORY */}
        <div className="flex flex-col w-full md:w-1/3">
          <div className="relative w-48 h-24 mb-8">
            <Image
              src="/logo.png"
              alt="King Chinese Bowl"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-[#C4A882]/70 font-light text-sm tracking-wide leading-relaxed max-w-xs mb-8">
            Born from a passion for authentic Asian street food, King Chinese Bowl brings the heat, the flavor, and the soul of Pan-Asian cuisine to the heart of Tricity.
          </p>
          <div className="flex items-center gap-4 text-[#F5F0EB]/50 text-xs tracking-[0.2em] uppercase">
            <span>Chandigarh</span>
            <span className="w-1 h-1 rounded-full bg-[#C41E2A]" />
            <span>Mohali</span>
            <span className="w-1 h-1 rounded-full bg-[#C41E2A]" />
            <span>Zirakpur</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-1/2 justify-between gap-12">
          {/* LINKS */}
          <div className="flex flex-col">
            <h4 className="text-[#F5F0EB] text-[10px] tracking-[0.4em] uppercase mb-8 font-light">Explore</h4>
            <div className="flex flex-col gap-4">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#C4A882]/80 font-serif text-lg lg:text-xl transition-colors duration-300 hover:text-[#D4A853]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* SOCIALS & CONTACT */}
          <div className="flex flex-col">
            <h4 className="text-[#F5F0EB] text-[10px] tracking-[0.4em] uppercase mb-8 font-light">Connect</h4>
            <div className="flex flex-col gap-4 mb-10">
              {SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#C4A882]/80 font-light text-sm tracking-widest transition-colors duration-300 hover:text-[#D4A853] uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-[#C4A882]/60 font-light text-xs tracking-widest">
              <a href="tel:+917508450221" className="hover:text-[#F5F0EB] transition-colors">+91 7508 4502 21</a>
              <a href="tel:+917340998337" className="hover:text-[#F5F0EB] transition-colors">+91 73409 98337</a>
            </div>
          </div>
        </div>
      </div>

      {/* HUGE BOTTOM TYPOGRAPHY */}
      <div className="relative z-10 w-full flex flex-col items-center border-t border-[#2A2520] pt-12">
        <h1 className="text-[10vw] font-serif text-[#F5F0EB] opacity-90 tracking-wider whitespace-nowrap leading-none select-none">
          KING CHINESE BOWL
        </h1>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 text-[#C4A882]/40 text-[10px] tracking-[0.2em] uppercase font-light">
          <p>&copy; {new Date().getFullYear()} KCB Restaurants. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#C4A882] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C4A882] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
