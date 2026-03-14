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
  { num: 1, name: 'ONS', dataset: 'Internet users, UK', url: 'https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers/latest', date: '2024' },
  { num: 2, name: 'Good Things Foundation', dataset: 'Digital Nation report', url: 'https://www.goodthingsfoundation.org/insights/digital-nation-report/', date: '2024' },
  { num: 3, name: 'Age UK', dataset: 'Digital exclusion among older people', url: 'https://www.ageuk.org.uk/globalassets/age-uk/documents/reports-and-publications/reports-and-briefings/active-communities/rb_april15_digital_inclusion_and_older_people.pdf', date: '2024' },
];

interface DataPoint {
  year: number;
  over75NonUsers: number;
  over65LimitedSkills: number;
  internetUsageOver65: number;
  publicDigitalAccessPoints: number;
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

export default function DigitalExclusionElderlyPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/digital-exclusion-elderly/digital_exclusion_elderly.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'over75NonUsers', label: 'Over-75s who never use internet (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.over75NonUsers })) },
        { id: 'internetUsageOver65', label: 'Over-65s who use internet (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.internetUsageOver65 })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'over65LimitedSkills', label: 'Over-65s with limited digital skills (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.over65LimitedSkills })) },
        { id: 'publicDigitalAccessPoints', label: 'Public digital access points (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.publicDigitalAccessPoints })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid accelerated digital necessity' },
    { date: new Date(2022, 5, 1), label: 'Digital Inclusion Strategy' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Society"
          question="How Many Older People Can't Access the Internet?"
          finding={<>Around 2 million people over 75 in the UK have never used the internet — representing 37% of that age group — and a further 4 million older adults lack the basic digital skills needed to use it safely and effectively.<Cite nums={1} /> As services migrate online, digital exclusion increasingly means exclusion from society.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Digital exclusion is concentrated among older people, the disabled, and those on low incomes — groups that often overlap. While internet usage among over-65s has risen substantially over the past decade, a significant minority of older adults — particularly those aged 75 and over — remain entirely offline. This is increasingly consequential: government services are moving online, banking has reduced its high street presence, and healthcare access increasingly requires digital literacy to navigate appointment booking and patient portals.<Cite nums={1} /></p>
            <p>Having internet access is different from having the skills to use it safely. Good Things Foundation estimates that around 8.5 million UK adults lack the &quot;essential digital skills&quot; needed for everyday life — including over 4 million older adults. The pandemic temporarily forced many older people online for the first time, with mixed results: some gained confidence, while others found remote services inaccessible and were left behind. The government&apos;s Digital Inclusion Strategy committed to halving the number of non-users by 2030, but progress against this target is slow.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Usage rates' },
          { id: 'sec-chart2', label: 'Skills and access' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Over-75s never online" value="37" unit="%" direction="down" polarity="up-is-bad" changeText={<>Down from 56% in 2015; still high<Cite nums={1} /></>} sparklineData={[56, 52, 48, 44, 41, 39, 38, 37.5, 37, 37, 37]} href="#sec-chart1" />
          <MetricCard label="Over-65s using internet" value="82" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 52% in 2013<Cite nums={1} /></>} sparklineData={[52, 58, 63, 67, 71, 74, 77, 79, 80, 81, 82]} href="#sec-chart1" />
          <MetricCard label="Adults lacking digital skills" value="8.5m" unit="" direction="down" polarity="up-is-bad" changeText={<>Down from 12m in 2018<Cite nums={2} /></>} sparklineData={[12, 11.5, 11, 10.5, 10, 9.5, 9.2, 9.0, 8.8, 8.6, 8.5]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Internet usage rates for older age groups, 2013–2024" subtitle="Percentage of over-75s who have never used internet and over-65s who use internet, UK" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Adults with limited digital skills and public access points, 2013–2024" subtitle="Over-65s with limited digital skills (millions) and public digital access points (thousands)" series={chart2Series} annotations={[]} yLabel="Millions / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Online Nation" value="500k" unit="assisted annually" description={<>The Good Things Foundation&apos;s network of community organisations helps around 500,000 people per year improve their digital skills, with a focus on older adults and the most digitally excluded.<Cite nums={2} /></>} source="Source: Good Things Foundation, Digital Nation report." />
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
