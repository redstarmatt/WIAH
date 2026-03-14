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

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  londonInvestment: number;
  northEastInvestment: number;
  investmentGap: number;
  privateSectorGap: number;
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

const editorialRefs: Reference[] = [
  { num: 1, name: 'HM Treasury', dataset: 'Public Expenditure Statistical Analyses (PESA)', url: 'https://www.gov.uk/government/collections/public-expenditure-statistical-analyses-pesa', date: '2024/25' },
  { num: 2, name: 'DLUHC', dataset: 'Investment Zones and Freeports Progress Report', date: '2025' },
  { num: 3, name: 'IFS', dataset: 'Regional public spending analysis', date: '2024' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/regional-investment/regional_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'londonInvestment',
          label: 'London (£/head)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.londonInvestment,
          })),
        },
        {
          id: 'northEastInvestment',
          label: 'North East (£/head)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.northEastInvestment,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'investmentGap',
          label: 'Investment gap (£/head)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.investmentGap,
          })),
        },
        {
          id: 'privateSectorGap',
          label: 'Private investment gap (£/head est.)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.privateSectorGap,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: HS2 Phase 2b announced' },
    { date: new Date(2023, 5, 1), label: '2023: HS2 Phase 2 scrapped' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Levelling Up Fund Round 2 allocated' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Regional Investment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Where Is Investment Actually Going?"
          finding={<>London and the South East received £2,943 per head in public investment in 2024-25 versus £1,644 in the North East — a gap that has persisted despite levelling-up rhetoric.<Cite nums={1} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public investment in the UK remains sharply tilted towards London and the South East, despite a decade of rhetoric about rebalancing the economy. In 2024-25, identifiable public expenditure on economic affairs — principally transport infrastructure — stood at £2,943 per head in London compared with £1,644 in the North East, a gap of nearly £1,300 per person. This disparity has widened by £300 since 2015. Transport spending is the dominant driver: Crossrail alone cost £18.9 billion, while the cancellation of HS2's northern leg in 2023 removed the single largest planned investment in the regions. The IFS has estimated that London receives roughly 2.5 times more transport capital spending per head than any English region outside the South East.<Cite nums={1} /></p>
            <p>The levelling-up agenda attempted to address this through competitive funding pots — the Levelling Up Fund, Towns Fund, and UK Shared Prosperity Fund — but these programmes were small relative to the scale of the gap and created their own inefficiencies. Councils spent significant resources preparing bids with no guarantee of success, and funding was often allocated in politically salient rather than economically optimal ways. Private investment follows public investment, compounding the imbalance: regions with better transport, digital infrastructure and research facilities attract more business capital. Investment Zones and Freeports in the North and Midlands have attracted £3.4 billion in private commitments, but these remain modest against the structural deficit in regional infrastructure built up over decades of centralised spending decisions.<Cite nums={2} /></p>
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
            label="London public investment per head"
            value="£2,943"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>+£400 since 2015 · transport dominant<Cite nums={1} /></>}
            sparklineData={[2543, 2600, 2650, 2700, 2750, 2650, 2750, 2820, 2880, 2920, 2943]}
            href="#sec-coverage"
          />
          <MetricCard
            label="North East investment per head"
            value="£1,644"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>+£100 since 2015 · gap barely narrowed<Cite nums={1} /></>}
            sparklineData={[1544, 1560, 1570, 1580, 1590, 1560, 1600, 1620, 1630, 1640, 1644]}
            href="#sec-coverage"
          />
          <MetricCard
            label="North-South gap (£/head)"
            value="£1,299"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Widened by £300 since 2015 · HS2 cancellation worsened<Cite nums={3} /></>}
            sparklineData={[999, 1040, 1080, 1120, 1160, 1090, 1150, 1200, 1250, 1280, 1299]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Public investment per head by region, 2015-2025"
              subtitle="Annual identifiable public expenditure per head (£) for London and North East."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Investment gap London vs North East (£/head), 2015-2025"
              subtitle="Difference in public expenditure per head between London and the North East."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Investment Zones delivering private commitments"
            value="£3.4bn"
            unit="private commitments in Investment Zones"
            description={<>Investment Zones in the North and Midlands attracted £3.4bn in private sector commitments by 2025.<Cite nums={2} /> Freeports in Teesside, Humber and Liverpool generated 5,000 jobs.<Cite nums={2} /></>}
            source="Source: DLUHC Investment Zones and Freeports Progress Report, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
