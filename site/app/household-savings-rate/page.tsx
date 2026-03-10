'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [6.5,7,25.9,12,10,9.5,8.9];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'UK household savings ratio (%)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Households with no savings (%)',
      colour: '#6B7280',
      data: ([20,20,21,22,22,23,24]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function HouseholdSavingsRatePage() {
  return (
    <>
      <TopicNav topic="Household Savings Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Household Savings Rate"
          question="How Much Are British Households Actually Saving?"
          finding="The UK household savings ratio has fallen to 8.9% — below the long-run norm of 6.5%, with the COVID-era peak of 25.9% fully reversed. 24% of household..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="UK household savings ratio (%)"
              value="8.9"
              direction="down"
              polarity="up-is-good"
              changeText="down from 25.9% COVID peak · below pre-pandemic 6.5% norm"
              sparklineData=[6.5,7,25.9,12,10,9.5,8.9]
            />
            <MetricCard
              label="Households with no savings (%)"
              value="24"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 20% in 2019 · cost-of-living driven"
              sparklineData=[20,20,21,22,22,23,24]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UK household savings ratio (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="UK household savings ratio (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Household Savings Rate statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Household Savings Rate</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Household Savings Rate in the United Kingdom: the numbers show a complex picture. The UK household savings ratio has fallen to 8.9% — below the long-run norm of 6.5%, with the COVID-era peak of 25.9% fully reversed. 24% of households have no savings at all, up from 20% in 2019. The headline figure — 8.9 for uk household savings ratio (%) — down from 25.9% COVID peak · below pre-pandemic 6.5% norm.</p>
              <p>The secondary metric tells an equally important story: households with no savings (%) stands at 24, where up from 20% in 2019 · cost-of-living driven. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>Data is sourced from official UK government statistics including ONS, NHS England, Home Office, DfE and devolved equivalents. All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication. See individual metric sources for full methodology notes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
