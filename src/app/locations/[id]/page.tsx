import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Hardcoded data for the branches to make them look incredible
const BRANCH_DATA: Record<string, any> = {
  chandigarh: {
    name: "Chandigarh",
    subtitle: "Sector 15 & Sector 7A",
    description: "Our flagship location in the heart of the city. Experience the perfect blend of traditional Asian aesthetics and modern dining comfort. Known for its bustling energy and intimate dining spaces.",
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=800&auto=format&fit=crop"
    ]
  },
  mohali: {
    name: "Mohali",
    subtitle: "Sector 68, ALC Group",
    description: "A spacious, contemporary setting perfect for large gatherings and family celebrations. Featuring open kitchen views where you can watch our master chefs at work with the woks.",
    heroImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1554679665-f5537f187268?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505826759037-1a6973520b22?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529543544282-ea669408eec3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-bac2e5e75e4e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1428515613728-6b4607e44363?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  zirakpur: {
    name: "Zirakpur",
    subtitle: "VIP Road & Bir Chhat",
    description: "An intimate and warm atmosphere designed for the perfect dining experience. Rich wood textures, subtle ambient lighting, and our signature Pan-Asian flavors await.",
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549488344-c5c8397a06f4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?q=80&w=1200&auto=format&fit=crop"
    ]
  }
};

export const revalidate = 3600;

export default async function LocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const branch = BRANCH_DATA[id.toLowerCase()];
  
  if (!branch) {
    notFound();
  }

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-[#F5F0EB]">
      {/* ── RETURN BUTTON ── */}
      <Link 
        href="/#locations" 
        className="fixed top-6 left-6 md:top-10 md:left-10 z-50 mix-blend-difference text-white text-xs tracking-[0.3em] uppercase hover:text-[#C41E2A] transition-colors"
      >
        ← Return
      </Link>

      {/* ── HERO ── */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image src={branch.heroImage} alt={branch.name} fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        
        <div className="relative z-10 text-center px-[5vw]">
          <h3 className="text-[#C41E2A] tracking-[0.4em] text-xs md:text-sm uppercase mb-4 font-light">King Chinese Bowl</h3>
          <h1 className="text-[12vw] md:text-[6vw] font-serif leading-none tracking-wide drop-shadow-2xl mb-4">
            {branch.name}
          </h1>
          <p className="text-[#C4A882] tracking-[0.3em] text-xs md:text-sm uppercase font-light">
            {branch.subtitle}
          </p>
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section className="w-full max-w-[800px] mx-auto px-[5vw] py-[10vh] text-center">
        <div className="w-12 h-[1px] bg-[#C41E2A] mx-auto mb-8" />
        <p className="text-sm md:text-lg font-light leading-relaxed text-[#D5D0C8]">
          {branch.description}
        </p>
      </section>

      {/* ── GALLERY GRID ── */}
      <section className="w-full px-[5vw] pb-[15vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {branch.gallery.map((img: string, idx: number) => {
            // Create a masonry effect by varying aspect ratios
            const isTall = idx === 1 || idx === 4;
            const isWide = idx === 3;
            
            return (
              <div 
                key={idx} 
                className={`
                  relative overflow-hidden group rounded-sm bg-[#111111]
                  ${isTall ? 'aspect-[3/4] md:row-span-2' : 'aspect-[4/3]'}
                  ${isWide ? 'md:col-span-2 aspect-[16/9]' : ''}
                `}
              >
                <Image 
                  src={img} 
                  alt={`${branch.name} interior ${idx + 1}`} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-white/20 transition-colors duration-700" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER CROSS-LINK ── */}
      <section className="w-full py-[10vh] border-t border-[#2A2520] flex flex-col items-center justify-center text-center px-[5vw]">
        <h2 className="text-2xl md:text-3xl font-serif mb-6">Experience {branch.name}</h2>
        <div className="flex gap-4">
          <Link href="/#menu" className="border border-[#D4A853]/50 text-[#D4A853] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#D4A853] hover:text-[#0A0A0A] transition-colors rounded-sm uppercase">
            View Menu
          </Link>
          <a href="tel:+917508450221" className="bg-[#C41E2A] text-[#F5F0EB] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#8B1A1A] transition-colors rounded-sm uppercase">
            Call Now
          </a>
        </div>
      </section>
    </main>
  );
}
