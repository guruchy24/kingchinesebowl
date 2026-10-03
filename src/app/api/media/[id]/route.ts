import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { siteMedia } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const { db, client } = await getDb();

    const [updated] = await db.update(siteMedia)
      .set({
        ...body,
        updated_at: new Date(),
      })
      .where(eq(siteMedia.id, Number(id)))
      .returning();

    await client.end();

    if (!updated) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { db, client } = await getDb();

    await db.delete(siteMedia).where(eq(siteMedia.id, Number(id)));

    await client.end();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
