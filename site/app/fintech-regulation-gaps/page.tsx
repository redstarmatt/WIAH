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
  { num: 1, name: 'Financial Conduct Authority', dataset: 'Consumer investments data review', url: 'https://www.fca.org.uk/data/consumer-investments-data-review', date: '2024' },
  { num: 2, name: 'FCA', dataset: 'Authorised push payment scams and Buy Now Pay Later', url: 'https://www.fca.org.uk/publications/consultation-papers/cp22-20-buy-now-pay-later', date: '2024' },
  { num: 3, name: 'Which?', dataset: 'Unregulated financial products consumer harm', url: 'https://www.which.co.uk/consumer-rights/regulation/buy-now-pay-later', date: '2024' },
];

interface DataPoint {
  year: number;
  unregulatedProductsUsers: number;
  consumerHarmEstimate: number;
  bnplOutstandingBn: number;
  cryptoInvestors: number;
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

export default function FintechRegulationGapsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fintech-regulation-gaps/fintech_regulation_gaps.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'bnplOutstandingBn', label: 'BNPL outstanding balance (£bn)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bnplOutstandingBn })) },
        { id: 'cryptoInvestors', label: 'UK crypto investors (millions)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cryptoInvestors })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'consumerHarmEstimate', label: 'Consumer harm from unregulated products (£m)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.consumerHarmEstimate })) },
        { id: 'unregulatedProductsUsers', label: 'Using unregulated financial products (millions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unregulatedProductsUsers })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Woolard Review — BNPL regulation proposed' },
    { date: new Date(2023, 5, 1), label: 'BNPL regulation still not enacted' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Economy"
          question="Are Fintech Regulation Gaps Putting Consumers at Risk?"
          finding={<>Buy Now Pay Later products have grown to an estimated £6 billion in outstanding balances, yet remain outside FCA regulation — meaning consumers have no right to the same protections as with regulated credit.<Cite nums={1} /> Around 12 million UK adults hold crypto assets, often without understanding the risks involved.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Financial technology has outpaced regulation in two significant areas. Buy Now Pay Later — the deferred payment model offered by companies including Klarna, Clearpay, and Laybuy — was until recently entirely unregulated, meaning users had no right to affordability checks, no access to the Financial Ombudsman Service, and no mandatory disclosure of interest or fees. The FCA&apos;s Woolard Review in 2021 called for urgent regulation, but legislation to bring BNPL into scope was still not enacted by 2024 — leaving millions of users, many of them young and financially stretched, without protection.<Cite nums={1} /></p>
            <p>Cryptocurrency represents a different but overlapping risk. Around 12 million UK adults held crypto assets in 2023 — many attracted by advertising on social media from platforms not authorised to give financial advice in the UK. The FCA has required crypto firms to register, and has banned crypto promotions to retail investors from unapproved promoters, but enforcement has been difficult given the cross-border nature of many platforms. Consumer losses from crypto scams are estimated at over £300 million annually.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Market scale' },
          { id: 'sec-chart2', label: 'Consumer harm' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="BNPL outstanding balance" value="£6bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Unregulated; up from near zero in 2018<Cite nums={1} /></>} sparklineData={[0.2, 0.5, 1.0, 2.0, 4.0, 5.5, 6.0, 6.0, 6.0, 6.0, 6.0]} href="#sec-chart1" />
          <MetricCard label="UK crypto investors" value="12m" unit="" direction="flat" polarity="flat" changeText={<>22% of UK adults; many unaware of risks<Cite nums={2} /></>} sparklineData={[1, 2, 4, 7, 10, 14, 13, 12, 12, 12, 12]} href="#sec-chart1" />
          <MetricCard label="Crypto scam losses" value="£300m" unit="/yr" direction="up" polarity="up-is-bad" changeText={<>Estimated; likely an undercount<Cite nums={3} /></>} sparklineData={[50, 80, 120, 180, 250, 300, 310, 305, 300, 300, 300]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="BNPL market and crypto adoption, 2017–2024" subtitle="Buy Now Pay Later outstanding balances (£bn) and UK crypto investors (millions)" series={chart1Series} annotations={annotations} yLabel="£bn / millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Consumer harm from unregulated fintech, 2017–2024" subtitle="Estimated consumer harm from unregulated products (£m) and users (millions)" series={chart2Series} annotations={[]} yLabel="£m / millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Authorised firms" value="42" unit="crypto firms registered" description={<>Only 42 crypto asset businesses had passed FCA anti-money laundering registration by early 2024, out of over 300 that applied — reflecting the regulator&apos;s determination to raise standards, though many firms operate from overseas without registration.<Cite nums={1} /></>} source="Source: FCA, Cryptoasset registration list." />
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
