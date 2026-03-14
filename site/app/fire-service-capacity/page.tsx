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
  { num: 1, name: 'Home Office', dataset: 'Fire and Rescue Incident Statistics', url: 'https://www.gov.uk/government/collections/fire-statistics-monitor', date: '2024' },
  { num: 2, name: 'National Fire Chiefs Council', dataset: 'State of Fire and Rescue', url: 'https://nfcc.org.uk/our-work/research-evidence/', date: '2024' },
  { num: 3, name: 'Fire Brigades Union', dataset: 'Cuts and consequences report', url: 'https://www.fbu.org.uk/publications', date: '2024' },
];

interface DataPoint {
  year: number;
  firefighterNumbers: number;
  fireStations: number;
  avgResponseTimeMins: number;
  incidentsCoveredPerStation: number;
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

export default function FireServiceCapacityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fire-service-capacity/fire_service_capacity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'firefighterNumbers', label: 'Firefighter FTE (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.firefighterNumbers })) },
        { id: 'fireStations', label: 'Fire stations', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fireStations })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgResponseTimeMins', label: 'Avg response time (mins)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgResponseTimeMins })) },
        { id: 'incidentsCoveredPerStation', label: 'Incidents per station', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.incidentsCoveredPerStation })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Grenfell Tower fire' },
    { date: new Date(2022, 5, 1), label: 'Inspectorate reform programme' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="Has the Fire Service Been Cut Too Far?"
          finding={<>England has lost around 11,000 firefighter posts since 2010 — a reduction of nearly 30% — while the number of fire stations has also fallen.<Cite nums={1} /> Average response times have lengthened, and the service is now responding to a broader range of emergencies beyond fires, from road traffic accidents to flooding.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fire and Rescue Services in England have faced sustained budget reductions since 2010. Central government funding to Fire and Rescue Authorities fell by around 40% in real terms between 2010 and 2020, leading to the loss of thousands of firefighter posts, the closure of fire stations, and reductions in retained (on-call) firefighter numbers. The Grenfell Tower fire in June 2017, which killed 72 people, prompted a national conversation about whether the service had been cut to a point where risks to public safety were elevated.<Cite nums={1} /></p>
            <p>The picture is complicated by the fact that accidental dwelling fires have declined significantly over the past two decades, partly due to smoke alarm uptake and changes in household materials. But the nature of the emergency landscape has changed: climate-related incidents including wildfires and flooding are increasing, and the service is increasingly called upon for non-fire emergencies. The Her Majesty&apos;s Inspectorate of Constabulary and Fire &amp; Rescue Services began inspecting fire services for the first time in 2018, and has found significant variation in capability and culture across services.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Capacity' },
          { id: 'sec-chart2', label: 'Response times' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Firefighter FTE" value="28,600" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 39,700 in 2010<Cite nums={1} /></>} sparklineData={[39700, 37000, 35000, 33000, 32000, 30500, 29500, 29000, 28800, 28700, 28600]} href="#sec-chart1" />
          <MetricCard label="Fire stations" value="1,340" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 1,530 in 2010<Cite nums={2} /></>} sparklineData={[1530, 1510, 1490, 1460, 1430, 1410, 1390, 1370, 1355, 1345, 1340]} href="#sec-chart1" />
          <MetricCard label="Avg response time" value="8.9" unit="mins" direction="up" polarity="up-is-bad" changeText={<>Was 7.8 mins in 2010<Cite nums={1} /></>} sparklineData={[7.8, 7.9, 8.0, 8.2, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.9]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Fire service capacity, 2010–2024" subtitle="Firefighter full-time equivalent posts and fire stations, England" series={chart1Series} annotations={annotations} yLabel="Posts / stations" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Response times and incident load, 2010–2024" subtitle="Average response time to primary fires (mins) and incidents per station" series={chart2Series} annotations={[]} yLabel="Mins / incidents" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Dwelling fire deaths" value="–45%" unit="since 2010" description={<>Despite capacity reductions, dwelling fire deaths have fallen by around 45% since 2010, driven by greater smoke alarm coverage, fire safety regulations, and prevention work — suggesting investment in prevention can offset some capacity reduction effects.<Cite nums={1} /></>} source="Source: Home Office, Fire statistics England." />
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
