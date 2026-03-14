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
  { num: 1, name: 'DLUHC', dataset: 'Council Tax collection statistics', url: 'https://www.gov.uk/government/collections/council-tax-statistics', date: '2024' },
  { num: 2, name: 'StepChange', dataset: 'Council tax debt report', url: 'https://www.stepchange.org/policy-and-research/council-tax-debt.aspx', date: '2024' },
  { num: 3, name: 'Local Government Association', dataset: 'Council Tax enforcement research', url: 'https://www.local.gov.uk/publications', date: '2024' },
];

interface DataPoint {
  year: number;
  totalArrears: number;
  collectionRate: number;
  enforcementActions: number;
  writeOffs: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function CouncilTaxArrearsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/council-tax-arrears/council_tax_arrears.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'totalArrears', label: 'Total arrears (£m)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalArrears })) },
        { id: 'collectionRate', label: 'Collection rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.collectionRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'enforcementActions', label: 'Enforcement actions (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.enforcementActions })) },
        { id: 'writeOffs', label: 'Written off (£m)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.writeOffs })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — collection paused' },
    { date: new Date(2022, 5, 1), label: 'Cost of living crisis' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="How Much Council Tax Goes Uncollected?"
          finding={<>Over £5 billion in council tax was in arrears across England in 2023–24, and the in-year collection rate has fallen to around 96% — meaning roughly £1 in every £25 billed is not collected on time.<Cite nums={1} /> The cost of living crisis has pushed arrears to their highest level since records began.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Council tax is the primary source of locally-raised revenue for English councils, and non-collection has direct consequences for local services. When households fall into arrears, councils are legally required to pursue enforcement through the courts, which generates liability orders and can escalate to bailiff action. This enforcement architecture has been criticised for being disproportionate and for turning manageable debt into unmanageable debt — particularly for households already in financial difficulty.<Cite nums={1} /></p>
            <p>The 2013 localisation of council tax support — which ended a universal national benefit and replaced it with locally-designed schemes — is widely cited as a factor in rising arrears. Some councils now require households on very low incomes to pay a minimum 20% of their bill. Debt charities consistently identify council tax as among the most common and fastest-escalating forms of problem debt, partly because of its &quot;priority debt&quot; status and the enforcement powers available to councils.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Arrears' },
          { id: 'sec-chart2', label: 'Enforcement' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Total arrears" value="£5.1bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from £3.3bn in 2016<Cite nums={1} /></>} sparklineData={[3300, 3500, 3700, 3900, 4000, 4200, 4500, 4700, 4900, 5000, 5100]} href="#sec-chart1" />
          <MetricCard label="In-year collection rate" value="96.0" unit="%" direction="down" polarity="up-is-good" changeText={<>Was 97.4% in 2016<Cite nums={1} /></>} sparklineData={[97.4, 97.3, 97.2, 97.0, 96.8, 96.6, 96.4, 96.2, 96.1, 96.0, 96.0]} href="#sec-chart1" />
          <MetricCard label="Enforcement actions" value="2.1m" unit="" direction="up" polarity="up-is-bad" changeText={<>Rising as cost of living bites<Cite nums={3} /></>} sparklineData={[1500, 1600, 1700, 1400, 1200, 1600, 1800, 2000, 2100, 2100, 2100]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Council tax arrears and collection rate, 2015–2024" subtitle="Total arrears (£m) and in-year collection rate (%), England" series={chart1Series} annotations={annotations} yLabel="£m / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Council tax enforcement actions and write-offs, 2015–2024" subtitle="Enforcement actions (thousands) and amounts written off (£m), England" series={chart2Series} annotations={[]} yLabel="Thousands / £m" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Debt respite scheme" value="40k" unit="plans" description={<>The government&apos;s Breathing Space debt respite scheme provided around 40,000 plans covering council tax debt in its first two years, giving households a 60-day moratorium on enforcement action.<Cite nums={2} /></>} source="Source: Insolvency Service, Breathing Space statistics." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
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
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
