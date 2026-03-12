import Link from 'next/link';
import SiteName from '@/components/SiteName';
import ContactForm from '@/components/ContactForm';
import RelatedTopics from '@/components/RelatedTopics';

export default function AboutPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-wiah-black mb-6">About</h1>
        <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4">
          <p>
            <strong>What is <em>actually</em> happening?</strong> is a curated national data platform
            that makes the real state of the UK visible, understandable, and shareable.
          </p>
          <p>
            Each topic answers one question with 2–3 carefully chosen, data-driven visual stories.
            Every number has a dated, linked source. The methodology is transparent.
            There are no ads and no agenda.
          </p>
            </div>

        <div className="border-t border-wiah-border pt-10 mt-10 max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-2">Comments &amp; corrections</h2>
          <p className="text-base text-wiah-black leading-[1.7] mb-6">
            If you spot an error, a data source that has moved, or a figure that looks wrong,
            please let us know. We also welcome general feedback and suggestions for topics to cover.
          </p>
          <ContactForm />
        </div>
              <RelatedTopics />
      </main>
    </>
  );
}
