'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface SpendingPoint {
  year: number;
  spendingBillions: number;
}

interface FloodPayoutsPoint {
  year: number;
  payoutsBillions: number;
}

interface UninsuredPoint {
  year: number;
  uninsuredMillions: number;
}

interface ClimateAdaptationData {
  national: {
    adaptationSpending: {
      timeSeries: SpendingPoint[];
      latestYear: number;
      latestBillions: number;
      requiredBillionsByMidCentury: number;
      note: string;
    };
    floodInsurancePayouts: {
      timeSeries: FloodPayoutsPoint[];
      latestYear: number;
      latestBillions: number;
      note: string;
    };
    uninsuredFloodHomes: {
      timeSeries: UninsuredPoint[];
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

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'Climate Change Committee', dataset: 'UK Climate Risk Assessment 2022', url: 'https://www.theccc.org.uk/publication/independent-assessment-of-uk-climate-risk/', date: '2022' },
  { num: 2, name: 'Environment Agency', dataset: 'Flood Risk Assessments & Long-term Investment Scenarios', url: 'https://www.gov.uk/government/publications/flood-and-coastal-risk-management-national-report', date: '2024' },
  { num: 3, name: 'Flood Re', dataset: 'Transition Plan and Annual Report', url: 'https://www.floodre.co.uk/', date: '2024' },
  { num: 4, name: 'Defra', dataset: 'Third National Adaptation Programme (NAP3)', url: 'https://www.gov.uk/government/publications/third-national-adaptation-programme-nap3', date: '2023' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ClimateAdaptationPage() {
  const [data, setData] = useState<ClimateAdaptationData | null>(null);

  useEffect(() => {
    fetch('/data/climate-adaptation-costs/climate_adaptation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Government adaptation spending (£ billions)',
        colour: '#264653',
        data: data.national.adaptationSpending.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.spendingBillions,
        })),
      }]
    : [];

  const floodSeries: Series[] = data
    ? [
        {
          id: 'payouts',
          label: 'Flood insurance payouts (£ billions)',
          colour: '#E63946',
          data: data.national.floodInsurancePayouts.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.payoutsBillions,
          })),
        },
        {
          id: 'uninsured',
          label: 'Uninsured households in flood zones (millions)',
          colour: '#F4A261',
          data: data.national.uninsuredFloodHomes.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.uninsuredMillions,
          })),
        },
      ]
    : [];

  const spendingAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: £5.2bn flood defence programme announced' },
    { date: new Date(2022, 5, 1), label: '2022: UK Climate Risk Assessment — £78bn/yr warning' },
    { date: new Date(2023, 5, 1), label: '2023: Third National Adaptation Programme published' },
  ];

  const floodAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Exceptional flood event — record payouts' },
    { date: new Date(2024, 5, 1), label: '2024: Record annual payouts — insurers exit some areas' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const spendingSparkline = data
    ? data.national.adaptationSpending.timeSeries.map(d => d.spendingBillions)
    : [];
  const payoutsSparkline = data
    ? data.national.floodInsurancePayouts.timeSeries.map(d => d.payoutsBillions)
    : [];
  const uninsuredSparkline = data
    ? data.national.uninsuredFloodHomes.timeSeries.map(d => d.uninsuredMillions)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Climate Adaptation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Climate Adaptation Costs"
          question="What Will Climate Change Cost the UK?"
          finding="The UK faces £78 billion in annual climate adaptation costs by 2050 if warming reaches 2&deg;C. Current government adaptation spending is £800 million per year — less than 1% of what will be needed. Property flood risk alone affects 6.3 million homes."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK Climate Risk Assessment 2022 set out in stark terms what inadequate adaptation will cost. The Climate Change Committee estimates that by 2050, at 2&deg;C of global warming, the UK will face £78 billion per year in adaptation costs — covering flood and coastal erosion defence, heat-related public health, water scarcity, food system resilience and infrastructure hardening.<Cite nums={1} /> Current government spending on adaptation is estimated at £800 million per year — less than 1% of the sum needed.<Cite nums={1} /> There is no consolidated adaptation budget; the figure is estimated by aggregating spending across the Environment Agency flood programme, NHS heat resilience, agriculture support, and planning system costs.<Cite nums={2} />
            </p>
            <p>
              Flood risk concentrates the consequences of inaction. The Environment Agency estimates 6.3 million homes in England are at risk of flooding from rivers, sea or surface water.<Cite nums={2} /> Record flood insurance payouts of £1.2 billion in 2024 reflect a trend of more frequent, more severe flood events.<Cite nums={2} /> But 1.4 million households in flood risk zones have no flood insurance — either because insurers have priced them out or withdrawn coverage entirely.<Cite nums={[2, 3]} /> Flood Re, the government-backed reinsurance scheme, provides affordable flood cover for 300,000 homes.<Cite nums={3} /> That leaves around a million flood-risk households unprotected and potentially uninsurable. As the climate warms, insurers will continue to reprice or exit, turning a current insurance problem into a property value and mortgage crisis.<Cite nums={1} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-spending', label: 'Adaptation Spending' },
          { id: 'sec-flood', label: 'Flood Insurance' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual adaptation spending (2025)"
              value="£800M"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="vs £78bn needed annually by 2050 at 2°C · 1% of requirement"
              sparklineData={spendingSparkline}
              href="#sec-spending"
            />
            <MetricCard
              label="Annual flood insurance payouts (2024)"
              value="£1.2bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · 6.3 million homes in flood risk zones"
              sparklineData={payoutsSparkline}
              href="#sec-spending"
            />
            <MetricCard
              label="Uninsured households in flood zones"
              value="1.4M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Growing as insurers exit or price out · Flood Re covers 300,000"
              sparklineData={uninsuredSparkline}
              href="#sec-spending"
            />
          </div>
        

        {/* Chart 1: Adaptation spending */}
        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="UK government climate adaptation spending, 2018–2025"
              subtitle="Estimated annual UK government spending on climate adaptation (£ billions), aggregated across flood defence, heat resilience, water security and planning. Growing from £0.4bn to £0.8bn but far short of the £78bn per year estimated requirement by 2050."
              series={spendingSeries}
              annotations={spendingAnnotations}
              yLabel="£ billions"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Flood payouts and uninsured */}
        <ScrollReveal>
          <section id="sec-flood" className="mb-12">
            <LineChart
              title="Flood insurance payouts and uninsured flood-risk homes, UK, 2015–2025"
              subtitle="Annual flood insurance claims payouts (£ billions, red) and estimated uninsured households in flood risk zones (millions, amber). Both indicators rising as climate change increases flood frequency and insurers reprice risk."
              series={floodSeries}
              annotations={floodAnnotations}
              yLabel="£bn / Millions"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£5.2bn"
            unit="Flood defence programme"
            description="Flood Re provides affordable flood cover for 300,000 high-risk homes, with the scheme due for review in 2039 to determine whether insurance markets can resume normal risk-based pricing. The Environment Agency's 6-year £5.2 billion flood programme will better protect 336,000 properties by 2027. The Third National Adaptation Programme (NAP3) published in 2023 sets adaptation targets across 26 risk areas. The planning system's updated flood risk sequential test requires new development to avoid high-risk areas where possible."
            source="Source: Environment Agency — Long-term investment scenarios. Climate Change Committee — Progress in adapting to climate change 2023."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
              <RelatedTopics />
      </main>
    </>
  );
}
