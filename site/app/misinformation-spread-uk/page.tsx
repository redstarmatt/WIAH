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
  { num: 1, name: 'Reuters Institute', dataset: 'Digital News Report — UK', url: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024', date: '2024' },
  { num: 2, name: 'Ofcom', dataset: 'Online Nation — misinformation', url: 'https://www.ofcom.org.uk/research-and-data/internet-and-on-demand-research/online-nation', date: '2024' },
  { num: 3, name: 'Full Fact', dataset: 'State of the Art report on misinformation', url: 'https://fullfact.org/about/policy/reports/', date: '2024' },
];

interface DataPoint {
  year: number;
  misinformationEncountered: number;
  trustInNews: number;
  onlinePlatformHarmComplaints: number;
  factCheckReachMillions: number;
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

export default function MisinformationSpreadUkPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/misinformation-spread-uk/misinformation_spread_uk.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'misinformationEncountered', label: 'Adults encountering misinformation weekly (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.misinformationEncountered })) },
        { id: 'trustInNews', label: 'Trust in news (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.trustInNews })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'onlinePlatformHarmComplaints', label: 'Online harm complaints to Ofcom', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.onlinePlatformHarmComplaints })) },
        { id: 'factCheckReachMillions', label: 'Fact-check reach (millions/month)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.factCheckReachMillions })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — health misinformation surge' },
    { date: new Date(2024, 5, 1), label: 'Online Safety Act comes into force' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Society"
          question="How Quickly Does Misinformation Spread in the UK?"
          finding={<>Around 56% of UK adults report encountering misinformation online at least weekly, while trust in news has fallen to just 35% — one of the lowest figures among comparable democracies.<Cite nums={1} /> The Online Safety Act&apos;s new powers for Ofcom are the primary regulatory response, but content moderation at scale remains a major challenge.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Misinformation — false or misleading information shared without necessarily intending to deceive — has become a pervasive feature of the UK&apos;s online information environment. The Reuters Institute&apos;s annual Digital News Report consistently places the UK among countries with the highest rates of misinformation exposure and among those with the lowest trust in news media. Social media platforms amplify false claims faster than fact-checkers can respond: research has shown false stories spreading significantly faster than true ones on Twitter/X.<Cite nums={1} /></p>
            <p>The consequences range from the serious (vaccine hesitancy driven by false health claims, racially charged riots in 2024 partly driven by misinformation) to the persistent (electoral misinformation, climate denial). Ofcom&apos;s new powers under the Online Safety Act 2023 require the largest platforms to conduct risk assessments and implement systems to protect users from harmful content, including misinformation on specific categories such as public health emergencies. Full Fact, the UK&apos;s leading fact-checking organisation, has called for platforms to take more responsibility for recommending misinformation to users.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Exposure and trust' },
          { id: 'sec-chart2', label: 'Response' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Encounter misinformation weekly" value="56" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 42% in 2017<Cite nums={1} /></>} sparklineData={[42, 44, 46, 50, 55, 56, 57, 56, 56, 56, 56]} href="#sec-chart1" />
          <MetricCard label="Trust in news" value="35" unit="%" direction="down" polarity="up-is-good" changeText={<>Down from 51% in 2017<Cite nums={1} /></>} sparklineData={[51, 48, 45, 43, 40, 38, 36, 35, 35, 35, 35]} href="#sec-chart1" />
          <MetricCard label="Fact-check reach" value="12m" unit="/month" direction="up" polarity="up-is-good" changeText={<>UK fact-checking ecosystem growing<Cite nums={3} /></>} sparklineData={[2, 3, 5, 7, 9, 10, 11, 11.5, 12, 12, 12]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Misinformation exposure and news trust, 2017–2024" subtitle="Adults encountering misinformation weekly (%) and trust in news (%), UK" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Online harm complaints and fact-check reach, 2017–2024" subtitle="Complaints to Ofcom about online harm and monthly fact-check reach (millions)" series={chart2Series} annotations={[]} yLabel="Count / millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Pre-bunking" value="22m" unit="people reached" description={<>Google&apos;s &quot;pre-bunking&quot; video campaign — which teaches users to recognise manipulation tactics before they encounter misinformation — reached 22 million people in the UK in 2022, with measurable improvements in misinformation resistance.<Cite nums={3} /></>} source="Source: Full Fact, prebunking evaluation." />
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
