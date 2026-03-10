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
    totalMtCO2e: number;
    powerSector: number;
    renewableShare: number;
    windShare: number;
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

export default function GreenhouseGasEmissionsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/greenhouse-gas-emissions/greenhouse_gas_emissions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'totalMtCO2e',
      label: "Total emissions (MtCO2e)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.totalMtCO2e })),
    },
    {
      id: 'powerSector',
      label: "Power sector (MtCO2e)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.powerSector })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'renewableShare',
      label: "Renewables share of generation (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.renewableShare })),
    },
    {
      id: 'windShare',
      label: "Wind share (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.windShare })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Net Zero 2050 law passed" },
    { date: new Date(2024, 0, 1), label: "2024: Last coal power plant closes" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2021, 0, 1), label: "2021: Wind overtakes gas briefly" },
    { date: new Date(2024, 0, 1), label: "2024: Coal generation ends" },
  ];

  return (
    <>
      <TopicNav topic="Greenhouse Gas Emissions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is Britain Actually Cutting Its Carbon Emissions?"
          finding="UK territorial emissions fell 53% below 1990 levels by 2024, meeting the fourth carbon budget \u2014 but consumption-based emissions including imports remain 17% higher than the territorial figure."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              UK territorial emissions fell 53% below 1990 levels by 2024, meeting the fourth carbon budget — but consumption-based emissions including imports remain 17% higher than the territorial figure. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Total emissions" },
          { id: 'sec-chart2', label: "Renewables share of " },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Emissions vs 1990 baseline"
            value="-53%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Met 4th carbon budget \u00b7 on track vs 5th"
            sparklineData={[-20,-25,-30,-35,-40,-44,-45,-46,-48,-50,-53]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Consumption emissions premium"
            value="+17%"
            unit=" vs territorial"
            direction="down"
            polarity="up-is-bad"
            changeText="Counting imports reduces progress significantly"
            sparklineData={[35,33,30,28,25,23,21,20,19,18,17]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Renewable electricity share"
            value="45.5%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Record high \u00b7 coal ended Sep 2024"
            sparklineData={[24.6,25.1,29.4,33.1,36.9,43.1,39.4,40.1,42.2,44.4,45.5]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions, 1990\u20132024"
              subtitle="UK territorial greenhouse gas emissions by sector (MtCO2e). Emissions have more than halved since 1990, driven mainly by power sector decarbonisation."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Renewable electricity generation share, UK, 2015\u20132025"
              subtitle="Percentage of electricity generated from renewable sources (wind, solar, hydro, biomass). Wind is now the largest single source of UK electricity."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Climate leader \u2014 4th carbon budget met"
            value="4th"
            unit="carbon budget met ahead of schedule"
            description="The UK became the first major economy to meet its fourth carbon budget target, having reduced emissions by more than 50% since 1990. The Climate Change Committee confirmed the UK is one of only a handful of countries to have achieved absolute decoupling of economic growth from emissions. Offshore wind capacity reached 15GW \u2014 the largest fleet in the world."
            source="Source: DESNZ \u2014 UK greenhouse gas emissions provisional figures, 2025. Climate Change Committee progress report, 2025."
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
