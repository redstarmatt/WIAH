import Link from 'next/link';
import SiteName from '@/components/SiteName';
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
          <h2 className="text-xl font-bold pt-4">Principles</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Every number has a source — visible, linked, dated.</li>
            <li>Direct, not blunt. Specific, not vague.</li>
            <li>Contextual, not campaigning.</li>
            <li>Honest about uncertainty.</li>
          </ul>
          <h2 className="text-xl font-bold pt-4">Data sources</h2>
          <p>
            All data comes from official UK government and public body publications:
            NHS Digital, ONS, Environment Agency, Home Office, DfE, and others.
            Raw data is fetched, cleaned, and transformed by open-source pipelines.
          </p>
          <h2 className="text-xl font-bold pt-4">Use of AI</h2>
          <p>
            This site was built with significant assistance from Claude, Anthropic&apos;s AI. Claude
            helped write the code, structure the data pipelines, and draft editorial copy. All data
            comes from official sources and every number is traceable to a primary publication.
            The AI assisted with presentation and engineering — not with the facts themselves.
          </p>
        </div>

        <div className="border-t border-wiah-border pt-10 mt-10 max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-2">Comments &amp; corrections</h2>
          <p className="text-base text-wiah-mid leading-[1.7] mb-6">
            If you spot an error, a data source that has moved, or a figure that looks wrong,
            please let us know. We also welcome general feedback and suggestions for topics to cover.
          </p>
          <p className="font-mono text-sm text-wiah-mid">
            Open an issue at{' '}
            <a
              href="https://github.com/redstarmatt/wiah/issues"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-wiah-blue"
            >
              github.com/redstarmatt/wiah
            </a>
            {' '}or email{' '}
            <a href="mailto:hello@whatisactuallyhappening.uk" className="underline hover:text-wiah-blue">
              hello@whatisactuallyhappening.uk
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
