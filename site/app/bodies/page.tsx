import Link from 'next/link';
import SiteName from '@/components/SiteName';
import { BODIES, BODY_CATEGORIES } from '@/lib/bodies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Bodies',
  description: 'Track the performance of UK public bodies — NHS England, Environment Agency, Ministry of Justice, and more. Open data, no spin.',
  openGraph: {
    title: 'Public Bodies | What is actually happening?',
    description: 'Track the performance of UK public bodies — NHS England, Environment Agency, Ministry of Justice, and more.',
    url: 'https://whatisactuallyhappening.uk/bodies',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/bodies',
  },
};

const TREND_COLOUR: Record<'worse' | 'better' | 'stable', string> = {
  worse: '#E63946',
  better: '#2A9D8F',
  stable: '#F4A261',
};

export default function BodiesPage() {
  const byCategory = BODY_CATEGORIES.map(cat => ({
    category: cat,
    bodies: BODIES.filter(b => b.category === cat),
  }));

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/sources" className="font-mono text-xs text-wiah-mid hover:text-wiah-black transition-colors">Data Sources</Link>
            <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <p className="font-mono text-xs text-wiah-mid uppercase tracking-wider mb-3">Accountability</p>
        <h1 className="text-4xl font-extrabold text-wiah-black mb-3">Public Bodies</h1>
        <p className="text-base text-wiah-mid leading-[1.7] mb-10 max-w-2xl">
          The organisations responsible for delivering public services in the UK —
          their performance, as measured by their own published data.
        </p>

        {byCategory.map(({ category, bodies }) => (
          <section key={category} className="mb-12">
            <h2 className="text-xs font-mono text-wiah-mid uppercase tracking-wider mb-4 pb-2 border-b border-wiah-border">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bodies.map(body => {
                const primaryMetric = body.metrics[0];
                return (
                  <Link
                    key={body.slug}
                    href={`/bodies/${body.slug}`}
                    className="group block border border-wiah-border rounded p-5 hover:border-wiah-blue/50 transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-mono text-[10px] text-wiah-mid uppercase tracking-wider mb-1">
                          {body.category}
                        </p>
                        <h3 className="text-sm font-bold text-wiah-black group-hover:text-wiah-blue transition-colors leading-snug">
                          {body.shortName || body.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-wiah-mid leading-relaxed mb-4 line-clamp-2">
                      {body.description}
                    </p>
                    {primaryMetric && (
                      <div className="pt-3 border-t border-wiah-border/50">
                        <p className="font-mono text-[10px] text-wiah-mid mb-1">{primaryMetric.label}</p>
                        <p
                          className="font-mono text-xl font-bold"
                          style={{ color: TREND_COLOUR[primaryMetric.trend] }}
                        >
                          {primaryMetric.value}
                          {primaryMetric.unit && (
                            <span className="text-sm font-normal text-wiah-mid ml-1">{primaryMetric.unit}</span>
                          )}
                        </p>
                        {primaryMetric.context && (
                          <p className="font-mono text-[10px] text-wiah-mid mt-1">{primaryMetric.context}</p>
                        )}
                      </div>
                    )}
                    <p className="font-mono text-xs text-wiah-blue group-hover:text-wiah-black transition-colors mt-3">
                      View full profile →
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-wiah-border py-5 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <nav className="flex items-center gap-4 font-mono text-xs">
            <Link href="/about" className="hover:text-wiah-black transition-colors">About</Link>
            <Link href="/sources" className="hover:text-wiah-black transition-colors">Sources</Link>
            <Link href="/bodies" className="hover:text-wiah-black transition-colors">Public Bodies</Link>
            <Link href="/privacy" className="hover:text-wiah-black transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
