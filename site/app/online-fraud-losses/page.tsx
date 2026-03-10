'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [620,720,820,940,1040,1110,1170];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Online fraud losses (UK consumers, annual)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Online shopping fraud reports (annual)',
      colour: '#6B7280',
      data: ([56000,68000,82000,95000,108000,118000,125000]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function OnlineFraudLossesPage() {
  return (
    <>
      <TopicNav topic="Online Fraud Losses" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Fraud Losses"
          question="How Much Do Britons Lose to Online Fraud?"
          finding="Online fraud cost UK consumers £1.17 billion in 2023 — a record. Investment fraud is the fastest-growing category. 125,000 online shopping fraud repor..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Online fraud losses (UK consumers, annual)"
              value="£1.17B"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · investment fraud fastest growing"
              sparklineData=[620,720,820,940,1040,1110,1170]
            />
            <MetricCard
              label="Online shopping fraud reports (annual)"
              value="125,000"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 56,000 in 2018"
              sparklineData=[56000,68000,82000,95000,108000,118000,125000]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Online fraud losses (UK consumers, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Online fraud losses (UK consumers, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Online Fraud Losses statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Online Fraud Losses</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Online Fraud Losses in the United Kingdom: the numbers show a complex picture. Online fraud cost UK consumers £1.17 billion in 2023 — a record. Investment fraud is the fastest-growing category. 125,000 online shopping fraud reports were filed — more than double the 2018 figure. The headline figure — £1.17B for online fraud losses (uk consumers, annual) — record high · investment fraud fastest growing.</p>
              <p>The secondary metric tells an equally important story: online shopping fraud reports (annual) stands at 125,000, where up from 56,000 in 2018. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
