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
  { num: 1, name: 'ADEPT / Asphalt Industry Alliance', dataset: 'Annual Local Authority Road Maintenance (ALARM) survey', url: 'https://www.asphaltuk.org/alarm-survey/', date: '2024' },
  { num: 2, name: 'DfT', dataset: 'Local road condition statistics', url: 'https://www.gov.uk/government/statistical-data-sets/local-road-condition-statistics-rdl', date: '2024' },
  { num: 3, name: 'AA', dataset: 'Pothole tracker and road condition survey', url: 'https://www.theaa.com/driving-advice/seasonal/potholes', date: '2024' },
];

interface DataPoint {
  year: number;
  potholesFilledMillions: number;
  roadMaintenanceBacklogBn: number;
  localRoadSpendBn: number;
  urgentRepairsBn: number;
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

export default function LocalRoadConditionPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/local-road-condition/local_road_condition.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'roadMaintenanceBacklogBn', label: 'Maintenance backlog (£bn)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.roadMaintenanceBacklogBn })) },
        { id: 'localRoadSpendBn', label: 'Local road maintenance spend (£bn)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.localRoadSpendBn })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'potholesFilledMillions', label: 'Potholes filled per year (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.potholesFilledMillions })) },
        { id: 'urgentRepairsBn', label: 'Value of urgent/immediate repairs (£bn)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.urgentRepairsBn })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '£200m pothole fund announced' },
    { date: new Date(2024, 5, 1), label: '£8.3bn road maintenance package' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="How Bad Are Britain's Local Roads?"
          finding={<>The maintenance backlog on English local roads has risen to £16.3 billion, according to the 2024 ALARM survey — up from £12 billion a decade ago and the highest ever recorded.<Cite nums={1} /> Local councils filled almost 2 million potholes in 2023/24, but this "patch and hope" approach masks a growing structural deficit in road condition.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's local road network — 177,000 miles of A-roads, B-roads and unclassified roads managed by local councils — is in its worst recorded condition. The Asphalt Industry Alliance's Annual Local Authority Road Maintenance (ALARM) survey, the most comprehensive regular assessment of local road condition, found in 2024 that the backlog of maintenance needed to bring roads up to a standard condition had risen to £16.3 billion in England and Wales. At current funding levels, it would take 11 years to clear the backlog.<Cite nums={1} /></p>
            <p>The problem has been building for a decade as council budgets have been squeezed and road maintenance — which produces no visible political benefit until roads collapse — has been deferred. Councils filled 1.7 million potholes in 2023/24, but pothole repairs are the most expensive way to maintain roads. The DfT's statistics show that roads treated preventively (before surface degradation) cost around £30,000/km; emergency carriageway repairs cost over £200,000/km. Deferring maintenance therefore multiplies future costs rather than saving them.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Maintenance backlog' },
          { id: 'sec-potholes', label: 'Potholes & repairs' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Local road maintenance backlog" value="£16.3bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high — 11 years to clear<Cite nums={1} /></>} sparklineData={[10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 14.5, 15.5, 16.3]} href="#sec-backlog" />
          <MetricCard label="Potholes filled (2023/24)" value="1.7m" unit="" direction="up" polarity="up-is-bad" changeText={<>Rising despite additional funding<Cite nums={2} /></>} sparklineData={[1.2, 1.3, 1.4, 1.5, 1.5, 1.4, 1.3, 1.4, 1.5, 1.6, 1.7]} href="#sec-potholes" />
          <MetricCard label="Average road in 'should be fixed' condition" value="20%" unit="of roads" direction="up" polarity="up-is-bad" changeText={<>1 in 5 roads deteriorating<Cite nums={1} /></>} sparklineData={[14, 15, 15, 16, 16, 17, 17, 18, 19, 20, 20]} href="#sec-backlog" />
        </div>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart title="Local road maintenance backlog and annual spend, England, 2010–2024" subtitle="Estimated maintenance backlog (£bn); annual local road maintenance spend (£bn)." series={chart1Series} annotations={annotations} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-potholes" className="mb-12">
            <LineChart title="Potholes filled and urgent repair costs, 2010–2024" subtitle="Potholes filled per year (millions); value of roads requiring urgent repair (£bn)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Preventive maintenance benefit" value="7:1" unit="return" description={<>Every £1 spent on preventive road maintenance avoids £7 in future repair costs, according to DfT analysis. The shift from reactive pothole filling to planned preventive work is the key to breaking the backlog cycle.<Cite nums={2} /></>} source="Source: DfT local road condition statistics." />
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
