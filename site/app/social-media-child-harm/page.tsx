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
  { num: 1, name: 'NHS Digital', dataset: 'Mental Health of Children and Young People in England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england', date: '2023' },
  { num: 2, name: 'Ofcom', dataset: 'Children and Parents: Media Use and Attitudes Report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/children-and-parents-media-use-and-attitudes', date: '2023' },
  { num: 3, name: 'ONS', dataset: 'Online Harms and Safety: Adult Opinions Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing', date: '2024' },
];

interface DataPoint {
  year: number;
  mentalHealthProblemRate: number;
  dailySocialMediaHours: number;
  selfHarmAdmissions: number;
  screenTimeHours: number;
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

export default function SocialMediaChildHarmPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/social-media-child-harm/social_media_child_harm.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'mentalHealthProblemRate', label: 'Children with probable mental disorder (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mentalHealthProblemRate })) },
        { id: 'selfHarmAdmissions', label: 'Self-harm hospital admissions (per 100k under-18)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.selfHarmAdmissions })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'dailySocialMediaHours', label: 'Daily social media use, 12–15s (hours)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dailySocialMediaHours })) },
        { id: 'screenTimeHours', label: 'Total daily screen time, under-18s (hours)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.screenTimeHours })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19 lockdowns begin' },
    { date: new Date(2022, 5, 1), label: 'Online Safety Bill introduced' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Society"
          question="Is Social Media Harming Children's Mental Health?"
          finding={<>One in five children aged 8–16 now has a probable mental disorder, up from one in nine in 2017.<Cite nums={1} /> Daily social media use among 12–15 year olds has more than doubled over the same period.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The proportion of children aged 8–16 with a probable mental disorder rose from 11.4% in 2017 to 20.3% in 2023, according to NHS Digital's flagship survey.<Cite nums={1} /> Researchers debate causation — the rise coincides with surging smartphone and social media adoption — but large-scale studies now show correlations between heavy social media use and anxiety, depression and poor sleep in adolescents, particularly girls. The relationship is not simple: the same platforms that harm some children provide community and connection to others, especially LGBTQ+ young people.</p>
            <p>Ofcom data show that 97% of 12–15 year olds use social media, spending an average of three hours per day on platforms designed to maximise engagement.<Cite nums={2} /> Hospital admissions for self-harm in under-18s have risen by around 40% over the past decade. The Online Safety Act 2023 places new duties on platforms to protect children from harmful content, but enforcement is still developing. Campaigners argue that design features — infinite scroll, algorithmic amplification of distressing content, notifications at night — should face far stricter regulation.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-mental-health', label: 'Mental health trends' },
          { id: 'sec-screen-time', label: 'Screen time' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Children with probable mental disorder" value="20.3" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 11.4% in 2017<Cite nums={1} /></>} sparklineData={[11.4, 12.1, 13.3, 14.0, 14.5, 15.0, 16.5, 17.2, 18.1, 19.2, 20.3]} href="#sec-mental-health" />
          <MetricCard label="Daily social media use, 12–15s" value="3.0" unit="hrs/day" direction="up" polarity="up-is-bad" changeText={<>Up from 1.4 hrs in 2015<Cite nums={2} /></>} sparklineData={[1.4, 1.7, 2.0, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0]} href="#sec-screen-time" />
          <MetricCard label="Self-harm admissions, under-18s (per 100k)" value="390" unit="" direction="up" polarity="up-is-bad" changeText={<>Up ~40% over ten years<Cite nums={3} /></>} sparklineData={[278, 292, 308, 315, 323, 330, 341, 355, 368, 380, 390]} href="#sec-mental-health" />
        </div>

        <ScrollReveal>
          <section id="sec-mental-health" className="mb-12">
            <LineChart title="Children's mental health, 2017–2024" subtitle="Probable mental disorder rate and self-harm admissions, England." series={chart1Series} annotations={annotations} yLabel="Rate" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-screen-time" className="mb-12">
            <LineChart title="Children's screen and social media time, 2015–2024" subtitle="Average daily hours, UK 12–15 year olds." series={chart2Series} annotations={[]} yLabel="Hours per day" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Online Safety Act 2023" value="700+" unit="new duties" description={<>The Online Safety Act places over 700 new duties on platforms to protect children, including requirements to remove illegal content and conduct children's risk assessments.<Cite nums={3} /></>} source="Source: Ofcom, Online Safety Act implementation, 2024." />
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
