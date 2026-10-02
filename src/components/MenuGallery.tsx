"use client";

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category?: string;
};

export default function MenuGallery({ items }: { items: MenuItem[] }) {
  return (
    <>
      {/* ── PART 2: VERTICAL 2-COLUMN MENU GRID ── */}
      <section id="menu-grid" className="w-full bg-[#0A0A0A] py-[15vh] px-[8vw] relative z-20 border-t border-[#2A2520]">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#C41E2A]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[80vw] mx-auto relative z-10">
          <div className="text-center mb-[10vh]">
            <h3 className="text-[#C41E2A] tracking-[0.5em] text-sm uppercase mb-4">A La Carte</h3>
            <h2 className="text-[4vw] font-serif text-[#F5F0EB] tracking-tight">The Royal Selection</h2>
          </div>

          {/* 2-Column Grid Setup */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex flex-col border-b border-[#2A2520]/50 pb-6 group hover:border-[#D4A853]/50 transition-colors duration-500 cursor-default">
                  
                  <div className="flex justify-between items-end mb-3">
                    <h4 className="text-[1.5vw] font-serif text-[#F5F0EB] tracking-wide group-hover:text-[#D4A853] transition-colors duration-500">
                      {item.name}
                    </h4>
                    
                    {/* Elegant dotted leader line */}
                    <div className="flex-grow border-b-2 border-dotted border-[#2A2520] mx-4 mb-2 opacity-30" />
                    
                    <span className="text-[1.2vw] text-[#C4A882] tracking-widest font-light">
                      ₹{(item.price / 100).toFixed(0)}
                    </span>
                  </div>
                  
                  {item.description && (
                    <p className="text-[0.95vw] text-[#F5F0EB]/50 font-light max-w-[85%] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  
                </div>
              ))
            ) : (
              // Empty State (if DB is empty during dev)
              <div className="col-span-1 lg:col-span-2 text-center py-20 text-[#C4A882]/50 font-light tracking-widest">
                Curating the perfect menu...
              </div>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
}
