import type { Metadata } from 'next';
import Link from 'next/link';
import SiteName from '@/components/SiteName';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the What is actually happening? team — report a data error, suggest a topic, or ask a question.',
};

export default function ContactPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-wiah-black mb-6">Contact</h1>
        <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4">
          <p>
            Found an error in the data? Want to suggest a topic? Have a question about the methodology?
            We want to hear from you.
          </p>

          <h2 className="text-xl font-bold pt-4">Report a data error</h2>
          <p>
            If a number looks wrong or a source has been updated, please let us know. Include the topic page,
            the specific figure, and the correct source if you have it.
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
