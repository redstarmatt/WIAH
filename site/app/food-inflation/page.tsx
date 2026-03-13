'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Food CPI annual % change, monthly 2018–2025 (selected monthly points, annual values for simplicity)
const foodInflation = [1.8, 2.0, 2.5, 2.8, 1.8, 2.2, 4.2, 8.5, 14.6, 19.2, 12.0, 4.0, 2.5, 1.8, 1.6, 1.5];
// Overall CPI annual % change
const overallInflation = [2.4, 2.1, 1.8, 2.3, 0.8, 2.6, 5.4, 9.0, 11.1, 10.4, 6.7, 2.3, 2.0, 1.8, 1.5, 1.4];

const inflationSeries: Series[] = [
  {
    id: 'food-inflation',
    label: 'Food & non-alcoholic drinks CPI (%)',
    colour: '#E63946',
    data: foodInflation.map((v, i) => ({ date: new Date(2018 + Math.floor(i / 2), (i % 2) * 6, 1), value: v })),
  },
  {
    id: 'overall-inflation',
    label: 'Overall CPI (%)',
    colour: '#6B7280',
    data: overallInflation.map((v, i) => ({ date: new Date(2018 + Math.floor(i / 2), (i % 2) * 6, 1), value: v })),
  },
];

// Food insecurity % of adults, 2018–2025
const foodInsecurityPct = [7.0, 7.2, 7.5, 8.0, 9.5, 12.0, 15.0, 12.0];
// Household food bill cumulative rise index (2018=100)
const foodBillIndex = [100, 102, 104, 106, 110, 120, 138, 140];

const insecuritySeries: Series[] = [
  {
    id: 'food-insecurity',
    label: 'Adults experiencing food insecurity (%)',
    colour: '#E63946',
    data: foodInsecurityPct.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'food-bill-index',
    label: 'Household food bill index (2018=100)',
    colour: '#F4A261',
    data: foodBillIndex.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const inflationAnnotations: Annotation[] = [
  { date: new Date(2022, 1, 1), label: 'Russia invades Ukraine' },
  { date: new Date(2023, 2, 1), label: 'Peak: 19.2%' },
];

const insecurityAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Cost of living crisis peaks' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Consumer Price Index — food & non-alcoholic beverages', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices', date: '2025' },
  { num: 2, name: 'Resolution Foundation', dataset: 'Cost of Living Impact', date: '2024' },
  { num: 3, name: 'Food Foundation', dataset: 'Food Insecurity Tracker', url: 'https://foodfoundation.org.uk', date: '2024' },
];

export default function FoodInflationPage() {
  return (
    <>
      <TopicNav topic="Food Inflation" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Inflation"
          question="How Much Have Food Prices Actually Gone Up?"
          finding="Food and non-alcoholic drink prices rose 19.2% in the year to March 2023 — the highest rate in 45 years — adding approximately £700 to average household food bills."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK food price shock of 2022–23 was the most severe in living memory. ONS figures show that food and non-alcoholic drink prices rose 19.2% in the twelve months to March 2023, the highest annual rate since the mid-1970s<Cite nums={1} />. Over the same period, overall CPI inflation peaked at 11.1% in October 2022<Cite nums={1} /> — meaning food inflation was running significantly faster than general price rises, causing disproportionate hardship for lower-income households who spend a larger share of income on food. The cumulative impact was substantial: average household food bills rose by approximately £700 in 2022–23 compared with pre-crisis levels<Cite nums={2} />, concentrated in staple categories including bread, dairy, meat, eggs, and cooking oils.</p>
            <p>The causes were multiple and interacting. Russia's invasion of Ukraine in February 2022 disrupted global markets for wheat, sunflower oil, and fertiliser. The 2021–22 energy price surge increased production costs throughout the food supply chain. Supply chain disruptions related to COVID-19 persisted through 2022. In the UK specifically, labour shortages in agriculture and food processing — partly attributable to reduced EU worker availability post-Brexit — created additional bottlenecks. The proportion of adults experiencing food insecurity rose from 7% in 2021 to 15% by mid-2023, representing approximately 7.3 million adults. Although inflation has since fallen back toward 2%, prices themselves remain cumulatively 25% higher than pre-crisis levels.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-cpi', label: 'Food vs Overall CPI' },
          { id: 'sec-insecurity', label: 'Food Insecurity' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Peak food inflation (March 2023)"
              value="19.2%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Highest in 45 years · now easing back below 2%"
              sparklineData={[2.5, 2.8, 1.8, 4.2, 8.5, 14.6, 19.2, 4.0]}
              source="ONS · Consumer Price Index 2025"
              href="#sec-cpi"
            />
            <MetricCard
              label="Average household food bill rise"
              value="£700"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022–23 vs pre-crisis · concentrated in bread, dairy, eggs, oil"
              sparklineData={[0, 50, 100, 150, 250, 450, 650, 700]}
              source="Resolution Foundation · Cost of Living Impact 2024"
              href="#sec-cpi"
            />
            <MetricCard
              label="Adults experiencing food insecurity"
              value="7.3m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023 peak · up from 7% to 15% of adults"
              sparklineData={[3.5, 3.8, 4.2, 4.9, 5.5, 6.2, 7.0, 7.3]}
              source="Food Foundation · Food Insecurity Tracker 2024"
              href="#sec-insecurity"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-cpi" className="mb-12">
            <LineChart
              title="Food CPI vs overall CPI, UK, 2018–2025 (annual % change)"
              subtitle="Food and non-alcoholic drink prices rose far faster than overall inflation, peaking at 19.2% in March 2023 before falling sharply. The food price shock imposed a disproportionate burden on lower-income households."
              series={inflationSeries}
              annotations={inflationAnnotations}
              yLabel="Annual % change"
              source={{ name: 'ONS', dataset: 'Consumer Price Index — food & non-alcoholic beverages', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices', frequency: 'monthly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-insecurity" className="mb-12">
            <LineChart
              title="Food insecurity and household food bill index, UK, 2018–2025"
              subtitle="Adults experiencing food insecurity alongside cumulative food bill index (2018=100). Prices remain 40% higher than pre-crisis levels even as inflation rate falls."
              series={insecuritySeries}
              annotations={insecurityAnnotations}
              yLabel="Insecurity (%) / Index"
              source={{ name: 'Food Foundation / ONS', dataset: 'Food Insecurity Tracker / CPI', url: 'https://foodfoundation.org.uk', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Food inflation fell from 19.2% to ~2% by 2025"
            value="~2%"
            unit="food inflation by early 2025"
            description="Food inflation fell from its March 2023 peak of 19.2% to approximately 2% by early 2025 as global commodity prices stabilised, energy costs eased, and supply chains normalised. This has provided real relief for household budgets, though prices remain cumulatively 25% higher than pre-crisis levels. The government is also strengthening the Grocery Code Adjudicator and the CMA's market study into grocery retail, published in 2024, recommended strengthened price comparison tools and better consumer information."
            source="Source: ONS — Consumer Price Index 2025; Food Foundation — Food Insecurity Tracker 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Consumer Price Index</a> — Monthly food and overall inflation data. Retrieved 2025.</p>
            <p><a href="https://foodfoundation.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Food Foundation — Food Insecurity Tracker</a> — Quarterly survey of adults experiencing food insecurity. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
