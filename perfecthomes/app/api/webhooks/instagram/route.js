import { NextResponse } from 'next/server';
import { syncInstagramPosts } from '@/lib/instagramService';

export async function POST(request) {
  try {
    const body = await request.json();

    // Meta sends an array of entry objects
    const entries = body.entry || [];
    const hasMediaChange = entries.some((entry) =>
      (entry.changes || []).some(
        (c) => c.field === 'media' || c.field === 'story_insights'
      )
    );

    if (hasMediaChange) {
      console.log('[Webhook] New Instagram media detected — syncing...');
      const result = await syncInstagramPosts();
      console.log('[Webhook] Sync result:', result);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Webhook] POST /api/webhooks/instagram:', error.message);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
