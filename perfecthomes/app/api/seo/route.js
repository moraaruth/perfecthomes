import { generatePropertySEO } from '@/lib/seo';

export async function POST(req) {
  try {
    const property = await req.json();
    const metadata = await generatePropertySEO(property);
    return Response.json(metadata);
  } catch (error) {
    return Response.json({ error: 'Failed to generate SEO' }, { status: 500 });
  }
}
