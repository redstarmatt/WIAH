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
  { num: 1, name: 'DfT', dataset: 'Reported road casualties Great Britain annual report', url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2022', date: '2024' },
  { num: 2, name: 'ROSPA', dataset: 'Road Safety Factsheet — contributory factors', url: 'https://www.rospa.com/road-safety/advice/drivers/factors/', date: '2024' },
  { num: 3, name: 'PACTS', dataset: 'Road safety targets — international comparisons', url: 'https://www.pacts.org.uk/road-safety-targets/', date: '2024' },
];

interface DataPoint {
  year: number;
  totalKilled: number;
  speedRelatedDeaths: number;
  drinkDrugDriving: number;
  distractionRelated: number;
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

export default function RoadDeathsCausesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/road-deaths-causes/road_deaths_causes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'totalKilled', label: 'Total road deaths in GB', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalKilled })) },
        { id: 'speedRelatedDeaths', label: 'Speed a contributory factor (estimated)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.speedRelatedDeaths })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'drinkDrugDriving', label: 'Drink or drug driving deaths (estimated)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.drinkDrugDriving })) },
        { id: 'distractionRelated', label: 'Driver distraction related deaths', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.distractionRelated })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — fewer casualties' },
    { date: new Date(2021, 5, 1), label: 'Traffic returns, deaths rise' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="What's Causing Road Deaths in Britain?"
          finding={<>Great Britain recorded 1,711 road deaths in 2022 — the highest since 2011 — after a Covid-induced dip. Speed is the most common contributory factor, recorded in around a third of fatal collisions, followed by driver distraction and impairment from drink or drugs.<Cite nums={1} /> Progress in reducing road deaths stalled completely from 2010 to 2022.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Great Britain achieved remarkable progress in reducing road deaths from over 7,000 a year in the early 1970s to around 1,700 by the early 2010s. Since then, the toll has been largely flat. DfT's STATS19 casualty data shows 1,711 people were killed in 2022 — a figure inflated by post-Covid traffic recovery. DfT's contributory factor data — which relies on police assessment at the scene — consistently identifies excessive speed as the leading factor in around 30% of fatal collisions, ahead of driver distraction, junction errors and impairment.<Cite nums={1} /></p>
            <p>Drink driving enforcement has driven dramatic reductions in alcohol-related deaths since the 1960s, but progress has plateaued. Drug driving is an increasing concern: DfT estimates that around 200 deaths per year involve drug-impaired driving, and detection remains challenging. Mobile phone use at the wheel has been illegal since 2003, but ROSPA estimates it contributes to around 400 deaths and serious injuries annually. The UK has no national road safety targets, unlike the EU's target of halving deaths by 2030 from a 2020 baseline — a decision road safety groups argue removes political pressure to act.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total', label: 'Total deaths' },
          { id: 'sec-causes', label: 'Causes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Road deaths (2022)" value="1,711" unit="" direction="up" polarity="up-is-bad" changeText={<>Highest since 2011<Cite nums={1} /></>} sparklineData={[1850, 1810, 1770, 1730, 1730, 1792, 1770, 1752, 1560, 1558, 1711]} href="#sec-total" />
          <MetricCard label="Speed a factor (est.)" value="~30%" unit="of fatals" direction="flat" polarity="up-is-bad" changeText={<>Consistently the top factor<Cite nums={2} /></>} sparklineData={[33, 32, 31, 31, 30, 30, 30, 30, 30, 30, 30]} href="#sec-causes" />
          <MetricCard label="UK vs EU progress (2010–2022)" value="-16%" unit="" direction="flat" polarity="up-is-good" changeText={<>EU average: -36%<Cite nums={3} /></>} sparklineData={[0, -2, -4, -5, -6, -6, -7, -8, -12, -14, -16]} href="#sec-total" />
        </div>

        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart title="UK road deaths and speed-related fatalities, 2000–2022" subtitle="Total road deaths in GB; estimated deaths where speed was a contributory factor." series={chart1Series} annotations={annotations} yLabel="Deaths" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-causes" className="mb-12">
            <LineChart title="Drink/drug driving deaths and distraction-related fatalities, 2000–2022" subtitle="Estimated deaths involving drink or drug impairment; deaths where driver distraction was a factor." series={chart2Series} annotations={[]} yLabel="Deaths" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Seatbelt progress" value="-4,000" unit="lives/yr" description={<>Compulsory seatbelt wearing, introduced in 1983, has saved an estimated 4,000 lives per year in Britain. It remains one of the most cost-effective road safety interventions ever implemented.<Cite nums={2} /></>} source="Source: ROSPA / DfT seatbelt statistics." />
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
