import Link from 'next/link';
import SiteName from '@/components/SiteName';
import FeaturedFindings from '@/components/FeaturedFindings';
import TopicBrowser from '@/components/TopicBrowser';
import HeroSearch from '@/components/HeroSearch';
import { getScorecard } from '@/lib/topics';
import { BODIES } from '@/lib/bodies';

export default function HomePage() {
  const { total, topicCount, worse, better } = getScorecard();
  const bodiesCount = BODIES.length;

  return (
    <main>
      {/* ── Dark hero ────────────────────────────────────────────────── */}
      <section className="bg-wiah-dark text-white px-6 py-14 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-4">
            <SiteName size="hero" />
          </h1>

          <p className="font-editorial italic text-white/70 text-base md:text-lg mb-6 leading-relaxed">
            Public data. Public understanding.
          </p>

          {/* Hero search + chips */}
          <HeroSearch />

          {/* Subtle stats footnote */}
          <p className="mt-5 font-mono text-xs text-white/50">
            {total} indicators · {topicCount} topics · updated weekly
          </p>
        </div>
      </section>

      {/* ── Featured findings strip ──────────────────────────────────── */}
      <FeaturedFindings />

      {/* ── Accountability Index card ─────────────────────────────────── */}
      <section className="px-6 py-8 border-t border-wiah-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sources card */}
            <Link
              href="/sources"
              className="group flex-1 block border border-wiah-border rounded p-5 hover:border-wiah-blue/50 transition-colors"
            >
              <p className="font-mono text-[10px] text-wiah-mid uppercase tracking-wider mb-2">Transparency</p>
              <h3 className="text-base font-bold text-wiah-black group-hover:text-wiah-blue transition-colors mb-1">
                Data Sources
              </h3>
              <p className="text-sm text-wiah-mid leading-relaxed mb-3">
                Every dataset we use — government open data, NHS statistics, ONS figures. Every number has a dated, linked source.
              </p>
              <p className="font-mono text-xs text-wiah-blue group-hover:text-wiah-black transition-colors">
                View all sources →
              </p>
            </Link>
            {/* Public bodies card */}
            <Link
              href="/bodies"
              className="group flex-1 block border border-wiah-border rounded p-5 hover:border-wiah-blue/50 transition-colors"
            >
              <p className="font-mono text-[10px] text-wiah-mid uppercase tracking-wider mb-2">Accountability Index</p>
              <h3 className="text-base font-bold text-wiah-black group-hover:text-wiah-blue transition-colors mb-1">
                Public Bodies
              </h3>
              <p className="text-sm text-wiah-mid leading-relaxed mb-3">
                {bodiesCount} public bodies tracked by their own published data. NHS England, the Environment Agency, Ministry of Justice, and more.
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-wiah-red">{worse} metrics getting worse</span>
                <span className="font-mono text-xs text-wiah-border">·</span>
                <span className="font-mono text-xs text-wiah-green">{better} getting better</span>
              </div>
              <p className="font-mono text-xs text-wiah-blue group-hover:text-wiah-black transition-colors">
                View accountability index →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-wiah-border" />
      </div>

      {/* ── Topic browser (tabbed categories) ────────────────────────── */}
      <TopicBrowser />

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-wiah-border py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <nav className="flex items-center gap-4 font-mono text-xs">
            <Link href="/about" className="hover:text-wiah-black transition-colors">About</Link>
            <Link href="/sources" className="hover:text-wiah-black transition-colors">Sources</Link>
            <Link href="/bodies" className="hover:text-wiah-black transition-colors">Public Bodies</Link>
            <Link href="/privacy" className="hover:text-wiah-black transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-wiah-black transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
