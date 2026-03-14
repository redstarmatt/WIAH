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
  { num: 1, name: 'Active Travel England', dataset: 'Local cycling and walking infrastructure plans', url: 'https://www.gov.uk/government/organisations/active-travel-england', date: '2024' },
  { num: 2, name: 'DfT', dataset: 'Walking and cycling statistics, England', url: 'https://www.gov.uk/government/statistical-data-sets/walking-and-cycling-statistics-cw', date: '2024' },
  { num: 3, name: 'Cycling UK', dataset: 'State of cycling report', url: 'https://www.cyclinguk.org/report/state-of-cycling', date: '2024' },
];

interface DataPoint {
  year: number;
  protectedCycleRoutesKm: number;
  ateFundingSpendBn: number;
  cyclingTripsPerPerson: number;
  walkingTripsPerPerson: number;
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

export default function ActiveTravelInfrastructurePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/active-travel-infrastructure/active_travel_infrastructure.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'protectedCycleRoutesKm', label: 'Protected cycling routes (km)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.protectedCycleRoutesKm })) },
        { id: 'ateFundingSpendBn', label: 'Active travel funding spent (£m)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ateFundingSpendBn })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'cyclingTripsPerPerson', label: 'Cycling trips per person per year', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cyclingTripsPerPerson })) },
        { id: 'walkingTripsPerPerson', label: 'Walking trips per person per year', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.walkingTripsPerPerson })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — cycling surge' },
    { date: new Date(2021, 5, 1), label: 'Active Travel England created' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Is Britain Building Enough Cycling Infrastructure?"
          finding={<>England has around 5,000 km of protected cycling routes — compared to Netherlands' 35,000 km for a smaller country — and cycling trips per person have barely grown in 25 years despite hundreds of millions in investment.<Cite nums={[1, 2]} /> Active Travel England, created in 2022, has started to raise quality standards but delivery remains far short of targets.<Cite nums={3} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has spent decades promising and failing to build cycle networks comparable to those in the Netherlands, Denmark and Germany. Department for Transport statistics show that cycling mode share in England has remained stuck at around 2% of trips for two decades, compared to 27% in the Netherlands. Protected infrastructure — physically separated from motor traffic — is what makes cycling attractive to the 60% of people who describe themselves as interested but concerned about safety. England has built relatively little of it.<Cite nums={2} /></p>
            <p>Active Travel England (ATE), created in 2022 under the then-transport secretary Grant Shapps, was designed to raise quality standards and drive delivery. ATE has begun to grade local authority cycling schemes and withhold funding from poor designs. But government active travel spending was cut from £710 million in 2021/22 to under £200 million per year by 2023/24 — far below the £4 billion over 5 years recommended by the National Infrastructure Commission to achieve meaningful modal shift. At current spending rates, England will not reach the cycling levels of current German cities within this century.<Cite nums={[1, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-routes', label: 'Infrastructure built' },
          { id: 'sec-trips', label: 'Cycling & walking trips' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Protected cycle routes (England)" value="5,000 km" unit="" direction="up" polarity="up-is-good" changeText={<>Netherlands has 35,000 km<Cite nums={1} /></>} sparklineData={[2000, 2200, 2500, 2800, 3000, 3300, 3600, 4000, 4400, 4700, 5000]} href="#sec-routes" />
          <MetricCard label="Cycling mode share" value="2%" unit="of trips" direction="flat" polarity="up-is-good" changeText={<>Unchanged for 20 years<Cite nums={2} /></>} sparklineData={[2, 2, 2, 2, 2, 2.1, 2.2, 2.1, 2.0, 2.0, 2.0]} href="#sec-trips" />
          <MetricCard label="Active travel budget (2023/24)" value="£200m" unit="" direction="down" polarity="up-is-good" changeText={<>Down from £710m in 2021/22<Cite nums={1} /></>} sparklineData={[150, 180, 220, 300, 400, 710, 600, 400, 300, 250, 200]} href="#sec-routes" />
        </div>

        <ScrollReveal>
          <section id="sec-routes" className="mb-12">
            <LineChart title="Protected cycling routes and active travel funding, England, 2010–2024" subtitle="Protected cycle route length (km); active travel funding spent (£m)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-trips" className="mb-12">
            <LineChart title="Cycling and walking trips per person, England, 2010–2024" subtitle="Annual trips per person by cycling and walking." series={chart2Series} annotations={[]} yLabel="Trips per person" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="E-bike uptake" value="+85%" unit="since 2020" description={<>E-bike sales in the UK have grown by 85% since 2020, with over 270,000 sold in 2023. E-bikes significantly extend the viable cycling range and are disproportionately adopted by older adults and those returning to cycling.<Cite nums={3} /></>} source="Source: Cycling UK / Bicycle Association." />
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
