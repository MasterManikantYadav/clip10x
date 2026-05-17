export const metadata = {
  title: 'About Us',
  description: 'Learn about AI Prompt Gallery - your source for the best AI image generation prompts.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">
          Welcome to AI Prompt Gallery, the ultimate destination for AI image generation enthusiasts.
        </p>
        <p className="mb-6">
          Our platform curates the best tested prompts for Midjourney, Stable Diffusion, DALL-E, and other AI image generators. 
          Each prompt comes with before and after images so you know exactly what to expect.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          We believe everyone should have access to high-quality AI prompts without spending hours experimenting. 
          Our community-driven platform helps creators find the perfect prompt for their needs.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Tested prompts with real results</li>
          <li>Before/After image comparisons</li>
          <li>One-click prompt copying</li>
          <li>Categories for every need - Wedding, Portrait, Anime, Cyberpunk, and more</li>
          <li>Regular updates with trending prompts</li>
        </ul>
      </div>
    </div>
  );
}