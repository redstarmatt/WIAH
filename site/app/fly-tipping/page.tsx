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
    totalIncidentsThousands: number;
    highwayIncidentsThousands: number;
    fpnThousands: number;
    prosecutionsThousands: number;
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

export default function FlyTippingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fly-tipping/fly_tipping.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'totalIncidentsThousands',
      label: "Total incidents (thousands)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.totalIncidentsThousands })),
    },
    {
      id: 'highwayIncidentsThousands',
      label: "Highway incidents (thousands)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.highwayIncidentsThousands })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'fpnThousands',
      label: "Fixed penalty notices (thousands)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.fpnThousands })),
    },
    {
      id: 'prosecutionsThousands',
      label: "Prosecutions (thousands)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.prosecutionsThousands })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic closures \u2014 car boot flytipping spikes" },
    { date: new Date(2022, 0, 1), label: "2022: Household waste site charges scrapped in some areas" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Maximum FPN raised to \u00a3400" },
  ];

  return (
    <>
      <TopicNav topic="Fly-Tipping" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Bad Is Britain's Fly-Tipping Problem?"
          finding="Councils in England dealt with nearly 1.1 million fly-tipping incidents in 2023-24 \u2014 an 8% rise. Enforcement has fallen as council budgets are cut."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Councils in England dealt with nearly 1.1 million fly-tipping incidents in 2023-24 — an 8% rise. Enforcement has fallen as council budgets are cut. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Total incidents" },
          { id: 'sec-chart2', label: "Fixed penalty notice" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Fly-tipping incidents 2023-24"
            value="1.07m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+8% year on year \u00b7 10-year high"
            sparklineData={[0.9,0.92,0.93,0.95,0.99,0.98,1.01,1.05,1.03,1.05,1.07]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Cost to councils (clearance)"
            value="\u00a357.7m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up 12% in two years \u00b7 paid by council taxpayers"
            sparklineData={[42,44,46,48,50,52,51,52,53,55,57.7]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Fixed penalty notices issued"
            value="72,000"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 88k in 2019 \u00b7 enforcement falling"
            sparklineData={[62,67,72,78,88,82,75,73,72,72,72]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Fly-tipping incidents by land type, England, 2015\u20132024"
              subtitle="Annual fly-tipping incidents across England by land type. Highway verges and footpaths account for the largest share; private land fly-tipping is likely under-reported."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Fly-tipping enforcement \u2014 actions taken, England, 2015\u20132024"
              subtitle="Enforcement actions by local authorities including fixed penalty notices, formal cautions and prosecutions. Total enforcement has declined despite rising incidents."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Fly-tip camera programme expanding"
            value="4,500+"
            unit="covert cameras deployed 2024"
            description="Over 4,500 covert cameras were deployed at known fly-tipping hotspots across England in 2024, enabling councils to prosecute offenders. Councils reporting the highest prosecution rates have all adopted systematic camera deployment. DEFRA data shows camera-equipped areas see a 30\u201340% reduction in fly-tipping incidents within 12 months."
            source="Source: DEFRA \u2014 Fly-tipping statistics for England 2023-24."
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
