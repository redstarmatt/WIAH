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
  { num: 1, name: 'DLUHC', dataset: 'English Housing Survey — Leasehold data tables', url: 'https://www.gov.uk/government/statistics/english-housing-survey-2022-to-2023-headline-report', date: '2024' },
  { num: 2, name: 'Law Commission', dataset: 'Leasehold Reform in England and Wales', url: 'https://www.lawcom.gov.uk/project/leasehold-reform/', date: '2020' },
  { num: 3, name: 'House of Commons Library', dataset: 'Leasehold and Freehold Reform Act 2024 briefing', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-9462/', date: '2024' },
];

interface DataPoint {
  year: number;
  leaseholdDwellings: number;
  groundRentComplaints: number;
  enfranchisementClaims: number;
  newLeaseholdHouses: number;
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

export default function LeaseholdReformProgressPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/leasehold-reform-progress/leasehold_reform_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'leaseholdDwellings', label: 'Leasehold dwellings (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.leaseholdDwellings })) },
        { id: 'newLeaseholdHouses', label: 'New-build leasehold houses (000s)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.newLeaseholdHouses })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'groundRentComplaints', label: 'Ground rent complaints to HMLR', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.groundRentComplaints })) },
        { id: 'enfranchisementClaims', label: 'Enfranchisement claims filed', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.enfranchisementClaims })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Leasehold Reform (Ground Rent) Act' },
    { date: new Date(2024, 5, 1), label: 'Leasehold and Freehold Reform Act' },
  ];

  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Has Leasehold Reform Actually Happened?"
          finding={<>England has 4.98 million leasehold dwellings — more than any other country with a comparable housing market — and reform has been decades in the making.<Cite nums={1} /> The Leasehold and Freehold Reform Act 2024 made important changes but critics say it falls far short of abolishing the leasehold system entirely, leaving millions still trapped in costly ownership structures.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Almost five million homes in England are held on leasehold rather than freehold — meaning owners pay annual ground rent to a freeholder, face restrictions on alterations, and must negotiate costly lease extensions as the term diminishes. The Law Commission's 2020 reports estimated that lease extension could cost a leaseholder tens of thousands of pounds on a short lease. A 2022 law banned ground rents on new leases, but existing leaseholders were unaffected.<Cite nums={2} /></p>
            <p>The Leasehold and Freehold Reform Act 2024 made it cheaper and easier to extend leases and buy freeholds, and banned the future sale of new-build leasehold houses. However it stopped short of converting existing leaseholders to commonhold — a system of shared ownership that most campaigners argued was the only true reform. Commonhold conversion remains voluntary, and most freeholders are expected to resist.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-scale', label: 'Scale of leasehold' },
          { id: 'sec-complaints', label: 'Complaints & claims' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Leasehold dwellings (England)" value="4.98m" unit="" direction="up" polarity="up-is-bad" changeText={<>20% of all dwellings<Cite nums={1} /></>} sparklineData={[4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.85, 4.9, 4.98]} href="#sec-scale" />
          <MetricCard label="New leasehold houses sold (2016 peak)" value="11,000" unit="" direction="down" polarity="up-is-bad" changeText={<>Down sharply after scandal<Cite nums={1} /></>} sparklineData={[2, 5, 8, 11, 10, 9, 7, 5, 3, 2, 1]} href="#sec-scale" />
          <MetricCard label="Average lease extension cost" value="£15,000" unit="" direction="flat" polarity="up-is-bad" changeText={<>Varies sharply by location<Cite nums={2} /></>} sparklineData={[10, 10, 11, 12, 13, 14, 14, 15, 15, 15, 15]} href="#sec-complaints" />
        </div>

        <ScrollReveal>
          <section id="sec-scale" className="mb-12">
            <LineChart title="Leasehold dwellings and new leasehold house sales, England, 2010–2024" subtitle="Total leasehold stock in millions; new-build leasehold houses sold in 000s." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart title="Ground rent complaints and enfranchisement claims, 2014–2024" subtitle="Annual ground rent complaints and lease enfranchisement claims filed." series={chart2Series} annotations={[]} yLabel="Cases" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Ground Rent Act 2022" value="Zero" unit="ground rent" description={<>Since 27 June 2022, ground rents on all new residential leases in England and Wales are capped at a peppercorn (effectively zero), protecting future buyers from escalating ground rent traps.<Cite nums={3} /></>} source="Source: Leasehold Reform (Ground Rent) Act 2022." />
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
