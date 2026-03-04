import SiteName from '@/components/SiteName';
import FeaturedFindings from '@/components/FeaturedFindings';
import TopicBrowser from '@/components/TopicBrowser';
import { getScorecard } from '@/lib/topics';

export default function HomePage() {
  const { worse, better, stable, total, topicCount } = getScorecard();
  const worsePercent = Math.round((worse / total) * 100);
  const betterPercent = Math.round((better / total) * 100);
  const stablePercent = Math.round((stable / total) * 100);

  return (
    <main>
      {/* ── Dark hero ────────────────────────────────────────────────── */}
      <section className="bg-wiah-dark text-white px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <h1>
            <SiteName size="hero" />
          </h1>

          {/* Scorecard — the dominant visual statement */}
          <div className="mt-12 max-w-2xl">
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Of{' '}
              <span className="font-mono font-bold text-white">{total}</span>{' '}
              tracked indicators across{' '}
              <span className="font-mono font-bold text-white">{topicCount}</span>{' '}
              topics,
            </p>
            <p className="mt-1 text-lg md:text-xl leading-relaxed">
              <span
                className="font-mono font-bold text-3xl md:text-4xl"
                style={{ color: '#E63946' }}
              >
                {worse}
              </span>{' '}
              <span className="text-white/80">are getting worse.</span>
            </p>

            {/* Large proportion bar */}
            <div className="mt-8 w-full">
              <div className="flex h-2.5 rounded-full overflow-hidden w-full">
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

              {/* Labelled numbers below the bar */}
              <div className="flex gap-8 mt-4">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-2xl font-bold"
                    style={{ color: '#E63946' }}
                  >
                    {worsePercent}%
                  </span>
                  <span className="font-mono text-xs text-wiah-mid">
                    deteriorating
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-2xl font-bold"
                    style={{ color: '#2A9D8F' }}
                  >
                    {betterPercent}%
                  </span>
                  <span className="font-mono text-xs text-wiah-mid">
                    improving
                  </span>
                </div>
                {stable > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-mono text-2xl font-bold"
                      style={{ color: '#F4A261' }}
                    >
                      {stablePercent}%
                    </span>
                    <span className="font-mono text-xs text-wiah-mid">
                      stable
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial line */}
            <p className="mt-8 font-editorial text-base text-white/50 italic">
              Britain in 2026 — the numbers behind the headlines.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured findings strip ──────────────────────────────────── */}
      <FeaturedFindings />

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-wiah-border" />
      </div>

      {/* ── Topic browser (tabbed categories) ────────────────────────── */}
      <TopicBrowser />

      {/* ── Footer ───────────────────────────────────────────────────── */}
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
