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
    propertiesAtRiskM: number;
    defenceConditionPct: number;
    capitalInvestmentM: number;
    maintenanceM: number;
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

export default function FloodingRiskPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/flooding-risk/flooding_risk.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'propertiesAtRiskM',
      label: "Properties at flood risk (millions)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.propertiesAtRiskM })),
    },
    {
      id: 'defenceConditionPct',
      label: "Defences in good condition (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.defenceConditionPct })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'capitalInvestmentM',
      label: "Capital investment (\u00a3m)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.capitalInvestmentM })),
    },
    {
      id: 'maintenanceM',
      label: "Maintenance spend (\u00a3m)",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.maintenanceM })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Winter floods \u2014 \u00a3333m damage" },
    { date: new Date(2024, 0, 1), label: "2024: Record storm frequency" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2021, 0, 1), label: "2021: \u00a35.2bn 6-year programme begins" },
  ];

  return (
    <>
      <TopicNav topic="Flooding Risk" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Many Homes Are at Risk of Flooding?"
          finding="5.4 million properties in England are at risk of flooding \u2014 and only 54% of flood defence assets are currently in good condition as climate change increases flood frequency."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              5.4 million properties in England are at risk of flooding — and only 54% of flood defence assets are currently in good condition as climate change increases flood frequency. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Properties at flood " },
          { id: 'sec-chart2', label: "Capital investment" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Properties at flood risk (England)"
            value="5.4m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 5.0m in 2019 \u00b7 climate-driven increase"
            sparklineData={[4.9,4.9,5.0,5.0,5.0,5.1,5.2,5.2,5.3,5.3,5.4]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Flood defence assets in good condition"
            value="54%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 67% in 2019 \u00b7 maintenance backlog"
            sparklineData={[67,66,65,63,62,60,59,58,57,55,54]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Annual cost of flooding"
            value="\u00a31.1bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Average economic cost \u00b7 rising trend"
            sparklineData={[0.6,0.7,0.8,0.9,1.0,0.9,1.0,1.1,1.1,1.1,1.1]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Properties at risk of flooding, England, 2015\u20132025"
              subtitle="Number of residential and non-residential properties in England in areas at risk of flooding from rivers, sea or surface water, as assessed by the Environment Agency."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Flood defence investment vs maintenance backlog, 2015\u20132025"
              subtitle="Annual Environment Agency capital investment in new flood defences versus maintenance spending. The gap between new investment and maintenance has widened."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Record flood investment programme"
            value="\u00a35.2bn"
            unit="2021-27 flood investment programme"
            description="The government committed \u00a35.2 billion to better protect an additional 336,000 properties from flooding by 2027 \u2014 the largest ever investment in flood defences. Schemes completed so far protected 73,000 properties. A further \u00a32.4 billion was announced in 2024 for the period beyond 2027, with a greater emphasis on nature-based solutions."
            source="Source: Environment Agency \u2014 Flood and coastal erosion risk management report, 2025."
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
