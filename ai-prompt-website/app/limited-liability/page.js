export const metadata = {
  title: 'Limited Liability',
  description: 'Limited Liability statement for AI Prompt Gallery.',
};

export default function LiabilityPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Limited Liability</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-6">
          By using AI Prompt Gallery, you acknowledge and agree to the following limitations of liability.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. No Warranty</h2>
        <p className="mb-6">
          This website is provided "as is" without any representations or warranties, express or implied. 
          We make no representations or warranties in relation to the information and prompts provided.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Limitations of Liability</h2>
        <p className="mb-6">
          AI Prompt Gallery will not be liable to you in relation to the contents of, or use of, or otherwise 
          in connection with, this website for any indirect, special, or consequential loss; 
          or for any business losses, loss of revenue, income, profits, or anticipated savings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. AI Generated Content</h2>
        <p className="mb-6">
          We are not responsible for AI-generated outputs created using our prompts. Users assume full 
          responsibility for the content they generate and publish.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. External Links</h2>
        <p className="mb-6">
          Our website may contain links to external sites. We are not responsible for the content or 
          practices of any linked websites.
        </p>
      </div>
    </div>
  );
}