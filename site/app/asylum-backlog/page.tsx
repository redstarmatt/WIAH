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
    pendingCasesThousands: number;
    quarterlyDecisionsThousands: number;
    overallGrantRate: number;
    afgSyrGrantRate: number;
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

export default function AsylumBacklogPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/asylum-backlog/asylum_backlog.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'pendingCasesThousands',
      label: "Cases awaiting decision (thousands)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.pendingCasesThousands })),
    },
    {
      id: 'quarterlyDecisionsThousands',
      label: "Quarterly decisions made (thousands)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.quarterlyDecisionsThousands })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'overallGrantRate',
      label: "Overall grant rate (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.overallGrantRate })),
    },
    {
      id: 'afgSyrGrantRate',
      label: "Afghan/Syrian grant rate (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.afgSyrGrantRate })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: COVID halts casework for months" },
    { date: new Date(2023, 0, 1), label: "2023: 2,500 new caseworkers recruited" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2021, 0, 1), label: "2021: Afghan crisis \u2014 grant rates spike" },
    { date: new Date(2022, 0, 1), label: "2022: Ukrainian route bypasses asylum system" },
  ];

  return (
    <>
      <TopicNav topic="Asylum Backlog" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Long Do Asylum Seekers Wait for a Decision?"
          finding="48,700 asylum cases are awaiting an initial decision; the average wait is 18 months. The appeals backlog stands at 42,000 and is growing despite record caseworker recruitment."
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              48,700 asylum cases are awaiting an initial decision; the average wait is 18 months. The appeals backlog stands at 42,000 and is growing despite record caseworker recruitment. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Cases awaiting decis" },
          { id: 'sec-chart2', label: "Overall grant rate" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Cases awaiting initial decision"
            value="48,700"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 134k peak \u00b7 still above target"
            sparklineData={[25000,30000,38000,48000,72000,95000,134000,115000,82000,62000,48700]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Average wait for decision"
            value="18 months"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 28 months \u00b7 target: 6 months"
            sparklineData={[6,7,9,13,18,24,28,26,22,20,18]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Appeals backlog"
            value="42,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Fastest-growing part of backlog"
            sparklineData={[15000,16000,19000,22000,26000,30000,34000,37000,39000,41000,42000]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK asylum backlog and decision output, 2015\u20132025"
              subtitle="Pending asylum cases awaiting initial decision (left) and quarterly decisions made (right). The backlog peaked at 134,000 in early 2023 and has since reduced."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Asylum grant rates by nationality, 2015\u20132025"
              subtitle="Percentage of initial asylum decisions that resulted in a grant of protection. Rates vary dramatically by nationality."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Backlog halved in 18 months"
            value="134,000 \u2192 48,700"
            unit="cases cleared 2023-25"
            description="The recruitment of 2,500 additional asylum caseworkers and a 'turbo' clearance programme for legacy cases reduced the main backlog from 134,000 to below 50,000 between 2023 and 2025. Over 100,000 decisions were made in 2024 alone \u2014 the highest annual output on record. Electronic decision systems allowed caseworkers to process straightforward cases 40% faster."
            source="Source: Home Office \u2014 Immigration system statistics, Q3 2025."
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
