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
    superfastPct: number;
    fullFibrePct: number;
    belowTargetM: number;
    ruralCoveragePct: number;
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

export default function BroadbandCoveragePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/broadband-coverage/broadband_coverage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'superfastPct',
      label: "Superfast 30Mbps+ (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.superfastPct })),
    },
    {
      id: 'fullFibrePct',
      label: "Full-fibre gigabit (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.fullFibrePct })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'belowTargetM',
      label: "Premises below 10Mbps (millions)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.belowTargetM })),
    },
    {
      id: 'ruralCoveragePct',
      label: "Rural superfast coverage (%)",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.ruralCoveragePct })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Project Gigabit launched" },
    { date: new Date(2023, 0, 1), label: "2023: BT Openreach full-fibre rollout accelerates" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Universal Service Obligation introduced" },
  ];

  return (
    <>
      <TopicNav topic="Broadband Coverage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Who Still Can't Get Decent Broadband?"
          finding="97.8% of UK premises can access superfast broadband; but full-fibre (gigabit-capable) reaches only 70%, and 3.5 million rural premises remain below the target speed."
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              97.8% of UK premises can access superfast broadband; but full-fibre (gigabit-capable) reaches only 70%, and 3.5 million rural premises remain below the target speed. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Superfast 30Mbps+" },
          { id: 'sec-chart2', label: "Premises below 10Mbp" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Full-fibre (gigabit) coverage"
            value="70%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 10% in 2020 \u00b7 target 99% by 2030"
            sparklineData={[10,14,18,25,35,47,55,62,68,69,70]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Below 10Mbps premises"
            value="3.5m"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 8m in 2019 \u00b7 mainly rural"
            sparklineData={[8.0,7.5,7.0,6.5,6.0,5.5,5.0,4.5,4.2,3.8,3.5]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Superfast (30Mbps+) coverage"
            value="97.8%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Near universal \u00b7 rural gap persists"
            sparklineData={[91,92,93,94,95,96,96.8,97.1,97.4,97.6,97.8]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK broadband coverage by technology, 2015\u20132025"
              subtitle="Percentage of UK premises covered by superfast (30Mbps+) and full-fibre (gigabit-capable) broadband. Full-fibre coverage has grown rapidly since 2020."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Premises below target broadband speed, UK, 2015\u20132025"
              subtitle="Number of premises unable to access 10Mbps download speeds \u2014 the Universal Service Obligation standard. Mainly affects rural areas and hard-to-reach premises."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Project Gigabit delivering fast results"
            value="\u00a35bn"
            unit="Project Gigabit commitment"
            description="Project Gigabit committed \u00a35 billion to connect the hardest-to-reach premises with gigabit broadband by 2030. Over 1 million contracts have been signed for rural premises under the scheme's supplier framework. Full-fibre coverage grew by 20 percentage points in just three years \u2014 faster than any other major European country."
            source="Source: DSIT \u2014 Project Gigabit programme statistics, 2025. Ofcom \u2014 Connected Nations, 2025."
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
