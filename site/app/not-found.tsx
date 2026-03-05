import Link from 'next/link';
import SiteName from '@/components/SiteName';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-wiah-border px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <SiteName size="nav" />
          </Link>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">
            ← All topics
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-wiah-dark text-white px-6 py-20 flex-1 flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-wiah-mid text-sm mb-4 tracking-widest uppercase">404</p>
          <h1 className="font-editorial text-4xl md:text-5xl mb-4 leading-tight">
            What is <strong><em>actually</em></strong> here?
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            This page doesn&apos;t exist &mdash; but the data does. Try searching for what you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="inline-block font-mono text-sm bg-white text-wiah-dark px-6 py-3 hover:bg-white/90 transition-colors"
          >
            ← Back to all topics
          </Link>
        </div>
      </section>
    </main>
  );
}
