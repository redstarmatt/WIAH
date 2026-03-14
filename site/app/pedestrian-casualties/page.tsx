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
  { num: 1, name: 'DfT', dataset: 'Reported road casualties Great Britain — pedestrian data tables', url: 'https://www.gov.uk/government/statistical-data-sets/reported-road-casualties-great-britain', date: '2024' },
  { num: 2, name: 'Royal Society for the Prevention of Accidents', dataset: 'Road safety statistics', url: 'https://www.rospa.com/road-safety/advice/road-users/pedestrians/', date: '2024' },
  { num: 3, name: 'Parliamentary Advisory Council for Transport Safety', dataset: 'Pedestrian safety report', url: 'https://www.pacts.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  pedestrianKilled: number;
  pedestrianSeriouslyInjured: number;
  pedestrianKsiPer100mTrips: number;
  childPedestrianKsi: number;
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

export default function PedestrianCasualtiesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/pedestrian-casualties/pedestrian_casualties.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'pedestrianKilled', label: 'Pedestrians killed', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pedestrianKilled })) },
        { id: 'pedestrianSeriouslyInjured', label: 'Pedestrians seriously injured', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pedestrianSeriouslyInjured })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'pedestrianKsiPer100mTrips', label: 'Pedestrian KSI rate per 100m walking trips', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pedestrianKsiPer100mTrips })) },
        { id: 'childPedestrianKsi', label: 'Child pedestrian KSI', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childPedestrianKsi })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — fewer pedestrians, fewer deaths' },
    { date: new Date(2022, 5, 1), label: 'Traffic returns to normal' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Are Pedestrian Deaths on UK Roads Falling?"
          finding={<>UK pedestrian fatalities have fallen significantly from their 1990s peak but have stalled since around 2012, with around 440 pedestrians killed and over 4,000 seriously injured annually in Great Britain.<Cite nums={1} /> Progress lags far behind countries like Sweden and the Netherlands, which have driven pedestrian deaths to near zero through infrastructure design and lower speed limits.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Great Britain recorded 443 pedestrian deaths in 2022, down from over 1,800 in 1990 but broadly unchanged since 2012. DfT statistics show that the rate of improvement slowed dramatically in the early 2010s despite rising walking levels, suggesting that the easy gains from seatbelt legislation and drink-drive enforcement have been exhausted, and further reductions require more fundamental change in road design and speed management. Older pedestrians (over 65) and those in deprived urban areas face the highest risk.<Cite nums={1} /></p>
            <p>The UK's Road Safety Framework for 2020–2040, published in 2019, abandoned numerical reduction targets — a decision criticised by road safety organisations. ROSPA and PACTS both argue that Sweden's Vision Zero approach — which treats road deaths as unacceptable in principle and engineers them out — has outperformed Britain's incremental approach. Swedish pedestrian deaths fell to 18 in 2022. The UK's pedestrian death rate per billion walking trips is around 5 times higher than Sweden's.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-casualties', label: 'Casualty trend' },
          { id: 'sec-rate', label: 'Rate & children' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Pedestrians killed (2022)" value="443" unit="" direction="flat" polarity="up-is-bad" changeText={<>Stalled since 2012<Cite nums={1} /></>} sparklineData={[600, 560, 520, 490, 460, 445, 440, 448, 445, 442, 443]} href="#sec-casualties" />
          <MetricCard label="Pedestrians seriously injured" value="4,200" unit="" direction="flat" polarity="up-is-bad" changeText={<>Using STATS19 adjusted methodology<Cite nums={1} /></>} sparklineData={[5500, 5200, 5000, 4800, 4600, 4400, 4300, 4200, 4200, 4200, 4200]} href="#sec-casualties" />
          <MetricCard label="Child pedestrian KSI (2022)" value="830" unit="" direction="down" polarity="up-is-bad" changeText={<>Down 60% since 2000<Cite nums={2} /></>} sparklineData={[2200, 2000, 1700, 1500, 1300, 1200, 1100, 1000, 950, 900, 830]} href="#sec-rate" />
        </div>

        <ScrollReveal>
          <section id="sec-casualties" className="mb-12">
            <LineChart title="Pedestrian casualties on GB roads, 2000–2022" subtitle="Pedestrians killed and seriously injured per year." series={chart1Series} annotations={annotations} yLabel="Casualties" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rate" className="mb-12">
            <LineChart title="Pedestrian KSI rate and child pedestrian casualties, 2000–2022" subtitle="KSI rate per 100 million walking trips; child (under 16) pedestrian KSI." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="20mph zones" value="-40%" unit="pedestrian casualties" description={<>Research by Cardiff University found that introducing 20 mph speed limits in residential areas reduces pedestrian casualties by around 40% — the single most effective intervention available to local authorities.<Cite nums={3} /></>} source="Source: PACTS / Cardiff University 20mph research." />
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
