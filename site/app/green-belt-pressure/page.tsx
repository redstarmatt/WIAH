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

interface HomesPoint {
  year: number;
  homesThousands: number;
}

interface AreaPoint {
  year: number;
  areaMillionHa: number;
}

interface RefusalPoint {
  year: number;
  refusalRatePct: number;
}

interface GreenBeltData {
  national: {
    homesBuiltOnGreenBelt: {
      timeSeries: HomesPoint[];
      latestYear: number;
      latestThousands: number;
    };
    greenBeltLandArea: {
      timeSeries: AreaPoint[];
      latestYear: number;
      latestMillionHa: number;
    };
    applicationsRefused: {
      timeSeries: RefusalPoint[];
      latestYear: number;
      latestPct: number;
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

export default function GreenBeltPage() {
  const [data, setData] = useState<GreenBeltData | null>(null);

  useEffect(() => {
    fetch('/data/green-belt-pressure/green_belt.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const homesSeries: Series[] = data
    ? [
        {
          id: 'homes',
          label: 'Homes built on green belt (thousands)',
          colour: '#E63946',
          data: data.national.homesBuiltOnGreenBelt.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.homesThousands,
          })),
        },
      ]
    : [];

  const areaSeries: Series[] = data
    ? [
        {
          id: 'area',
          label: 'Green belt area (million hectares)',
          colour: '#2A9D8F',
          data: data.national.greenBeltLandArea.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.areaMillionHa,
          })),
        },
      ]
    : [];

  const homesAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: NPPF requires Green Belt release &ldquo;exceptional circumstances&rdquo;' },
    { date: new Date(2024, 5, 1), label: '2024: Labour &ldquo;grey belt&rdquo; policy' },
  ];

  const areaAnnotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: '2013: 1.64M ha green belt' },
    { date: new Date(2023, 5, 1), label: '2023: 1.59M ha — 130,000 ha lost' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Green Belt Pressure" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing &amp; Planning"
          question="Is the Green Belt Being Built On?"
          finding="14,860 homes were built on green belt land in 2023, up 40% since 2018. Yet 1.2 million homes of assessed green belt land has planning permission awaiting development. Labour's &lsquo;grey belt&rsquo; policy targets lower-value green belt land."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The green belt is both a planning policy tool and a cultural flashpoint. Designated to prevent urban sprawl around major cities, it covers 12.4% of England's land area. The number of homes built on green belt land has risen 40% since 2018, driven by planning appeals and &ldquo;exceptional circumstances&rdquo; releases. Meanwhile, the total designated area has shrunk from 1.64 million hectares in 2013 to 1.59 million — a loss of 130,000 hectares over a decade.
            </p>
            <p>
              Labour's 2024 NPPF reforms introduced the concept of &ldquo;grey belt&rdquo; — previously developed land within the green belt, and lower-value land that does not fulfil the green belt's five core purposes. The policy is designed to direct development to land that is less environmentally significant. Critics argue it creates uncertainty about what counts as grey belt; supporters argue it allows necessary housing without touching the highest-quality land.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-homes', label: 'Green belt development' },
          { id: 'sec-area', label: 'Total area' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes built on green belt (England)"
              value="14,860"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+40% since 2018 · Under Labour &lsquo;grey belt&rsquo; policy, could rise"
              sparklineData={[10.6, 11.2, 10.8, 12.4, 13.1, 14.9]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Green belt land area (England)"
              value="1.59M ha"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 1.64M ha in 2013 · 130,000 ha lost in a decade"
              sparklineData={[1.64, 1.63, 1.63, 1.62, 1.62, 1.61, 1.61, 1.60, 1.60, 1.60, 1.59]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Green belt applications refused"
              value="65%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 77% in 2019 · Pressure from housing targets"
              sparklineData={[77, 75, 73, 71, 68, 65]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-homes" className="mb-12">
            <LineChart
              title="Homes completed on green belt land, England, 2018–2023"
              subtitle="Number of homes completed on green belt land. The rise reflects both appeal decisions and LPA-initiated boundary reviews to meet housing targets. Labour's grey belt policy may increase this further from 2025."
              series={homesSeries}
              annotations={homesAnnotations}
              yLabel="Thousands of homes"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-area" className="mb-12">
            <LineChart
              title="Total green belt land area, England, 2013–2023"
              subtitle="Designated green belt area in millions of hectares. Falls reflect boundary reviews by local planning authorities. 130,000 hectares has been removed from green belt designation since 2013."
              series={areaSeries}
              annotations={areaAnnotations}
              yLabel="Million hectares"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's changing"
            value="Grey belt"
            unit="NPPF 2024"
            description="Labour's National Planning Policy Framework 2024 introduces &lsquo;grey belt&rsquo; — previously developed or lower-value green belt land — as a priority release zone for housing. Councils must identify grey belt land in their local plans and give it priority over greenfield releases. New development on grey belt must include at least 50% affordable housing. This represents the most significant reform to green belt policy since its designation."
            source="Source: MHCLG — Green Belt Statistics England, 2024. MHCLG — National Planning Policy Framework, December 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
