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
  { num: 1, name: 'Office of Rail and Road', dataset: 'Rail punctuality statistics', url: 'https://www.orr.gov.uk/monitoring-regulation/rail/rail-markets/passenger-rail/punctuality', date: '2024' },
  { num: 2, name: 'Transport Focus', dataset: 'National Rail Passenger Survey', url: 'https://www.transportfocus.org.uk/insight/national-rail-passenger-survey/', date: '2024' },
  { num: 3, name: 'Network Rail', dataset: 'Delay attribution report', url: 'https://www.networkrail.co.uk/who-we-are/our-performance/', date: '2024' },
];

interface DataPoint {
  year: number;
  pptBenchmarkPct: number;
  cancelledPct: number;
  minutesDelayPerJourney: number;
  passengerSatisfactionPct: number;
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

export default function RailPunctualityTrendsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/rail-punctuality-trends/rail_punctuality_trends.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'pptBenchmarkPct', label: 'PPT on time or within 3 min (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pptBenchmarkPct })) },
        { id: 'cancelledPct', label: 'Services cancelled or more than 30 min late (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cancelledPct })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'minutesDelayPerJourney', label: 'Average delay per journey (minutes)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.minutesDelayPerJourney })) },
        { id: 'passengerSatisfactionPct', label: 'Passengers satisfied with punctuality (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.passengerSatisfactionPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'May 2018 timetable chaos' },
    { date: new Date(2022, 5, 1), label: 'Industrial action' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Are UK Trains Getting More or Less Punctual?"
          finding={<>UK rail punctuality, measured by the Public Performance Measure, has declined from around 87% on time in 2012 to 62% in 2022/23 — the worst performance since records began — driven by industrial action, infrastructure failures and a timetable system under strain.<Cite nums={1} /> Passenger satisfaction with punctuality stands at just 46%.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Public Performance Measure (PPM) records the percentage of trains that arrive within 5 minutes (for London & South East) or 10 minutes (for long distance) of their scheduled time. The UK's railway achieved around 87% PPM in the early 2010s — not world class by Swiss or Japanese standards but functional. Since then, performance has deteriorated significantly. The timetable chaos of May 2018 — when a new timetable was poorly implemented and tens of thousands of trains were cancelled — marked a turning point from which the network never fully recovered before Covid.<Cite nums={1} /></p>
            <p>The years 2022 and 2023 were particularly bad, with extensive industrial action by ASLEF and the RMT unions disrupting hundreds of thousands of journeys. Network Rail's delay attribution data shows that infrastructure failures (signal failures, track defects) account for around 40% of delays, with train operator causes accounting for most of the rest. The introduction of Great British Railways — a new public body to oversee the whole network — is intended to eliminate the fragmented incentive structures that have contributed to poor performance, but the transition is expected to take several years.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ppm', label: 'Punctuality trend' },
          { id: 'sec-delay', label: 'Delay & satisfaction' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Rail PPM on time (2022/23)" value="62%" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 87% in 2012/13<Cite nums={1} /></>} sparklineData={[87, 86, 85, 83, 79, 79, 80, 70, 65, 63, 62]} href="#sec-ppm" />
          <MetricCard label="Trains cancelled or 30+ min late" value="8%" unit="" direction="up" polarity="up-is-bad" changeText={<>Highest rate in modern records<Cite nums={1} /></>} sparklineData={[3, 3.5, 3.5, 4, 5, 5, 5.5, 7, 8, 8.5, 8]} href="#sec-ppm" />
          <MetricCard label="Satisfied with punctuality" value="46%" unit="" direction="down" polarity="up-is-good" changeText={<>Lowest in Transport Focus history<Cite nums={2} /></>} sparklineData={[65, 63, 62, 60, 58, 56, 56, 54, 50, 48, 46]} href="#sec-delay" />
        </div>

        <ScrollReveal>
          <section id="sec-ppm" className="mb-12">
            <LineChart title="UK rail punctuality (PPM) and cancellations, 2010–2023" subtitle="PPM within 5/10 minutes (%); services cancelled or 30+ minutes late (%)." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-delay" className="mb-12">
            <LineChart title="Average delay per journey and passenger satisfaction with punctuality, 2010–2023" subtitle="Average delay per journey in minutes; % of passengers satisfied with punctuality." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Swiss model" value="92%" unit="PPM equivalent" description={<>Swiss Federal Railways achieves around 92% punctuality — comparable to the UK's best performance in the 1990s — through a combination of integrated planning, slack in the timetable, and a single management structure. Great British Railways is intended to deliver similar integration.<Cite nums={3} /></>} source="Source: Network Rail / ORR." />
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
