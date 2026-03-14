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
  { num: 1, name: 'DfT', dataset: 'Taxi and private hire vehicle statistics', url: 'https://www.gov.uk/government/statistics/taxi-and-private-hire-vehicle-statistics-england', date: '2024' },
  { num: 2, name: 'Local Government Association', dataset: 'Taxi licensing and enforcement', url: 'https://www.local.gov.uk/our-support/highways-and-transport/taxi-and-private-hire-licensing', date: '2024' },
  { num: 3, name: 'ILEX / Institute of Licensing', dataset: 'PHV regulation report', url: 'https://instituteoflicensing.org/', date: '2023' },
];

interface DataPoint {
  year: number;
  licensedVehicles: number;
  licensedDrivers: number;
  safeguardingReferrals: number;
  crossBorderOperationsCompliant: number;
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

export default function TaxiPrivateHireSafetyPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/taxi-private-hire-safety/taxi_private_hire_safety.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'licensedVehicles', label: 'Licensed PHV/taxi vehicles (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.licensedVehicles })) },
        { id: 'licensedDrivers', label: 'Licensed PHV/taxi drivers (000s)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.licensedDrivers })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'safeguardingReferrals', label: 'Safeguarding referrals involving PHV drivers', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.safeguardingReferrals })) },
        { id: 'crossBorderOperationsCompliant', label: 'Cross-border operations flagged as non-compliant', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.crossBorderOperationsCompliant })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Taxi and PHV licensing review' },
    { date: new Date(2023, 5, 1), label: 'Cross-border loophole reforms' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="How Safe Is the UK Private Hire Industry?"
          finding={<>England's private hire vehicle industry has grown to over 290,000 licensed vehicles and 400,000 drivers, but fragmented local licensing, the cross-border loophole exploited by app-based operators, and inconsistent background check standards leave significant safety gaps — highlighted by high-profile child exploitation cases linked to PHV drivers.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Private hire vehicles — including those operated through apps like Uber, Bolt and Ola — are licensed by around 300 local authorities in England, each with different standards for criminal record checks, vehicle inspections and insurance. This fragmentation has been exploited by operators using the "cross-border loophole": obtaining licences in licensing authorities with lower standards, then operating in other areas. The DfT's taxi and PHV statistics show the licensed fleet grew from around 180,000 in 2010 to over 290,000 in 2023, a 60% increase driven almost entirely by app-based platforms.<Cite nums={1} /></p>
            <p>Safety concerns centre on safeguarding: a series of child sexual exploitation investigations — including Rotherham, Rochdale and others — found PHV drivers were disproportionately represented among perpetrators who met victims through their work. The Independent Inquiry into Child Sexual Abuse recommended mandatory national licensing standards. Cross-border operations, where a vehicle licensed in one area picks up in another, have been the subject of enforcement action but remain widespread. The government's 2023 reforms have tightened some rules, but the LGA argues only national licensing standards would close remaining gaps.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-industry', label: 'Industry growth' },
          { id: 'sec-safety', label: 'Safeguarding concerns' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Licensed PHV/taxi vehicles (2023)" value="290,000" unit="" direction="up" polarity="up-is-good" changeText={<>60% increase since 2010<Cite nums={1} /></>} sparklineData={[180, 190, 200, 215, 230, 250, 260, 270, 275, 285, 290]} href="#sec-industry" />
          <MetricCard label="Licensing authorities in England" value="~300" unit="" direction="flat" polarity="up-is-bad" changeText={<>Fragmented standards<Cite nums={2} /></>} sparklineData={[300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300]} href="#sec-industry" />
          <MetricCard label="Safeguarding referrals (annual)" value="1,200+" unit="" direction="up" polarity="up-is-bad" changeText={<>Rising as reporting improves<Cite nums={2} /></>} sparklineData={[400, 450, 500, 600, 700, 800, 900, 1000, 1100, 1150, 1200]} href="#sec-safety" />
        </div>

        <ScrollReveal>
          <section id="sec-industry" className="mb-12">
            <LineChart title="Licensed PHV and taxi vehicles and drivers in England, 2010–2023" subtitle="Total licensed vehicles and drivers (000s)." series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-safety" className="mb-12">
            <LineChart title="Safeguarding referrals and cross-border compliance flags, 2015–2023" subtitle="Annual safeguarding referrals involving PHV drivers; cross-border operations flagged as non-compliant." series={chart2Series} annotations={[]} yLabel="Cases" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Enhanced DBS checks" value="100%" unit="of new drivers" description={<>Since 2020, all new PHV and taxi driver applicants in England must provide an Enhanced Disclosure and Barring Service (DBS) check, including a check against the children's barred list — a baseline standard that was previously applied inconsistently.<Cite nums={1} /></>} source="Source: DfT taxi and PHV licensing statistics." />
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
