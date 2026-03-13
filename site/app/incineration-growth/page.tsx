'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import SectionNav from '@/components/SectionNav';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Defra / Environment Agency', dataset: 'Energy from Waste Statistics', url: 'https://www.gov.uk/government/statistics/energy-from-waste-plants-in-england', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'UK Emissions Trading Scheme — EfW Inclusion', url: 'https://www.gov.uk/government/consultations/uk-emissions-trading-scheme-efw-inclusion', date: '2024' },
  { num: 3, name: 'NAEI', dataset: 'National Atmospheric Emissions Inventory — EfW CO2', url: 'https://naei.beis.gov.uk/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  efwCapacity: number;
  efwCO2: number;
  plantsOperational: number;
  wasteProcessedM: number;
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/incineration-growth/incineration_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'efwCapacity',
          label: 'EfW capacity (m tonnes/yr)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.efwCapacity,
          })),
        },
        {
          id: 'efwCO2',
          label: 'CO2 emissions (m tonnes)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.efwCO2,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'plantsOperational',
          label: 'Operational EfW plants',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.plantsOperational,
          })),
        },
        {
          id: 'wasteProcessedM',
          label: 'Waste processed (million tonnes)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.wasteProcessedM,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Revised National Planning Policy encourages EfW' },
    { date: new Date(2024, 5, 1), label: '2024: ETS inclusion date confirmed as 2028' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: EfW overtakes landfill as primary treatment route' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Incineration Growth" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are We Burning Too Much Rubbish?"
          finding="Energy-from-waste capacity has doubled since 2014 and now handles more waste than landfill. The sector will enter the UK ETS in 2028, forcing major cost increases."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="EfW annual capacity"
            value="15.4m tonnes"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Doubled since 2014 · 54 operational plants"
            sparklineData={[6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.2, 14.9, 15.4]}
            href="#sec-coverage"
          />
          <MetricCard
            label="EfW plants operational"
            value="54"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 30 in 2015 · 20 more planned or under construction"
            sparklineData={[30, 32, 35, 38, 41, 44, 46, 49, 51, 53, 54]}
            href="#sec-coverage"
          />
          <MetricCard
            label="CO2 from EfW"
            value="11.6m tonnes CO2e"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2% of UK total emissions · ETS inclusion 2028"
            sparklineData={[5.0, 5.8, 6.5, 7.2, 7.9, 8.5, 9.2, 10.0, 10.8, 11.2, 11.6]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Energy-from-waste capacity and CO2, UK, 2015-2025"
              subtitle="Operational EfW capacity (million tonnes per year) and estimated CO2 emissions (million tonnes CO2 equivalent)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="EfW plants and waste processed, UK, 2015-2025"
              subtitle="Number of operational energy-from-waste facilities and total waste processed (million tonnes)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="ETS inclusion will price in carbon from 2028"
            value="2028"
            unit="EfW enters UK ETS"
            description="Energy-from-waste plants will enter the UK Emissions Trading Scheme from 2028, adding a carbon cost to incineration for the first time. The OBR estimates this will raise gate fees by £30-50/tonne, improving the economics of recycling vs burning. Revenue from ETS allowances will fund green infrastructure."
            source="Source: Defra and DESNZ — EfW ETS implementation, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
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
