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
  { num: 1, name: 'ONS', dataset: 'Business Demography — UK Business Survival Rates', url: 'https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable', date: '2025', note: '3-year survival rate 58%, down from 63% in 2017; hospitality 5-year survival 32%' },
  { num: 2, name: 'British Business Bank', dataset: 'Small Business Finance Markets Report', url: 'https://www.british-business-bank.co.uk/research/small-business-finance-markets', date: '2025', note: '150 active UK unicorn companies; online retail 58% 5-year survival vs 40% physical retail' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  threeYearSurvival: number;
  fiveYearSurvival: number;
  hospitalitySurvival: number;
  professionalServicesSurvival: number;
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
    fetch('/data/startup-survival/startup_survival.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'threeYearSurvival',
          label: '3-year survival (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.threeYearSurvival,
          })),
        },
        {
          id: 'fiveYearSurvival',
          label: '5-year survival (%)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fiveYearSurvival,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'hospitalitySurvival',
          label: 'Hospitality (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.hospitalitySurvival,
          })),
        },
        {
          id: 'professionalServicesSurvival',
          label: 'Professional services (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.professionalServicesSurvival,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic disrupts cohort data' },
    { date: new Date(2022, 5, 1), label: '2022: Energy/inflation shock' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Sectoral divergence accelerates' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Startup Survival" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Why Are Fewer New Businesses Making It?"
          finding="UK business survival rates have fallen across all age cohorts since 2019. Food, retail and hospitality see the lowest survival rates at under 35% at five years."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="3-year survival rate"
            value="58%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 63% in 2017 · hospitality 42%"
            sparklineData={[63, 62, 61, 60, 59, 58, 57, 56, 57, 58, 58]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Hospitality 5-yr survival"
            value="32%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 38% in 2017 · energy and labour cost pressures"
            sparklineData={[38, 37, 36, 35, 34, 31, 30, 30, 31, 32, 32]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Online vs physical retail survival gap"
            value="+18pp"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Online retail 58% 5yr survival vs 40% physical"
            sparklineData={[5, 6, 7, 8, 10, 12, 14, 15, 16, 17, 18]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Business survival rates, UK, 2015-2025"
              subtitle="Percentage of businesses surviving to 3 and 5 years from birth."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Survival rates by sector at 5 years, 2015-2025"
              subtitle="Five-year survival rates for hospitality (worst) and professional services (best)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Online retail survival strong"
            value="58%"
            unit="5-year survival for online retail"
            description="Online retail businesses survive at 58% at five years vs 40% for physical retail. UK unicorn production has grown, with 150 active unicorn companies in 2025."
            source="Source: ONS Business demography, 2025. British Business Bank, 2025."
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
