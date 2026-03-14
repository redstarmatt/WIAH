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
  { num: 1, name: 'Ofcom', dataset: 'Online Safety Act — platforms\' transparency reports', url: 'https://www.ofcom.org.uk/online-safety/information-for-industry/transparency-reporting', date: '2024' },
  { num: 2, name: 'Internet Watch Foundation', dataset: 'Annual report — child sexual abuse material', url: 'https://www.iwf.org.uk/reports/', date: '2024' },
  { num: 3, name: 'Centre for Countering Digital Hate', dataset: 'Harmful content persistence rates', url: 'https://counterhate.com/', date: '2024' },
];

interface DataPoint {
  year: number;
  illegalContentReportsMillions: number;
  removalRateWithin24h: number;
  csaReports: number;
  hateSpeechPersistenceHours: number;
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

export default function PlatformModerationFailuresPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/platform-moderation-failures/platform_moderation_failures.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'illegalContentReportsMillions', label: 'Illegal content reports (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.illegalContentReportsMillions })) },
        { id: 'removalRateWithin24h', label: 'Removed within 24h (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.removalRateWithin24h })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'csaReports', label: 'Child sexual abuse material reports (UK)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.csaReports })) },
        { id: 'hateSpeechPersistenceHours', label: 'Avg hate speech persistence (hours)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hateSpeechPersistenceHours })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: 'Online Safety Act receives Royal Assent' },
    { date: new Date(2024, 5, 1), label: 'Riots — speed of moderation scrutinised' },
  ];

  return (
    <>
      <TopicNav topic="Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital"
          question="How Often Do Platforms Fail to Remove Harmful Content?"
          finding={<>UK-based reports of illegal online content — including child sexual abuse material, terrorist content, and fraud — have risen sharply as awareness and reporting mechanisms improve, but removal rates and response times vary widely between platforms.<Cite nums={1} /> Hate speech typically persists for an average of 21 hours before removal on major platforms.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Content moderation at scale is one of the defining challenges of the modern internet. The largest platforms — YouTube, Facebook, Instagram, TikTok, X/Twitter — each receive millions of reports of potentially harmful content per day and make decisions that affect what billions of people see. Moderation failures take two forms: leaving harmful content up (under-removal) and removing legitimate speech (over-removal). Both types occur, but the political and public concern in the UK has focused primarily on under-removal of illegal content, particularly child sexual abuse material, terrorist content, and incitement to violence.<Cite nums={1} /></p>
            <p>The Internet Watch Foundation&apos;s annual data shows that CSAM reports originating from the UK have risen substantially, in part reflecting better detection technology. The Centre for Countering Digital Hate has conducted systematic studies of hateful content persistence: sending reports of clearly hateful posts to platforms and measuring how long they stay up. Major platforms leave roughly 84% of reported hate speech up indefinitely, according to CCDH&apos;s 2023 research. The Online Safety Act 2023 creates new duties on platforms to proactively manage illegal content and introduces Ofcom as an enforcement authority with the power to impose fines of up to 10% of global turnover.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Reports and removal' },
          { id: 'sec-chart2', label: 'Specific harms' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Illegal content reports (UK, 2023)" value="4.5m" unit="" direction="up" polarity="flat" changeText={<>Rising as reporting improves<Cite nums={1} /></>} sparklineData={[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.2, 4.3, 4.4, 4.5]} href="#sec-chart1" />
          <MetricCard label="Hate speech removed within 24h" value="16" unit="%" direction="flat" polarity="up-is-good" changeText={<>CCDH: 84% stays up indefinitely<Cite nums={3} /></>} sparklineData={[14, 14, 15, 15, 16, 16, 16, 16, 16, 16, 16]} href="#sec-chart1" />
          <MetricCard label="CSAM reports (IWF, UK)" value="275k" unit="" direction="up" polarity="flat" changeText={<>Rising rapidly with better detection<Cite nums={2} /></>} sparklineData={[100, 130, 160, 190, 210, 230, 250, 260, 268, 272, 275]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Illegal content reports and removal rates, 2017–2024" subtitle="Total UK illegal content reports (millions) and removed within 24 hours (%)" series={chart1Series} annotations={annotations} yLabel="Millions / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="CSAM reports and hate speech persistence, 2017–2024" subtitle="UK-based CSAM reports and average hours before hate speech removed" series={chart2Series} annotations={[]} yLabel="Count / hours" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Hash-matching" value="99.9%" unit="CSAM detected" description={<>PhotoDNA hash-matching technology — which detects known CSAM by comparing image fingerprints — removes over 99.9% of known material before it is seen by users on platforms that use it, demonstrating what proactive technology can achieve.<Cite nums={2} /></>} source="Source: Internet Watch Foundation, technology report." />
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
