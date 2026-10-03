import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getDb } from '@/db';
import { siteMedia } from '@/db/schema';
import { eq, and, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const device = searchParams.get('device');

    const db = getDb();

    let query = db.select().from(siteMedia);
    let conditions = [];

    if (section) conditions.push(eq(siteMedia.section, section));
    if (device) conditions.push(eq(siteMedia.device, device));

    if (conditions.length > 0) {
      if (conditions.length === 1) {
        query = query.where(conditions[0]) as any;
      } else {
        query = query.where(and(...conditions)) as any;
      }
    }

    const results = await query.orderBy(asc(siteMedia.sort_order));

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { section, slot, device, r2_key, url, alt_text, sort_order } = body;

    const db = getDb();

    const result = await db.insert(siteMedia).values({
      section,
      slot,
      device,
      r2_key,
      url,
      alt_text,
      sort_order: sort_order || 0,
    }).returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 });
  }
}
