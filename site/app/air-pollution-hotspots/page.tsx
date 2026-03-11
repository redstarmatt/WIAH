'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  pm25Exceedances: number;
  no2Exceedances: number;
  avgPM25Exposure: number;
  prematureDeathsK: number;
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
    fetch('/data/air-pollution-hotspots/air_pollution_hotspots.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'pm25Exceedances',
          label: 'Areas exceeding WHO PM2.5 limit',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pm25Exceedances,
          })),
        },
        {
          id: 'no2Exceedances',
          label: 'NO2 roadside exceedance zones',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.no2Exceedances,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'avgPM25Exposure',
          label: 'Avg PM2.5 exposure (ug/m3)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgPM25Exposure,
          })),
        },
        {
          id: 'prematureDeathsK',
          label: 'Premature deaths (000s)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.prematureDeathsK,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Court orders UK to publish air quality plans' },
    { date: new Date(2022, 5, 1), label: '2022: Clean Air Zones operating in Birmingham, Bath' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic lockdown shows clean air is achievable' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Air Pollution Hotspots" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are Britain's Air Quality Laws Actually Working?"
          finding="44 UK towns and cities exceeded WHO PM2.5 limits in 2024. Road traffic is the primary source. An estimated 40,000 premature deaths per year are linked to air pollution."
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
            label="Areas exceeding WHO PM2.5 limits"
            value="44"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 61 in 2018 · progress slow in cities"
            sparklineData={[61, 58, 55, 52, 50, 46, 44, 43, 44, 44, 44]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Estimated premature deaths/year"
            value="40,000"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 50,000 in 2015 · second biggest public health threat"
            sparklineData={[50000, 48000, 46000, 44000, 42000, 40000, 39000, 39500, 40000, 40000, 40000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="NO2 roadside exceedance zones"
            value="89"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 103 in 2019 · legal deadline missed repeatedly"
            sparklineData={[102, 103, 101, 100, 103, 98, 95, 93, 91, 90, 89]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK areas exceeding WHO air quality limits, 2015-2025"
              subtitle="Number of areas exceeding WHO guideline values for PM2.5 and NO2. Values are falling but many areas remain non-compliant."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Estimated PM2.5 and NO2 exposure, UK, 2015-2025"
              subtitle="Average annual population-weighted exposure to PM2.5 (ug/m3) and estimated premature deaths (thousands)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Clean Air Zones cutting NO2 in cities"
            value="30%"
            unit="NO2 reduction in Birmingham CAZ zones"
            description="Birmingham's Clean Air Zone reduced NO2 concentrations by 30% in targeted areas within 18 months. Six cities now operate CAZs. The ULEZ in London has reduced roadside NO2 by 40% in expanded zone areas, preventing an estimated 4,000 asthma attacks per year in children."
            source="Source: DEFRA — Air quality statistics, 2025. TfL ULEZ impact assessment, 2024."
          />
        </ScrollReveal>

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
