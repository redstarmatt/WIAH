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
  { num: 1, name: 'ONS', dataset: 'Household Income Inequality — Gini Coefficient', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth', date: '2025', note: 'Gini coefficient 0.33; higher than Germany (0.29), France (0.31)' },
  { num: 2, name: 'ONS', dataset: 'Effects of Taxes and Benefits on Household Income', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/theeffectsoftaxesandbenefitsonhouseholdincome', date: '2025', note: 'Top 10% earn 9x bottom 10%' },
  { num: 3, name: 'BEIS', dataset: 'National Living Wage Uprating', date: '2025', note: 'NLW rose from £7.20 in 2016 to £12.21 in 2025', url: 'https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy/about/statistics' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  giniCoeff: number;
  top1PctShare: number;
  topBottomRatio: number;
  bottom20PctShare: number;
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
    fetch('/data/household-income-inequality/household_income_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'giniCoeff',
          label: 'Gini coefficient',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.giniCoeff,
          })),
        },
        {
          id: 'top1PctShare',
          label: 'Top 1% income share (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.top1PctShare,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'topBottomRatio',
          label: 'Top/bottom ratio (×)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.topBottomRatio,
          })),
        },
        {
          id: 'bottom20PctShare',
          label: 'Bottom 20% income share (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bottom20PctShare,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic redistributes income via furlough' },
    { date: new Date(2022, 5, 1), label: '2022: Energy crisis hits bottom quintile hardest' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: National Living Wage raised floor' },
    { date: new Date(2021, 5, 1), label: '2021: UC uplift briefly narrowed gap' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Income Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Is Britain Becoming More Unequal?"
          finding={<>The Gini coefficient for household income has stabilised at 0.33 — similar to 1990 levels but higher than most comparable European countries.<Cite nums={1} /> Top 10% earn 9x bottom 10%.<Cite nums={2} /></>}
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Gini coefficient"
            value="0.33"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Stable for decade · higher than Germany 0.29, France 0.31<Cite nums={1} /></>}
            sparklineData={[0.34, 0.34, 0.33, 0.33, 0.34, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Top 10% median income"
            value="£77,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>9x bottom 10% · gap from financial assets<Cite nums={2} /></>}
            sparklineData={[65000, 67000, 69000, 70000, 71000, 70000, 72000, 74000, 75000, 76000, 77000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Top/bottom income ratio"
            value="9×"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Was 7x in 1980 · financial assets main driver<Cite nums={2} /></>}
            sparklineData={[8.5, 8.6, 8.7, 8.8, 8.9, 8.8, 8.9, 9.0, 9.0, 9.0, 9.0]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK income Gini coefficient, 2015-2025"
              subtitle="Gini coefficient for equivalised household disposable income (0=perfect equality, 1=complete inequality). The UK remains more unequal than comparable European nations."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Income ratio: top to bottom decile, UK, 2015-2025"
              subtitle="Ratio of median income in top 10% to bottom 10%. The ratio has remained around 9x despite policy interventions."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="National Living Wage raised income floor"
            value="£12.21"
            unit="National Living Wage 2025"
            description={<>The National Living Wage has risen from £7.20 in 2016 to £12.21 in 2025 — a 70% increase.<Cite nums={3} /> The Low Pay Commission estimates this has raised wages for 2.5 million workers and partially offset inequality growth at the bottom.<Cite nums={3} /> The Minimum Wage now covers workers from age 21.<Cite nums={3} /></>}
            source="Source: BEIS — National Living Wage uprating, 2025."
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
        <References items={editorialRefs} />
      </main>
    </>
  );
}
