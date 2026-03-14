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
  { num: 1, name: 'ONS', dataset: 'Childcare and early years — grandparental involvement', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families', date: '2024' },
  { num: 2, name: 'Grandparents Plus', dataset: 'The role of grandparents in childcare', url: 'https://www.grandparentsplus.org.uk/', date: '2024' },
  { num: 3, name: 'IPPR', dataset: 'Childcare and the labour market', url: 'https://www.ippr.org/research/', date: '2024' },
];

interface DataPoint {
  year: number;
  grandparentsProvidingRegularChildcare: number;
  hoursPerWeekGrandparentCare: number;
  childcareSubsidyTakeUp: number;
  formalChildcareCost: number;
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

export default function GrandparentChildcarePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/grandparent-childcare/grandparent_childcare.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'grandparentsProvidingRegularChildcare', label: 'Grandparents providing regular care (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.grandparentsProvidingRegularChildcare })) },
        { id: 'hoursPerWeekGrandparentCare', label: 'Average hours per week', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hoursPerWeekGrandparentCare })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'formalChildcareCost', label: 'Formal childcare cost (£/week, full-time)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.formalChildcareCost })) },
        { id: 'childcareSubsidyTakeUp', label: 'Childcare subsidy take-up (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childcareSubsidyTakeUp })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '30 hours free childcare expansion' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="How Much Are Grandparents Propping Up Childcare?"
          finding={<>Around 2.5 million grandparents provide regular childcare in the UK, contributing an estimated £7.7 billion of unpaid care annually — a figure that reflects the unaffordability of formal provision for many families.<Cite nums={1} /> As formal childcare costs have risen, grandparental involvement has increased further.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Formal childcare in the UK is among the most expensive in the OECD, absorbing on average around 29% of net family income — and in London and the South East, full-time nursery costs can exceed £2,000 per month per child. In this context, grandparental childcare has become a structural rather than supplementary feature of British family life. An estimated 40% of working parents rely on grandparents for at least some childcare, with grandparents providing an average of 13 hours per week.<Cite nums={1} /></p>
            <p>Grandparents Plus&apos;s research has documented the consequences: grandparents reducing their own working hours or retiring early to provide care, health impacts from physically demanding care for young children, and the geographic constraint of families limiting where they can live based on proximity to grandparents. For the poorest families, grandparental care is not just preferable but essential — formal childcare is simply unaffordable. The government&apos;s expansion of funded childcare hours to children aged 9 months and over from 2024 will reduce some of this pressure, but only where places are available.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Grandparental care' },
          { id: 'sec-chart2', label: 'Formal care costs' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Grandparents providing regular care" value="2.5m" unit="" direction="up" polarity="flat" changeText={<>Up from 2.0m in 2010<Cite nums={1} /></>} sparklineData={[2.0, 2.1, 2.1, 2.2, 2.2, 2.3, 2.3, 2.4, 2.4, 2.5, 2.5]} href="#sec-chart1" />
          <MetricCard label="Estimated value of care" value="£7.7bn" unit="" direction="up" polarity="flat" changeText={<>At minimum wage equivalent rate<Cite nums={2} /></>} sparklineData={[5.5, 5.8, 6.0, 6.2, 6.5, 6.7, 7.0, 7.2, 7.4, 7.6, 7.7]} href="#sec-chart1" />
          <MetricCard label="Full-time nursery cost (England)" value="£1,370" unit="/month" direction="up" polarity="up-is-bad" changeText={<>Up 30% in real terms since 2010<Cite nums={3} /></>} sparklineData={[1050, 1080, 1110, 1140, 1170, 1200, 1250, 1300, 1340, 1355, 1370]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Grandparents providing childcare, 2010–2024" subtitle="Grandparents providing regular childcare (millions) and average hours per week" series={chart1Series} annotations={annotations} yLabel="Millions / hours" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Formal childcare costs and subsidy take-up, 2010–2024" subtitle="Full-time nursery cost (£/week) and government subsidy take-up rate (%)" series={chart2Series} annotations={[]} yLabel="£/week / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Grandparent NI credits" value="105k" unit="claims" description={<>Around 105,000 grandparents claimed Specified Adult Childcare National Insurance credits in 2023 — protecting their state pension entitlement when they reduce working hours to care for grandchildren.<Cite nums={2} /></>} source="Source: HMRC, Specified Adult Childcare credits statistics." />
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
