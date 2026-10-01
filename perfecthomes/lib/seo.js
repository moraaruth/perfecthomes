import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function generatePropertySEO(property) {
  const content = `
    Property: ${property.name}
    Type: ${property.type}
    Location: ${property.location?.city}, ${property.location?.street}
    Beds: ${property.beds}, Baths: ${property.baths}, Sqft: ${property.square_feet}
    Description: ${property.description || ''}
    Amenities: ${property.amenities?.join(', ')}
  `;

  const prompt = `You are an SEO expert for a real estate website called PerfectHomes.
Generate SEO metadata for this property listing:
${content}

Return ONLY valid JSON (no markdown, no explanation) in this exact format:
{
  "title": "SEO title under 60 characters",
  "description": "Compelling meta description under 160 characters",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

  try {
    const response = await client.send(
      new InvokeModelCommand({
        modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 300,
          messages: [{ role: 'user', content: prompt }],
        }),
        contentType: 'application/json',
      })
    );

    const result = JSON.parse(new TextDecoder().decode(response.body));
    return JSON.parse(result.content[0].text);
  } catch (error) {
    console.error('Bedrock SEO generation failed:', error);
    // Fallback metadata
    return {
      title: `${property.name} | PerfectHomes`,
      description: property.description?.slice(0, 160) || `${property.type} in ${property.location?.city}`,
      keywords: ['rental', 'property', property.type, property.location?.city, 'PerfectHomes'],
    };
  }
}
