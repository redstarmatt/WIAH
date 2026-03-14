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
  { num: 1, name: 'Natural England', dataset: 'Monitor of Engagement with the Natural Environment (MENE)', url: 'https://www.gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey', date: '2024' },
  { num: 2, name: 'Fields in Trust', dataset: 'Green Space Index', url: 'https://www.fieldsintrust.org/green-space-index', date: '2023' },
  { num: 3, name: 'DEFRA', dataset: 'Access to green space in England', url: 'https://www.gov.uk/government/statistics/the-area-and-quality-of-parks-and-green-spaces', date: '2024' },
];

interface DataPoint {
  year: number;
  pctWithin300mGreenSpace: number;
  parkVisitsPerPerson: number;
  localAuthorityParksSpend: number;
  greenSpaceDeprivationGap: number;
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

export default function GreenSpaceAccessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/green-space-access/green_space_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'pctWithin300mGreenSpace', label: 'Households within 300m of green space (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pctWithin300mGreenSpace })) },
        { id: 'parkVisitsPerPerson', label: 'Annual park visits per person', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.parkVisitsPerPerson })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'localAuthorityParksSpend', label: 'LA parks spending (£ per head)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.localAuthorityParksSpend })) },
        { id: 'greenSpaceDeprivationGap', label: 'Green space access gap (deprived vs affluent, pct pts)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.greenSpaceDeprivationGap })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — parks surge' },
    { date: new Date(2021, 5, 1), label: 'Urban greenspace guidance' },
  ];

  return (
    <>
      <TopicNav topic="Environment & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Society"
          question="Do All Communities Have Access to Green Space?"
          finding={<>Around 2.8 million people in England live more than a 10-minute walk from any park or public green space, and those who lack access are disproportionately from deprived urban neighbourhoods, ethnic minority communities and households without gardens.<Cite nums={1} /> Local authority parks spending has been cut by 24% in real terms since 2009/10.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Natural England's Monitor of Engagement with the Natural Environment consistently finds that access to quality green space is strongly socioeconomically patterned. In the least deprived 20% of neighbourhoods, 62% of households are within a 5-minute walk of a good quality green space. In the most deprived 20%, that figure falls to 38%. This disparity has persistent health consequences: access to green space is associated with lower rates of cardiovascular disease, depression and obesity. Covid amplified public awareness of green space inequality — parks in affluent areas were accessible while many inner-city residents had nowhere to go.<Cite nums={1} /></p>
            <p>Fields in Trust's Green Space Index shows that per-capita provision of parks and recreation space has declined in many urban areas as housing development consumes open land. Local authority spending on parks fell from around £1.1 billion in 2009/10 to under £880 million by 2022/23 in real terms — cuts that have led to reduced opening hours, fewer rangers and deteriorating facilities. DEFRA data shows that 1 in 5 visitors rate their local park's quality as poor or average, with litter, anti-social behaviour and poor maintenance as the main concerns.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-access', label: 'Access & visits' },
          { id: 'sec-spending', label: 'Funding & inequality' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="People lacking nearby green space" value="2.8m" unit="" direction="up" polarity="up-is-bad" changeText={<>Concentrated in deprived urban areas<Cite nums={1} /></>} sparklineData={[2.2, 2.3, 2.3, 2.4, 2.5, 2.5, 2.6, 2.7, 2.7, 2.8, 2.8]} href="#sec-access" />
          <MetricCard label="LA parks spending (real terms)" value="£880m" unit="" direction="down" polarity="up-is-good" changeText={<>Down 24% since 2009/10<Cite nums={2} /></>} sparklineData={[1100, 1080, 1040, 1010, 980, 960, 940, 920, 905, 890, 880]} href="#sec-spending" />
          <MetricCard label="Access gap (deprived vs affluent)" value="24 pct pts" unit="" direction="up" polarity="up-is-bad" changeText={<>Gap widening, not closing<Cite nums={1} /></>} sparklineData={[18, 18, 19, 19, 20, 21, 21, 22, 23, 23, 24]} href="#sec-spending" />
        </div>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart title="Green space proximity and park visits per person, England, 2010–2024" subtitle="% of households within 300m of green space; annual park visits per person." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart title="Local authority parks spending and access inequality, 2010–2024" subtitle="LA parks spend in £ per head; gap in green space access between deprived and affluent areas (pct pts)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="30x30 target" value="30%" unit="land protected" description={<>The UK has committed to protecting 30% of land for nature by 2030, which includes expanding public access to green and blue spaces — though currently only around 8.5% of England is accessible to the public.<Cite nums={3} /></>} source="Source: DEFRA / Natural England green space statistics." />
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
