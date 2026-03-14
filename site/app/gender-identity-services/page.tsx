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
  { num: 1, name: 'NHS England', dataset: 'Gender Dysphoria Services Waiting Times and Referrals', url: 'https://www.england.nhs.uk/commissioning/spec-services/npc-crg/gender-dysphoria-clinical-programme/', date: '2024' },
  { num: 2, name: 'Cass Review', dataset: 'Independent Review of Gender Identity Services for Children and Young People', url: 'https://cass.independent-review.uk/', date: '2024' },
  { num: 3, name: 'NHS Digital', dataset: 'Referrals to Gender Identity Clinics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/gender-identity-services', date: '2024' },
];

interface DataPoint {
  year: number;
  waitingListAdults: number;
  avgWaitYears: number;
  referrals: number;
  newClinicsOpened: number;
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

export default function GenderIdentityServicesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/gender-identity-services/gender_identity_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'waitingListAdults', label: 'Adults on GIC waiting list (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.waitingListAdults })) },
        { id: 'avgWaitYears', label: 'Average wait for first GIC appointment (years)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgWaitYears })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'referrals', label: 'New referrals to gender services (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.referrals })) },
        { id: 'newClinicsOpened', label: 'Regional gender clinics (cumulative)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.newClinicsOpened })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'GIDS referred to CQC review' },
    { date: new Date(2024, 5, 1), label: 'Cass Review published; GIDS closed' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Long Is the Wait for Gender Identity Services?"
          finding={<>Adults waiting for a first appointment at an NHS Gender Identity Clinic face waits of up to seven years, with the national waiting list exceeding 28,000 people in 2024.<Cite nums={1} /> Referrals have increased tenfold in a decade while service capacity has barely changed.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS gender identity services in England face an unprecedented demand crisis. Referrals to adult Gender Identity Clinics have grown from around 3,000 per year in 2013 to over 26,000 in 2023 — nearly a tenfold increase over a decade.<Cite nums={3} /> The number of specialist clinics has remained small, and the cumulative waiting list for a first assessment appointment reached over 28,000 in 2024, with patients typically waiting five to seven years. The system was designed for very different demand levels and has never been substantially expanded to match growth in referrals.</p>
            <p>Services for children and young people attracted particular scrutiny. The Cass Review, an independent review commissioned by NHS England and published in April 2024, found that the Gender Identity Development Service (GIDS) at the Tavistock had not been providing safe or adequate care, and recommended a fundamental redesign of services.<Cite nums={2} /> GIDS was closed and replaced with a network of regional services. For adults, NHS England has begun opening additional regional gender clinics to reduce pressure on the main London and Manchester services, but waiting times remain extremely long and the mental health impacts of long waits are well-documented.<Cite nums={1} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waits', label: 'Waiting times' },
          { id: 'sec-demand', label: 'Demand & capacity' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Adult GIC waiting list" value="28" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>From near zero in 2013<Cite nums={1} /></>} sparklineData={[1, 3, 5, 8, 12, 16, 20, 23, 26, 27, 28]} href="#sec-waits" />
          <MetricCard label="Average wait for first appointment" value="5-7" unit="years" direction="up" polarity="up-is-bad" changeText={<>Up from under 1 year in 2013<Cite nums={1} /></>} sparklineData={[0.5, 1.0, 1.5, 2.5, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5]} href="#sec-waits" />
          <MetricCard label="New referrals per year" value="26" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Up from 3k in 2013<Cite nums={3} /></>} sparklineData={[3, 5, 7, 10, 13, 17, 22, 24, 25, 26, 26]} href="#sec-demand" />
        </div>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart title="Adult gender identity clinic waiting list and waits, 2013–2024" subtitle="Waiting list size (thousands) and average wait for first appointment (years), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-demand" className="mb-12">
            <LineChart title="Referrals to gender services and clinic expansion, 2013–2024" subtitle="New referrals (thousands/year) and cumulative regional gender clinics opened, England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Cass Review" value="2024" unit="published" description={<>The independent Cass Review, published in April 2024, led to the closure of GIDS and recommendations for a new regional network of gender services with improved clinical oversight and research capacity.<Cite nums={2} /></>} source="Source: Cass Review, Independent Review Final Report, April 2024." />
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
