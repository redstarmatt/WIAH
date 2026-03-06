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

interface CoveragePoint {
  year: number;
  urbanPct: number;
  suburbanPct: number;
  ruralPct: number;
}

interface NotspotPoint {
  year: number;
  householdsMillions: number;
}

interface FiveGData {
  national: {
    coverageByAreaType: {
      timeSeries: CoveragePoint[];
      latestYear: number;
    };
    fourGNotspots: {
      timeSeries: NotspotPoint[];
      latestYear: number;
      latestMillions: number;
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

export default function FiveGCoveragePage() {
  const [data, setData] = useState<FiveGData | null>(null);

  useEffect(() => {
    fetch('/data/5g-coverage-inequality/5g_coverage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const coverageSeries: Series[] = data
    ? [
        {
          id: 'urban',
          label: 'Urban coverage',
          colour: '#264653',
          data: data.national.coverageByAreaType.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.urbanPct,
          })),
        },
        {
          id: 'suburban',
          label: 'Suburban coverage',
          colour: '#F4A261',
          data: data.national.coverageByAreaType.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.suburbanPct,
          })),
        },
        {
          id: 'rural',
          label: 'Rural coverage',
          colour: '#E63946',
          data: data.national.coverageByAreaType.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralPct,
          })),
        },
      ]
    : [];

  const notspotSeries: Series[] = data
    ? [
        {
          id: 'notspots',
          label: 'Premises without reliable 4G',
          colour: '#E63946',
          data: data.national.fourGNotspots.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.householdsMillions,
          })),
        },
      ]
    : [];

  const coverageAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: 5G commercial rollout begins' },
    { date: new Date(2023, 5, 1), label: '2023: Shared Rural Network live' },
  ];

  const notspotAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Shared Rural Network signed' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="5G Coverage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital Connectivity"
          question="Who Gets Left Behind in the 5G Revolution?"
          finding="5G coverage reaches 42% of UK premises, but rural areas have just 11% coverage versus 70% in urban centres. Over 10 million people remain without reliable 4G, let alone 5G."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK's 5G rollout is proceeding at pace in cities but leaving rural, coastal and deprived communities further behind. Urban-rural digital inequality mirrors and amplifies economic geography: the same towns with weak high streets, fewer jobs and poorer public transport now face a widening digital gap. Urban centres with high footfall and dense housing are commercially attractive to mobile operators; sparsely populated areas require government subsidy to reach.
            </p>
            <p>
              More than 10 million premises remain without reliable indoor 4G from any operator — a connectivity floor that was supposed to have been met years ago. The Shared Rural Network, signed by all four major operators in 2020, commits to 4G coverage across 95% of the UK landmass by 2026. Progress has been slower than planned. Meanwhile, 5G deployment continues to concentrate investment in the South East and major cities, with Northern Ireland, Wales and the North East receiving proportionally less per premises than London.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-coverage', label: '5G by area type' },
          { id: 'sec-notspots', label: '4G notspots' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="5G premises coverage (UK)"
              value="42%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+38pp since 2021 · Rural coverage: 11%"
              sparklineData={[4, 10, 18, 28, 38, 42]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Premises without reliable 4G"
              value="10.3M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 14.2M in 2019 · But rural/deprived areas worst"
              sparklineData={[14.2, 13.8, 13.1, 12.4, 11.8, 10.3]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Urban-rural 5G gap"
              value="59pp"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="70% urban vs 11% rural · Growing faster in cities"
              sparklineData={[34, 46, 53, 58, 59]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-coverage" className="mb-12">
            <LineChart
              title="5G premises coverage by area type, UK, 2021–2025"
              subtitle="Percentage of premises with outdoor 5G signal, by urban, suburban and rural classification. The gap between urban and rural coverage has widened each year."
              series={coverageSeries}
              annotations={coverageAnnotations}
              yLabel="% premises covered"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-notspots" className="mb-12">
            <LineChart
              title="Premises without reliable indoor 4G, UK, 2019–2024"
              subtitle="Number of premises (millions) that cannot receive reliable 4G indoor signal from any operator. Improvement has stalled in the hardest-to-reach rural areas."
              series={notspotSeries}
              annotations={notspotAnnotations}
              yLabel="Millions of premises"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£5bn"
            unit="Project Gigabit commitment"
            description="Project Gigabit commits £5 billion to connect the hardest-to-reach premises with gigabit-capable broadband by 2030. The Shared Rural Network, backed by a £500 million government guarantee, requires all four major operators to extend 4G to 95% of the UK's landmass. Scotland's R100 programme has connected over 100,000 rural premises with voucher-based funding."
            source="Source: DSIT — Project Gigabit programme statistics, 2025. Ofcom Connected Nations, 2025."
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
