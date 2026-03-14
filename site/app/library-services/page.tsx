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
  { num: 1, name: 'CIPFA', dataset: 'Public library statistics', url: 'https://www.cipfa.org/services/statistics/comparative-profiles/public-libraries', date: '2024' },
  { num: 2, name: 'Arts Council England', dataset: 'Public libraries report', url: 'https://www.artscouncil.org.uk/research-and-data/libraries-data', date: '2024' },
  { num: 3, name: 'Libraries Connected', dataset: 'Universal Offers evidence', url: 'https://www.librariesconnected.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  libraryBranches: number;
  annualVisits: number;
  booksIssued: number;
  staffFTE: number;
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

export default function LibraryServicesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/library-services/library_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'libraryBranches', label: 'Library branches', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.libraryBranches })) },
        { id: 'staffFTE', label: 'Staff FTE (thousands)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.staffFTE })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'annualVisits', label: 'Annual visits (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.annualVisits })) },
        { id: 'booksIssued', label: 'Books issued (millions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.booksIssued })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — libraries closed' },
    { date: new Date(2022, 5, 1), label: 'Community-run libraries peak' },
  ];

  return (
    <>
      <TopicNav topic="Public Services & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services & Society"
          question="How Many Libraries Have Closed?"
          finding={<>England has lost around 800 public library branches since 2010 — a reduction of over 15% — alongside thousands of staff posts.<Cite nums={1} /> Annual visits have fallen from 300 million to under 200 million, though the shift to digital services and the growth of community-run libraries have partially filled some gaps.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public libraries are a statutory service in England — local authorities have a legal duty to provide a comprehensive and efficient library service. But the specific form that duty takes is deliberately undefined, allowing councils facing budget pressure to reduce branch numbers, cut opening hours, or hand branches over to volunteer groups. Since 2010, the combination of austerity, falling usage (driven partly by digital alternatives), and changed political priorities has seen the network shrink substantially.<Cite nums={1} /></p>
            <p>What libraries do extends well beyond book lending. They provide free internet access, children&apos;s activities, job search facilities, health information, and a warm, safe space for isolated people. Libraries Connected&apos;s work on &quot;Universal Offers&quot; — digital literacy, reading, health and wellbeing, culture, and information — demonstrates the breadth of the role the remaining network plays. The closures tend to hit deprived areas hardest, as residents in those areas are less likely to have home internet access or the resources to substitute private provision.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Branch and staff reductions' },
          { id: 'sec-chart2', label: 'Usage' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Library branches" value="4,450" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 5,310 in 2010<Cite nums={1} /></>} sparklineData={[5310, 5200, 5100, 4950, 4800, 4700, 4600, 4550, 4500, 4460, 4450]} href="#sec-chart1" />
          <MetricCard label="Annual visits" value="185m" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 300m in 2010<Cite nums={2} /></>} sparklineData={[300, 285, 270, 255, 240, 225, 220, 160, 185, 185, 185]} href="#sec-chart2" />
          <MetricCard label="Community-run libraries" value="540" unit="" direction="up" polarity="up-is-good" changeText={<>Up from near zero in 2010<Cite nums={3} /></>} sparklineData={[0, 50, 150, 250, 350, 420, 470, 500, 520, 535, 540]} href="#sec-chart1" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Library branch and staff reductions, 2010–2024" subtitle="Council-run library branches and staff FTE, England" series={chart1Series} annotations={annotations} yLabel="Branches / FTE" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Library visits and book issues, 2010–2024" subtitle="Annual physical visits (millions) and book issues (millions), England" series={chart2Series} annotations={[]} yLabel="Millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Digital library lending" value="37m" unit="e-loans annually" description={<>Digital e-book and e-audiobook lending through public libraries has grown to over 37 million loans per year — a sevenfold increase since 2015, partially offsetting the decline in physical borrowing.<Cite nums={2} /></>} source="Source: Arts Council England, Public libraries data." />
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
