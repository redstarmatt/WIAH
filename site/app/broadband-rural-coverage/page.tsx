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
  { num: 1, name: 'Ofcom', dataset: 'Connected Nations report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Project Gigabit progress updates', url: 'https://www.gov.uk/guidance/project-gigabit-uk-gigabit-programme', date: '2024' },
  { num: 3, name: 'National Audit Office', dataset: 'Gigabit broadband rollout', url: 'https://www.nao.org.uk/reports/gigabit-broadband-rollout/', date: '2023' },
];

interface DataPoint {
  year: number;
  ruralGigabitCoverage: number;
  urbanGigabitCoverage: number;
  premisesNotConnectable: number;
  avgRuralSpeed: number;
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

export default function BroadbandRuralCoveragePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/broadband-rural-coverage/broadband_rural_coverage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'ruralGigabitCoverage', label: 'Rural gigabit coverage (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ruralGigabitCoverage })) },
        { id: 'urbanGigabitCoverage', label: 'Urban gigabit coverage (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.urbanGigabitCoverage })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'premisesNotConnectable', label: 'Premises below USO (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.premisesNotConnectable })) },
        { id: 'avgRuralSpeed', label: 'Avg rural download speed (Mbps)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgRuralSpeed })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Universal Service Obligation introduced' },
    { date: new Date(2021, 5, 1), label: 'Project Gigabit launched' },
  ];

  return (
    <>
      <TopicNav topic="Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital"
          question="How Far Has Rural Broadband Reached?"
          finding={<>Around 60% of rural premises in the UK can now access gigabit-capable broadband — but that still leaves over 1.5 million rural homes and businesses with speeds too slow for modern use.<Cite nums={1} /> The urban–rural gap in connectivity remains the defining digital inequality of the decade.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The government&apos;s Project Gigabit programme, launched in 2021 with £5 billion of funding, aims to deliver gigabit-capable broadband to at least 85% of the UK by 2025 and as much of the remaining 15% as possible. Progress has been faster than critics expected: rural gigabit coverage has risen from under 10% in 2019 to around 60% by late 2024, with commercial operators extending their reach and subsidised contracts targeting harder-to-reach areas.<Cite nums={1} /></p>
            <p>But the hardest cases remain hard. Remote rural areas — scattered farms, upland communities, island communities — face costs per premise that make commercial deployment unviable. The National Audit Office has warned that Project Gigabit contracts are complex to procure and that the target dates may slip.<Cite nums={[2, 3]} /> Meanwhile, a Universal Service Obligation ensures everyone has the right to request a decent broadband connection, but the request-and-wait mechanism is rarely used and the 10 Mbps minimum is well below what most modern households need.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Coverage' },
          { id: 'sec-chart2', label: 'Gaps' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Rural gigabit coverage" value="60" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 9% in 2019<Cite nums={1} /></>} sparklineData={[9, 15, 24, 34, 42, 50, 55, 58, 60, 60, 60]} href="#sec-chart1" />
          <MetricCard label="Urban gigabit coverage" value="96" unit="%" direction="up" polarity="up-is-good" changeText={<>Near-universal in cities<Cite nums={1} /></>} sparklineData={[40, 55, 65, 75, 82, 88, 92, 94, 95, 96, 96]} href="#sec-chart1" />
          <MetricCard label="Premises below USO" value="145k" unit="" direction="down" polarity="up-is-bad" changeText={<>Down from 680k in 2020<Cite nums={3} /></>} sparklineData={[680, 600, 500, 400, 320, 250, 200, 170, 155, 148, 145]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Gigabit broadband coverage: rural vs urban, 2019–2024" subtitle="Percentage of premises with access to gigabit-capable broadband, UK" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Premises below USO threshold and rural speeds, 2019–2024" subtitle="Thousands of premises below 10 Mbps USO and average rural download speed" series={chart2Series} annotations={[]} yLabel="Thousands / Mbps" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Project Gigabit contracts" value="£3.7bn" unit="awarded" description={<>£3.7 billion in Project Gigabit contracts have been awarded to reach 1.1 million premises in hard-to-reach rural areas, with delivery scheduled through to 2027.<Cite nums={2} /></>} source="Source: DCMS, Project Gigabit programme updates." />
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
