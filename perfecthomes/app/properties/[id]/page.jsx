import { generatePropertySEO } from '@/lib/seo';
import PropertyPageClient from './PropertyPageClient';

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/properties/${params.id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { title: 'Property | PerfectHomes' };
    const property = await res.json();
    const seo = await generatePropertySEO(property);

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords.join(', '),
      openGraph: {
        title: seo.title,
        description: seo.description,
        images: property.images?.[0] ? [{ url: property.images[0] }] : [],
      },
    };
  } catch {
    return { title: 'Property | PerfectHomes' };
  }
}

const PropertyPage = () => <PropertyPageClient />;

export default PropertyPage;
