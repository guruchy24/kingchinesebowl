import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  const db = drizzle(pool, { schema });

  console.log('Seeding menu items...');

  await db.insert(schema.menuItems).values([
    {
      name: 'Signature Thukpa',
      description: 'Hand-pulled noodles in a rich, 12-hour simmered bone broth, topped with charred bok choy, roasted garlic, and our secret chili oil.',
      price: 45000, // 450.00 INR (stored in paise)
      category: 'Noodles',
      image_url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1600&auto=format&fit=crop',
    },
    {
      name: 'Afghani Malai Momos',
      description: 'Pan-seared dumplings bathed in a luxurious, smoky cream sauce infused with cardamom and crushed black pepper.',
      price: 35000,
      category: 'Dim Sum',
      image_url: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=1600&auto=format&fit=crop',
    },
    {
      name: 'Sichuan Mapo Tofu',
      description: 'Silken tofu set ablaze with authentic Sichuan peppercorns, fermented broad bean paste, and scallions.',
      price: 52000,
      category: 'Mains',
      image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1600&auto=format&fit=crop',
    },
    {
      name: 'Fiery Wok-Tossed Rice',
      description: 'Jasmine rice tossed at 600 degrees to achieve the perfect wok hei, loaded with crisp vegetables and golden egg ribbons.',
      price: 38000,
      category: 'Rice',
      image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop',
    }
  ]);

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
