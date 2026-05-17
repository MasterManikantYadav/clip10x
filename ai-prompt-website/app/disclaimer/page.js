export const metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for AI Prompt Gallery.',
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-6">
          The information and prompts provided on AI Prompt Gallery are for general informational and educational purposes only.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">No Guarantees</h2>
        <p className="mb-6">
          While we test prompts before publishing, AI image generators may produce different results based on model versions, 
          settings, and randomness. We do not guarantee identical outputs.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Third-Party Tools</h2>
        <p className="mb-6">
          Our prompts are designed for third-party AI tools (Midjourney, Stable Diffusion, DALL-E, etc.). 
          We are not affiliated with these companies. Users must comply with respective terms of service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Content Responsibility</h2>
        <p className="mb-6">
          Users are responsible for how they use generated images. Ensure you have rights to use source images 
          and comply with copyright laws in your jurisdiction.
        </p>
      </div>
    </div>
  );
}