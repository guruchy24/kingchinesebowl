import { getDb } from "@/db";
import { siteMedia } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section02 from "@/components/Section02";
import Section03 from "@/components/Section03";
import Locations from "@/components/Locations";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Story from "@/components/Story";

// Force static rendering where possible, revalidating in the background every 60s
export const revalidate = 60;

let memoryCache: any = null;
let memoryCacheTime = 0;

const getCachedMediaConfig = unstable_cache(
  async () => {
    const now = Date.now();
    if (memoryCache && (now - memoryCacheTime < 60000)) return memoryCache;

    try {
      const { db, client } = await getDb();
      const results = await db.select().from(siteMedia).where(eq(siteMedia.is_active, true));
      await client.end();
      memoryCache = results;
      memoryCacheTime = now;
      return results;
    } catch (error) {
      console.error("Failed to load media config:", error);
      return [];
    }
  },
  ['kcb-media-config'],
  { revalidate: 60, tags: ['media'] }
);

export default async function HomePage() {
  // Fetch media configuration via static cache (No DB wait for visitors!)
  const mediaConfig = await getCachedMediaConfig();

  // Organize by section and slot for easy access in components
  // Format: { section: { slot: { desktop: url, mobile: url } } }
  const mediaObj: Record<string, any> = {};
  
  for (const item of mediaConfig) {
    if (!mediaObj[item.section]) {
      mediaObj[item.section] = { _all: [] };
    }
    if (!mediaObj[item.section][item.slot]) {
      mediaObj[item.section][item.slot] = {};
    }
    mediaObj[item.section][item.slot][item.device] = item.url;
    mediaObj[item.section]._all.push(item);
  }

  return (
    <main className="bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <Hero media={mediaObj.hero} />
      <Section02 media={mediaObj.philosophy} />
      <Story media={mediaObj.story} />
      <Section03 media={mediaObj.kitchen} />
      <Gallery media={mediaObj.gallery} />
      <Locations />
      <Footer />
    </main>
  );
}
