import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteName from '@/components/SiteName';
import { BODIES, getBodyBySlug } from '@/lib/bodies';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BODIES.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const body = getBodyBySlug(params.slug);
  if (!body) return {};
  const { name, description, slug } = body;
  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | What is actually happening?`,
      description,
      url: `https://whatisactuallyhappening.uk/bodies/${slug}`,
    },
    alternates: {
      canonical: `https://whatisactuallyhappening.uk/bodies/${slug}`,
    },
  };
}

const TREND_COLOUR: Record<'worse' | 'better' | 'stable', string> = {
  worse: '#E63946',
  better: '#2A9D8F',
  stable: '#F4A261',
};

const TREND_LABEL: Record<'worse' | 'better' | 'stable', string> = {
  worse: 'getting worse',
  better: 'getting better',
  stable: 'stable',
};

export default function BodyDetailPage({ params }: Props) {
  const body = getBodyBySlug(params.slug);
  if (!body) notFound();
  // body is guaranteed defined from here by notFound() throwing above
  const { name, category, description, website, regulator, metrics, topicSlugs } = body!;

  const worseCount = metrics.filter(m => m.trend === 'worse').length;
  const betterCount = metrics.filter(m => m.trend === 'better').length;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <Link href="/bodies" className="text-sm text-wiah-blue hover:underline">← Public Bodies</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <p className="font-mono text-xs text-wiah-mid uppercase tracking-wider mb-3">{category}</p>
        <h1 className="text-4xl font-extrabold text-wiah-black mb-3">{name}</h1>
        <p className="text-base text-wiah-mid leading-[1.7] mb-6 max-w-2xl">{description}</p>

        {/* Quick stats row */}
        <div className="flex flex-wrap gap-3 mb-8">
          {worseCount > 0 && (
            <span className="font-mono text-xs px-3 py-1.5 rounded border border-wiah-red/30 bg-wiah-red/5 text-wiah-red">
              {worseCount} metric{worseCount !== 1 ? 's' : ''} getting worse
            </span>
          )}
          {betterCount > 0 && (
            <span className="font-mono text-xs px-3 py-1.5 rounded border border-wiah-green/30 bg-wiah-green/5 text-wiah-green">
              {betterCount} metric{betterCount !== 1 ? 's' : ''} getting better
            </span>
          )}
          {regulator && (
            <span className="font-mono text-xs px-3 py-1.5 rounded border border-wiah-border text-wiah-mid">
              Regulated by {regulator}
            </span>
          )}
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 rounded border border-wiah-border text-wiah-blue hover:border-wiah-blue transition-colors"
          >
            Official website ↗
          </a>
        </div>

        {/* Metrics */}
        <section className="mb-10">
          <h2 className="text-xs font-mono text-wiah-mid uppercase tracking-wider mb-4 pb-2 border-b border-wiah-border">
            Key metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="py-5 pr-6 border-b border-wiah-border"
              >
                <p className="font-mono text-xs text-wiah-mid mb-2">{metric.label}</p>
                <p
                  className="font-mono text-3xl font-bold leading-none"
                  style={{ color: TREND_COLOUR[metric.trend] }}
                >
                  {metric.value}
                  {metric.unit && (
                    <span className="text-base font-normal text-wiah-mid ml-1">{metric.unit}</span>
                  )}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: TREND_COLOUR[metric.trend] }}
                  >
                    {TREND_LABEL[metric.trend]}
                  </span>
                </div>
                {metric.context && (
                  <p className="font-mono text-[10px] text-wiah-mid mt-1">{metric.context}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related topics */}
        {topicSlugs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-mono text-wiah-mid uppercase tracking-wider mb-4 pb-2 border-b border-wiah-border">
              Related topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {topicSlugs.map(slug => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="font-mono text-xs px-3 py-1.5 rounded border border-wiah-border text-wiah-mid hover:text-wiah-blue hover:border-wiah-blue transition-colors"
                >
                  {slug.replace(/-/g, ' ')} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Attribution */}
        <div className="pt-6 border-t border-wiah-border">
          <p className="font-mono text-xs text-wiah-mid">
            All metrics drawn from publicly available official data.{' '}
            <Link href="/sources" className="text-wiah-blue hover:underline">View all data sources →</Link>
          </p>
        </div>
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
