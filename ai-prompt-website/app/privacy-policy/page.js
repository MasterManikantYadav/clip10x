export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of AI Prompt Gallery.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect minimal information to improve your experience:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Search history (stored locally in your browser)</li>
          <li>Usage analytics (anonymous)</li>
          <li>Contact form submissions (when you reach out)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Information</h2>
        <p className="mb-4">We use collected information to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Improve website functionality</li>
          <li>Analyze traffic patterns</li>
          <li>Respond to your inquiries</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Cookies</h2>
        <p className="mb-4">We use cookies for theme preferences and local search history. You can clear this data anytime via browser settings.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Third-Party Services</h2>
        <p className="mb-4">We use Cloudinary for image hosting and may display ads via Monetag. These services have their own privacy policies.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact</h2>
        <p>For privacy concerns, contact us at support@aipromptgallery.com</p>
      </div>
    </div>
  );
}