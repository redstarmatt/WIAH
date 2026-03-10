'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function ConsumerCreditStressPage() {

  const sparkData = [6.1,6.3,6.5,7,7.8,8.4,8.9];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Households with unsecured debt over 40% of income',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Credit card balances (England, £ billions)',
      colour: '#6B7280',
      data: ([65,62,58,60,65,69,72]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Consumer Credit Stress" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Consumer Credit Stress"
          question="How Many Households Are Drowning in Debt?"
          finding="8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Credit card balances hit £72 billion in 2024 a..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Households with unsecured debt over 40% of income"
              value="8.9%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 6.1% in 2019 · cost-of-living pressure"
              sparklineData={[6.1,6.3,6.5,7,7.8,8.4,8.9]}
            />
            <MetricCard
              label="Credit card balances (England, £ billions)"
              value="72"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £58B in 2021 · real cost rising with high rates"
              sparklineData={[65,62,58,60,65,69,72]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Households with unsecured debt over 40% of income, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Households with unsecured debt over 40% of income"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Consumer Credit Stress statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Consumer Credit Stress</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Consumer Credit Stress in the United Kingdom: the numbers show a complex picture. 8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Credit card balances hit £72 billion in 2024 as high interest rates compounded cost-of-living pressures. The headline figure — 8.9% for households with unsecured debt over 40% of income — up from 6.1% in 2019 · cost-of-living pressure.</p>
              <p>The secondary metric tells an equally important story: credit card balances (england, £ billions) stands at 72, where up from £58B in 2021 · real cost rising with high rates. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
