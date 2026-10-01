import { NextResponse } from 'next/server';
import { getInstagramPosts } from '@/lib/instagramService';

export async function GET() {
  try {
    const posts = await getInstagramPosts(12);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('[Instagram] GET /api/instagram/posts:', error.message);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
