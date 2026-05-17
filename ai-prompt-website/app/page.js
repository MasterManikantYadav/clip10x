import SearchBar from '@/components/SearchBar';
import ImageCard from '@/components/ImageCard';
import { db, posts } from '@/lib/db';
import { desc } from 'drizzle-orm';

export const revalidate = 60;

export default async function Home() {
  let allPosts = [];
  try {
    allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(12);
  } catch (e) {
    console.error('DB fetch error:', e);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Image Prompt Gallery
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover thousands of tested AI prompts with before/after results. 
          Copy in one click and create stunning images.
        </p>
        <SearchBar />
      </section>

      <div className="ad-container" id="ad-top-banner" />

      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Prompts</h2>
          <span className="text-sm text-gray-500">{allPosts.length} posts</span>
        </div>
        
        {allPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-4">No prompts yet</p>
            <p>Visit /admin to add your first post</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allPosts.map((post) => (
              <ImageCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <div className="ad-container" id="ad-middle-banner" />

      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="flex flex-wrap gap-3">
          {['Wedding', 'Portrait', 'Anime', 'Cyberpunk', 'Fantasy', '3D Art', 'Logo', 'Nature'].map(tag => (
            <a 
              key={tag}
              href={`/search?q=${encodeURIComponent(tag.toLowerCase())}`}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}