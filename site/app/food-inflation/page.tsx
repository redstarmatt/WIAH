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

interface FoodInflationData {
  national: {
    timeSeries: Array<{ date: string; foodInflation: number; overallInflation: number }>;
    categoryRises: Array<{ category: string; rise2022to2023: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function monthToDate(ym: string): Date {
  const [y, m] = ym.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FoodInflationPage() {
  const [data, setData] = useState<FoodInflationData | null>(null);

  useEffect(() => {
    fetch('/data/food-inflation/food_inflation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const inflationSeries: Series[] = data
    ? [
        {
          id: 'food-inflation',
          label: 'Food &amp; non-alcoholic drinks CPI (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: monthToDate(d.date),
            value: d.foodInflation,
          })),
        },
        {
          id: 'overall-inflation',
          label: 'Overall CPI (%)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: monthToDate(d.date),
            value: d.overallInflation,
          })),
        },
      ]
    : [];

  const categoryData: Series[] = data
    ? [{
        id: 'category-rises',
        label: 'Price rise 2022&ndash;2023 (%)',
        colour: '#E63946',
        data: (data.national.categoryRises ?? []).map((c, i) => ({
          date: new Date(2023, i, 1),
          value: c.rise2022to2023,
        })),
      }]
    : [];

  const inflationAnnotations: Annotation[] = [
    { date: new Date(2022, 1, 1), label: 'Russia invades Ukraine' },
    { date: new Date(2023, 2, 1), label: 'Peak: 19.2%' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Food Inflation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Inflation"
          question="How Much Have Food Prices Actually Gone Up?"
          finding="Food and non-alcoholic drink prices rose 19.2% in the year to March 2023 &mdash; the highest rate in 45 years &mdash; adding approximately &pound;700 to average household food bills."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK food price shock of 2022&ndash;2023 was the most severe in living memory. ONS figures show that food and non-alcoholic drink prices rose 19.2% in the twelve months to March 2023, the highest annual rate since the mid-1970s energy crisis. Over the same period overall CPI inflation peaked at 11.1% in October 2022 &mdash; itself a forty-year high &mdash; meaning that food inflation was running significantly faster than general price rises and causing disproportionate hardship for lower-income households who spend a larger share of their income on food. The cumulative impact was substantial: analysis by the Resolution Foundation and the Food Foundation found that average household food bills rose by approximately &pound;700 in 2022&ndash;23 compared with pre-crisis levels, with the increase concentrated in staple categories including bread, dairy, meat, eggs, and cooking oils. The Food Foundation&apos;s food insecurity tracker found that the proportion of adults experiencing food insecurity &mdash; defined as reducing meal sizes, skipping meals, or not eating for a whole day due to inability to afford food &mdash; rose from approximately 7% in 2021 to 15% by mid-2023, representing approximately 7.3 million adults.</p>
            <p>The causes of the food price surge were multiple and interacting. Russia&apos;s invasion of Ukraine in February 2022 disrupted global markets for wheat, sunflower oil, and fertiliser: Ukraine and Russia together account for approximately 30% of global wheat exports and over 75% of sunflower oil production, and the conflict caused immediate price spikes in commodity markets. The 2021&ndash;22 energy price surge increased production costs throughout the food supply chain &mdash; from greenhouse heating and food processing energy to refrigerated transport and packaging manufacturing. Supply chain disruptions related to COVID-19 persisted through 2022, with shipping container costs, port congestion, and labour shortages in food processing contributing to price pressure. In the UK specifically, labour shortages in agriculture and food processing &mdash; partly attributable to reduced EU worker availability post-Brexit &mdash; created additional bottlenecks and quality losses at harvest. Competition authorities and the grocery market regulator (the CMA) investigated whether supermarkets had used the inflationary environment to expand profit margins, finding mixed evidence: some product categories showed margin expansion but others did not, and the overall picture was complex.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-cpi', label: 'Food vs Overall CPI' },
          { id: 'sec-categories', label: 'By Category' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Peak food inflation (March 2023)"
              value="19.2%"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest in 45 years &middot; vs 2.5% in 2018 &middot; Now easing back below 2%"
              sparklineData={[2.5, 2.8, 1.8, 2.2, 4.2, 11.8, 19.2, 4.0]}
              href="#sec-cpi"
            />
            <MetricCard
              label="Average household food bill rise"
              value="&pound;700"
              direction="up"
              polarity="up-is-bad"
              changeText="2022&ndash;23 vs pre-crisis &middot; Concentrated in bread, dairy, eggs, oil"
              sparklineData={[0, 50, 100, 150, 250, 450, 650, 700]}
              href="#sec-cpi"
            />
            <MetricCard
              label="Adults experiencing food insecurity"
              value="7.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 peak &middot; Up from 7% to 15% of adults &middot; Skipping meals, reducing portions"
              sparklineData={[3.5, 3.8, 4.2, 4.9, 5.5, 6.2, 7.0, 7.3]}
              href="#sec-cpi"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cpi" className="mb-12">
            <LineChart
              title="Food CPI vs overall CPI, UK, 2018&ndash;2025 (12-month rate, %)"
              subtitle="Food and non-alcoholic drink prices rose far faster than overall inflation, peaking at 19.2% in March 2023 before falling sharply. The food price shock imposed a disproportionate burden on lower-income households."
              series={inflationSeries}
              annotations={inflationAnnotations}
              yLabel="Annual % change"
              source={{
                name: 'ONS',
                dataset: 'Consumer Price Index &mdash; food &amp; non-alcoholic beverages',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-categories" className="mb-12">
            <LineChart
              title="Food price rises by category, 2022&ndash;2023 (%)"
              subtitle="Annual price rises for specific food categories in the year to March 2023. Olive oil, eggs, and sugar saw the largest increases; all major categories rose substantially."
              series={categoryData}
              yLabel="% rise"
              source={{
                name: 'ONS',
                dataset: 'CPI category-level price changes &mdash; food basket',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Food inflation fell from 19.2% to ~2% by 2025"
            unit=""
            description="Food inflation fell from its March 2023 peak of 19.2% to approximately 2% by early 2025 as global commodity prices stabilised, energy costs eased, and supply chains normalised. This fall has provided real relief for household budgets, though prices remain cumulatively 25% higher than pre-crisis levels &mdash; meaning bills have not fallen, they have simply stopped rising as fast. The government is also strengthening the Grocery Code Adjudicator and the Better Retailing Code to improve supply chain transparency and prevent future price gouging. The CMA&apos;s market study into grocery retail, published in 2024, recommended strengthened price comparison tools and better consumer information."
            source="Source: ONS &mdash; Consumer Price Index 2025; Food Foundation &mdash; Food Insecurity Tracker 2024; Trussell Trust &mdash; Annual Report 2023/24; Resolution Foundation &mdash; Cost of Living Impact 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
