import connectDB from '@/config/database';
import InstagramPost from '@/models/InstagramPost';

const GRAPH_URL = 'https://graph.instagram.com';
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

/**
 * Fetch latest media from Instagram Graph API.
 * @returns {Promise<Array>} raw media items
 */
export async function fetchFromInstagram() {
  const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ACCOUNT_ID } = process.env;

  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_BUSINESS_ACCOUNT_ID) {
    throw new Error('Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID');
  }

  const url = `${GRAPH_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=${FIELDS}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Instagram API error: ${err}`);
  }

  const json = await res.json();
  return json.data || [];
}

/**
 * Sync Instagram posts into MongoDB.
 * Returns counts of { saved, skipped, total }.
 */
export async function syncInstagramPosts() {
  await connectDB();

  const posts = await fetchFromInstagram();
  if (!posts.length) return { saved: 0, skipped: 0, total: 0 };

  const docs = posts.map((p) => ({
    instagramPostId: p.id,
    caption:         p.caption        || '',
    mediaType:       p.media_type,
    mediaUrl:        p.media_url       || '',
    thumbnailUrl:    p.thumbnail_url   || '',
    permalink:       p.permalink,
    timestamp:       new Date(p.timestamp),
    syncedAt:        new Date(),
  }));

  // insertMany with ordered:false + skipDuplicates via unique index
  let saved = 0;
  try {
    const result = await InstagramPost.insertMany(docs, { ordered: false });
    saved = result.length;
  } catch (err) {
    // E11000 = duplicate key — count only actual inserts
    if (err.code === 11000 || err.name === 'BulkWriteError') {
      saved = err.insertedDocs?.length ?? 0;
    } else {
      throw err;
    }
  }

  return { saved, skipped: docs.length - saved, total: docs.length };
}

/**
 * Get saved Instagram posts from MongoDB, newest first.
 */
export async function getInstagramPosts(limit = 12) {
  await connectDB();
  return InstagramPost.find({})
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();
}
