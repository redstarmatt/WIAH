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
  { num: 1, name: 'ONS', dataset: 'UK Trade Statistical Bulletin', url: 'https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest', date: '2025' },
  { num: 2, name: 'ONS', dataset: 'UK Trade in Services', url: 'https://www.ons.gov.uk/businessindustryandtrade/internationaltrade/bulletins/exportsandimportsstatisticsbulletin/latest', date: '2025', note: 'Services exports at record £452bn in 2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  goodsDeficit: number;
  servicesSurplus: number;
  overallBalance: number;
  currentAccount: number;
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
    fetch('/data/trade-balance/trade_balance.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'goodsDeficit',
          label: 'Goods deficit (£bn)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.goodsDeficit,
          })),
        },
        {
          id: 'servicesSurplus',
          label: 'Services surplus (£bn)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.servicesSurplus,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'overallBalance',
          label: 'Overall balance (£bn)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.overallBalance,
          })),
        },
        {
          id: 'currentAccount',
          label: 'Current account balance (£bn)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.currentAccount,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic collapses trade' },
    { date: new Date(2021, 5, 1), label: '2021: Brexit trade friction begins' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Brexit vote, pound falls' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Trade Balance" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Is Britain Paying Its Way in the World?"
          finding={<>The UK has run a persistent trade deficit since 1998. The goods deficit widened post-Brexit while a services surplus partially offset it, leaving an overall deficit of £37bn.<Cite nums={1} /></>}
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Annual trade deficit"
            value="£37bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Goods deficit £233bn partly offset by services surplus<Cite nums={1} /></>}
            sparklineData={[20, 22, 18, 24, 28, 36, 30, 38, 40, 38, 37]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Goods trade deficit"
            value="£233bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>+£68bn since 2015 · manufactured goods gap widened post-Brexit<Cite nums={1} /></>}
            sparklineData={[165, 170, 175, 180, 182, 185, 190, 210, 225, 228, 233]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Services trade surplus"
            value="£196bn"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText={<>+£70bn since 2015 · financial &amp; professional services dominant<Cite nums={2} /></>}
            sparklineData={[126, 132, 140, 146, 152, 145, 155, 165, 180, 190, 196]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK trade in goods and services, 2015-2025"
              subtitle="Annual goods trade deficit and services trade surplus (£bn)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK overall trade balance (£bn), 2015-2025"
              subtitle="Net trade balance (exports minus imports). Negative values indicate a deficit."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Services exports at record high"
            value="£452bn"
            unit="UK services exports in 2024"
            description={<>UK services exports reached a record £452 billion in 2024, driven by financial services, professional services and higher education.<Cite nums={2} /> The UK remains the world's second-largest services exporter.</>}
            source="Source: ONS UK trade in services, 2025."
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
