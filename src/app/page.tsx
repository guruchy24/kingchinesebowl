import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplitRight from "@/components/SplitRight";
import SplitLeft from "@/components/SplitLeft";
import Menu from "@/components/Menu";
import Locations from "@/components/Locations";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SplitRight />
      <SplitLeft />
      <Menu />
      <Locations />
      <Gallery />
      <Footer />
    </main>
  );
}
