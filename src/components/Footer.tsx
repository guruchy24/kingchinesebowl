const quickLinks = [
  { label: "HOME", href: "#home" },
  { label: "MENU", href: "#menu" },
  { label: "LOCATIONS", href: "#locations" },
  { label: "GALLERY", href: "#gallery" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2520]">
      <div className="flex flex-col md:flex-row justify-between px-[5vw] py-20 gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-4">
          <img
            src="/logo.png"
            alt="King Chinese Bowl"
            className="h-20 md:h-28 w-auto object-contain object-left mb-2"
          />
          <p className="text-[#C4A882] text-xs tracking-wide font-light max-w-xs leading-relaxed">
            The Tricity&apos;s Favorite Pan-Asian Destination
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <span className="text-[#F5F0EB] text-xs tracking-[0.2em] font-light mb-2">
            QUICK LINKS
          </span>
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#C4A882]/60 text-xs tracking-widest font-light transition-colors duration-300 hover:text-[#C41E2A]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-4">
          <span className="text-[#F5F0EB] text-xs tracking-[0.2em] font-light mb-2">
            CONTACT
          </span>
          <a
            href="tel:+917508450221"
            className="text-[#C4A882]/60 text-xs tracking-wide font-light transition-colors duration-300 hover:text-[#F5F0EB]"
          >
            +91 7508 4502 21
          </a>
          <a
            href="tel:+917340998337"
            className="text-[#C4A882]/60 text-xs tracking-wide font-light transition-colors duration-300 hover:text-[#F5F0EB]"
          >
            +91 73409 98337
          </a>
          <p className="text-[#C4A882]/60 text-xs tracking-wide font-light mt-2">
            Chandigarh &bull; Mohali &bull; Zirakpur
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center pb-8">
        <p className="text-[#C4A882]/30 text-xs tracking-wide font-light mt-16">
          &copy; 2026 King Chinese Bowl. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
