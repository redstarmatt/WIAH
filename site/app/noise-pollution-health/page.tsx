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
  { num: 1, name: 'DEFRA', dataset: 'Noise action planning and mapping', url: 'https://www.gov.uk/government/collections/noise-action-plans-for-england', date: '2023' },
  { num: 2, name: 'WHO Europe', dataset: 'Environmental Noise Guidelines for the European Region', url: 'https://www.who.int/europe/publications/i/item/9789289053563', date: '2018' },
  { num: 3, name: 'Public Health England', dataset: 'Noise and health evidence review', url: 'https://ukhsa.blog.gov.uk/2022/05/17/noise-and-health/', date: '2022' },
];

interface DataPoint {
  year: number;
  roadNoiseExposedMillions: number;
  railNoiseExposedMillions: number;
  noiseSleepDisturbanceMillions: number;
  noiseComplaintsThousands: number;
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

export default function NoisePollutionHealthPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/noise-pollution-health/noise_pollution_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'roadNoiseExposedMillions', label: 'Exposed to harmful road noise >55dB (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.roadNoiseExposedMillions })) },
        { id: 'noiseSleepDisturbanceMillions', label: 'Suffering night noise sleep disruption (millions)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.noiseSleepDisturbanceMillions })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'railNoiseExposedMillions', label: 'Exposed to railway noise >55dB (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.railNoiseExposedMillions })) },
        { id: 'noiseComplaintsThousands', label: 'Noise complaints to councils (000s)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.noiseComplaintsThousands })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — noise complaints fall' },
    { date: new Date(2022, 5, 1), label: 'WHO 55dB road guidance adopted' },
  ];

  return (
    <>
      <TopicNav topic="Environment & Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Health"
          question="How Much Is Noise Pollution Harming Health?"
          finding={<>DEFRA's noise mapping estimates that around 5 million people in England are regularly exposed to daytime road traffic noise above the WHO's 55dB harm threshold, and 1.5 million suffer night noise above 50dB — linked to sleep disruption, cardiovascular disease and cognitive impacts in children.<Cite nums={[1, 2]} /> Noise is the second largest environmental health risk in Europe after air pollution.<Cite nums={3} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Environmental noise — primarily from road traffic, rail and aircraft — is one of the most widespread forms of pollution in Britain, yet it receives a fraction of the policy attention given to air quality. DEFRA's strategic noise maps, published every five years under EU-derived legislation, show that around 5 million people in England are exposed to road noise at levels the WHO considers harmful to health (above Lden 55dB). A further 1 million are affected by aircraft noise around the main London airports.<Cite nums={1} /></p>
            <p>The WHO's 2018 Environmental Noise Guidelines — which set the most stringent evidence-based limits — found that chronic exposure to road traffic noise above 53dB increases the risk of ischaemic heart disease by 8%, and night noise above 45dB causes sleep disruption that has cascading health consequences. PHE estimated in 2022 that environmental noise costs the NHS around £1 billion annually in cardiovascular disease, mental health and productivity impacts. Noise complaints to local councils rose consistently through the late 2010s before falling during Covid lockdowns, and have since returned to — and in some areas exceeded — pre-pandemic levels.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-exposure', label: 'Noise exposure' },
          { id: 'sec-rail', label: 'Rail & complaints' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Exposed to harmful road noise" value="5m" unit="people" direction="up" polarity="up-is-bad" changeText={<>Above WHO 55dB daytime threshold<Cite nums={1} /></>} sparklineData={[4.2, 4.3, 4.4, 4.5, 4.6, 4.6, 4.7, 4.8, 4.9, 4.95, 5.0]} href="#sec-exposure" />
          <MetricCard label="Night noise sleep disruption" value="1.5m" unit="people" direction="up" polarity="up-is-bad" changeText={<>Above WHO 50dB night threshold<Cite nums={2} /></>} sparklineData={[1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.38, 1.4, 1.43, 1.47, 1.5]} href="#sec-exposure" />
          <MetricCard label="NHS cost of noise pollution" value="£1bn/yr" unit="" direction="up" polarity="up-is-bad" changeText={<>Cardiovascular & mental health<Cite nums={3} /></>} sparklineData={[0.7, 0.75, 0.8, 0.82, 0.85, 0.88, 0.9, 0.93, 0.95, 0.98, 1.0]} href="#sec-rail" />
        </div>

        <ScrollReveal>
          <section id="sec-exposure" className="mb-12">
            <LineChart title="Road noise exposure and sleep disruption, England, 2007–2022" subtitle="Population exposed to harmful noise levels, millions." series={chart1Series} annotations={annotations} yLabel="Millions of people" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rail" className="mb-12">
            <LineChart title="Railway noise exposure and noise complaints, 2007–2022" subtitle="People exposed to railway noise >55dB (millions); noise complaints to councils (000s)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Electric vehicle noise benefit" value="-5dB" unit="at low speed" description={<>Electric vehicles produce around 5dB less noise than equivalent petrol cars at speeds below 30 mph, potentially reducing residential road noise by a third in urban areas as EV adoption increases.<Cite nums={1} /></>} source="Source: DEFRA noise action plans." />
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
