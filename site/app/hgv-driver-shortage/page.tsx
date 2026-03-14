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
  { num: 1, name: 'Road Haulage Association', dataset: 'HGV driver shortage data', url: 'https://www.rha.uk.net/news/press-releases/2022-q1/driver-shortage', date: '2024' },
  { num: 2, name: 'DVLA', dataset: 'Driving licence statistics', url: 'https://www.gov.uk/government/statistical-data-sets/driving-licence-data', date: '2024' },
  { num: 3, name: 'DfT', dataset: 'Road freight statistics', url: 'https://www.gov.uk/government/statistical-data-sets/road-freight-domestic-and-international', date: '2024' },
];

interface DataPoint {
  year: number;
  driverShortageThousands: number;
  hgvLicencesIssued: number;
  avgHGVDriverWage: number;
  hgvDriverAgeMedian: number;
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

export default function HGVDriverShortagePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/hgv-driver-shortage/hgv_driver_shortage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'driverShortageThousands', label: 'HGV driver shortage (000s)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.driverShortageThousands })) },
        { id: 'hgvLicencesIssued', label: 'New HGV licences issued (000s)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hgvLicencesIssued })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgHGVDriverWage', label: 'Average HGV driver salary (£000)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgHGVDriverWage })) },
        { id: 'hgvDriverAgeMedian', label: 'Median driver age (years)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hgvDriverAgeMedian })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Supply chain crisis peak' },
    { date: new Date(2021, 5, 1), label: 'Emergency visas issued' },
  ];

  return (
    <>
      <TopicNav topic="Transport & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Economy"
          question="Has the HGV Driver Shortage Been Resolved?"
          finding={<>The acute shortfall of 100,000 HGV drivers that caused the 2021 supply chain crisis has narrowed, but a structural shortage of around 60,000 drivers persists as the workforce ages and new entrants remain insufficient to replace retirees.<Cite nums={1} /> The combination of Brexit, Covid DVLA test backlogs and an ageing workforce created a perfect storm that higher wages and emergency visas only partially resolved.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The HGV driver shortage became a national story in autumn 2021 when fuel stations ran dry and supermarket shelves emptied. The Road Haulage Association estimated the shortfall at around 100,000 drivers — a figure that reflected years of underinvestment in training, the departure of around 20,000 EU drivers post-Brexit, and a Covid-induced backlog in DVLA driving tests. The government eventually issued 10,500 emergency temporary visas for HGV drivers, though industry said fewer than half were taken up.<Cite nums={1} /></p>
            <p>By 2023 the acute crisis had passed: wages for HGV drivers rose by around 20% between 2020 and 2023, attracting new entrants, and DVLA test backlogs cleared. But the underlying structural shortage remains. The median age of HGV drivers is now around 53, and over a third are due to retire within a decade. New entrants cannot keep pace with retirements. Training costs of around £3,000–5,000 per licence remain a barrier, and the industry remains overwhelmingly male and poorly promoted as a career. RHA estimates a persistent shortfall of around 60,000 drivers going into 2024.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-shortage', label: 'Shortage trend' },
          { id: 'sec-workforce', label: 'Wages & demographics' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Current HGV driver shortfall" value="60,000" unit="" direction="down" polarity="up-is-bad" changeText={<>Down from 100,000 in 2021<Cite nums={1} /></>} sparklineData={[40, 45, 50, 60, 70, 80, 100, 95, 85, 70, 60]} href="#sec-shortage" />
          <MetricCard label="Avg HGV driver salary (2023)" value="£38,000" unit="" direction="up" polarity="up-is-good" changeText={<>Up 20% since 2020<Cite nums={2} /></>} sparklineData={[28, 29, 30, 30, 31, 31, 33, 35, 36, 37, 38]} href="#sec-workforce" />
          <MetricCard label="Median driver age" value="53" unit="years" direction="up" polarity="up-is-bad" changeText={<>One-third retiring within a decade<Cite nums={2} /></>} sparklineData={[48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53]} href="#sec-workforce" />
        </div>

        <ScrollReveal>
          <section id="sec-shortage" className="mb-12">
            <LineChart title="HGV driver shortage and new licences issued, UK, 2015–2023" subtitle="Estimated driver shortage (000s); new HGV licences issued annually (000s)." series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            <LineChart title="HGV driver average wage and median age, 2015–2023" subtitle="Average HGV driver annual salary (£000); median age of workforce." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Women in haulage" value="1%" unit="of drivers" description={<>Only 1% of HGV drivers are women, compared to 13% in Germany. Industry programmes to encourage women into driving, combined with automatic gearbox adoption, are slowly broadening the recruitment pool, though progress remains very slow.<Cite nums={1} /></>} source="Source: Road Haulage Association / Women in Transport." />
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
