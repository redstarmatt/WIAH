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
  { num: 1, name: 'HMRC', dataset: 'Measuring the Tax Gap', url: 'https://www.gov.uk/government/statistics/measuring-tax-gaps', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'HMRC Tax Compliance and Collection', url: 'https://www.nao.org.uk/reports/hmrc-managing-tax-compliance/', date: '2024' },
  { num: 3, name: 'Tax Justice Network', dataset: 'UK Tax Gap analysis', url: 'https://taxjustice.net/country-profiles/united-kingdom/', date: '2024' },
];

interface DataPoint {
  year: number;
  taxGapAbsolute: number;
  taxGapPercentage: number;
  evasionComponent: number;
  avoidanceComponent: number;
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

export default function HmrcTaxGapPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/hmrc-tax-gap/hmrc_tax_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'taxGapAbsolute', label: 'Tax gap (£bn)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.taxGapAbsolute })) },
        { id: 'taxGapPercentage', label: 'Tax gap (% of theoretical liability)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.taxGapPercentage })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'evasionComponent', label: 'Evasion (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.evasionComponent })) },
        { id: 'avoidanceComponent', label: 'Avoidance (£bn)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avoidanceComponent })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Making Tax Digital for VAT' },
    { date: new Date(2022, 5, 1), label: 'MTD for Income Tax delayed' },
  ];

  return (
    <>
      <TopicNav topic="Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Much Tax Is Going Uncollected?"
          finding={<>HMRC estimates the UK tax gap at £39.8 billion in 2022–23 — around 4.8% of total theoretical tax liabilities.<Cite nums={1} /> The proportion has fallen over the past two decades, but the absolute amount has risen as the overall tax base has grown, and independent analysts believe the official figure understates the true gap.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The tax gap is the difference between the tax HMRC believes is theoretically due and what is actually collected. It encompasses evasion (deliberate non-payment), avoidance (using legal structures to reduce liabilities below their intended level), errors, and failure to take reasonable care. HMRC publishes detailed estimates annually, and these are genuinely methodologically sophisticated — but they are contested, particularly by tax justice campaigners who argue that certain forms of offshore wealth and corporate profit-shifting are inadequately captured.<Cite nums={1} /></p>
            <p>The largest single component by taxpayer type is small businesses, who account for around 60% of the total gap. VAT is the largest single tax contributing to the gap, though Making Tax Digital — a phased move to digital VAT filing — has helped narrow the VAT gap. The income tax gap from employment income is relatively small, because PAYE operates at source. The riskiest area is self-employed income, where the opportunities for under-reporting are greatest.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Tax gap size' },
          { id: 'sec-chart2', label: 'Components' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Tax gap (2022–23)" value="£39.8bn" unit="" direction="up" polarity="up-is-bad" changeText={<>4.8% of total theoretical liability<Cite nums={1} /></>} sparklineData={[34, 35, 34, 33, 35, 36, 37, 38, 39, 39.5, 39.8]} href="#sec-chart1" />
          <MetricCard label="Tax gap as % of liability" value="4.8" unit="%" direction="down" polarity="up-is-bad" changeText={<>Was 7.5% in 2005<Cite nums={1} /></>} sparklineData={[7.5, 7.0, 6.5, 6.0, 5.5, 5.2, 5.0, 4.9, 4.8, 4.8, 4.8]} href="#sec-chart1" />
          <MetricCard label="Evasion component" value="£5.5bn" unit="" direction="flat" polarity="up-is-bad" changeText={<>Offshore evasion a significant driver<Cite nums={3} /></>} sparklineData={[5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="UK tax gap: absolute value and as share of liability, 2005–2023" subtitle="HMRC tax gap estimate (£bn) and as percentage of theoretical tax liability" series={chart1Series} annotations={annotations} yLabel="£bn / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Tax gap components: evasion and avoidance, 2005–2023" subtitle="Estimated evasion and avoidance components of the HMRC tax gap (£bn)" series={chart2Series} annotations={[]} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Compliance yield" value="£45bn" unit="per year" description={<>HMRC&apos;s compliance work — including investigations, nudge letters, and Making Tax Digital — generates an estimated £45 billion per year in additional revenue that would otherwise not be collected.<Cite nums={2} /></>} source="Source: HMRC, Annual Report and Accounts." />
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
