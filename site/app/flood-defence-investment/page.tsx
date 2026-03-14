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
  { num: 1, name: 'Environment Agency', dataset: 'Flood and coastal erosion risk management — annual report', url: 'https://www.gov.uk/government/collections/flood-and-coastal-erosion-risk-management-report', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Managing flood risk', url: 'https://www.nao.org.uk/reports/managing-flood-risk/', date: '2023' },
  { num: 3, name: 'Climate Change Committee', dataset: 'Adaptation progress report', url: 'https://www.theccc.org.uk/publication/2023-progress-report-to-parliament-adaptation/', date: '2023' },
];

interface DataPoint {
  year: number;
  capitalInvestmentBn: number;
  maintenanceSpendBn: number;
  homesProtected: number;
  defencesAtHighRisk: number;
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

export default function FloodDefenceInvestmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/flood-defence-investment/flood_defence_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'capitalInvestmentBn', label: 'Capital investment in flood defences (£bn)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.capitalInvestmentBn })) },
        { id: 'maintenanceSpendBn', label: 'Maintenance spend (£bn)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.maintenanceSpendBn })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'homesProtected', label: 'Homes better protected (000s, cumulative)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.homesProtected })) },
        { id: 'defencesAtHighRisk', label: 'Flood defences in poor/very poor condition (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.defencesAtHighRisk })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '£5.2bn 6-year programme' },
    { date: new Date(2015, 5, 1), label: 'Cumbria flooding' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="Is Flood Defence Spending Keeping Pace with Risk?"
          finding={<>The government's £5.2 billion flood defence programme (2021–2027) is broadly on track for capital spending, but the National Audit Office found in 2023 that maintenance of existing defences has been chronically underfunded, with around a quarter of structures in poor or deteriorating condition.<Cite nums={[1, 2]} /> Climate change is increasing flood risk faster than defences are being built.<Cite nums={3} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has around 400,000 km of flood defence assets — walls, embankments, pumping stations and sluices — maintained predominantly by the Environment Agency and internal drainage boards. The 2021–2027 capital programme targets 336,000 new homes better protected, but each new defence adds to the maintenance liability, and the NAO found that the maintenance budget has been squeezed by real-terms cuts since 2010. Around 10% of flood defences are in poor or very poor condition.<Cite nums={[1, 2]} /></p>
            <p>The Climate Change Committee's 2023 adaptation report found that flood risk to homes and businesses is projected to increase significantly by the 2050s even under current emissions trajectories, and that current investment levels are insufficient to hold flood risk constant, let alone reduce it. The EA's annual flood risk reports consistently show that many local flood management partnerships lack the funding to maintain local drainage infrastructure, creating a fragmented picture of protection that looks strong nationally but masks significant local gaps.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-investment', label: 'Investment levels' },
          { id: 'sec-condition', label: 'Defence condition' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Annual capital flood spend" value="£850m" unit="" direction="up" polarity="up-is-good" changeText={<>Part of £5.2bn 6-year programme<Cite nums={1} /></>} sparklineData={[400, 450, 500, 550, 600, 650, 700, 750, 800, 830, 850]} href="#sec-investment" />
          <MetricCard label="Defences in poor/very poor condition" value="10%" unit="" direction="up" polarity="up-is-bad" changeText={<>Maintenance consistently underfunded<Cite nums={2} /></>} sparklineData={[6, 6, 7, 7, 7, 8, 8, 9, 9, 10, 10]} href="#sec-condition" />
          <MetricCard label="Homes better protected (2021–24)" value="88,000" unit="" direction="up" polarity="up-is-good" changeText={<>Target: 336,000 by 2027<Cite nums={1} /></>} sparklineData={[0, 0, 0, 0, 0, 10, 25, 45, 60, 75, 88]} href="#sec-condition" />
        </div>

        <ScrollReveal>
          <section id="sec-investment" className="mb-12">
            <LineChart title="Flood defence capital and maintenance investment, England, 2010–2024" subtitle="Annual capital spend and maintenance spend on flood and coastal erosion risk management, £bn." series={chart1Series} annotations={annotations} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-condition" className="mb-12">
            <LineChart title="Homes better protected and defence condition, 2010–2024" subtitle="Cumulative homes better protected (000s); % of flood defences in poor/very poor condition." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Return on investment" value="£8 saved" unit="per £1 spent" description={<>The Environment Agency estimates that every £1 spent on flood defences saves around £8 in avoided flood damage — making flood investment one of the most cost-effective areas of public expenditure.<Cite nums={1} /></>} source="Source: Environment Agency FCERM annual report." />
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
