import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'AI Prompt Gallery - Best Image Prompts Collection',
    template: '%s | AI Prompt Gallery',
  },
  description: 'Discover and copy the best AI image generation prompts. Find wedding, portrait, anime, cyberpunk prompts with before/after images.',
  keywords: ['AI prompts', 'image prompts', 'midjourney prompts', 'stable diffusion', 'AI art'],
  authors: [{ name: 'AI Prompt Gallery' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'AI Prompt Gallery',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'AI Prompt Gallery',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Gallery',
    description: 'Best AI Image Prompts Collection',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="monetag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('monetag.com', '${process.env.NEXT_PUBLIC_MONETAG_ZONE || 'YOUR_ZONE_ID'}');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}