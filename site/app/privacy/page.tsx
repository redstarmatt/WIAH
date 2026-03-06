import type { Metadata } from 'next';
import Link from 'next/link';
import SiteName from '@/components/SiteName';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy policy for What is actually happening? — how we use data, analytics, and your rights.',
};

export default function PrivacyPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-wiah-black mb-6">Privacy</h1>
        <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4">
          <p className="font-mono text-xs text-wiah-mid">Last updated: March 2026</p>

          <h2 className="text-xl font-bold pt-4">What we collect</h2>
          <p>
            We do not collect personal data and we do not track you across other websites. We use Google Analytics 4, which sets cookies to measure aggregate site usage — see the Analytics section below. We also receive basic server-level data via our hosting provider (Vercel), such as page request counts, which cannot be used to identify individual visitors.
          </p>

          <h2 className="text-xl font-bold pt-4">Analytics</h2>
          <p>
            We use Google Analytics 4 to understand how the site is used in aggregate — which topics are read, how visitors navigate, and where they come from. Google Analytics uses cookies to collect anonymised usage data. We do not use it to identify individual users or build behavioural profiles.
          </p>
            </div>
      </main>
      <footer className="border-t border-wiah-border py-5 px-6 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <nav className="flex items-center gap-4 font-mono text-xs">
            <Link href="/about" className="hover:text-wiah-black transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-wiah-black transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-wiah-black transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
