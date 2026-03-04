import SiteName from '@/components/SiteName';
import CategorySection from '@/components/CategorySection';
import { CATEGORIES, getScorecard } from '@/lib/topics';

export default function HomePage() {
  const { worse, better, stable, total, topicCount } = getScorecard();

  return (
    <main>
      {/* Dark hero */}
      <section className="bg-wiah-dark text-white px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <h1>
            <SiteName size="hero" />
          </h1>
          <p className="mt-5 text-wiah-mid text-lg max-w-xl leading-relaxed">
            The real state of the UK — visible, understandable, shareable.
          </p>

          {/* Scorecard strip */}
          <div className="mt-10">
            <div className="flex h-1.5 rounded-full overflow-hidden max-w-xs mb-5">
              <div
                className="transition-all"
                style={{ width: `${(worse / total) * 100}%`, backgroundColor: '#E63946' }}
              />
              <div
                className="transition-all"
                style={{ width: `${(better / total) * 100}%`, backgroundColor: '#2A9D8F' }}
              />
              <div
                className="transition-all"
                style={{ width: `${(stable / total) * 100}%`, backgroundColor: '#F4A261' }}
              />
            </div>

            <div className="flex flex-wrap gap-8">
              <div>
                <span className="font-mono text-4xl font-bold" style={{ color: '#E63946' }}>{worse}</span>
                <p className="font-mono text-xs text-wiah-mid mt-1">deteriorating</p>
              </div>
              <div>
                <span className="font-mono text-4xl font-bold" style={{ color: '#2A9D8F' }}>{better}</span>
                <p className="font-mono text-xs text-wiah-mid mt-1">improving</p>
              </div>
              {stable > 0 && (
                <div>
                  <span className="font-mono text-4xl font-bold" style={{ color: '#F4A261' }}>{stable}</span>
                  <p className="font-mono text-xs text-wiah-mid mt-1">stable</p>
                </div>
              )}
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              {total} tracked metrics across {topicCount} topics
            </p>
          </div>

          {/* Category quick-nav */}
          <div className="mt-8">
            <p className="font-mono text-xs text-wiah-mid mb-3">Jump to</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-mono text-xs border border-white/20 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/40 transition-colors"
                >
                  {cat.name} <span className="opacity-50">↓</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category sections */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {CATEGORIES.map((cat) => (
          <CategorySection key={cat.slug} category={cat} />
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-wiah-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <p className="font-mono text-xs">
            Open data. No cookies. No agenda.
          </p>
        </div>
      </footer>
    </main>
  );
}
