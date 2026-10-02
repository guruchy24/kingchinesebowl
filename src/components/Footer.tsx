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
    <footer className="bg-[#0A0A0A] w-full pt-16 pb-8 px-[5vw] lg:px-[8vw] border-t border-[#2A2520] relative overflow-hidden flex flex-col justify-end">
      
      {/* ── MASSIVE FADED BACKGROUND WATERMARK ── */}
      <div className="absolute bottom-[-2%] left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none select-none">
        <h1 className="text-[12vw] font-serif text-[#F5F0EB] opacity-[0.03] tracking-widest whitespace-nowrap leading-none">
          KING CHINESE BOWL
        </h1>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between gap-16 mt-[15vh] mb-12">
        
        {/* BRAND & STORY */}
        <div className="flex flex-col w-full md:w-1/3">
          <div className="relative w-48 h-20 mb-6">
            <Image
              src="/logo.png"
              alt="King Chinese Bowl"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-[#F5F0EB]/70 font-light text-sm tracking-wide leading-relaxed max-w-sm mb-6">
            Born from a passion for authentic Asian street food, King Chinese Bowl brings the heat, the flavor, and the soul of Pan-Asian cuisine to the heart of Tricity.
          </p>
          <div className="flex items-center gap-3 text-[#F5F0EB]/50 text-[10px] tracking-[0.2em] uppercase">
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
            <h4 className="text-[#F5F0EB]/40 text-[10px] tracking-[0.3em] uppercase mb-6 font-light">Explore</h4>
            <div className="flex flex-col gap-4">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#F5F0EB] font-serif text-lg transition-colors duration-300 hover:text-[#C41E2A]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* SOCIALS & CONTACT */}
          <div className="flex flex-col">
            <h4 className="text-[#F5F0EB]/40 text-[10px] tracking-[0.3em] uppercase mb-6 font-light">Connect</h4>
            <div className="flex flex-col gap-3 mb-8">
              {SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#F5F0EB]/90 font-light text-sm tracking-widest transition-colors duration-300 hover:text-[#C41E2A] uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-[#F5F0EB]/60 font-light text-xs tracking-widest">
              <a href="tel:+917508450221" className="hover:text-[#F5F0EB] transition-colors">+91 7508 4502 21</a>
              <a href="tel:+917340998337" className="hover:text-[#F5F0EB] transition-colors">+91 73409 98337</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM COPYRIGHT BAR ── */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center border-t border-[#2A2520]/50 pt-8 text-[#F5F0EB]/40 text-[10px] tracking-[0.2em] uppercase font-light">
        <p>&copy; {new Date().getFullYear()} KCB Restaurants. All Rights Reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#F5F0EB] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#F5F0EB] transition-colors">Terms of Service</a>
        </div>
      </div>

    </footer>
  );
}
