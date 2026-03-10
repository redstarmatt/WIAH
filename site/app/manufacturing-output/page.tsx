'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [103,101,100,88,93,95,96.2];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Manufacturing output index (2019=100)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Manufacturing share of UK GDP (%)',
      colour: '#6B7280',
      data: ([10.4,10,9.5,9.2,9,8.9,8.8]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function ManufacturingOutputPage() {
  return (
    <>
      <TopicNav topic="Manufacturing Output" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Manufacturing Output"
          question="Why Is British Manufacturing Still Below Pre-Pandemic Levels?"
          finding="UK manufacturing output remains at 96.2 on a 2019=100 index — still below pre-pandemic levels and declining as a share of GDP. Brexit supply chain dis..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Manufacturing output index (2019=100)"
              value="96.2"
              direction="down"
              polarity="up-is-good"
              changeText="below pre-pandemic level · Brexit supply chain disruption"
              sparklineData=[103,101,100,88,93,95,96.2]
            />
            <MetricCard
              label="Manufacturing share of UK GDP (%)"
              value="8.8"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 10.4% in 2010 · long-run deindustrialisation"
              sparklineData=[10.4,10,9.5,9.2,9,8.9,8.8]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Manufacturing output index (2019=100), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Manufacturing output index (2019=100)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Manufacturing Output statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Manufacturing Output</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Manufacturing Output in the United Kingdom: the numbers show a complex picture. UK manufacturing output remains at 96.2 on a 2019=100 index — still below pre-pandemic levels and declining as a share of GDP. Brexit supply chain disruption and energy costs have been compounding factors. The headline figure — 96.2 for manufacturing output index (2019=100) — below pre-pandemic level · Brexit supply chain disruption.</p>
              <p>The secondary metric tells an equally important story: manufacturing share of uk gdp (%) stands at 8.8, where down from 10.4% in 2010 · long-run deindustrialisation. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
