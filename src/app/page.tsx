import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section02 from "@/components/Section02";
import Section03 from "@/components/Section03";
import Locations from "@/components/Locations";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Story from "@/components/Story";

export default function HomePage() {
  return (
    <main className="bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Section02 />
      <Story />
      <Section03 />
      <Gallery />
      <Locations />
      <Footer />
    </main>
  );
}
