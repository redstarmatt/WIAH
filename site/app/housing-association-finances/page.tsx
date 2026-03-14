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
  { num: 1, name: 'Regulator of Social Housing', dataset: 'Sector Risk Profile', url: 'https://www.gov.uk/government/collections/sector-risk-profile', date: '2024' },
  { num: 2, name: 'Regulator of Social Housing', dataset: 'Global Accounts of Housing Providers', url: 'https://www.gov.uk/government/collections/global-accounts-of-housing-providers', date: '2024' },
  { num: 3, name: 'National Housing Federation', dataset: 'Home Truths report', url: 'https://www.housing.org.uk/resources/home-truths/', date: '2024' },
];

interface DataPoint {
  year: number;
  interestCoverRatio: number;
  debtPerUnit: number;
  maintenanceBacklog: number;
  newHomesDelivered: number;
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

export default function HousingAssociationFinancesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/housing-association-finances/housing_association_finances.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'interestCoverRatio', label: 'Sector interest cover ratio (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.interestCoverRatio })) },
        { id: 'debtPerUnit', label: 'Debt per unit (£000s)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.debtPerUnit })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'maintenanceBacklog', label: 'Maintenance backlog (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.maintenanceBacklog })) },
        { id: 'newHomesDelivered', label: 'New homes delivered (000s)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.newHomesDelivered })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Interest rate rises begin' },
    { date: new Date(2023, 5, 1), label: 'RSH consumer regulation tightened' },
  ];

  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are Housing Associations Financially Stable?"
          finding={<>The Regulator of Social Housing placed the sector on heightened watch in 2023, as rising interest rates, a £10 billion building safety backlog, and falling revenues squeezed margins to their lowest levels in a decade.<Cite nums={1} /> New home delivery fell sharply as associations prioritised repairing existing stock over building new.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's housing associations collectively own around 2.9 million homes and carry over £100 billion in debt. For most of the 2010s, low interest rates kept debt servicing costs manageable, allowing the sector to expand supply. Since 2022, sharply higher rates have cut into the interest cover ratios that regulators and lenders use as a proxy for financial health. The Regulator's 2024 Sector Risk Profile found that almost a third of associations had interest cover below recommended thresholds.<Cite nums={1} /></p>
            <p>The building safety crisis has compounded pressures. The aftermath of Grenfell has forced associations to set aside billions to remediate unsafe cladding and fire safety defects. The National Housing Federation estimates the total bill could reach £10 billion across the social sector, money that was budgeted for new homes and planned maintenance.<Cite nums={3} /> As a result, new social homes completions fell from around 50,000 per year to under 35,000 by 2024, widening the existing shortfall in affordable housing.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-finances', label: 'Financial health' },
          { id: 'sec-delivery', label: 'New homes delivery' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Sector interest cover ratio" value="110%" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 165% in 2020<Cite nums={1} /></>} sparklineData={[165, 160, 155, 150, 148, 140, 130, 125, 120, 115, 110]} href="#sec-finances" />
          <MetricCard label="Debt per social home" value="£38,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Up 22% over 5 years<Cite nums={2} /></>} sparklineData={[28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]} href="#sec-finances" />
          <MetricCard label="New social homes (2023)" value="34,000" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 52,000 in 2017<Cite nums={2} /></>} sparklineData={[52, 50, 48, 46, 44, 40, 38, 36, 35, 34, 34]} href="#sec-delivery" />
        </div>

        <ScrollReveal>
          <section id="sec-finances" className="mb-12">
            <LineChart title="Housing association sector financial health indicators, 2014–2024" subtitle="Interest cover ratio (%) and debt per unit (£000s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-delivery" className="mb-12">
            <LineChart title="Maintenance backlog and new homes delivery, 2014–2024" subtitle="Estimated backlog in £bn; new social homes completed in 000s." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Affordable Homes Programme" value="£11.5bn" unit="" description={<>The government's 2021–2026 Affordable Homes Programme committed £11.5 billion to new social housing, though delivery has been slower than projected due to cost inflation and financial pressures on associations.<Cite nums={3} /></>} source="Source: Homes England / National Housing Federation." />
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
