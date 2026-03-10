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
    englandRate: number;
    walesRate: number;
    bestCouncil: number;
    worstCouncil: number;
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

export default function RecyclingRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/recycling-rates/recycling_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'englandRate',
      label: "England recycling rate (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.englandRate })),
    },
    {
      id: 'walesRate',
      label: "Wales recycling rate (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.walesRate })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'bestCouncil',
      label: "Best performing council (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.bestCouncil })),
    },
    {
      id: 'worstCouncil',
      label: "Worst performing council (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.worstCouncil })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2018, 0, 1), label: "2018: Resources and Waste Strategy published" },
    { date: new Date(2023, 0, 1), label: "2023: Simpler Recycling reform begins" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic affects recycling patterns" },
  ];

  return (
    <>
      <TopicNav topic="Recycling Rates" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Why Has England's Recycling Rate Stalled?"
          finding="England's recycling rate has been stuck at 43\u201344% for over a decade, far below the 65% target by 2035; the best-performing council recycles 66%, the worst less than 20%."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England's recycling rate has been stuck at 43–44% for over a decade, far below the 65% target by 2035; the best-performing council recycles 66%, the worst less than 20%. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "England recycling ra" },
          { id: 'sec-chart2', label: "Best performing coun" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="England recycling rate"
            value="43.8%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="Stalled since 2012 \u00b7 target 65% by 2035"
            sparklineData={[44.8,44.1,43.5,44.7,45.2,44.9,43.9,44.1,44.2,43.9,43.8]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Best council rate"
            value="66%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="South Oxfordshire \u00b7 consistent leader"
            sparklineData={[61,62,63,64,65,65,65,66,66,66,66]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Worst council rate"
            value="19%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Several inner-city councils below 20%"
            sparklineData={[24,23,23,22,22,21,21,20,20,19,19]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="England household recycling rate, 2015\u20132024"
              subtitle="Percentage of local authority-collected waste recycled, composted or reused. England's rate has been broadly flat since 2012 at around 44%."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authority recycling range, England, 2015\u20132024"
              subtitle="Best and worst performing local authority recycling rates. The gap between best and worst councils remains very wide at nearly 50 percentage points."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Simpler Recycling launching 2025"
            value="2025"
            unit="consistent recycling nationwide"
            description="The Simpler Recycling reform, rolling out from March 2025, requires all councils in England to collect the same materials for recycling \u2014 ending the current postcode lottery where each council accepts different materials. Analysis suggests the reform could lift the national rate by 4\u20136 percentage points once fully implemented."
            source="Source: DEFRA \u2014 Simpler Recycling policy update, 2025."
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
