import Link from 'next/link';
import SiteName from '@/components/SiteName';

export default function NotFound() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="font-mono text-[13px] text-wiah-mid mb-4">404</p>
        <h1 className="text-4xl font-extrabold text-wiah-black mb-4">
          Page not found
        </h1>
        <p className="text-base text-wiah-black leading-[1.7] max-w-md mx-auto mb-10">
          This page doesn't exist. The topic may have moved or the URL may be incorrect.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-wiah-dark text-white text-sm font-mono rounded hover:bg-wiah-black transition-colors"
        >
          Browse all topics
        </Link>
      </main>
      <footer className="border-t border-wiah-border py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <p className="font-mono text-xs">Open data. No cookies. No agenda.</p>
        </div>
      </footer>
    </>
  );
}
