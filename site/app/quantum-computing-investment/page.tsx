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
  { num: 1, name: 'DSIT', dataset: 'UK National Quantum Strategy', url: 'https://www.gov.uk/government/publications/national-quantum-strategy', date: '2023' },
  { num: 2, name: 'NQCC', dataset: 'National Quantum Computing Centre Progress Report', url: 'https://www.nqcc.ac.uk/', date: '2024' },
  { num: 3, name: 'Dealroom', dataset: 'UK Quantum Technology Investment Tracker', url: 'https://dealroom.co/guides/uk-quantum', date: '2024' },
];

interface DataPoint {
  year: number;
  publicInvestment: number;
  privateInvestment: number;
  quantumCompanies: number;
  researchOutput: number;
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

export default function QuantumComputingInvestmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/quantum-computing-investment/quantum_computing_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'publicInvestment', label: 'Public investment in quantum (£m/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.publicInvestment })) },
        { id: 'privateInvestment', label: 'Private investment in quantum (£m/yr)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.privateInvestment })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'quantumCompanies', label: 'UK quantum companies (count)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.quantumCompanies })) },
        { id: 'researchOutput', label: 'Quantum research publications (indexed, 2014=100)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.researchOutput })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: 'National Quantum Technologies Programme launched' },
    { date: new Date(2023, 5, 1), label: 'National Quantum Strategy published' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Economy"
          question="Is the UK Investing Enough in Quantum Computing?"
          finding={<>The UK has committed £2.5bn to quantum technologies over ten years from 2024, making it one of the highest per-capita investors globally, but the race is intensifying with the US committing $1.2bn annually and China estimated to be spending far more.<Cite nums={1} /> The UK has world-class research but risks losing companies to better-funded US markets.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK launched its National Quantum Technologies Programme in 2014 — one of the first national quantum programmes in the world — and has since built a genuine cluster of research excellence and start-up activity centred on Oxford, Cambridge, Bristol and London.<Cite nums={1} /> The 2023 National Quantum Strategy committed £2.5bn over ten years to secure a position in the top three quantum-enabled economies by 2033, with investments spanning hardware, software, sensing and communications. The UK hosts around 120 quantum technology companies and 17 universities with significant quantum research programmes.</p>
            <p>Despite this investment, there are growing concerns about the UK's ability to retain quantum talent and commercialise research.<Cite nums={2} /> Several prominent UK quantum companies have relocated or listed in the US to access deeper capital markets and government procurement opportunities. The National Quantum Computing Centre, opened in Harwell in 2023, is intended to give UK companies and researchers access to cutting-edge quantum hardware, but it is still in early operational stages.<Cite nums={3} /> Critics argue the UK's £250m annual public quantum spend compares unfavourably to China's estimated $15bn over the same period.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-investment', label: 'Investment trends' },
          { id: 'sec-ecosystem', label: 'Ecosystem growth' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="10-year quantum commitment" value="2.5" unit="£bn" direction="up" polarity="up-is-good" changeText={<>Announced in 2024 National Quantum Strategy<Cite nums={1} /></>} sparklineData={[0.27, 0.27, 0.27, 0.35, 0.40, 0.40, 0.50, 0.60, 0.70, 0.80, 2.5]} href="#sec-investment" />
          <MetricCard label="UK quantum companies" value="120" unit="" direction="up" polarity="up-is-good" changeText={<>Up from around 30 in 2016<Cite nums={3} /></>} sparklineData={[30, 38, 48, 58, 68, 78, 88, 98, 108, 115, 120]} href="#sec-ecosystem" />
          <MetricCard label="Private quantum investment" value="£450" unit="m (2023)" direction="up" polarity="up-is-good" changeText={<>Up from £40m in 2017<Cite nums={3} /></>} sparklineData={[40, 60, 90, 120, 180, 250, 310, 370, 410, 430, 450]} href="#sec-investment" />
        </div>

        <ScrollReveal>
          <section id="sec-investment" className="mb-12">
            <LineChart title="UK quantum technology investment, 2014–2024" subtitle="Annual public and private investment in UK quantum technologies, £m." series={chart1Series} annotations={annotations} yLabel="£m" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ecosystem" className="mb-12">
            <LineChart title="UK quantum ecosystem growth, 2014–2024" subtitle="Quantum technology companies (count) and research output index (2014=100), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NQCC established" value="2023" unit="opened" description={<>The National Quantum Computing Centre at Harwell opened in 2023, providing UK researchers and companies with access to multiple quantum computing platforms as a national shared resource.<Cite nums={2} /></>} source="Source: NQCC, Progress Report 2024." />
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
