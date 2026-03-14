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
  { num: 1, name: 'DSIT', dataset: 'UK Semiconductor Strategy', url: 'https://www.gov.uk/government/publications/uk-semiconductor-strategy', date: '2023' },
  { num: 2, name: 'SEMI', dataset: 'World Fab Watch — UK facilities', url: 'https://www.semi.org/en/products-services/market-data/world-fab-watch', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'UK Semiconductor Industry Analysis', url: 'https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry', date: '2023' },
];

interface DataPoint {
  year: number;
  semiconductorExports: number;
  rdInvestment: number;
  chipDesignJobs: number;
  fabCapacity: number;
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

export default function UKChipManufacturingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/uk-chip-manufacturing/uk_chip_manufacturing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'semiconductorExports', label: 'Semiconductor exports (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.semiconductorExports })) },
        { id: 'rdInvestment', label: 'R&D investment in semiconductors (£bn)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rdInvestment })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'chipDesignJobs', label: 'Chip design jobs (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.chipDesignJobs })) },
        { id: 'fabCapacity', label: 'Fab wafer capacity (indexed, 2015=100)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fabCapacity })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Global chip shortage crisis' },
    { date: new Date(2023, 5, 1), label: 'UK Semiconductor Strategy published' },
  ];

  return (
    <>
      <TopicNav topic="Economy & Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Digital"
          question="Does the UK Have a Semiconductor Strategy?"
          finding={<>The UK published its first semiconductor strategy in 2023, committing £1bn over ten years, but critics note this is dwarfed by the US CHIPS Act ($52bn) and EU Chips Act (€43bn).<Cite nums={1} /> The UK excels in chip design but has almost no advanced manufacturing capacity.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK semiconductor sector generates around £9bn in annual revenues and employs approximately 47,000 people, but it is heavily concentrated in chip design and intellectual property rather than physical manufacturing.<Cite nums={1} /> Companies such as Arm Holdings — whose chip designs power virtually every smartphone on earth — represent world-class capability. However, the UK has virtually no advanced semiconductor fabrication capacity: there is no fab capable of producing chips below 28nm, and the country is almost entirely dependent on overseas manufacturers, principally in Taiwan, South Korea and the Netherlands.</p>
            <p>The government's 2023 UK Semiconductor Strategy acknowledged this vulnerability and pledged £1bn over a decade, focused on R&D, talent and supply-chain resilience rather than manufacturing catch-up.<Cite nums={2} /> Analysts broadly welcomed the honesty about the UK's position but questioned whether £100m per year is enough to meaningfully shift the landscape. By comparison, the Newport Wafer Fab — the UK's largest chip manufacturer — was acquired by a Chinese company in 2021 before the government intervened under national security powers.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trade', label: 'Exports & R&D' },
          { id: 'sec-jobs', label: 'Jobs & capacity' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Semiconductor sector revenue" value="9" unit="£bn/yr" direction="up" polarity="up-is-good" changeText={<>Up from £6.4bn in 2015<Cite nums={1} /></>} sparklineData={[6.4, 6.7, 7.0, 7.3, 7.6, 7.9, 8.1, 8.3, 8.5, 8.8, 9.0]} href="#sec-trade" />
          <MetricCard label="Chip design jobs" value="47" unit="thousand" direction="up" polarity="up-is-good" changeText={<>Up from 38k in 2015<Cite nums={3} /></>} sparklineData={[38, 39, 40, 41, 42, 43, 43, 44, 45, 46, 47]} href="#sec-jobs" />
          <MetricCard label="Government semiconductor R&D commitment" value="1" unit="£bn (10yr)" direction="up" polarity="up-is-good" changeText={<>2023 UK Semiconductor Strategy<Cite nums={1} /></>} sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]} href="#sec-trade" />
        </div>

        <ScrollReveal>
          <section id="sec-trade" className="mb-12">
            <LineChart title="UK semiconductor exports and R&D investment, 2015–2024" subtitle="Annual semiconductor exports and government/industry R&D spend, £bn, UK." series={chart1Series} annotations={annotations} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-jobs" className="mb-12">
            <LineChart title="UK chip design employment and fab capacity, 2015–2024" subtitle="Chip design jobs (thousands) and wafer fabrication capacity index (2015=100), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Arm Holdings IPO" value="$54bn" unit="valuation (2023)" description={<>Arm Holdings, the Cambridge-based chip design company, listed on Nasdaq at a $54bn valuation in 2023, underscoring UK strength in IP-based semiconductor design even without manufacturing capacity.<Cite nums={2} /></>} source="Source: Arm Holdings prospectus, Nasdaq IPO, September 2023." />
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
