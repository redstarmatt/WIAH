'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface DataPoint {
  year: number;
    ppmPct: number;
    cancelledPct: number;
    fareIncreasePct: number;
    wageGrowthPct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

export default function RailPerformancePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/rail-performance/rail_performance.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'ppmPct',
      label: "On-time arrivals \u2014 PPM (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.ppmPct })),
    },
    {
      id: 'cancelledPct',
      label: "Trains cancelled (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.cancelledPct })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'fareIncreasePct',
      label: "Regulated fare increase (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.fareIncreasePct })),
    },
    {
      id: 'wageGrowthPct',
      label: "Average wage growth (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.wageGrowthPct })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: COVID collapses passenger numbers" },
    { date: new Date(2022, 0, 1), label: "2022: Widespread strike action" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2022, 0, 1), label: "2022: 5.9% \u2014 highest increase in decade" },
  ];

  return (
    <>
      <TopicNav topic="Rail Performance" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="Is Britain's Rail Network Actually Working?"
          finding="Just 59.2% of trains arrived on time in 2024-25 \u2014 well below the 92% target; cancellations hit 4.0%, the highest on record. Fares rose 4.9% in January 2024."
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Just 59.2% of trains arrived on time in 2024-25 — well below the 92% target; cancellations hit 4.0%, the highest on record. Fares rose 4.9% in January 2024. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "On-time arrivals \u2014 P" },
          { id: 'sec-chart2', label: "Regulated fare incre" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Trains on time (PPM)"
            value="59.2%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Target: 92% \u00b7 worst performance on record"
            sparklineData={[88.1,87.5,87.3,86.7,85.8,65.2,72.4,74.3,68.1,62.4,59.2]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Trains cancelled"
            value="4.0%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Record high \u00b7 industry target: 2%"
            sparklineData={[1.8,1.9,2.0,2.1,2.3,4.8,3.5,3.2,3.8,3.9,4.0]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Annual fare increase 2024"
            value="4.9%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Above wage growth \u00b7 94% real rise since 1995"
            sparklineData={[2.5,2.4,3.4,3.1,2.8,0.0,3.8,5.9,4.9,4.9,4.9]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Rail punctuality and cancellations, England, 2015\u20132025"
              subtitle="Public Performance Measure (PPM) \u2014 trains arriving within 5 minutes of schedule. COVID collapsed rail use in 2020 but performance has not recovered to pre-pandemic levels."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Rail fare increases vs wage growth, 2015\u20132025"
              subtitle="Annual regulated fare increase versus average weekly earnings growth. Fares have consistently outpaced wages over the decade."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Great British Railways taking shape"
            value="2025"
            unit="GBR transition body operational"
            description="The Great British Railways Transition Body became operational in 2025, bringing under one organisation the functions currently split between Network Rail, train operators and the Department for Transport. Passenger rail was renationalised into Great British Railways by the Railways Act 2025. Early modelling suggests integrated ticketing and simpler fares could increase demand by 6\u20138%."
            source="Source: ORR \u2014 Passenger rail usage statistics, 2025. DfT \u2014 Railways Act 2025 impact assessment."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
