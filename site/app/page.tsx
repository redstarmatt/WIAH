import SiteName from '@/components/SiteName';
import FeaturedFindings from '@/components/FeaturedFindings';
import TopicBrowser from '@/components/TopicBrowser';
import HeroSearch from '@/components/HeroSearch';
import { getScorecard } from '@/lib/topics';

export default function HomePage() {
  const { total, topicCount } = getScorecard();

  return (
    <main>
      {/* ── Dark hero ────────────────────────────────────────────────── */}
      <section className="bg-wiah-dark text-white px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-4">
            <SiteName size="hero" />
          </h1>

          <p className="font-editorial italic text-white/50 text-base md:text-lg mb-10 leading-relaxed">
            The numbers behind Britain&rsquo;s biggest questions.
            <br className="hidden sm:block" />
            No headlines. No spin. Just ask.
          </p>

          {/* Hero search + chips */}
          <HeroSearch />

          {/* Subtle stats footnote */}
          <p className="mt-8 font-mono text-xs text-white/20">
            {total} indicators · {topicCount} topics · updated weekly
          </p>
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
