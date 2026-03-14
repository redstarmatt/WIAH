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
  { num: 1, name: 'Tech Nation', dataset: 'UK Tech Diversity Report', url: 'https://technation.io/report/', date: '2023' },
  { num: 2, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings — Tech occupations', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/ashe', date: '2024' },
  { num: 3, name: 'BCS', dataset: 'The Diversity in Technology Report', url: 'https://www.bcs.org/policy-and-influence/diversity/', date: '2023' },
];

interface DataPoint {
  year: number;
  womenInTech: number;
  ethnicMinorityInTech: number;
  techPayGap: number;
  disabledInTech: number;
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

export default function TechSectorDiversityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/tech-sector-diversity/tech_sector_diversity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'womenInTech', label: 'Women in tech roles (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.womenInTech })) },
        { id: 'ethnicMinorityInTech', label: 'Ethnic minority in tech (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ethnicMinorityInTech })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'techPayGap', label: 'Gender pay gap in tech (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.techPayGap })) },
        { id: 'disabledInTech', label: 'Disabled workers in tech (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disabledInTech })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Gender pay gap reporting introduced' },
    { date: new Date(2020, 5, 1), label: 'Covid-19 remote work shift' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Economy"
          question="How Diverse Is the UK Tech Sector?"
          finding={<>Women hold just 26% of tech roles in the UK, barely changed in a decade, while the gender pay gap in technology stands at 16% — nearly double the economy-wide average.<Cite nums={1} /> Progress on ethnic minority representation has been similarly slow.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK tech sector employs around 1.7 million people and is one of the highest-paying parts of the economy, yet it remains one of the least diverse. Women account for just 26% of tech roles — a figure that has barely shifted since 2014 despite sustained industry pledges and initiatives.<Cite nums={1} /> At senior leadership level the picture is worse: women hold roughly 20% of C-suite positions in UK tech companies, and Black and minority ethnic workers are significantly under-represented in both technical and leadership roles.</p>
            <p>The gender pay gap in technology is 16.1%, nearly double the UK economy-wide figure of 8.3%, partly reflecting the concentration of women in lower-paid tech roles and under-representation in engineering disciplines.<Cite nums={2} /> The BCS estimates that closing the diversity gap could add £4bn to UK tech productivity annually. Government initiatives including the Tech Talent Charter have attracted hundreds of signatories, but critics argue voluntary pledges without binding targets produce limited change.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-representation', label: 'Representation' },
          { id: 'sec-pay-gap', label: 'Pay gap' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Women in tech roles" value="26" unit="%" direction="flat" polarity="up-is-good" changeText={<>Barely changed since 2014<Cite nums={1} /></>} sparklineData={[23, 23.5, 24, 24.2, 24.5, 24.8, 25, 25.2, 25.5, 25.8, 26]} href="#sec-representation" />
          <MetricCard label="Gender pay gap in tech" value="16.1" unit="%" direction="up" polarity="up-is-bad" changeText={<>Nearly double economy average of 8.3%<Cite nums={2} /></>} sparklineData={[17.5, 17.2, 16.8, 17.0, 16.9, 16.5, 16.3, 16.5, 16.2, 16.3, 16.1]} href="#sec-pay-gap" />
          <MetricCard label="Ethnic minority share in tech" value="15" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 12% in 2017<Cite nums={3} /></>} sparklineData={[12, 12.3, 12.6, 13, 13.2, 13.5, 13.8, 14, 14.4, 14.7, 15]} href="#sec-representation" />
        </div>

        <ScrollReveal>
          <section id="sec-representation" className="mb-12">
            <LineChart title="Diversity in UK tech roles, 2014–2024" subtitle="Share of women and ethnic minority workers in technology occupations, UK." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pay-gap" className="mb-12">
            <LineChart title="Gender pay gap and disability inclusion in tech, 2017–2024" subtitle="Mean gender pay gap (%) and disabled workers share (%), UK tech sector." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Tech Talent Charter signatories" value="700+" unit="companies" description={<>Over 700 UK employers have signed the Tech Talent Charter committing to improve diversity in their tech workforce, covering more than 700,000 employees.<Cite nums={1} /></>} source="Source: Tech Talent Charter, Annual Benchmark, 2023." />
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
