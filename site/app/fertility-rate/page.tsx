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
    tfr: number;
    replacementLine: number;
    birthsThousands: number;
    avgMotherAge: number;
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

export default function FertilityRatePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fertility-rate/fertility_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'tfr',
      label: "Total fertility rate",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.tfr })),
    },
    {
      id: 'replacementLine',
      label: "Replacement rate (2.1)",
      colour: "#6B7280",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.replacementLine })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'birthsThousands',
      label: "Annual births (thousands)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.birthsThousands })),
    },
    {
      id: 'avgMotherAge',
      label: "Average mother age at birth",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.avgMotherAge })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2012, 0, 1), label: "2012: UK TFR peaks at 1.94" },
    { date: new Date(2020, 0, 1), label: "2020: COVID reduces births further" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic lockdown births fall" },
  ];

  return (
    <>
      <TopicNav topic="Fertility Rate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="Is Britain Having Fewer Babies?"
          finding="The UK total fertility rate fell to a record low of 1.41 in 2024 \u2014 the third consecutive record low and well below the 2.1 replacement rate."
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK total fertility rate fell to a record low of 1.41 in 2024 — the third consecutive record low and well below the 2.1 replacement rate. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Total fertility rate" },
          { id: 'sec-chart2', label: "Annual births" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total fertility rate 2024"
            value="1.41"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Record low \u00b7 3rd consecutive \u00b7 below 2.1 replacement"
            sparklineData={[1.82,1.81,1.79,1.76,1.7,1.58,1.61,1.55,1.49,1.45,1.41]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Annual births (England & Wales)"
            value="605,479"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Lowest since 1977 \u00b7 falling annually"
            sparklineData={[697852,696271,679106,657076,640370,613936,624828,605479,605479,605479,605479]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Average age at first birth"
            value="31.2 years"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 28.6 in 2000 \u00b7 structural shift"
            sparklineData={[29.8,30.0,30.2,30.3,30.6,30.7,30.9,31.0,31.1,31.2,31.2]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK total fertility rate, 2015\u20132024"
              subtitle="Total fertility rate (TFR) \u2014 average number of children per woman in England and Wales. The replacement rate is 2.1. The UK TFR has fallen every year since 2012."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Annual births and average mother age, England & Wales, 2015\u20132024"
              subtitle="Number of live births and average age of mother at birth. Both trends point to structural change in family formation patterns."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Funded childcare expanding"
            value="30 hours"
            unit="free childcare extended to 9-month-olds"
            description="The government expanded funded childcare to 30 hours per week for children from 9 months old from September 2024, the most significant expansion in childcare provision in a generation. Early uptake data shows 300,000 additional families accessing funded hours. Economists estimate this could support up to 100,000 additional women returning to work, partially offsetting demographic pressures."
            source="Source: DfE \u2014 Childcare and early years statistics, 2025. ONS \u2014 Births in England and Wales, 2025."
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
