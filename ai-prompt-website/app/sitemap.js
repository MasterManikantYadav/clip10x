import { db, posts } from '@/lib/db';
import { desc } from 'drizzle-orm';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app';
  
  const staticPages = [
    '', '/about', '/contact', '/privacy-policy', '/disclaimer', '/limited-liability', '/guide',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.5,
  }));

  let postUrls = [];
  try {
    const allPosts = await db.select({ slug: posts.slug, updatedAt: posts.updatedAt }).from(posts).orderBy(desc(posts.createdAt));
    postUrls = allPosts.map(post => ({
      url: `${baseUrl}/prompts/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (e) {
    console.error('Sitemap posts fetch error:', e);
  }

  return [...staticPages, ...postUrls];
}