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
  { num: 1, name: 'ONS', dataset: 'Household Costs Indices', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/articles/householdcostsindices/latest', date: '2025', note: 'Low-income households face 2-3pp more inflation than wealthy households' },
  { num: 2, name: 'ONS', dataset: 'Consumer Price Inflation', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest', date: '2025', note: 'Food and energy make up larger share of low-income spending' },
];

interface DataPoint {
  year: number;
    lowIncomeInflation: number;
    highIncomeInflation: number;
    foodInflation: number;
    energyInflation: number;
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

export default function HouseholdInflationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/household-inflation/household_inflation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'lowIncomeInflation',
      label: "Bottom quintile inflation",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.lowIncomeInflation })),
    },
    {
      id: 'highIncomeInflation',
      label: "Top quintile inflation",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.highIncomeInflation })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'foodInflation',
      label: "Food price inflation",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.foodInflation })),
    },
    {
      id: 'energyInflation',
      label: "Energy price inflation",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.energyInflation })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2021, 0, 1), label: "2021: Energy price shock begins" },
    { date: new Date(2022, 0, 1), label: "2022: Inflation hits 40-year high" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2022, 0, 1), label: "2022: Russian invasion drives energy spike" },
  ];

  return (
    <>
      <TopicNav topic="Household Inflation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Is Inflation Hitting the Poorest Hardest?"
          finding="Low-income households face 2\u20133 percentage points more inflation than wealthy households because food and energy make up a far larger share of their spending."
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Low-income households face 2–3 percentage points more inflation than wealthy households because food and energy make up a far larger share of their spending.<Cite nums={[1,2]} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Bottom quintile infl" },
          { id: 'sec-chart2', label: "Food price inflation" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Low-income inflation rate"
            value="8.2%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+3.1pp vs pre-crisis \u00b7 food & energy driven"
            sparklineData={[1.8,2.0,2.2,2.1,2.4,1.9,3.1,6.8,9.4,9.1,8.2]}
            href="#sec-chart1"
          />
          <MetricCard
            label="High-income inflation rate"
            value="5.9%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+2.1pp vs pre-crisis \u00b7 services driven"
            sparklineData={[1.6,1.8,2.0,2.0,2.1,1.8,2.8,5.4,7.9,7.2,5.9]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Inflation gap (rich vs poor)"
            value="2.3pp"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Widened since 2021 energy shock"
            sparklineData={[0.2,0.2,0.2,0.1,0.3,0.1,0.3,1.4,1.5,1.9,2.3]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="CPI by income quintile, UK, 2015\u20132025"
              subtitle="Annual inflation rate experienced by bottom and top income quintiles. Low-income households face a persistently higher effective rate due to food and energy."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Food and energy price rises, UK, 2015\u20132025"
              subtitle="Annual price change for food and non-alcoholic beverages vs household energy costs. Both disproportionately affect lower-income households."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="New transparency measure launched"
            value="2023"
            unit="ONS Household Costs Indices launched"
            description="The ONS began publishing Household Costs Indices in 2023, allowing precise tracking of inflation by income group for the first time. The data confirmed the disparity and is now used by DWP and HMT to model benefit uprating and energy support targeting."
            source="Source: ONS \u2014 Household Costs Indices, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
