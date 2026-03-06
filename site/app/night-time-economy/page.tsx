'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PubClosurePoint {
  year: number;
  netClosuresCumulative: number;
}

interface NightclubPoint {
  year: number;
  count: number;
}

interface EmploymentPoint {
  year: number;
  millionsEmployed: number;
}

interface NightTimeEconomyData {
  national: {
    pubClosures: {
      timeSeries: PubClosurePoint[];
      latestYear: number;
      totalClosed: number;
      closuresPerDay: number;
      note: string;
    };
    nightclubs: {
      timeSeries: NightclubPoint[];
      latestYear: number;
      latestCount: number;
      peakCount2005: number;
      note: string;
    };
    nightTimeEmployment: {
      timeSeries: EmploymentPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NightTimeEconomyPage() {
  const [data, setData] = useState<NightTimeEconomyData | null>(null);

  useEffect(() => {
    fetch('/data/night-time-economy/night_time_economy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const pubClosureSeries: Series[] = data
    ? [{
        id: 'pub-closures',
        label: 'Cumulative net pub closures from 2016',
        colour: '#0D1117',
        data: data.national.pubClosures.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: Math.abs(d.netClosuresCumulative),
        })),
      }]
    : [];

  const nightclubSeries: Series[] = data
    ? [{
        id: 'nightclubs',
        label: 'Nightclubs remaining',
        colour: '#264653',
        data: data.national.nightclubs.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const employmentSeries: Series[] = data
    ? [{
        id: 'employment',
        label: 'Night-time economy employment (millions)',
        colour: '#2A9D8F',
        data: data.national.nightTimeEmployment.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsEmployed,
        })),
      }]
    : [];

  const pubAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic &mdash; pubs forced to close' },
    { date: new Date(2022, 5, 1), label: '2022: Energy bills surge' },
  ];

  const nightclubAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic closes all nightclubs' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Night-Time Economy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Night-Time Economy"
          question="Is Britain&rsquo;s Night-Time Economy Dying?"
          finding="The UK lost 7,000 pubs between 2016 and 2024. Nightclub numbers fell from 3,144 in 2005 to 872 in 2024. The night-time economy employs 8 million people but is contracting in every major city outside London."
          colour="#0D1117"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK pub estate has been contracting for decades, accelerating through austerity, the smoking ban&apos;s long-run impact on footfall, changing drinking habits among younger generations, and the pandemic. Between 2016 and 2024, 7,000 pubs closed on a net basis &mdash; approximately six to seven per day every day for eight years. The closures are not evenly distributed: rural pubs and those in deprived urban areas have closed at the highest rates, taking with them community functions &mdash; post office services, community notice boards, local employment &mdash; that were never captured in GDP calculations.
            </p>
            <p>
              The nightclub sector has experienced a more dramatic structural decline. From over 3,000 venues in 2005, the number fell below 1,000 before the pandemic and has continued declining since, reaching 872 in 2024 &mdash; a 72% decline in two decades. Rising operating costs (energy, security, licensing compliance), changing consumer preferences toward late-licensed bars and experiential venues, and the competition from streaming services and at-home socialising have all contributed. Unlike pub closures, which receive political attention through community asset designation and business rates relief, nightclub decline is largely invisible to policy. The employment picture is more resilient: the 8 million people employed in night-time economy sectors recovered from the pandemic trough and broadly match pre-pandemic levels, but structural decline in the venue base means future employment is fragile.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-pubs', label: 'Pub Closures' },
          { id: 'sec-nightclubs', label: 'Nightclubs' },
          { id: 'sec-employment', label: 'Employment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Pub closures since 2016"
              value="7,000"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Net closures &middot; 6\u20137 pubs per day &middot; Rural and working-class areas hardest hit"
              sparklineData={[0, 800, 1600, 2400, 3200, 4200, 5400, 6200, 7000]}
              href="#sec-pubs"
            />
            <MetricCard
              label="UK nightclubs remaining"
              value="872"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 3,144 in 2005 &middot; 72% decline in 20 years &middot; Energy costs main driver"
              sparklineData={[2800, 2600, 2400, 2200, 2000, 1800, 1600, 1400, 1200, 1100, 1000, 950, 900, 880, 872]}
              href="#sec-pubs"
            />
            <MetricCard
              label="Night-time economy employment"
              value="8M"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Recovered from pandemic trough &middot; But structural decline of venues continues"
              sparklineData={[8.3, 6.2, 7.4, 7.8, 7.9, 8.0]}
              href="#sec-pubs"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-pubs" className="mb-12">
            <LineChart
              title="Cumulative net pub closures from 2016 baseline, UK"
              subtitle="Total net pub closures since 2016 (new openings minus closures). Driven by energy costs, business rates, changing drinking habits, and pandemic impact. Rural and deprived urban areas most affected."
              series={pubClosureSeries}
              annotations={pubAnnotations}
              yLabel="Pubs closed (cumulative)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-nightclubs" className="mb-12">
            <LineChart
              title="Number of nightclubs, UK, 2010&ndash;2024"
              subtitle="Late-night licensed dance venues, UK. Continuous decline from over 2,800 in 2010 to 872 in 2024. Peak was 3,144 in 2005. Rising costs, changing tastes, and competition from bars are primary drivers."
              series={nightclubSeries}
              annotations={nightclubAnnotations}
              yLabel="Nightclubs"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-employment" className="mb-12">
            <LineChart
              title="Night-time economy employment, UK, 2019&ndash;2024"
              subtitle="Estimated employment in night-time economy sectors including hospitality, entertainment, night retail, transport, and security. Pandemic saw 1.8 million job losses; recovery essentially complete by 2023."
              series={employmentSeries}
              annotations={[
                { date: new Date(2020, 5, 1), label: '2020: Pandemic &mdash; sector collapses' },
                { date: new Date(2021, 5, 1), label: '2021: Gradual reopening' },
              ]}
              yLabel="Millions employed"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="12 cities"
            unit="have Night-Time Economy Advisers"
            description="The Night-Time Economy Adviser role, pioneered by London, has been replicated by 12 other UK cities including Manchester, Bristol, Leeds, and Edinburgh. These advisers negotiate with licensing authorities, coordinate late-night transport, and advocate for venue operators in planning decisions. Night-Time Industries Association lobbies for flexible licensing hours to support economic revival. Some councils have introduced business rate relief specifically for music venues and late-night venues. The UK&apos;s Agent of Change planning principle &mdash; adopted in 2018 &mdash; now requires new residential developments near existing venues to fund sound insulation rather than the other way around."
            source="Source: BBPA Statistical Handbook 2024 &middot; Night Time Industries Association State of the Industry 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
