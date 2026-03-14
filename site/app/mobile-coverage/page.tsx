'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofcom', dataset: 'Connected Nations Report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', date: '2025' },
  { num: 2, name: 'DSIT', dataset: 'Shared Rural Network progress report', url: 'https://www.gov.uk/government/publications/shared-rural-network', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  allFourPct: number;
  noReliablePct: number;
  englandPct: number;
  scotlandPct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/mobile-coverage/mobile_coverage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'allFourPct',
          label: 'All 4 operators (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.allFourPct,
          })),
        },
        {
          id: 'noReliablePct',
          label: 'No reliable indoor coverage (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.noReliablePct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'englandPct',
          label: 'England landmass (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.englandPct,
          })),
        },
        {
          id: 'scotlandPct',
          label: 'Scotland landmass (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.scotlandPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Shared Rural Network signed' },
    { date: new Date(2023, 5, 1), label: '2023: First SRN masts live' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: SRN agreement signed' },
    { date: new Date(2024, 5, 1), label: '2024: SRN masts operational' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Mobile Coverage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Where in the UK Can't You Make a Call?"
          finding={<>4% of UK premises still lack reliable indoor voice coverage from any operator.<Cite nums={1} /> Rural areas are disproportionately affected, with parts of Wales, Scotland and Northern England having coverage from only one or two operators.<Cite nums={[1, 2]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Mobile connectivity is now essential infrastructure, yet around 1.1 million UK premises cannot reliably make a voice call indoors from any operator. The problem is overwhelmingly rural: parts of mid-Wales, the Scottish Highlands and the Northumberland borders have coverage from just one network, leaving residents with no fallback if that operator suffers an outage. This is not simply an inconvenience. In areas without landline alternatives, single-operator coverage means emergency calls can fail entirely, and businesses that depend on mobile connectivity face a structural economic disadvantage compared to urban competitors.<Cite nums={1} /></p>
            <p>The Shared Rural Network, a public-private partnership signed in 2020, was designed to close these gaps by requiring operators to share masts in underserved areas. Progress has been slower than planned. The programme targets 95% geographic 4G coverage by the end of 2026, but Ofcom data shows coverage at 92% of landmass as of 2025, and the most difficult final percentage points involve terrain and planning constraints that make each additional mast disproportionately expensive. Meanwhile, the rollout of 5G has been almost exclusively urban, widening the digital divide between city and countryside even as the baseline slowly improves.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Premises with no reliable indoor voice"
            value="4%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 9% in 2015 · Progress slowing in rural areas"
            sparklineData={[9, 8.5, 8.0, 7.5, 7.0, 6.5, 5.8, 5.2, 4.7, 4.3, 4.0]}
            href="#sec-coverage"
          />
          <MetricCard
            label="UK landmass with 4G coverage"
            value="92%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Target: 95% by 2026 · Shared Rural Network behind schedule"
            sparklineData={[72, 75, 78, 80, 82, 84, 86, 88, 89, 91, 92]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Rural premises: single operator only"
            value="18%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="No operator choice · Emergency calls only risk"
            sparklineData={[31, 29, 27, 25, 24, 23, 22, 21, 20, 19, 18]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Premises with reliable indoor coverage, by operator count, UK, 2015–2025"
              subtitle="Percentage of premises with indoor voice coverage from 1, 2, 3 or 4 operators. Single-operator coverage leaves users with no fallback."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="4G geographic coverage, UK nations, 2015–2025"
              subtitle="Percentage of UK landmass with 4G signal from at least one operator, by nation. Coverage differs significantly from premises-based figures due to population distribution."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="500+"
            unit="Shared Rural Network new masts"
            description="The Shared Rural Network, backed by £500 million in government funding, requires all four major operators to share infrastructure in rural areas. Over 500 new masts are planned, with the first becoming operational in 2023. The programme targets 4G coverage across 95% of the UK's geographic landmass by end of 2026."
            source="Source: Ofcom — Connected Nations Report, 2025. DSIT — Shared Rural Network progress, 2025."
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

        <References items={editorialRefs} />
      </main>
    </>
  );
}
