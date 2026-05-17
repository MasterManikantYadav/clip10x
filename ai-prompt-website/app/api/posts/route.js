import { NextResponse } from 'next/server';
import { db, posts } from '@/lib/db';
import { desc } from 'drizzle-orm';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('GET posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, shortDescription, howToUse, rawImage, generatedImage, prompt, tags, timer } = body;

    if (!title || !rawImage || !generatedImage || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = slugify(title) + '-' + Date.now().toString(36);

    const result = await db.insert(posts).values({
      title,
      slug,
      shortDescription: shortDescription || '',
      howToUse: howToUse || '',
      rawImage,
      generatedImage,
      prompt,
      tags: tags || [],
      timer: timer || 0,
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}