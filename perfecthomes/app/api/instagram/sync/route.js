import { NextResponse } from 'next/server';
import { syncInstagramPosts } from '@/lib/instagramService';

export async function POST() {
  try {
    const result = await syncInstagramPosts();
    console.log('[Instagram] Sync complete:', result);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('[Instagram] POST /api/instagram/sync:', error.message);
    return NextResponse.json({ error: 'Sync failed', detail: error.message }, { status: 500 });
  }
}
