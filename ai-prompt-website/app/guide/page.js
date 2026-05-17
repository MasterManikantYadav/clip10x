export const metadata = {
  title: 'Guide: Use Responsibly',
  description: 'Learn how to use AI Prompt Gallery effectively and responsibly.',
};

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">How to Use AI Prompt Gallery</h1>
      
      <div className="grid gap-8">
        <section className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-200">1. Find a Prompt</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Use the search bar or browse categories. Each post shows a before/after comparison so you know what to expect.
          </p>
        </section>

        <section className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
          <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-200">2. Copy the Prompt</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Click the "Copy Prompt" button. Some posts may have a wait timer (default 0s) to prevent spam. 
            The prompt copies instantly to your clipboard.
          </p>
        </section>

        <section className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-200">3. Use in AI Tool</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Paste the prompt into Midjourney, Stable Diffusion, DALL-E, or your preferred AI image generator. 
            Adjust settings as needed for your specific tool.
          </p>
        </section>

        <section className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800">
          <h2 className="text-2xl font-semibold mb-4 text-orange-800 dark:text-orange-200">Responsible Use Guidelines</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Do not generate harmful, illegal, or deceptive content</li>
            <li>Respect copyright and intellectual property rights</li>
            <li>Disclose AI-generated content when required</li>
            <li>Do not use prompts to create non-consensual imagery</li>
            <li>Follow the terms of service of your AI platform</li>
            <li>Be mindful of cultural sensitivities in generated content</li>
          </ul>
        </section>

        <section className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800">
          <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-200">Important Notes</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Results may vary between AI models and versions. Images displayed are examples and your output 
            may differ. Always review generated content before publishing or commercial use.
          </p>
        </section>
      </div>
    </div>
  );
}