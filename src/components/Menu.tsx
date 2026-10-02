import { getDb } from "@/db";
import { menuItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import MenuGallery from "./MenuGallery";

export const revalidate = 3600;

export default async function Menu() {
  const db = getDb(process.env.DATABASE_URL_UNPOOLED!);
  
  const items = await db.select().from(menuItems).where(eq(menuItems.is_available, true));

  return <MenuGallery items={items} />;
}
